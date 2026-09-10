import { NextResponse, type NextRequest } from "next/server";

/**
 * Admin middleware: gate /admin/* pages behind the admin cookie.
 *
 * The cookie is set by /api/admin/login after PIN validation. API routes
 * under /api/admin/* do their OWN auth check via `requireAdmin()` so they
 * can also accept an X-Admin-Pin header for tools like curl or Postman.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only gate /admin/* pages — not the /admin/login page itself.
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const hasCookie = request.cookies.get("xeedly_admin")?.value === "1";
  if (hasCookie) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
