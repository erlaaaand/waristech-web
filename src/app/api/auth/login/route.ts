import { NextRequest, NextResponse } from "next/server";
import { fetchBackendCsrf } from "@/lib/backend-csrf";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

    // Backend mewajibkan token CSRF (double-submit cookie) untuk request
    // non-GET, termasuk login. Belum ada accessToken di titik ini, jadi
    // token diambil tanpa cookie tambahan.
    const { token: csrfToken, cookieHeader: csrfCookie } = await fetchBackendCsrf();

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
        ...(csrfCookie ? { Cookie: csrfCookie } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const nextResponse = NextResponse.json(data, { status: 200 });

    // Extract the Set-Cookie header from the backend response
    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookieStr) => {
        // We need to parse the cookie string manually because fetch's getSetCookie returns the raw string
        // Example: "accessToken=...; Path=/; HttpOnly; Max-Age=604800; SameSite=Lax"
        const [cookieNameValue, ...attributes] = cookieStr.split('; ');
        const [name, ...valueParts] = cookieNameValue.split('=');
        const value = valueParts.join('=');

        const options: any = {};
        attributes.forEach(attr => {
          const [key, val] = attr.split('=');
          const lowerKey = key.toLowerCase();
          if (lowerKey === 'path') options.path = val;
          if (lowerKey === 'max-age') options.maxAge = parseInt(val, 10);
          if (lowerKey === 'domain') options.domain = val; // We will intentionally strip domain so it becomes first-party
          if (lowerKey === 'secure') options.secure = true;
          if (lowerKey === 'httponly') options.httpOnly = true;
          if (lowerKey === 'samesite') options.sameSite = val.toLowerCase();
        });

        // Strip the domain so Next.js sets it for the FIRST-PARTY domain (e.g. localhost or vercel)
        delete options.domain;

        nextResponse.cookies.set({
          name: name,
          value: value,
          ...options
        });
      });
    }

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
