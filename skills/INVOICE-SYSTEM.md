# INVOICE-SYSTEM.md — Branded Invoice + SOW + Payment System

## Overview
A complete admin invoicing system for Next.js sites that combines scope-of-work contracting with payment collection. Payment constitutes acceptance of the SOW — no separate contract signing needed. Invoices are branded PDFs with embedded Stripe payment links and optional Venmo, sent via domain email with reply-to threading.

## Architecture

### System Components
1. **Admin Close Flow** (`/admin/close`) — multi-step wizard for building invoices
2. **PDF Generator** (`src/lib/invoice-pdf.tsx`) — branded PDF via @react-pdf/renderer
3. **Invoice API** (`/api/admin/create-invoice`) — orchestrator: Stripe + PDF + Storage + Email
4. **Stripe Invoice** (`src/lib/stripe.ts`) — finalized but NOT sent via Stripe (we send via Resend)
5. **Email Template** (`src/lib/email-templates/invoice-email.ts`) — branded HTML with PDF attachment
6. **Database** — Supabase `invoices` table + `invoices` storage bucket for PDFs

### Data Flow
```
Admin fills wizard → POST /api/admin/create-invoice →
  1. Upsert customer (Supabase + Stripe)
  2. Create deal record (Supabase)
  3. Create Stripe Invoice (finalized, card-only, not sent via Stripe)
  4. Generate branded PDF with Stripe payment URL embedded
  5. Upload PDF to Supabase Storage (public bucket)
  6. Save invoice record to DB
  7. Send branded email via Resend with PDF attached
  8. Return { invoice_number, pdf_url, stripe_invoice_url }
```

## Admin Close Flow — 5 Steps

### Step 1: Build Tier Selection
- Product cards with name, price, accent color
- Variable-price products show input field with min/max range
- **"Full Service Included" toggle** (ON by default) — when ON, SOW includes complete deliverable list regardless of tier price
- Note below toggle: "Promo pricing includes our complete service stack."

### Step 2: Service Tier Selection
- Foundation / Growth / Authority cards with monthly price
- Note: "Monthly service begins 30 days from build payment date. 6-month minimum, then month-to-month."

### Step 3: Customer Info
- Name (required), Email (required), Phone (recommended), Company, Internal Notes

### Step 4: Scope of Work Builder
- Auto-populated based on selections (full service toggle drives content)
- **Build Deliverables** section — editable line items with description, qty, unit price
- **Ongoing Service Deliverables** section — editable checklist items
- Comparable value statement (editable, e.g., "Comparable to $3,500/mo elsewhere")
- Terms & conditions (auto-populated, editable)
- Add/remove custom line items per section

### Step 5: Invoice Preview + Send
- Full HTML preview matching PDF layout
- "Edit SOW" (back to step 4) and "Send Invoice" buttons
- Success state shows: invoice number, email delivery status, PDF link, Stripe link

## PDF Invoice Layout

### Structure (portrait, letter)
1. **Header** — Logo image + "INVOICE" + invoice number + date + due label
2. **Blue horizontal rule** (2px, accent color)
3. **Billing block** — two columns: FROM (business) / BILL TO (client)
4. **Comparable value banner** — light accent background, centered (optional)
5. **Build deliverables table** — Description / Qty / Unit / Amount columns
6. **Build total + "TOTAL DUE NOW"** row
7. **Monthly service note** — separate line with /mo amount
8. **Service deliverables checklist** — checkmarks, no pricing (included scope)
9. **Payment options** — Pay Online (Stripe link) + Venmo (QR code + link)
10. **Terms & Conditions**
11. **Partnership statement** — centered, brand voice
12. **Footer** — "Thank you for your business" + contact info + accent rule

### Key Design Rules
- Fonts: Inter (body) + JetBrains Mono (labels, numbers) via fontsource CDN
- Use fontsource CDN (`cdn.jsdelivr.net/fontsource/fonts/...`) — Google Fonts variable TTFs break @react-pdf/renderer's fontkit parser
- Logo via URL (absolute path to deployed site asset)
- Zero-amount line items show blank, not "$0.00"
- Build items are priced; service items are listed as included scope
- TOTAL only includes build amount — service is shown separately as future monthly

## Stripe Integration

### Invoice Creation
```typescript
createStripeInvoiceWithSOW(customerId, lineItems, memo, dueDate?)
```
- `collection_method: "send_invoice"`
- `days_until_due: 0` (due upon receipt)
- `payment_method_types: ["card"]` (add `"us_bank_account"` for ACH when ready)
- Finalize invoice but do NOT send via Stripe — we send our own branded email
- Only build line items with amount > 0 go to Stripe (service items are informational)

### Stripe Dashboard Setup
- Settings → Billing → Invoices → Payment terms → "Due upon receipt"
- Settings → Payment methods → Card enabled (ACH optional, adds 2-week clearing)
- Developers → Webhooks → endpoint to `/api/webhooks/stripe` for payment status updates
- Developers → API keys → use `sk_live_` key (NOT `sk_test_`)

## Email System

### Configuration
- FROM: `"YourBrand <billing@yourdomain.com>"`
- REPLY-TO: personal email (threads replies to founder's inbox)
- Attachment: branded PDF as `invoice-INV-YYYY-NNN.pdf`

### Email Structure
1. Logo image header (dark background, accent strip)
2. Personal greeting
3. Comparable value callout (optional)
4. **"Pay Invoice Online →"** primary CTA button → Stripe hosted invoice URL
5. **"Pay with Venmo →"** secondary CTA → Venmo profile link
6. SOW reference + monthly service note
7. Partnership line + signature

## Database Schema

### invoices table
```sql
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL,    -- INV-YYYY-NNN format
  deal_id UUID REFERENCES deals(id),
  customer_id UUID REFERENCES customers(id),
  status TEXT DEFAULT 'sent',             -- draft, sent, paid, void, overdue
  build_tier TEXT,
  service_tier TEXT,
  full_service_included BOOLEAN DEFAULT true,
  line_items JSONB NOT NULL,
  build_total INTEGER NOT NULL,           -- cents
  service_monthly INTEGER NOT NULL,       -- cents
  comparable_value TEXT,
  terms TEXT,
  stripe_invoice_id TEXT,
  stripe_invoice_url TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Supabase Storage
- Bucket: `invoices` (public read)
- Path: `INV-YYYY-NNN.pdf`

## Environment Variables

### Required
| Variable | Purpose |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe live secret key (`sk_live_...`) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe live publishable key (`pk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |
| `RESEND_API_KEY` | Resend email API key |
| `RESEND_FROM_EMAIL` | Sender address (e.g., `billing@yourdomain.com`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |

### Optional
| Variable | Purpose |
|---|---|
| `VENMO_HANDLE` | Venmo handle for PDF/email (e.g., `@xeedly`) |
| `VENMO_QR_URL` | URL to Venmo QR code image for PDF embedding |
| `XEEDLYAI_ADDRESS` | Business street address for PDF |
| `XEEDLYAI_CITY_STATE_ZIP` | City/State/ZIP for PDF |

## Dependencies
- `@react-pdf/renderer` ^4.x — PDF generation (Vercel serverless compatible)
- `stripe` — Stripe Node SDK
- `@supabase/supabase-js` — Supabase client
- Resend — email delivery (via REST API, no SDK needed)

## Implementation Order
1. Install `@react-pdf/renderer`
2. Create Supabase migration (invoices table + storage bucket)
3. Add env vars to Vercel
4. Add `createStripeInvoiceWithSOW` to stripe.ts
5. Create PDF generator (`src/lib/invoice-pdf.tsx`)
6. Create email template (`src/lib/email-templates/invoice-email.ts`)
7. Create API route (`/api/admin/create-invoice`)
8. Build admin close flow UI (5-step wizard)
9. Configure Stripe dashboard (payment terms, webhook, live keys)
10. Test with self-send, void test invoices in Stripe

## Gotchas & Lessons Learned
- **fontsource CDN, not Google Fonts** — Google Fonts serves variable TTFs that crash @react-pdf/renderer's fontkit. Use `cdn.jsdelivr.net/fontsource/fonts/` for static instances.
- **No fontStyle italic** unless you register an italic font file. @react-pdf/renderer throws "Could not resolve font" otherwise.
- **Stripe test vs live** — `sk_test_` keys create test invoices permanently. Always verify which key Vercel is using. The `.env.local` file is local-only; Vercel uses its own env vars.
- **Never expose bank details on invoices** — Stripe's hosted invoice page handles ACH securely. Clients enter THEIR bank info there, not yours.
- **Build total only** — service items are future monthly charges. They appear on the SOW as scope but are NOT added to the payable total.
- **Stripe "Due upon receipt"** — set in Stripe Dashboard → Settings → Billing → Invoices → Payment terms. Without this, Stripe shows "Due tomorrow" regardless of API settings.
- **Payment = contract acceptance** — the terms section states "Payment constitutes acceptance of this scope of work." No separate signing flow needed.
- **PDF invoice is the SOW** — one document serves as both invoice and contract. The client pays from the same document they review scope on.
