import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createAndSendInvoice } from "@/lib/stripe";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id: dealId } = await params;

  const { data: deal } = await supabaseAdmin
    .from("deals")
    .select("*, customers(*)")
    .eq("id", dealId)
    .single();

  if (!deal || !deal.golive_amount || !deal.customers?.stripe_customer_id) {
    return NextResponse.json(
      { error: "Deal not found or not eligible for go-live invoice" },
      { status: 404 },
    );
  }

  try {
    const enableACH = deal.golive_amount >= 500000;
    const invoice = await createAndSendInvoice(
      deal.customers.stripe_customer_id,
      deal.golive_amount,
      `${deal.deal_type} — Go-Live Payment (50%)`,
      {
        enableACH,
        metadata: { deal_id: dealId, payment_stage: "golive" },
      },
    );

    await supabaseAdmin
      .from("deals")
      .update({
        status: "golive_invoiced",
        stripe_golive_invoice_id: invoice.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", dealId);

    return NextResponse.json({
      success: true,
      invoiceUrl: invoice.hosted_invoice_url,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
