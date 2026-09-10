# Supabase migrations

These SQL files are meant to be run **manually** in the Supabase SQL Editor
(Project → SQL Editor → New query). We don't use the Supabase CLI on this
project — migrations are tracked in git for reference.

## Current migrations

- [`payment_system.sql`](./payment_system.sql) — customers, deals,
  payment_events tables used by the admin deal-closer + Stripe webhook
  pipeline. Idempotent (`CREATE TABLE IF NOT EXISTS`); safe to re-run.

## How to apply

1. Open the Supabase dashboard for the XeedlyAI project.
2. SQL Editor → New query.
3. Paste the contents of the migration and hit **Run**.
4. Confirm the tables appear under Table Editor → `public`.
