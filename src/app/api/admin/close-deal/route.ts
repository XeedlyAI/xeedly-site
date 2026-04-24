import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  getOrCreateStripeCustomer,
  createOneTimePrice,
  createCheckoutSession,
} from "@/lib/stripe";
import { sendPaymentLink } from "@/lib/notifications";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

type DealType =
  | "growth_starter"
  | "growth_growth"
  | "growth_scale"
  | "digital_foundation"
  | "operational_systems"
  | "intelligence_platform"
  | "propertydocz_setup"
  | "propertyjobz_setup"
  | "property_combined";

interface Body {
  dealType: DealType;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  customerCompany?: string | null;
  notes?: string | null;
  totalAmount?: number; // dollars, for variable-price products
  monthlyAmount?: number; // dollars, for managed intelligence
  goliveDate?: string | null; // ISO date string
  maintenanceStartDate?: string | null; // ISO date string
}

function formatDollars(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US")}`;
}

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL?.replace(/^/, "https://") ||
    "https://xeedly.com"
  );
}

const PRICE_IDS = () => ({
  gs_starter: process.env.STRIPE_PRICE_GS_STARTER,
  gs_growth: process.env.STRIPE_PRICE_GS_GROWTH,
  gs_scale: process.env.STRIPE_PRICE_GS_SCALE,
  maintenance: process.env.STRIPE_PRICE_MAINTENANCE,
  docz_setup: process.env.STRIPE_PRICE_DOCZ_SETUP,
  jobz_setup: process.env.STRIPE_PRICE_JOBZ_SETUP,
  property_combined: process.env.STRIPE_PRICE_PROPERTY_COMBINED,
});

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    dealType,
    customerName,
    customerEmail,
    customerPhone,
    customerCompany,
    notes,
    totalAmount,
    monthlyAmount,
    goliveDate,
    maintenanceStartDate,
  } = body;

  if (!dealType || !customerName || !customerEmail) {
    return NextResponse.json(
      { error: "dealType, customerName, and customerEmail are required" },
      { status: 400 },
    );
  }

  try {
    const prices = PRICE_IDS();

    // --------------------------------------------------------------------
    // 1. Stripe customer
    // --------------------------------------------------------------------
    const stripeCustomer = await getOrCreateStripeCustomer(
      customerEmail,
      customerName,
      {
        company: customerCompany || "",
        source: "deal_closer",
      },
    );

    // --------------------------------------------------------------------
    // 2. Upsert Supabase customer
    // --------------------------------------------------------------------
    const { data: customer, error: custErr } = await supabaseAdmin
      .from("customers")
      .upsert(
        {
          email: customerEmail,
          name: customerName,
          phone: customerPhone ?? null,
          company: customerCompany ?? null,
          stripe_customer_id: stripeCustomer.id,
          source: "deal_closer",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" },
      )
      .select()
      .single();

    if (custErr) throw custErr;

    // --------------------------------------------------------------------
    // 3. Resolve payment structure per deal type
    // --------------------------------------------------------------------
    let upfrontAmountCents: number;
    let goliveAmountCents: number | null = null;
    let totalAmountCents: number;
    let monthlyAmountCents: number | null = null;
    let checkoutPriceId: string;
    let checkoutMode: "payment" | "subscription" = "payment";
    let productName: string;

    switch (dealType) {
      // -- Growth Systems: full monthly subscription, no split --
      case "growth_starter":
        if (!prices.gs_starter)
          throw new Error("STRIPE_PRICE_GS_STARTER not configured");
        checkoutPriceId = prices.gs_starter;
        checkoutMode = "subscription";
        upfrontAmountCents = 29700;
        totalAmountCents = 29700;
        productName = "Growth Systems — Starter ($297/mo)";
        break;
      case "growth_growth":
        if (!prices.gs_growth)
          throw new Error("STRIPE_PRICE_GS_GROWTH not configured");
        checkoutPriceId = prices.gs_growth;
        checkoutMode = "subscription";
        upfrontAmountCents = 59700;
        totalAmountCents = 59700;
        productName = "Growth Systems — Growth ($597/mo)";
        break;
      case "growth_scale":
        if (!prices.gs_scale)
          throw new Error("STRIPE_PRICE_GS_SCALE not configured");
        checkoutPriceId = prices.gs_scale;
        checkoutMode = "subscription";
        upfrontAmountCents = 99700;
        totalAmountCents = 99700;
        productName = "Growth Systems — Scale ($997/mo)";
        break;

      // -- Digital Foundation: fixed $2,500 total, 50/50 split --
      case "digital_foundation": {
        totalAmountCents = 250000;
        upfrontAmountCents = Math.round(totalAmountCents / 2);
        goliveAmountCents = totalAmountCents - upfrontAmountCents;
        monthlyAmountCents = 19900; // $199
        productName = "Digital Foundation";
        const p = await createOneTimePrice(
          upfrontAmountCents,
          "Digital Foundation — Upfront (50%)",
        );
        checkoutPriceId = p.id;
        break;
      }

      // -- Operational Systems: custom total, 50/50 split --
      case "operational_systems": {
        if (!totalAmount)
          throw new Error("totalAmount is required for operational_systems");
        totalAmountCents = Math.round(totalAmount * 100);
        upfrontAmountCents = Math.round(totalAmountCents / 2);
        goliveAmountCents = totalAmountCents - upfrontAmountCents;
        monthlyAmountCents = 19900; // $199
        productName = `Operational Systems ($${totalAmount.toLocaleString(
          "en-US",
        )})`;
        const p = await createOneTimePrice(
          upfrontAmountCents,
          `Operational Systems — Upfront (50% of $${totalAmount.toLocaleString(
            "en-US",
          )})`,
        );
        checkoutPriceId = p.id;
        break;
      }

      // -- Intelligence Platform: custom total, 50/50 split, + custom monthly --
      case "intelligence_platform": {
        if (!totalAmount)
          throw new Error("totalAmount is required for intelligence_platform");
        totalAmountCents = Math.round(totalAmount * 100);
        upfrontAmountCents = Math.round(totalAmountCents / 2);
        goliveAmountCents = totalAmountCents - upfrontAmountCents;
        monthlyAmountCents = monthlyAmount
          ? Math.round(monthlyAmount * 100)
          : null;
        productName = `Intelligence Platform ($${totalAmount.toLocaleString(
          "en-US",
        )})`;
        const p = await createOneTimePrice(
          upfrontAmountCents,
          `Intelligence Platform — Upfront (50% of $${totalAmount.toLocaleString(
            "en-US",
          )})`,
        );
        checkoutPriceId = p.id;
        break;
      }

      // -- Property setups: full payment, no split --
      case "propertydocz_setup":
        if (!prices.docz_setup)
          throw new Error("STRIPE_PRICE_DOCZ_SETUP not configured");
        checkoutPriceId = prices.docz_setup;
        upfrontAmountCents = 50000;
        totalAmountCents = 50000;
        productName = "PropertyDocz Setup";
        break;
      case "propertyjobz_setup":
        if (!prices.jobz_setup)
          throw new Error("STRIPE_PRICE_JOBZ_SETUP not configured");
        checkoutPriceId = prices.jobz_setup;
        upfrontAmountCents = 50000;
        totalAmountCents = 50000;
        productName = "PropertyJobz Setup";
        break;
      case "property_combined":
        if (!prices.property_combined)
          throw new Error("STRIPE_PRICE_PROPERTY_COMBINED not configured");
        checkoutPriceId = prices.property_combined;
        upfrontAmountCents = 100000;
        totalAmountCents = 100000;
        productName = "PropertyDocz + PropertyJobz Combined Setup";
        break;

      default:
        return NextResponse.json(
          { error: `Unknown deal type: ${dealType}` },
          { status: 400 },
        );
    }

    // --------------------------------------------------------------------
    // 4. Insert deal in Supabase
    // --------------------------------------------------------------------
    const { data: deal, error: dealErr } = await supabaseAdmin
      .from("deals")
      .insert({
        customer_id: customer.id,
        deal_type: dealType,
        total_amount: totalAmountCents,
        upfront_amount: upfrontAmountCents,
        golive_amount: goliveAmountCents,
        monthly_amount: monthlyAmountCents,
        status: "closed",
        golive_scheduled_date: goliveDate || null,
        maintenance_start_date: maintenanceStartDate || null,
        notes: notes ?? null,
      })
      .select()
      .single();

    if (dealErr) throw dealErr;

    // --------------------------------------------------------------------
    // 5. Create Stripe Checkout Session
    // --------------------------------------------------------------------
    const origin = siteUrl();
    const session = await createCheckoutSession(
      stripeCustomer.id,
      checkoutPriceId,
      checkoutMode,
      {
        deal_id: deal.id,
        deal_type: dealType,
        payment_stage: "upfront",
      },
      `${origin}/admin/close?success=true&deal=${deal.id}`,
      `${origin}/admin/close?cancelled=true&deal=${deal.id}`,
    );

    // --------------------------------------------------------------------
    // 6. Record the session on the deal
    // --------------------------------------------------------------------
    await supabaseAdmin
      .from("deals")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", deal.id);

    // --------------------------------------------------------------------
    // 7. Dispatch payment link via SMS + Email
    // --------------------------------------------------------------------
    const formattedAmount =
      checkoutMode === "subscription"
        ? `${formatDollars(upfrontAmountCents)}/mo`
        : formatDollars(upfrontAmountCents);

    const delivery = await sendPaymentLink(
      {
        name: customerName,
        email: customerEmail,
        phone: customerPhone ?? null,
      },
      session.url!,
      productName,
      formattedAmount,
    );

    // --------------------------------------------------------------------
    // 8. Log for observability
    // --------------------------------------------------------------------
    console.log(
      JSON.stringify({
        event: "deal_closed",
        deal_id: deal.id,
        deal_type: dealType,
        customer: customerName,
        amount_cents: upfrontAmountCents,
        delivery,
        timestamp: new Date().toISOString(),
      }),
    );

    return NextResponse.json({
      success: true,
      deal,
      checkoutUrl: session.url,
      productName,
      upfrontAmount: formattedAmount,
      delivery,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("Close deal error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
