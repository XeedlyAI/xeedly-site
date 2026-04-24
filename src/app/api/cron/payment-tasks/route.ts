import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  createAndSendInvoice,
  createSubscription,
  createRecurringPrice,
} from "@/lib/stripe";
import { sendEmail } from "@/lib/notifications";

export const runtime = "nodejs";

/**
 * Daily cron — runs all time-based payment orchestration:
 *   1. Send go-live invoices that are scheduled for today or earlier
 *   2. Send 3/7/14-day reminders for outstanding go-live invoices
 *   3. Activate maintenance subscriptions on their scheduled start dates
 *
 * Auth: accepts Vercel's `x-vercel-cron` header OR a bearer token matching
 * `CRON_SECRET` env var. Either way, external callers without credentials
 * receive 401.
 */
export async function GET(request: NextRequest) {
  const auth = checkCronAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.reason }, { status: 401 });
  }

  const now = new Date();
  const results: string[] = [];

  // ------------------------------------------------------------------
  // 1. Send scheduled go-live invoices
  // ------------------------------------------------------------------
  const { data: goliveDue } = await supabaseAdmin
    .from("deals")
    .select("*, customers(*)")
    .eq("status", "upfront_paid")
    .not("golive_scheduled_date", "is", null)
    .lte("golive_scheduled_date", now.toISOString());

  for (const deal of goliveDue ?? []) {
    if (!deal.golive_amount || !deal.customers?.stripe_customer_id) continue;
    try {
      const enableACH = deal.golive_amount >= 500000;
      const invoice = await createAndSendInvoice(
        deal.customers.stripe_customer_id,
        deal.golive_amount,
        `${deal.deal_type} — Go-Live Payment (50%)`,
        {
          enableACH,
          metadata: { deal_id: deal.id, payment_stage: "golive" },
        },
      );

      await supabaseAdmin
        .from("deals")
        .update({
          status: "golive_invoiced",
          stripe_golive_invoice_id: invoice.id,
          updated_at: now.toISOString(),
        })
        .eq("id", deal.id);

      results.push(`✓ Go-live invoice sent: deal ${deal.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown";
      results.push(`✗ Go-live invoice failed (${deal.id}): ${msg}`);
    }
  }

  // ------------------------------------------------------------------
  // 2. Go-live payment reminders at 3, 7, 14 days
  // ------------------------------------------------------------------
  const { data: unpaidGolive } = await supabaseAdmin
    .from("deals")
    .select("*, customers(*)")
    .eq("status", "golive_invoiced");

  const reminders: Array<{
    days: number;
    field:
      | "golive_reminder_3_sent"
      | "golive_reminder_7_sent"
      | "golive_reminder_14_sent";
  }> = [
    { days: 3, field: "golive_reminder_3_sent" },
    { days: 7, field: "golive_reminder_7_sent" },
    { days: 14, field: "golive_reminder_14_sent" },
  ];

  for (const deal of unpaidGolive ?? []) {
    const invoicedAt = new Date(deal.updated_at);
    const daysSince = Math.floor(
      (now.getTime() - invoicedAt.getTime()) / 86_400_000,
    );

    for (const r of reminders) {
      if (daysSince < r.days || deal[r.field]) continue;
      const amount = `$${((deal.golive_amount ?? 0) / 100).toLocaleString(
        "en-US",
      )}`;
      const subject =
        r.days >= 14
          ? `Action required: outstanding payment — ${deal.deal_type}`
          : `Reminder: payment pending — ${deal.deal_type}`;
      await sendEmail(
        deal.customers?.email ?? "",
        subject,
        `<div style="font-family: -apple-system, Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a;">
          <p>Hi ${deal.customers?.name ?? "there"},</p>
          <p>This is a reminder that your go-live payment of <strong>${amount}</strong> for ${deal.deal_type} is outstanding.</p>
          <p>Please check your email for the invoice from Stripe, or reply to this email with any questions.</p>
          <p>— Shad, XeedlyAI · (801) 882-0094</p>
        </div>`,
      );
      await supabaseAdmin
        .from("deals")
        .update({ [r.field]: true })
        .eq("id", deal.id);
      results.push(
        `✓ Sent ${r.days}-day reminder for deal ${deal.id}`,
      );
    }
  }

  // ------------------------------------------------------------------
  // 3. Activate scheduled maintenance subscriptions
  // ------------------------------------------------------------------
  const { data: maintenanceDue } = await supabaseAdmin
    .from("deals")
    .select("*, customers(*)")
    .eq("status", "golive_paid")
    .not("maintenance_start_date", "is", null)
    .lte("maintenance_start_date", now.toISOString())
    .is("stripe_subscription_id", null);

  for (const deal of maintenanceDue ?? []) {
    if (!deal.monthly_amount || !deal.customers?.stripe_customer_id) continue;
    try {
      let priceId: string | null = null;
      if (
        deal.monthly_amount === 19900 &&
        process.env.STRIPE_PRICE_MAINTENANCE
      ) {
        priceId = process.env.STRIPE_PRICE_MAINTENANCE;
      } else {
        const customPrice = await createRecurringPrice(
          deal.monthly_amount,
          `Managed Intelligence — ${
            deal.customers?.company || deal.customers?.name || "Custom"
          }`,
        );
        priceId = customPrice.id;
      }

      const sub = await createSubscription(
        deal.customers.stripe_customer_id,
        priceId,
        { deal_id: deal.id },
      );

      await supabaseAdmin
        .from("deals")
        .update({
          stripe_subscription_id: sub.id,
          status: "subscription_active",
          updated_at: now.toISOString(),
        })
        .eq("id", deal.id);

      results.push(`✓ Maintenance subscription activated: deal ${deal.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown";
      results.push(`✗ Maintenance activation failed (${deal.id}): ${msg}`);
    }
  }

  return NextResponse.json({ results, timestamp: now.toISOString() });
}

function checkCronAuth(request: NextRequest):
  | { ok: true }
  | { ok: false; reason: string } {
  // Vercel Cron injects this header on scheduled invocations.
  if (request.headers.get("x-vercel-cron")) return { ok: true };

  const cronSecret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (cronSecret && auth === `Bearer ${cronSecret}`) return { ok: true };

  return { ok: false, reason: "Unauthorized" };
}
