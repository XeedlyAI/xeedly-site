import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/** Shared cookie name + max-age for the admin session. */
export const ADMIN_COOKIE = "xeedly_admin";
export const ADMIN_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

/** True when the ADMIN_EMAILS env var lists this email (case-insensitive). */
export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const admins = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(email.toLowerCase());
}

/** Server-side check for protected pages (App Router layouts / server components). */
export async function hasAdminCookie(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === "1";
}

/**
 * Verify the PIN against ADMIN_PIN. Constant-time-ish comparison to avoid
 * trivial timing attacks on the short admin PIN.
 */
export function verifyAdminPin(input: string): boolean {
  const expected = process.env.ADMIN_PIN || "";
  if (!expected || !input) return false;
  if (expected.length !== input.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ input.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Gate an API route. Returns NextResponse on rejection (401), or null on pass.
 * Accepts either the admin cookie OR an `X-Admin-Pin` header (useful for curl).
 */
export async function requireAdmin(
  request: NextRequest,
): Promise<NextResponse | null> {
  const cookieValid = request.cookies.get(ADMIN_COOKIE)?.value === "1";
  if (cookieValid) return null;

  const headerPin = request.headers.get("x-admin-pin");
  if (headerPin && verifyAdminPin(headerPin)) return null;

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
