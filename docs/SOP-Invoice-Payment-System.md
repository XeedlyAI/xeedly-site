# SOP: Branded Invoice + SOW + Payment System

**Standard Operating Procedure for Next.js Agency Sites**
Version 1.0 | June 2026 | XeedlyAI

---

## What This System Does

A single admin tool that lets you select a product tier, build a scope of work, generate a branded PDF invoice, and send it to a client via email with an embedded Stripe payment link. Payment constitutes acceptance of the SOW — no separate contract signing, no chasing signatures. One document, one payment, project starts.

**The invoice IS the contract.** The terms section states: "Payment constitutes acceptance of this scope of work." When the client pays, they've agreed to the scope.

---

## System Architecture

```
Admin Portal (/admin/close)
    |
    v
5-Step Invoice Wizard
    |
    v
POST /api/admin/create-invoice
    |
    +---> Stripe: Create + finalize invoice (card payments)
    +---> PDF: Generate branded invoice with @react-pdf/renderer
    +---> Supabase Storage: Upload PDF (public URL)
    +---> Supabase DB: Save invoice record
    +---> Resend: Send branded email with PDF attached
    |
    v
Client receives email -> Opens PDF -> Clicks "Pay Invoice" -> Stripe hosted page
```

---

## Prerequisites

### Accounts Needed
- **Stripe** (live mode) — payment processing
- **Supabase** — database + file storage
- **Resend** — transactional email with custom domain
- **Vercel** — hosting + serverless functions
- **Custom domain** with DNS access (for email sender verification)

### Tech Stack
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- @react-pdf/renderer (PDF generation on serverless)
- Stripe Node SDK
- Supabase JS client

---

## Step-by-Step Setup

### PHASE 1: Foundation

#### Step 1 — Install Dependencies
```bash
npm install @react-pdf/renderer stripe @supabase/supabase-js
```
Note: @react-pdf/renderer v4.x is required for React 19 compatibility.

#### Step 2 — Database Setup (Supabase)

Run this SQL in your Supabase SQL Editor:

```sql
-- Customers table (if not already created)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_customer_id TEXT UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  phone TEXT,
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Deals table (tracks the sales pipeline)
CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  deal_type TEXT NOT NULL,
  total_amount INTEGER,       -- cents
  upfront_amount INTEGER,     -- cents
  monthly_amount INTEGER,     -- cents
  status TEXT DEFAULT 'closed',
  stripe_upfront_invoice_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL,
  deal_id UUID REFERENCES deals(id),
  customer_id UUID REFERENCES customers(id),
  status TEXT DEFAULT 'sent',
  build_tier TEXT,
  service_tier TEXT,
  full_service_included BOOLEAN DEFAULT true,
  line_items JSONB NOT NULL,
  build_total INTEGER NOT NULL,
  service_monthly INTEGER NOT NULL,
  comparable_value TEXT,
  terms TEXT,
  stripe_invoice_id TEXT,
  stripe_invoice_url TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (service role bypasses)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Storage bucket for PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('invoices', 'invoices', true)
ON CONFLICT DO NOTHING;
```

#### Step 3 — Environment Variables

Set these in your Vercel project settings (NOT in .env files that get committed):

| Variable | Where to get it |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe Dashboard > Developers > API keys (must be `sk_live_`) |
| `STRIPE_PUBLISHABLE_KEY` | Same page (`pk_live_`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe > Developers > Webhooks > your endpoint > Signing secret |
| `RESEND_API_KEY` | Resend dashboard > API keys |
| `RESEND_FROM_EMAIL` | e.g., `billing@yourdomain.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings > API |
| `VENMO_HANDLE` | Your Venmo username (e.g., `@xeedly`) |
| `VENMO_QR_URL` | URL to your Venmo QR code image (optional) |
| `XEEDLYAI_ADDRESS` | Business address for PDF |
| `XEEDLYAI_CITY_STATE_ZIP` | City, State ZIP for PDF |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL (e.g., `https://yourdomain.com`) |

**CRITICAL: Never commit real API keys to git.** Use a `.env.local` file locally (gitignored) and Vercel env vars for production. The `.env.local.example` file in the repo should only contain placeholder values.

---

### PHASE 2: Stripe Configuration

#### Step 4 — Stripe Dashboard Settings

1. **Payment terms:** Settings > Billing > Invoices > set "Due upon receipt"
   - This makes Stripe show "Due Today" instead of "Due Tomorrow"

2. **Payment methods:** Settings > Payment methods > enable Card
   - ACH (US bank account) is optional — adds 2-week clearing time
   - Enable only when you're comfortable with the wait

3. **Webhook:** Developers > Webhooks > Add endpoint
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events to listen for: `invoice.paid`, `payment_intent.succeeded`, `checkout.session.completed`
   - Copy the signing secret to your `STRIPE_WEBHOOK_SECRET` env var

4. **Branding:** Settings > Branding > upload your logo and set colors
   - This brands the Stripe hosted payment page your clients see

#### Step 5 — Resend Domain Verification

1. Go to Resend > Domains > Add domain
2. Add your domain (e.g., `yourdomain.com`)
3. Add the DNS records Resend provides (SPF, DKIM, DMARC)
4. Verify the domain
5. Now you can send FROM `billing@yourdomain.com`
6. Set REPLY-TO to your personal email so client replies go to your inbox

---

### PHASE 3: Code Implementation

#### Step 6 — Stripe Helper Functions

Add to `src/lib/stripe.ts`:
- `getOrCreateStripeCustomer(email, name)` — finds or creates Stripe customer
- `createStripeInvoiceWithSOW(customerId, lineItems, memo)` — creates finalized invoice

Key settings for the invoice:
```typescript
collection_method: "send_invoice"  // Don't auto-charge
days_until_due: 0                  // Due upon receipt
payment_method_types: ["card"]     // Card only (add "us_bank_account" for ACH)
```

**Important:** Finalize the invoice but do NOT send it via Stripe. We send our own branded email via Resend.

#### Step 7 — PDF Invoice Generator

Create `src/lib/invoice-pdf.tsx` using `@react-pdf/renderer`.

**Font registration — use fontsource CDN:**
```typescript
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf", fontWeight: 400 },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf", fontWeight: 700 },
  ],
});
```

DO NOT use Google Fonts gstatic URLs — they serve variable font TTFs that crash @react-pdf/renderer's fontkit parser.

DO NOT use `fontStyle: "italic"` unless you register an italic font file.

**PDF sections:**
1. Header with logo image (use absolute URL to deployed asset)
2. Invoice metadata (number, date, due label)
3. Billing block (from/to)
4. Comparable value banner (optional)
5. Build deliverables table (priced line items)
6. Total due now (build only)
7. Monthly service note (separate, not added to total)
8. Service deliverables checklist (included scope, no pricing)
9. Payment options (Stripe link + Venmo)
10. Terms & conditions
11. Partnership statement
12. Footer

**Key rule:** The TOTAL only includes build items. Service items are shown as included scope for the monthly fee that starts later.

#### Step 8 — Email Template

Create `src/lib/email-templates/invoice-email.ts`.

Structure:
- FROM: `"YourBrand <billing@yourdomain.com>"`
- REPLY-TO: your personal email (replies thread to your inbox)
- Branded HTML with logo image
- Primary CTA: "Pay Invoice Online" button linking to Stripe hosted invoice
- Secondary CTA: "Pay with Venmo" button linking to Venmo profile
- PDF attached as `invoice-INV-YYYY-NNN.pdf`

Send via Resend REST API with attachments (base64-encoded PDF buffer).

#### Step 9 — Invoice API Route

Create `/api/admin/create-invoice/route.ts`.

This is the orchestrator that:
1. Generates invoice number (INV-YYYY-NNN, sequential)
2. Upserts customer in Supabase + Stripe
3. Creates deal record
4. Creates Stripe invoice (build items only, finalized not sent)
5. Generates PDF with all data + Stripe payment URL
6. Uploads PDF to Supabase Storage
7. Saves invoice record to database
8. Sends branded email with PDF attached
9. Returns results to the admin UI

#### Step 10 — Admin Close Flow UI

Build a 5-step wizard at `/admin/close`:
1. Build Tier Selection + Full Service toggle
2. Service Tier Selection (monthly pricing)
3. Customer Info form
4. SOW Builder (editable line items, terms, comparable value)
5. Invoice Preview + Send button

The preview should visually match the PDF layout so the admin sees exactly what the client will receive.

---

### PHASE 4: Go Live

#### Step 11 — Testing

1. Send a test invoice to yourself
2. Verify the PDF renders correctly (logo, fonts, layout)
3. Click the Stripe payment link — confirm it's live mode (no "Test Mode" banner)
4. Check the Venmo link works
5. Verify the email has the PDF attached and reply-to threads correctly
6. Void test invoices in Stripe dashboard after testing

#### Step 12 — Stripe Live Mode Verification

- URL should contain `/live_` not `/test_`
- No "TEST MODE" badge on the payment page
- If you see test mode: check `STRIPE_SECRET_KEY` in Vercel starts with `sk_live_`
- Redeploy after changing env vars

---

## Daily Operations

### Sending an Invoice
1. Go to `/admin/close`
2. Select build tier + toggle full service
3. Select service tier
4. Enter customer info
5. Review/edit the SOW
6. Preview the invoice
7. Click "Send Invoice"
8. Client receives branded email with PDF + payment link

### When Client Pays
- Stripe webhook fires `invoice.paid`
- Deal status updates automatically
- Build timer starts
- Monthly service begins 30 days from payment date

### Voiding an Invoice
- Go to Stripe Dashboard > Invoices > find the invoice > Void
- This cancels the payment link without deleting the record

---

## Troubleshooting

| Problem | Solution |
|---|---|
| "Test Mode" on Stripe payment page | `STRIPE_SECRET_KEY` in Vercel is `sk_test_`. Replace with `sk_live_` and redeploy |
| "Could not resolve font" error | Don't use `fontStyle: "italic"` without registering italic font file |
| "Offset is outside the bounds of the DataView" | Font URL serves variable TTF. Switch to fontsource CDN |
| Font 404 errors | Google Fonts changes URLs between versions. Use fontsource CDN instead |
| Email not sending | Check `RESEND_API_KEY` is set. Verify domain in Resend dashboard |
| PDF not uploading | Create Supabase Storage bucket named `invoices` with public access |
| "Due tomorrow" instead of "Due today" | Set Stripe Dashboard > Billing > Invoices > Payment terms > "Due upon receipt" |
| Bank details visible on invoice | Never put YOUR bank info on invoices. Stripe handles ACH securely through their hosted page |
| Live keys in git | Immediately roll the key in Stripe. Only use `.env.local` (gitignored) locally, Vercel env vars in production |

---

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.local.example` contains only placeholder values, never real keys
- [ ] Stripe key in Vercel starts with `sk_live_`
- [ ] No bank account numbers appear anywhere in invoice PDFs or emails
- [ ] Admin routes are protected by auth middleware
- [ ] Webhook endpoint validates Stripe signature
- [ ] Supabase uses service role key (server-side only, never exposed to client)
- [ ] REPLY-TO is set so client replies go to your inbox, not a no-reply address

---

## Cost of Operation

| Service | Cost |
|---|---|
| Stripe | 2.9% + 30c per card transaction |
| Resend | Free up to 3,000 emails/month, then $20/month |
| Supabase | Free tier covers most agencies, Pro at $25/month |
| Vercel | Free tier for hobby, Pro at $20/month |
| @react-pdf/renderer | Free (open source) |

**Total fixed cost to operate:** $0-65/month depending on tier selections.

---

*Built by XeedlyAI. This system is production-tested and powers real client invoicing at xeedly.com.*
