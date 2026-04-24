-- XeedlyAI Payment System — Supabase schema
-- Run this in Supabase SQL Editor (Project → SQL Editor → New query).
-- All access happens through server-side API routes using the service role key,
-- so RLS is enabled but no USING policies are defined. The service role bypasses RLS.

-- Customers -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_customer_id text UNIQUE,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  company text,
  phone text,
  industry text,
  notes text,
  source text DEFAULT 'manual', -- 'booking' | 'contact_form' | 'manual' | 'deal_closer'
  booking_id text,              -- reference to the booking that created this customer
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Deals -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,

  deal_type text NOT NULL CHECK (deal_type IN (
    'growth_starter', 'growth_growth', 'growth_scale',
    'digital_foundation',
    'operational_systems',
    'intelligence_platform',
    'propertydocz_setup', 'propertyjobz_setup', 'property_combined'
  )),

  -- Amounts in CENTS. $2,500 = 250000.
  total_amount integer,
  upfront_amount integer,
  golive_amount integer,
  monthly_amount integer,

  status text NOT NULL DEFAULT 'closed' CHECK (status IN (
    'closed',
    'upfront_paid',
    'in_progress',
    'golive_invoiced',
    'golive_paid',
    'subscription_active',
    'subscription_paused',
    'completed',
    'cancelled'
  )),

  -- Stripe references
  stripe_checkout_session_id text,
  stripe_upfront_invoice_id text,
  stripe_golive_invoice_id text,
  stripe_subscription_id text,
  stripe_subscription_schedule_id text,

  -- Scheduling
  golive_scheduled_date timestamptz,
  maintenance_start_date timestamptz,

  -- Go-live reminder tracking (3, 7, 14 days after invoice sent)
  golive_reminder_3_sent boolean DEFAULT false,
  golive_reminder_7_sent boolean DEFAULT false,
  golive_reminder_14_sent boolean DEFAULT false,

  notes text,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payment events log ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS payment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid REFERENCES deals(id) ON DELETE SET NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  stripe_event_id text UNIQUE,
  payload jsonb,
  created_at timestamptz DEFAULT now()
);

-- Indexes ---------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_customer ON deals(customer_id);
CREATE INDEX IF NOT EXISTS idx_deals_type ON deals(deal_type);
CREATE INDEX IF NOT EXISTS idx_deals_golive_scheduled ON deals(golive_scheduled_date)
  WHERE golive_scheduled_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_deals_maintenance_start ON deals(maintenance_start_date)
  WHERE maintenance_start_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_payment_events_deal ON payment_events(deal_id);

-- RLS (service role bypasses all policies) -----------------------------------
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;
