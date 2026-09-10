import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase admin client (service role, bypasses RLS).
 * Lazy-instantiated so `next build` doesn't require env vars to be present.
 * Use only from server-side API routes.
 */
let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  _client = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}

/** Proxy for ergonomic use: `supabaseAdmin.from('deals').select(...)` */
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    // @ts-expect-error — forwards to the lazy instance
    return getSupabaseAdmin()[prop];
  },
});
