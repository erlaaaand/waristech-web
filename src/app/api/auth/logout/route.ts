import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      // Important: forward the cookies so backend knows which session to logout
      headers: new Headers({
        "Content-Type": "application/json",
        "Cookie": request.headers.get("cookie") || "",
      }),
    });

    const data = await response.json();

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Clear the Next.js cookies
    nextResponse.cookies.delete("accessToken");
    nextResponse.cookies.delete("x-csrf-token");

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
