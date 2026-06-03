import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  getOrCreateStripeCustomer,
  createStripeInvoiceWithSOW,
} from "@/lib/stripe";
import { generateInvoicePdf, type InvoiceLineItem } from "@/lib/invoice-pdf";
import {
  buildInvoiceEmailHtml,
  sendInvoiceEmail,
} from "@/lib/email-templates/invoice-email";

export const runtime = "nodejs";
export const maxDuration = 60;

interface Body {
  customer: {
    name: string;
    company?: string;
    email: string;
    phone?: string;
  };
  build_tier: string;
  service_tier: string;
  build_amount: number; // cents
  service_amount: number; // cents
  full_service_included: boolean;
  line_items: InvoiceLineItem[];
  comparable_value?: string;
  terms: string;
  notes?: string;
  due_days?: number;
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { customer, build_tier, service_tier, build_amount, service_amount } =
    body;

  if (!customer?.name || !customer?.email || !build_tier || !service_tier) {
    return NextResponse.json(
      { error: "customer (name, email), build_tier, and service_tier are required" },
      { status: 400 },
    );
  }

  if (!body.line_items?.length) {
    return NextResponse.json(
      { error: "line_items must contain at least one item" },
      { status: 400 },
    );
  }

  try {
    // ------------------------------------------------------------------
    // 1. Generate invoice number — INV-YYYY-NNN
    // ------------------------------------------------------------------
    const year = new Date().getFullYear();
    const { count, error: countErr } = await supabaseAdmin
      .from("invoices")
      .select("*", { count: "exact", head: true });
    if (countErr) throw countErr;
    const seq = (count ?? 0) + 1;
    const invoiceNumber = `INV-${year}-${String(seq).padStart(3, "0")}`;

    // ------------------------------------------------------------------
    // 2. Upsert customer in Supabase + Stripe
    // ------------------------------------------------------------------
    const stripeCustomer = await getOrCreateStripeCustomer(
      customer.email,
      customer.name,
      { company: customer.company || "", source: "invoice_system" },
    );

    const { data: dbCustomer, error: custErr } = await supabaseAdmin
      .from("customers")
      .upsert(
        {
          email: customer.email,
          name: customer.name,
          phone: customer.phone ?? null,
          company: customer.company ?? null,
          stripe_customer_id: stripeCustomer.id,
          source: "invoice_system",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" },
      )
      .select()
      .single();
    if (custErr) throw custErr;

    // ------------------------------------------------------------------
    // 3. Create deal in Supabase
    // ------------------------------------------------------------------
    const { data: deal, error: dealErr } = await supabaseAdmin
      .from("deals")
      .insert({
        customer_id: dbCustomer.id,
        deal_type: build_tier,
        total_amount: build_amount,
        upfront_amount: build_amount,
        golive_amount: null,
        monthly_amount: service_amount,
        status: "closed",
        notes: body.notes ?? null,
      })
      .select()
      .single();
    if (dealErr) throw dealErr;

    // ------------------------------------------------------------------
    // 4. Create Stripe Invoice (finalized, not sent via Stripe)
    // ------------------------------------------------------------------
    const stripeLineItems = body.line_items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      amount: item.amount,
    }));

    const { stripe_invoice_id, hosted_invoice_url } =
      await createStripeInvoiceWithSOW(
        stripeCustomer.id,
        stripeLineItems,
        `${invoiceNumber} — ${customer.name}`,
      );

    // ------------------------------------------------------------------
    // 5. Generate PDF
    // ------------------------------------------------------------------
    const pdfBuffer = await generateInvoicePdf({
      invoiceNumber,
      dateIssued: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dueLabel: "Upon Receipt",
      from: {
        address: process.env.XEEDLYAI_ADDRESS || "",
        cityStateZip: process.env.XEEDLYAI_CITY_STATE_ZIP || "",
      },
      customer: {
        name: customer.name,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
      },
      comparableValue: body.comparable_value,
      lineItems: body.line_items,
      buildTotal: build_amount,
      serviceMonthly: service_amount,
      terms: body.terms,
      stripeInvoiceUrl: hosted_invoice_url,
      venmoHandle: process.env.VENMO_HANDLE || "@XeedlyAI",
      ach: {
        bankName: process.env.BANK_NAME || "",
        routing: process.env.ACH_ROUTING || "",
        account: process.env.ACH_ACCOUNT || "",
        accountType: process.env.ACH_ACCOUNT_TYPE || "checking",
      },
    });

    // ------------------------------------------------------------------
    // 6. Upload PDF to Supabase Storage
    // ------------------------------------------------------------------
    const pdfPath = `${invoiceNumber}.pdf`;
    const { error: uploadErr } = await supabaseAdmin.storage
      .from("invoices")
      .upload(pdfPath, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    let pdfUrl = "";
    if (uploadErr) {
      console.error("PDF upload failed (continuing):", uploadErr.message);
    } else {
      const {
        data: { publicUrl },
      } = supabaseAdmin.storage.from("invoices").getPublicUrl(pdfPath);
      pdfUrl = publicUrl;
    }

    // ------------------------------------------------------------------
    // 7. Save invoice record
    // ------------------------------------------------------------------
    const { error: invErr } = await supabaseAdmin.from("invoices").insert({
      invoice_number: invoiceNumber,
      deal_id: deal.id,
      customer_id: dbCustomer.id,
      status: "sent",
      build_tier,
      service_tier,
      full_service_included: body.full_service_included,
      line_items: body.line_items,
      build_total: build_amount,
      service_monthly: service_amount,
      comparable_value: body.comparable_value ?? null,
      terms: body.terms,
      stripe_invoice_id,
      stripe_invoice_url: hosted_invoice_url,
      pdf_url: pdfUrl,
    });
    if (invErr) throw invErr;

    // ------------------------------------------------------------------
    // 8. Send email with PDF attached
    // ------------------------------------------------------------------
    const emailHtml = buildInvoiceEmailHtml({
      customerName: customer.name,
      invoiceNumber,
      stripeInvoiceUrl: hosted_invoice_url,
      buildAmount: build_amount,
      serviceAmount: service_amount,
      comparableValue: body.comparable_value,
      venmoHandle: process.env.VENMO_HANDLE || "@XeedlyAI",
      ach: {
        bankName: process.env.BANK_NAME || "",
        routing: process.env.ACH_ROUTING || "",
        account: process.env.ACH_ACCOUNT || "",
        accountType: process.env.ACH_ACCOUNT_TYPE || "checking",
      },
    });

    const emailSent = await sendInvoiceEmail(
      customer.email,
      invoiceNumber,
      emailHtml,
      pdfBuffer,
    );

    // ------------------------------------------------------------------
    // 9. Update deal with Stripe invoice reference
    // ------------------------------------------------------------------
    await supabaseAdmin
      .from("deals")
      .update({ stripe_upfront_invoice_id: stripe_invoice_id })
      .eq("id", deal.id);

    console.log(
      JSON.stringify({
        event: "invoice_created",
        invoice_number: invoiceNumber,
        deal_id: deal.id,
        customer: customer.name,
        build_amount,
        service_amount,
        email_sent: emailSent,
        timestamp: new Date().toISOString(),
      }),
    );

    return NextResponse.json({
      invoice_id: invoiceNumber,
      invoice_number: invoiceNumber,
      deal_id: deal.id,
      pdf_url: pdfUrl,
      stripe_invoice_url: hosted_invoice_url,
      email_sent: emailSent,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("Create invoice error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
