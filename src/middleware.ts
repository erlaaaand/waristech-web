import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATH_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /admin/* routes (but not the login page itself)
  if (!pathname.startsWith(ADMIN_PATH_PREFIX) || pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  // Check for the JWT HttpOnly cookie set by wt-backend
  const accessToken = request.cookies.get("accessToken");

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
