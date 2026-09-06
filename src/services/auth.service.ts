/**
 * AuthService — wraps all /auth/* endpoints.
 * Never call apiClient directly from a React component.
 */
import { apiClient } from "@/lib/api-client";
import type { AuthenticatedUser, AuthResponseDto, LoginDto } from "@/types/backend.types";

export class AuthService {
  /** POST /auth/login — proxies to Next.js API route to set HttpOnly cookie. */
  static async login(dto: LoginDto): Promise<AuthResponseDto> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });

    const body = await res.json();
    if (!res.ok) throw new Error(body.message || "Login failed");
    // Backend membungkus setiap response dalam envelope { statusCode, message, data }.
    return body.data as AuthResponseDto;
  }

  /** GET /auth/me — returns the authenticated user's JWT payload (sub/email/role). */
  static async me(): Promise<AuthenticatedUser> {
    const { data } = await apiClient.get<{ data: AuthenticatedUser }>("/auth/me");
    return data.data;
  }

  /** POST /auth/logout — proxies to Next.js API route to clear HttpOnly cookie. */
  static async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
  }
}
