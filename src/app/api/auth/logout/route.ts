import { NextRequest, NextResponse } from "next/server";
import { fetchBackendCsrf } from "@/lib/backend-csrf";

export async function POST(request: NextRequest) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
    const browserCookie = request.headers.get("cookie") || "";

    // Backend mewajibkan token CSRF (double-submit cookie) untuk request
    // non-GET. Cookie browser (berisi accessToken) diteruskan saat meminta
    // token agar session identifier yang dipakai backend untuk menanda-
    // tangani token sama dengan saat request logout ini divalidasi.
    const { token: csrfToken, cookieHeader: csrfCookie } = await fetchBackendCsrf(browserCookie);
    const combinedCookie = [browserCookie, csrfCookie].filter(Boolean).join("; ");

    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      // Important: forward the cookies so backend knows which session to logout
      headers: new Headers({
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
        "Cookie": combinedCookie,
      }),
    });

    const data = await response.json();

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Clear the Next.js cookies
    nextResponse.cookies.delete("accessToken");
    nextResponse.cookies.delete("x-csrf-token");

    return nextResponse;
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
