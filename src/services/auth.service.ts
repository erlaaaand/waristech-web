/**
 * AuthService — wraps all /auth/* endpoints.
 * Never call apiClient directly from a React component.
 */
import { apiClient } from "@/lib/api-client";
import type { AuthResponseDto, LoginDto } from "@/types/backend.types";

export class AuthService {
  /** POST /auth/login — proxies to Next.js API route to set HttpOnly cookie. */
  static async login(dto: LoginDto): Promise<AuthResponseDto> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
  }

  /** GET /auth/me — returns the authenticated user from cookie JWT. */
  static async me(): Promise<AuthResponseDto["user"]> {
    const { data } = await apiClient.get<{ user: AuthResponseDto["user"] }>(
      "/auth/me"
    );
    return data.user;
  }

  /** POST /auth/logout — proxies to Next.js API route to clear HttpOnly cookie. */
  static async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
  }
}
