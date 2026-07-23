import { NextResponse, type NextRequest } from "next/server";
import { verifySessionCookie, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login page and its API endpoint must remain accessible
  // without a session, otherwise the redirect / auth loops.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isValid = await verifySessionCookie(cookie);

  if (!isValid) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    // Round-trip the intended destination so we can bounce them back post-login.
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Protect the admin app pages AND the admin API routes.
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
