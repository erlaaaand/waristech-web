import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATH_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /admin/* routes
  if (!pathname.startsWith(ADMIN_PATH_PREFIX)) {
    return NextResponse.next();
  }

  // Check for the JWT HttpOnly cookie set by wt-backend or proxy
  const accessToken = request.cookies.get("accessToken");

  // If user is at login page
  if (pathname === LOGIN_PATH) {
    if (accessToken?.value) {
      // Already logged in, redirect to dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // If user is accessing protected routes without token
  if (!accessToken?.value) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
