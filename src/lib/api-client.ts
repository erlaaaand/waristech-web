/**
 * Axios singleton instance for wt-backend communication.
 * - withCredentials: true  → sends HttpOnly cookies on every request
 * - Base URL from env
 */
import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

const ACCESS_TOKEN_STORAGE_KEY = "wt_access_token";

class ApiClient {
  private static instance: AxiosInstance | null = null;
  private static csrfToken: string | null = null;
  private static isFetchingCsrf = false;
  private static csrfSubscribers: ((token: string) => void)[] = [];

  /**
   * Backend (Railway) dan frontend (Vercel) ada di domain berbeda, jadi
   * cookie HttpOnly `accessToken` yang di-set untuk domain frontend TIDAK
   * ikut terkirim pada request cross-origin browser -> backend. Sebagai
   * fallback, token yang sama juga disimpan di localStorage lalu dikirim
   * manual sebagai `Authorization: Bearer` -- JWT strategy backend
   * menerima keduanya (lihat jwt.strategy.ts).
   */
  static setAccessToken(token: string) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
    }
  }

  static clearAccessToken() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    }
  }

  private static getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  private static onCsrfFetched(token: string) {
    this.csrfSubscribers.forEach((callback) => callback(token));
    this.csrfSubscribers = [];
  }

  private static addCsrfSubscriber(callback: (token: string) => void) {
    this.csrfSubscribers.push(callback);
  }

  /** Returns the shared Axios instance, creating it on first call. */
  static getInstance(): AxiosInstance {
    if (!ApiClient.instance) {
      ApiClient.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1",
        withCredentials: true, // required for HttpOnly cookies (JWT + CSRF)
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ── Request Interceptor (CSRF) ──────────────────────────────────────────
      ApiClient.instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
          // Fallback Authorization header (lihat komentar setAccessToken di atas)
          const accessToken = ApiClient.getAccessToken();
          if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }

          // Hanya tambahkan token CSRF untuk HTTP method yang memodifikasi data
          const methodsRequiringCsrf = ['post', 'put', 'patch', 'delete'];

          if (config.method && methodsRequiringCsrf.includes(config.method.toLowerCase())) {
            
            // Bypass CSRF fetch jika request ini ADALAH request CSRF itu sendiri
            if (config.url === '/csrf-token') {
              return config;
            }

            if (ApiClient.csrfToken) {
              config.headers['x-csrf-token'] = ApiClient.csrfToken;
            } else {
              // Jika sedang mem-fetch CSRF, antrikan request ini
              if (ApiClient.isFetchingCsrf) {
                return new Promise((resolve) => {
                  ApiClient.addCsrfSubscriber((token) => {
                    config.headers['x-csrf-token'] = token;
                    resolve(config);
                  });
                });
              }

              // Mulai fetch CSRF
              ApiClient.isFetchingCsrf = true;
              try {
                // Gunakan axios standar agar tidak memicu interceptor rekursif
                const res = await axios.get(`${config.baseURL}/csrf-token`, {
                  withCredentials: true,
                });
                const token = res.data.csrfToken;
                ApiClient.csrfToken = token;
                config.headers['x-csrf-token'] = token;
                ApiClient.onCsrfFetched(token);
              } catch {
                ApiClient.onCsrfFetched('');
              } finally {
                ApiClient.isFetchingCsrf = false;
              }
            }
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      // ── Response Interceptor ──────────────────────────────────────────────
      ApiClient.instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          // 403 CSRF Error → Reset token agar di-fetch ulang pada request berikutnya
          const data = error.response?.data as Record<string, unknown>;
          if (error.response?.status === 403 && typeof data?.message === 'string' && data.message.includes('CSRF')) {
            ApiClient.csrfToken = null;
          }
          return Promise.reject(error);
        }
      );
    }

    return ApiClient.instance;
  }
}

export const apiClient = ApiClient.getInstance();
export const setAccessToken = ApiClient.setAccessToken;
export const clearAccessToken = ApiClient.clearAccessToken;
