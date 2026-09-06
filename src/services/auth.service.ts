/**
 * AuthService — wraps all /auth/* endpoints.
 * Never call apiClient directly from a React component.
 */
import { apiClient } from "@/lib/api-client";
import type { AuthResponseDto, LoginDto } from "@/types/backend.types";

export class AuthService {
  /** POST /auth/login — returns user data; JWT is set as HttpOnly cookie by backend. */
  static async login(dto: LoginDto): Promise<AuthResponseDto> {
    const { data } = await apiClient.post<AuthResponseDto>("/auth/login", dto);
    return data;
  }

  /** GET /auth/me — returns the authenticated user from cookie JWT. */
  static async me(): Promise<AuthResponseDto["user"]> {
    const { data } = await apiClient.get<{ user: AuthResponseDto["user"] }>(
      "/auth/me"
    );
    return data.user;
  }

  /** POST /auth/logout — clears the HttpOnly cookie server-side. */
  static async logout(): Promise<void> {
    if (typeof document !== 'undefined') {
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    await apiClient.post("/auth/logout");
  }
}
