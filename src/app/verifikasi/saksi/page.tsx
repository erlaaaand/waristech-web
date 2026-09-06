import type { Metadata } from "next"
import { DeepLinkBridge } from "@/components/public/deep-link-bridge"

export const metadata: Metadata = {
  title: "Verifikasi Saksi — WarisTech",
}

/**
 * Landing untuk magic-link Saksi/Guest (dikirim via email oleh
 * `mail.service.ts` di wt-backend: `${APP_FRONTEND_URL}/verifikasi/saksi?token=...`).
 * Verifikasi OTP dan keputusan Saksi (APPROVE/DISPUTE) tetap terjadi di
 * aplikasi mobile — halaman ini hanya menjembatani token dari link.
 */
export default async function VerifikasiSaksiPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const token = typeof params.token === "string" ? params.token : undefined

  return (
    <DeepLinkBridge
      title="Verifikasi Saksi"
      description="Anda diminta menjadi Saksi dalam proses verifikasi kematian di WarisTech."
      appPath="verifikasi/saksi"
      paramName="token"
      paramValue={token}
      paramLabel="Token Verifikasi"
    />
  )
}
