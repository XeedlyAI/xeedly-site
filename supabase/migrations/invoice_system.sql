-- XeedlyAI Invoice System — Supabase migration
-- Run this in Supabase SQL Editor (Project → SQL Editor → New query).
-- Depends on: payment_system.sql (customers, deals tables must exist).

-- Invoices ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL,
  deal_id UUID REFERENCES deals(id),
  customer_id UUID REFERENCES customers(id),
  status TEXT DEFAULT 'sent' CHECK (status IN (
    'draft', 'sent', 'paid', 'void', 'overdue'
  )),
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

-- Indexes -------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_invoices_deal ON invoices(deal_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_number ON invoices(invoice_number);

-- RLS (service role bypasses) -----------------------------------------------
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Storage bucket (run via Supabase dashboard or SQL):
-- INSERT INTO storage.buckets (id, name, public) VALUES ('invoices', 'invoices', true)
-- ON CONFLICT DO NOTHING;

-- ---------------------------------------------------------------------------
-- Migration: Add platform deal types to deals CHECK constraint
-- ---------------------------------------------------------------------------
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_deal_type_check;
ALTER TABLE deals ADD CONSTRAINT deals_deal_type_check
  CHECK (deal_type IN (
    'growth_maintain', 'growth_get_found', 'growth_get_chosen',
    'digital_foundation',
    'operational_systems',
    'intelligence_platform',
    'propertydocz_setup', 'propertyjobz_setup', 'property_combined',
    'vendor_build_495', 'vendor_build_995', 'vendor_build_1495',
    'vendor_buildonly_495', 'vendor_buildonly_995', 'vendor_buildonly_1495',
    'platform_build', 'website_platform_combo'
  ));
