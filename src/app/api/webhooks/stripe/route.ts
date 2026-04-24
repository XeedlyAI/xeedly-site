import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  stripe,
  createRecurringPrice,
  createScheduledSubscription,
  createSubscription,
} from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { notifyPaymentReceived, sendSMS } from "@/lib/notifications";

export const runtime = "nodejs";

// Stripe needs the raw request body to verify the signature — that's why we
// accept text() instead of json() and set runtime: nodejs.

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("Webhook received but STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 503 },
    );
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "verification failed";
    console.error("Webhook signature verification failed:", msg);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Log every event (best-effort; don't fail the webhook if logging fails).
  void supabaseAdmin
    .from("payment_events")
    .insert({
      event_type: event.type,
      stripe_event_id: event.id,
      payload: event.data.object,
    })
    .then(() => undefined, (e) => {
      console.warn("Failed to log payment event:", e);
    });

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case "invoice.payment_failed":
        await handleInvoiceFailed(event.data.object as Stripe.Invoice);
        break;
      case "invoice.sent":
        // We mark status earlier in the flow; nothing to do here beyond logging.
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "payment_intent.succeeded":
        // checkout.session.completed already handles our state transitions.
        break;
    }
  } catch (error) {
    console.error(`Webhook handler error for ${event.type}:`, error);
    // Return 200 so Stripe doesn't retry — our state will self-heal on next
    // manual action or cron sweep. Failing would cause duplicate notifications.
    return NextResponse.json({ received: true, handler_error: true });
  }

  return NextResponse.json({ received: true });
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const dealId = session.metadata?.deal_id;
  if (!dealId) return;

  const { data: deal } = await supabaseAdmin
    .from("deals")
    .select("*, customers(*)")
    .eq("id", dealId)
    .single();

  if (!deal) return;

  const isSubscription = [
    "growth_starter",
    "growth_growth",
    "growth_scale",
  ].includes(deal.deal_type);
  const isOneTime = [
    "propertydocz_setup",
    "propertyjobz_setup",
    "property_combined",
  ].includes(deal.deal_type);
  const hasSplit = [
    "digital_foundation",
    "operational_systems",
    "intelligence_platform",
  ].includes(deal.deal_type);

  let nextStatus = deal.status;
  if (isSubscription) nextStatus = "subscription_active";
  else if (isOneTime) nextStatus = "completed";
  else if (hasSplit) nextStatus = "upfront_paid";

  await supabaseAdmin
    .from("deals")
    .update({
      status: nextStatus,
      stripe_subscription_id:
        typeof session.subscription === "string"
          ? session.subscription
          : deal.stripe_subscription_id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", dealId);

  // Notify Shad
  const amount = `$${((deal.upfront_amount ?? 0) / 100).toLocaleString(
    "en-US",
  )}`;
  await notifyPaymentReceived(
    deal.customers?.name ?? "Unknown",
    deal.deal_type,
    amount,
  );
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const dealId = invoice.metadata?.deal_id;
  const paymentStage = invoice.metadata?.payment_stage;
  if (!dealId) return;

  if (paymentStage === "golive") {
    const { data: deal } = await supabaseAdmin
      .from("deals")
      .select("*, customers(*)")
      .eq("id", dealId)
      .single();

    await supabaseAdmin
      .from("deals")
      .update({
        status: "golive_paid",
        updated_at: new Date().toISOString(),
      })
      .eq("id", dealId);

    // If maintenance is scheduled, set up the subscription (now or later).
    if (deal?.maintenance_start_date && deal?.monthly_amount) {
      const maintenanceStart = new Date(deal.maintenance_start_date);
      const stripeCustomerId = deal.customers?.stripe_customer_id;

      if (stripeCustomerId) {
        let priceId: string | null = null;
        if (deal.monthly_amount === 19900 && process.env.STRIPE_PRICE_MAINTENANCE) {
          priceId = process.env.STRIPE_PRICE_MAINTENANCE;
        } else {
          const custom = await createRecurringPrice(
            deal.monthly_amount,
            `Managed Intelligence — ${
              deal.customers?.company || deal.customers?.name || "Custom"
            }`,
          );
          priceId = custom.id;
        }

        if (maintenanceStart > new Date()) {
          const schedule = await createScheduledSubscription(
            stripeCustomerId,
            priceId,
            maintenanceStart,
            { deal_id: dealId },
          );
          await supabaseAdmin
            .from("deals")
            .update({ stripe_subscription_schedule_id: schedule.id })
            .eq("id", dealId);
        } else {
          const sub = await createSubscription(stripeCustomerId, priceId, {
            deal_id: dealId,
          });
          await supabaseAdmin
            .from("deals")
            .update({
              stripe_subscription_id: sub.id,
              status: "subscription_active",
              updated_at: new Date().toISOString(),
            })
            .eq("id", dealId);
        }
      }
    }

    const amount = `$${((deal?.golive_amount ?? 0) / 100).toLocaleString(
      "en-US",
    )}`;
    await notifyPaymentReceived(
      deal?.customers?.name ?? "Unknown",
      `${deal?.deal_type} (go-live)`,
      amount,
    );
  }
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  const dealId = invoice.metadata?.deal_id;
  console.log(
    JSON.stringify({
      event: "payment_failed",
      invoice_id: invoice.id,
      deal_id: dealId,
      amount: invoice.amount_due,
      timestamp: new Date().toISOString(),
    }),
  );
  const adminPhone = process.env.TWILIO_ADMIN_NOTIFY_NUMBER;
  if (adminPhone) {
    await sendSMS(
      adminPhone,
      `⚠️ Stripe payment failed — invoice ${invoice.id} (${invoice.amount_due / 100} USD). Deal ${dealId ?? "n/a"}.`,
    );
  }
}

async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
  const dealId = sub.metadata?.deal_id;
  if (!dealId) return;

  const status =
    sub.status === "active" || sub.status === "trialing"
      ? "subscription_active"
      : sub.status === "past_due" || sub.status === "unpaid"
      ? "subscription_paused"
      : sub.status === "canceled"
      ? "cancelled"
      : undefined;

  const patch: Record<string, unknown> = {
    stripe_subscription_id: sub.id,
    updated_at: new Date().toISOString(),
  };
  if (status) patch.status = status;

  await supabaseAdmin.from("deals").update(patch).eq("id", dealId);
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  const dealId = sub.metadata?.deal_id;
  if (!dealId) return;
  await supabaseAdmin
    .from("deals")
    .update({
      status: "cancelled",
      updated_at: new Date().toISOString(),
    })
    .eq("id", dealId);
}
