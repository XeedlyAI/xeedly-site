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
  | "growth_maintain"
  | "growth_get_found"
  | "growth_get_chosen"
  | "digital_foundation"
  | "operational_systems"
  | "intelligence_platform"
  | "propertydocz_setup"
  | "propertyjobz_setup"
  | "property_combined"
  | "vendor_build_495"
  | "vendor_build_995"
  | "vendor_build_1495";

interface Body {
  dealType: DealType;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  customerCompany?: string | null;
  notes?: string | null;
  totalAmount?: number; // dollars, for variable-price products
  monthlyAmount?: number; // dollars, for managed intelligence
  platformTier?: "foundation" | "growth" | "authority"; // vendor builds
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
  gs_maintain: process.env.STRIPE_PRICE_GS_MAINTAIN,
  gs_get_found: process.env.STRIPE_PRICE_GS_GET_FOUND,
  gs_get_chosen: process.env.STRIPE_PRICE_GS_GET_CHOSEN,
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
    platformTier,
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
      // -- Growth Systems: ongoing monthly subscription, no split --
      case "growth_maintain":
        if (!prices.gs_maintain)
          throw new Error("STRIPE_PRICE_GS_MAINTAIN not configured");
        checkoutPriceId = prices.gs_maintain;
        checkoutMode = "subscription";
        upfrontAmountCents = 19900;
        totalAmountCents = 19900;
        productName = "Growth Systems — Maintain ($199/mo)";
        break;
      case "growth_get_found":
        if (!prices.gs_get_found)
          throw new Error("STRIPE_PRICE_GS_GET_FOUND not configured");
        checkoutPriceId = prices.gs_get_found;
        checkoutMode = "subscription";
        upfrontAmountCents = 29900;
        totalAmountCents = 29900;
        productName = "Growth Systems — Get Found ($299/mo)";
        break;
      case "growth_get_chosen":
        if (!prices.gs_get_chosen)
          throw new Error("STRIPE_PRICE_GS_GET_CHOSEN not configured");
        checkoutPriceId = prices.gs_get_chosen;
        checkoutMode = "subscription";
        upfrontAmountCents = 49900;
        totalAmountCents = 49900;
        productName = "Growth Systems — Get Chosen ($499/mo)";
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

      // -- Core HOA Vendor Builds: full payment, no split, + platform sub --
      case "vendor_build_495":
      case "vendor_build_995":
      case "vendor_build_1495": {
        const vendorAmounts: Record<string, number> = {
          vendor_build_495: 49500,
          vendor_build_995: 99500,
          vendor_build_1495: 149500,
        };
        const vendorLabels: Record<string, string> = {
          vendor_build_495: "Core HOA Vendor Build — 48hr ($495)",
          vendor_build_995: "Core HOA Vendor Build — Week 1 ($995)",
          vendor_build_1495: "Core HOA Vendor Build — Week 2 ($1,495)",
        };
        const platformAmounts: Record<string, number> = {
          foundation: 19900,
          growth: 29900,
          authority: 49900,
        };
        const platformLabels: Record<string, string> = {
          foundation: "Foundation $199/mo",
          growth: "Growth $299/mo",
          authority: "Authority $499/mo",
        };
        const tier = platformTier || "foundation";

        totalAmountCents = vendorAmounts[dealType];
        upfrontAmountCents = totalAmountCents; // full payment, no split
        monthlyAmountCents = platformAmounts[tier];
        productName = `${vendorLabels[dealType]} + ${platformLabels[tier]}`;

        const vp = await createOneTimePrice(
          upfrontAmountCents,
          vendorLabels[dealType],
        );
        checkoutPriceId = vp.id;
        break;
      }

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
