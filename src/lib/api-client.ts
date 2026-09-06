/**
 * Axios singleton instance for wt-backend communication.
 * - withCredentials: true  → sends HttpOnly cookies on every request
 * - Base URL from env
 */
import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

class ApiClient {
  private static instance: AxiosInstance | null = null;
  private static csrfToken: string | null = null;
  private static isFetchingCsrf = false;
  private static csrfSubscribers: ((token: string) => void)[] = [];

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
              } catch (error) {
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
          if (error.response?.status === 403 && (error.response.data as any)?.message?.includes('CSRF')) {
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
