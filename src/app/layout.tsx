import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "../components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WarisTech — Manajemen Warisan Digital Berbasis Hukum",
    template: "%s | WarisTech",
  },
  description:
    "Platform manajemen harta warisan digital yang sah secara hukum Islam dan Positif, dilindungi kriptografi dan divalidasi forensik AI.",
  keywords: [
    "waris",
    "warisan digital",
    "hukum waris islam",
    "manajemen aset",
    "notaris digital",
    "WarisTech",
  ],
  openGraph: {
    title: "WarisTech — Manajemen Warisan Digital Berbasis Hukum",
    description:
      "Platform manajemen harta warisan digital yang sah secara hukum Islam dan Positif.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
