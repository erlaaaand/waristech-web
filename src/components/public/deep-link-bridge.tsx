"use client"

/**
 * DeepLinkBridge — halaman jembatan tipis untuk link yang dibuat backend
 * (undangan Ahli Waris & magic-link Saksi). TIDAK menduplikasi form
 * registrasi/keputusan dari aplikasi mobile — wt-web hanya membuka aplikasi
 * (custom URL scheme `waristech://`) dengan parameter yang sudah ada di URL,
 * dengan fallback salin-manual bila aplikasi belum terpasang atau redirect
 * gagal.
 *
 * CATATAN: skema `waristech://` di sini baru sisi web. Agar benar-benar
 * membuka aplikasi native, project `wt_mobile` masih perlu mendaftarkan
 * custom URL scheme (Android intent-filter / iOS CFBundleURLSchemes) —
 * belum dikonfigurasi saat halaman ini dibuat.
 */
import { useEffect, useState } from "react"
import { Check, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

interface DeepLinkBridgeProps {
  title: string
  description: string
  /** Path GoRouter tujuan di aplikasi mobile, mis. "register/ahli-waris". */
  appPath: string
  /** Nama query parameter, mis. "kode" atau "token". */
  paramName: string
  paramValue: string | undefined
  /** Label tampilan untuk parameter, mis. "Kode Undangan". */
  paramLabel: string
}

export function DeepLinkBridge({
  title,
  description,
  appPath,
  paramName,
  paramValue,
  paramLabel,
}: DeepLinkBridgeProps) {
  const [copied, setCopied] = useState(false)
  const deepLink = paramValue
    ? `waristech://${appPath}?${paramName}=${encodeURIComponent(paramValue)}`
    : null

  useEffect(() => {
    if (deepLink) {
      window.location.href = deepLink
    }
    // Hanya coba sekali saat halaman pertama dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenApp = () => {
    if (deepLink) window.location.href = deepLink
  }

  const handleCopy = async () => {
    if (!paramValue) return
    await navigator.clipboard.writeText(paramValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {paramValue ? (
            <>
              <Button onClick={handleOpenApp} className="w-full">
                <ExternalLink /> Buka di Aplikasi WarisTech
              </Button>
              <div className="rounded-lg border border-border bg-muted p-3">
                <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {paramLabel}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-sm font-mono break-all">
                    {paramValue}
                  </code>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={handleCopy}
                    aria-label={`Salin ${paramLabel}`}
                  >
                    {copied ? (
                      <Check className="text-green-600" />
                    ) : (
                      <Copy />
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Jika aplikasi belum terbuka otomatis, pastikan aplikasi
                WarisTech sudah terpasang di perangkat Anda, lalu salin{" "}
                {paramLabel.toLowerCase()} di atas dan tempel manual di
                aplikasi.
              </p>
            </>
          ) : (
            <p className="text-sm text-destructive">
              Link tidak valid — {paramLabel.toLowerCase()} tidak ditemukan
              di URL.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
