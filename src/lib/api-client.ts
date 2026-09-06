/**
 * Axios singleton instance for wt-backend communication.
 * - withCredentials: true  → sends HttpOnly cookies on every request
 * - Base URL from env
 */
import axios, { type AxiosError, type AxiosInstance } from "axios";

class ApiClient {
  private static instance: AxiosInstance | null = null;

  /** Returns the shared Axios instance, creating it on first call. */
  static getInstance(): AxiosInstance {
    if (!ApiClient.instance) {
      ApiClient.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
        withCredentials: true, // required for HttpOnly cookies (JWT + CSRF)
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ── Response Interceptor ──────────────────────────────────────────────
      ApiClient.instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          // 401 → session expired; let the page-level error boundary handle it
          return Promise.reject(error);
        }
      );
    }

    return ApiClient.instance;
  }
}

export const apiClient = ApiClient.getInstance();
