import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * OAuth callback. Logs the refresh_token to the server console and renders
 * it on a temporary page so Shad can copy it into Vercel env vars.
 * After GOOGLE_REFRESH_TOKEN is stored, remove or protect these routes.
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "No auth code" }, { status: 400 });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Google OAuth env not fully configured" },
      { status: 503 },
    );
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokenRes.ok) {
    return NextResponse.json(
      { error: tokens.error_description || tokens.error || "token exchange failed" },
      { status: 400 },
    );
  }

  // Log for Vercel logs (never includes the token in response to search engines).
  // eslint-disable-next-line no-console
  console.log("=== GOOGLE REFRESH TOKEN ===");
  // eslint-disable-next-line no-console
  console.log(tokens.refresh_token);
  // eslint-disable-next-line no-console
  console.log("=== SAVE THIS TO VERCEL ENV VARS ===");

  const refreshToken: string = tokens.refresh_token || "(no refresh_token returned — revoke and retry with prompt=consent)";
  const escapedToken = refreshToken.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&#39;", '"': "&quot;" })[c] || c,
  );

  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head>
<meta name="robots" content="noindex, nofollow">
<meta charset="utf-8">
<title>Google Calendar Connected</title>
<style>
  body { font-family: ui-monospace, monospace; background:#0f172a; color:#f1f5f9; padding:3rem; max-width:780px; margin:0 auto; line-height:1.6; }
  h1 { color:#38b6ff; font-size:20px; }
  code { display:block; padding:1rem; background:rgba(255,255,255,0.04); border:1px solid rgba(56,182,255,0.3); border-radius:8px; word-break:break-all; font-size:13px; margin:1rem 0; }
  p { color:#94a3b8; font-size:14px; }
  ol { color:#cbd5e1; }
</style>
</head>
<body>
  <h1>✓ Google Calendar connected</h1>
  <p>Copy the refresh token below. It has also been logged to the server console.</p>
  <code>${escapedToken}</code>
  <ol>
    <li>Open Vercel → Project Settings → Environment Variables.</li>
    <li>Add <b>GOOGLE_REFRESH_TOKEN</b> with the value above (all environments).</li>
    <li>Redeploy. Test at <code>/booking</code>.</li>
    <li>After verifying, you can delete or protect <code>/api/auth/google</code>.</li>
  </ol>
</body>
</html>`,
    { headers: { "Content-Type": "text/html" } },
  );
}
