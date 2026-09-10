"""Generate SOP PDF from markdown content using reportlab."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, Preformatted, KeepTogether
)
import os

ACCENT = HexColor("#38b6ff")
DARK = HexColor("#0f172a")
GRAY = HexColor("#64748b")
LIGHT_BG = HexColor("#f8fafc")
WHITE = HexColor("#ffffff")

def build_pdf():
    output_path = os.path.join(os.path.dirname(__file__), "SOP-Invoice-Payment-System.pdf")

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        topMargin=0.75*inch,
        bottomMargin=0.75*inch,
        leftMargin=0.85*inch,
        rightMargin=0.85*inch,
    )

    styles = getSampleStyleSheet()

    # Custom styles
    styles.add(ParagraphStyle(
        'DocTitle', parent=styles['Title'],
        fontSize=22, textColor=DARK, spaceAfter=4,
        fontName='Helvetica-Bold',
    ))
    styles.add(ParagraphStyle(
        'Subtitle', parent=styles['Normal'],
        fontSize=11, textColor=GRAY, spaceAfter=4,
        fontName='Helvetica',
    ))
    styles.add(ParagraphStyle(
        'SectionHead', parent=styles['Heading1'],
        fontSize=16, textColor=DARK, spaceBefore=18, spaceAfter=8,
        fontName='Helvetica-Bold',
    ))
    styles.add(ParagraphStyle(
        'SubHead', parent=styles['Heading2'],
        fontSize=13, textColor=DARK, spaceBefore=14, spaceAfter=6,
        fontName='Helvetica-Bold',
    ))
    styles.add(ParagraphStyle(
        'StepHead', parent=styles['Heading3'],
        fontSize=11, textColor=ACCENT, spaceBefore=12, spaceAfter=4,
        fontName='Helvetica-Bold',
    ))
    styles.add(ParagraphStyle(
        'Body', parent=styles['Normal'],
        fontSize=9.5, textColor=DARK, leading=14, spaceAfter=6,
        fontName='Helvetica',
    ))
    styles.add(ParagraphStyle(
        'BodyBold', parent=styles['Normal'],
        fontSize=9.5, textColor=DARK, leading=14, spaceAfter=6,
        fontName='Helvetica-Bold',
    ))
    styles.add(ParagraphStyle(
        'BulletItem', parent=styles['Normal'],
        fontSize=9.5, textColor=DARK, leading=14, spaceAfter=3,
        leftIndent=18, bulletIndent=6, fontName='Helvetica',
    ))
    styles.add(ParagraphStyle(
        'CodeBlock', parent=styles['Code'],
        fontSize=8, leading=11, backColor=LIGHT_BG,
        leftIndent=12, rightIndent=12, spaceBefore=4, spaceAfter=8,
        fontName='Courier',
    ))
    styles.add(ParagraphStyle(
        'Footer', parent=styles['Normal'],
        fontSize=8, textColor=GRAY, alignment=TA_CENTER,
    ))
    styles.add(ParagraphStyle(
        'Callout', parent=styles['Normal'],
        fontSize=9.5, textColor=DARK, leading=14,
        fontName='Helvetica-Bold', backColor=HexColor("#eef7ff"),
        leftIndent=12, rightIndent=12, spaceBefore=4, spaceAfter=8,
        borderPadding=8,
    ))

    story = []

    # ---- TITLE PAGE ----
    story.append(Spacer(1, 1.5*inch))
    story.append(HRFlowable(width="100%", thickness=3, color=ACCENT))
    story.append(Spacer(1, 12))
    story.append(Paragraph("SOP: Branded Invoice + SOW<br/>+ Payment System", styles['DocTitle']))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Standard Operating Procedure for Next.js Agency Sites", styles['Subtitle']))
    story.append(Paragraph("Version 1.0 | June 2026 | XeedlyAI", styles['Subtitle']))
    story.append(Spacer(1, 18))
    story.append(HRFlowable(width="100%", thickness=3, color=ACCENT))
    story.append(Spacer(1, 36))

    story.append(Paragraph(
        "A single admin tool that lets you select a product tier, build a scope of work, "
        "generate a branded PDF invoice, and send it to a client via email with an embedded "
        "Stripe payment link. Payment constitutes acceptance of the SOW — no separate contract "
        "signing, no chasing signatures. One document, one payment, project starts.",
        styles['Body']
    ))
    story.append(Spacer(1, 12))
    story.append(Paragraph(
        "<b>The invoice IS the contract.</b> The terms section states: \"Payment constitutes "
        "acceptance of this scope of work.\" When the client pays, they've agreed to the scope.",
        styles['Body']
    ))

    story.append(PageBreak())

    # ---- SYSTEM ARCHITECTURE ----
    story.append(Paragraph("System Architecture", styles['SectionHead']))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT))
    story.append(Spacer(1, 8))

    arch_text = """Admin Portal (/admin/close)
  |
  v
5-Step Invoice Wizard
  |
  v
POST /api/admin/create-invoice
  |
  +--> Stripe: Create + finalize invoice (card payments)
  +--> PDF: Generate branded invoice with @react-pdf/renderer
  +--> Supabase Storage: Upload PDF (public URL)
  +--> Supabase DB: Save invoice record
  +--> Resend: Send branded email with PDF attached
  |
  v
Client receives email -> Opens PDF -> Clicks Pay -> Stripe hosted page"""
    story.append(Preformatted(arch_text, styles['CodeBlock']))

    # ---- PREREQUISITES ----
    story.append(Paragraph("Prerequisites", styles['SectionHead']))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Accounts Needed", styles['SubHead']))
    for item in [
        "<b>Stripe</b> (live mode) — payment processing",
        "<b>Supabase</b> — database + file storage",
        "<b>Resend</b> — transactional email with custom domain",
        "<b>Vercel</b> — hosting + serverless functions",
        "<b>Custom domain</b> with DNS access (for email sender verification)",
    ]:
        story.append(Paragraph(item, styles['BulletItem'], bulletText='•'))

    story.append(Paragraph("Tech Stack", styles['SubHead']))
    for item in [
        "Next.js 15+ (App Router)",
        "TypeScript + Tailwind CSS",
        "@react-pdf/renderer (PDF generation on serverless)",
        "Stripe Node SDK",
        "Supabase JS client",
    ]:
        story.append(Paragraph(item, styles['BulletItem'], bulletText='•'))

    story.append(PageBreak())

    # ---- PHASE 1 ----
    story.append(Paragraph("PHASE 1: Foundation", styles['SectionHead']))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Step 1 — Install Dependencies", styles['StepHead']))
    story.append(Preformatted("npm install @react-pdf/renderer stripe @supabase/supabase-js", styles['CodeBlock']))
    story.append(Paragraph("Note: @react-pdf/renderer v4.x is required for React 19 compatibility.", styles['Body']))

    story.append(Paragraph("Step 2 — Database Setup (Supabase)", styles['StepHead']))
    story.append(Paragraph("Run this SQL in your Supabase SQL Editor. Creates three tables (customers, deals, invoices) plus a public storage bucket for PDFs.", styles['Body']))

    sql_snippet = """CREATE TABLE IF NOT EXISTS customers ( ... );
CREATE TABLE IF NOT EXISTS deals ( ... );
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL,
  deal_id UUID REFERENCES deals(id),
  customer_id UUID REFERENCES customers(id),
  status TEXT DEFAULT 'sent',
  line_items JSONB NOT NULL,
  build_total INTEGER NOT NULL,
  service_monthly INTEGER NOT NULL,
  stripe_invoice_id TEXT,
  stripe_invoice_url TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Storage bucket for PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('invoices', 'invoices', true);"""
    story.append(Preformatted(sql_snippet, styles['CodeBlock']))
    story.append(Paragraph("Full SQL including all columns is in supabase/migrations/invoice_system.sql", styles['Body']))

    story.append(Paragraph("Step 3 — Environment Variables", styles['StepHead']))
    story.append(Paragraph("Set these in your Vercel project settings (NOT in .env files that get committed):", styles['Body']))

    env_data = [
        ["Variable", "Where to get it"],
        ["STRIPE_SECRET_KEY", "Stripe > Developers > API keys (sk_live_)"],
        ["STRIPE_PUBLISHABLE_KEY", "Same page (pk_live_)"],
        ["STRIPE_WEBHOOK_SECRET", "Stripe > Webhooks > endpoint > Signing secret"],
        ["RESEND_API_KEY", "Resend dashboard > API keys"],
        ["RESEND_FROM_EMAIL", "e.g., billing@yourdomain.com"],
        ["NEXT_PUBLIC_SUPABASE_URL", "Supabase project settings"],
        ["SUPABASE_SERVICE_ROLE_KEY", "Supabase > Settings > API"],
        ["VENMO_HANDLE", "Your Venmo username (e.g., @xeedly)"],
        ["VENMO_QR_URL", "URL to Venmo QR code image (optional)"],
        ["NEXT_PUBLIC_SITE_URL", "Your deployed URL"],
    ]
    env_table = Table(env_data, colWidths=[2.4*inch, 3.6*inch])
    env_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('FONTNAME', (0, 1), (0, -1), 'Courier'),
        ('ALIGN', (0, 0), (-1, 0), 'LEFT'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('TOPPADDING', (0, 0), (-1, 0), 8),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 5),
        ('TOPPADDING', (0, 1), (-1, -1), 5),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor("#e2e8f0")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(env_table)
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>CRITICAL: Never commit real API keys to git.</b> Use .env.local (gitignored) locally and Vercel env vars for production.", styles['Body']))

    story.append(PageBreak())

    # ---- PHASE 2 ----
    story.append(Paragraph("PHASE 2: Stripe Configuration", styles['SectionHead']))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Step 4 — Stripe Dashboard Settings", styles['StepHead']))
    for item in [
        "<b>Payment terms:</b> Settings > Billing > Invoices > set \"Due upon receipt\" — makes Stripe show \"Due Today\"",
        "<b>Payment methods:</b> Settings > Payment methods > enable Card. ACH is optional (2-week clearing).",
        "<b>Webhook:</b> Developers > Webhooks > Add endpoint > URL: https://yourdomain.com/api/webhooks/stripe > Events: invoice.paid, payment_intent.succeeded, checkout.session.completed",
        "<b>Branding:</b> Settings > Branding > upload logo and set colors for the hosted payment page",
    ]:
        story.append(Paragraph(item, styles['BulletItem'], bulletText='•'))

    story.append(Paragraph("Step 5 — Resend Domain Verification", styles['StepHead']))
    for item in [
        "Go to Resend > Domains > Add domain",
        "Add DNS records Resend provides (SPF, DKIM, DMARC)",
        "Verify the domain — now you can send FROM billing@yourdomain.com",
        "Set REPLY-TO to your personal email so client replies go to your inbox",
    ]:
        story.append(Paragraph(item, styles['BulletItem'], bulletText='•'))

    # ---- PHASE 3 ----
    story.append(Paragraph("PHASE 3: Code Implementation", styles['SectionHead']))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Step 6 — Stripe Helper Functions", styles['StepHead']))
    story.append(Paragraph("Add to src/lib/stripe.ts: getOrCreateStripeCustomer() and createStripeInvoiceWithSOW(). Key settings:", styles['Body']))
    story.append(Preformatted(
        'collection_method: "send_invoice"  // Don\'t auto-charge\n'
        'days_until_due: 0                  // Due upon receipt\n'
        'payment_method_types: ["card"]     // Card only',
        styles['CodeBlock']
    ))
    story.append(Paragraph("Finalize the invoice but do NOT send it via Stripe — we send our own branded email.", styles['Body']))

    story.append(Paragraph("Step 7 — PDF Invoice Generator", styles['StepHead']))
    story.append(Paragraph("Create src/lib/invoice-pdf.tsx using @react-pdf/renderer. Use fontsource CDN for fonts (NOT Google Fonts — variable TTFs crash fontkit).", styles['Body']))
    story.append(Paragraph("PDF sections: Header with logo > Invoice metadata > Billing block > Comparable value banner > Build deliverables table > Total due now (build only) > Monthly service note > Service deliverables checklist > Payment options > Terms > Partnership statement > Footer", styles['Body']))
    story.append(Paragraph("<b>Key rule:</b> TOTAL only includes build items. Service items are shown as included scope.", styles['BodyBold']))

    story.append(Paragraph("Step 8 — Email Template", styles['StepHead']))
    story.append(Paragraph("Create src/lib/email-templates/invoice-email.ts. Branded HTML with logo, \"Pay Invoice Online\" CTA button, \"Pay with Venmo\" secondary CTA, PDF attached via Resend API.", styles['Body']))
    story.append(Paragraph("FROM: billing@yourdomain.com | REPLY-TO: your personal email (threads to your inbox)", styles['Body']))

    story.append(Paragraph("Step 9 — Invoice API Route", styles['StepHead']))
    story.append(Paragraph("Create /api/admin/create-invoice/route.ts — the orchestrator:", styles['Body']))
    for i, item in enumerate([
        "Generate invoice number (INV-YYYY-NNN, sequential)",
        "Upsert customer in Supabase + Stripe",
        "Create deal record in Supabase",
        "Create Stripe invoice (build items only, finalized not sent)",
        "Generate branded PDF with Stripe payment URL embedded",
        "Upload PDF to Supabase Storage (public bucket)",
        "Save invoice record to database",
        "Send branded email with PDF attached via Resend",
    ], 1):
        story.append(Paragraph(f"{i}. {item}", styles['BulletItem']))

    story.append(Paragraph("Step 10 — Admin Close Flow UI", styles['StepHead']))
    story.append(Paragraph("Build a 5-step wizard at /admin/close:", styles['Body']))
    for i, item in enumerate([
        "Build Tier Selection + \"Full Service Included\" toggle",
        "Service Tier Selection (Foundation / Growth / Authority monthly pricing)",
        "Customer Info form (name, email, phone, company, notes)",
        "SOW Builder (editable line items, terms, comparable value statement)",
        "Invoice Preview + \"Send Invoice\" button",
    ], 1):
        story.append(Paragraph(f"{i}. {item}", styles['BulletItem']))

    story.append(PageBreak())

    # ---- PHASE 4 ----
    story.append(Paragraph("PHASE 4: Go Live", styles['SectionHead']))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Step 11 — Testing", styles['StepHead']))
    for item in [
        "Send a test invoice to yourself",
        "Verify PDF renders correctly (logo, fonts, layout, no $0.00 on included items)",
        "Click Stripe payment link — confirm live mode (no \"Test Mode\" banner)",
        "Check Venmo link opens correctly",
        "Verify email has PDF attached and reply-to threads correctly",
        "Void test invoices in Stripe dashboard after testing",
    ]:
        story.append(Paragraph(item, styles['BulletItem'], bulletText='•'))

    story.append(Paragraph("Step 12 — Stripe Live Mode Verification", styles['StepHead']))
    for item in [
        "Invoice URL should contain /live_ not /test_",
        "No \"TEST MODE\" badge on the payment page",
        "If you see test mode: check STRIPE_SECRET_KEY in Vercel starts with sk_live_",
        "Redeploy after changing any env vars",
    ]:
        story.append(Paragraph(item, styles['BulletItem'], bulletText='•'))

    # ---- DAILY OPS ----
    story.append(Paragraph("Daily Operations", styles['SectionHead']))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Sending an Invoice", styles['SubHead']))
    for i, item in enumerate([
        "Go to /admin/close",
        "Select build tier + toggle full service",
        "Select service tier",
        "Enter customer info",
        "Review/edit the SOW",
        "Preview the invoice",
        "Click \"Send Invoice\"",
        "Client receives branded email with PDF + payment link",
    ], 1):
        story.append(Paragraph(f"{i}. {item}", styles['BulletItem']))

    story.append(Paragraph("When Client Pays", styles['SubHead']))
    for item in [
        "Stripe webhook fires invoice.paid",
        "Deal status updates automatically",
        "Build timer starts",
        "Monthly service begins 30 days from payment date",
    ]:
        story.append(Paragraph(item, styles['BulletItem'], bulletText='•'))

    story.append(PageBreak())

    # ---- TROUBLESHOOTING ----
    story.append(Paragraph("Troubleshooting", styles['SectionHead']))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT))
    story.append(Spacer(1, 8))

    trouble_data = [
        ["Problem", "Solution"],
        ["\"Test Mode\" on Stripe page", "STRIPE_SECRET_KEY is sk_test_. Replace with sk_live_ and redeploy"],
        ["\"Could not resolve font\"", "Don't use fontStyle italic without registering italic font file"],
        ["\"Offset outside DataView\"", "Font URL serves variable TTF. Switch to fontsource CDN"],
        ["Font 404 errors", "Google Fonts changes URLs. Use fontsource CDN instead"],
        ["Email not sending", "Check RESEND_API_KEY is set. Verify domain in Resend"],
        ["PDF not uploading", "Create Supabase Storage bucket 'invoices' with public access"],
        ["\"Due tomorrow\" not \"Due today\"", "Stripe > Billing > Invoices > Payment terms > Due upon receipt"],
        ["Bank details on invoice", "Never put YOUR bank info on invoices. Stripe handles ACH securely"],
        ["Live keys in git", "Roll the key in Stripe immediately. Use .env.local (gitignored) only"],
    ]
    trouble_table = Table(trouble_data, colWidths=[2.2*inch, 3.8*inch])
    trouble_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor("#e2e8f0")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(trouble_table)

    # ---- SECURITY ----
    story.append(Spacer(1, 18))
    story.append(Paragraph("Security Checklist", styles['SectionHead']))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT))
    story.append(Spacer(1, 8))
    for item in [
        ".env.local is in .gitignore",
        ".env.local.example contains only placeholder values, never real keys",
        "Stripe key in Vercel starts with sk_live_",
        "No bank account numbers appear anywhere in invoice PDFs or emails",
        "Admin routes are protected by auth middleware",
        "Webhook endpoint validates Stripe signature",
        "Supabase uses service role key (server-side only, never exposed to client)",
        "REPLY-TO is set so client replies go to your inbox",
    ]:
        story.append(Paragraph(item, styles['BulletItem'], bulletText='☐'))

    # ---- COST ----
    story.append(Spacer(1, 12))
    story.append(Paragraph("Cost of Operation", styles['SectionHead']))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT))
    story.append(Spacer(1, 8))
    cost_data = [
        ["Service", "Cost"],
        ["Stripe", "2.9% + 30c per card transaction"],
        ["Resend", "Free up to 3,000 emails/month, then $20/mo"],
        ["Supabase", "Free tier covers most agencies, Pro at $25/mo"],
        ["Vercel", "Free tier for hobby, Pro at $20/mo"],
        ["@react-pdf/renderer", "Free (open source)"],
    ]
    cost_table = Table(cost_data, colWidths=[2.4*inch, 3.6*inch])
    cost_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor("#e2e8f0")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(cost_table)
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Total fixed cost to operate:</b> $0-65/month depending on tier selections.", styles['Body']))

    # ---- FOOTER ----
    story.append(Spacer(1, 36))
    story.append(HRFlowable(width="100%", thickness=2, color=ACCENT))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Built by XeedlyAI. This system is production-tested and powers real client invoicing at xeedly.com.",
        styles['Footer']
    ))

    doc.build(story)
    print(f"PDF generated: {output_path}")

if __name__ == "__main__":
    build_pdf()
