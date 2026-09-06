import type { Metadata } from "next";
import { Outfit, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { Providers } from "../components/providers";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
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
    "Platform manajemen pewarisan aset dan kredensial digital terdesentralisasi berbasis sistem Proof-of-Life dan kriptografi Shamir's Secret Sharing.",
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
      "Platform manajemen pewarisan aset dan kredensial digital terdesentralisasi berbasis sistem Proof-of-Life dan kriptografi Shamir's Secret Sharing.",
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
      className={`${outfit.variable} ${sourceSerif.variable} ${jetBrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
