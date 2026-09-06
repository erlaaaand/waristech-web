"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Copy, ExternalLink, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { apiClient } from "@/lib/api-client"
import axios from "axios"

function AhliWarisRegistrationForm() {
  const searchParams = useSearchParams()
  const kode = searchParams.get("kode")

  const [copied, setCopied] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const deepLink = kode ? `waristech://register/ahli-waris?kode=${encodeURIComponent(kode)}` : null

  // Auto-attempt deep link on mount
  useEffect(() => {
    if (deepLink && !registerSuccess) {
      window.location.href = deepLink
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenApp = () => {
    if (deepLink) window.location.href = deepLink
  }

  const handleCopy = async () => {
    if (!kode) return
    await navigator.clipboard.writeText(kode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!kode) return

    const formData = new FormData(e.currentTarget)
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const phoneNumber = formData.get("phoneNumber") as string
    const consentAgreed = formData.get("consentAgreed") === "on"

    if (!consentAgreed) {
      setErrorMsg("Anda wajib menyetujui pemrosesan data pribadi.")
      return
    }

    setIsRegistering(true)
    setErrorMsg(null)

    try {
      await apiClient.post("/auth/register/ahli-waris", {
        fullName,
        email,
        password,
        phoneNumber,
        consentAgreed,
        invitationCode: kode,
      })
      setRegisterSuccess(true)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        const msg = error.response.data.message
        setErrorMsg(Array.isArray(msg) ? msg[0] : msg)
      } else {
        setErrorMsg("Terjadi kesalahan saat mendaftar. Silakan coba lagi.")
      }
    } finally {
      setIsRegistering(false)
    }
  }

  if (!kode) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-muted/30 p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Undangan Ahli Waris</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive">
              Link tidak valid — kode undangan tidak ditemukan di URL.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (registerSuccess) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-muted/30 p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">Pendaftaran Berhasil!</CardTitle>
            <CardDescription>
              Akun Ahli Waris Anda telah berhasil dibuat.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <p className="text-sm text-muted-foreground">
              Untuk melanjutkan pengelolaan aset dan verifikasi selanjutnya, silakan unduh aplikasi WarisTech di smartphone Anda.
            </p>
            <div className="flex flex-col gap-3">
              <Button className="w-full h-12" variant="default">
                <Download className="mr-2" /> Download di Google Play
              </Button>
              <Button className="w-full h-12" variant="outline">
                <Download className="mr-2" /> Download di App Store
              </Button>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <p className="text-xs text-muted-foreground mb-3">
                Sudah mengunduh aplikasi?
              </p>
              <Button onClick={handleOpenApp} variant="secondary" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" /> Buka Aplikasi WarisTech
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted/30 p-6 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Undangan Ahli Waris</CardTitle>
          <CardDescription>
            Anda diundang untuk bergabung sebagai Ahli Waris di WarisTech.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Button onClick={handleOpenApp} className="w-full bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="mr-2" /> Buka di Aplikasi WarisTech
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              (Jika Anda sudah memiliki aplikasi dan akun)
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Atau daftar melalui web</span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {errorMsg && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive font-medium">
                {errorMsg}
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Masukkan nama lengkap Anda"
                required
                disabled={isRegistering}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                required
                disabled={isRegistering}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Nomor WhatsApp / Telepon</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Contoh: 081234567890"
                required
                disabled={isRegistering}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 8 karakter (huruf besar, kecil & angka)"
                required
                disabled={isRegistering}
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Password harus minimal 8 karakter, mengandung setidaknya satu huruf besar, satu huruf kecil, dan satu angka."
              />
            </div>

            <div className="flex items-start gap-2 mt-2">
              <input
                type="checkbox"
                id="consentAgreed"
                name="consentAgreed"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
                disabled={isRegistering}
              />
              <Label htmlFor="consentAgreed" className="text-xs font-normal leading-relaxed text-muted-foreground cursor-pointer">
                Saya menyetujui pemrosesan data pribadi saya sesuai dengan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (PDP).
              </Label>
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isRegistering}>
              {isRegistering ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mendaftarkan...
                </>
              ) : (
                "Daftar Sekarang"
              )}
            </Button>
          </form>

          <div className="rounded-lg border border-border bg-muted p-3 mt-2">
            <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Kode Undangan
            </p>
            <div className="flex items-center justify-between gap-2">
              <code className="text-sm font-mono break-all">{kode}</code>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleCopy}
                aria-label="Salin kode undangan"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RegisterAhliWarisPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-svh w-full items-center justify-center bg-muted/30 p-6">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <AhliWarisRegistrationForm />
    </Suspense>
  )
}
