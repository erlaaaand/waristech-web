/**
 * wt-backend menerapkan proteksi CSRF (double-submit cookie) secara global
 * untuk semua request non-GET. Route handler Next.js yang melakukan
 * server-to-server fetch ke backend (login/logout) tidak berbagi cookie jar
 * dengan browser, jadi harus mengambil token+cookie CSRF-nya sendiri sebelum
 * memanggil endpoint yang dilindungi.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export interface BackendCsrf {
  token: string;
  cookieHeader: string;
}

/**
 * Ambil token CSRF + cookie double-submit dari backend.
 * @param forwardCookie Cookie yang perlu diikutsertakan saat meminta token
 *   (mis. accessToken saat logout), agar session identifier yang dipakai
 *   backend untuk menandatangani token sama antara permintaan token dan
 *   permintaan yang divalidasi setelahnya.
 */
export async function fetchBackendCsrf(forwardCookie?: string): Promise<BackendCsrf> {
  const res = await fetch(`${API_URL}/csrf-token`, {
    headers: forwardCookie ? { Cookie: forwardCookie } : undefined,
  });
  const { csrfToken } = (await res.json()) as { csrfToken: string };
  const cookieHeader = res.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .join("; ");

  return { token: csrfToken, cookieHeader };
}
