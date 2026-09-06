"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, KeyRound, ShieldCheck, Users2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

/**
 * Tahap Proof-of-Life nyata (lihat `proof-of-life-policy.service.ts` di
 * wt-backend): 30 hari check-in → 14 hari peringatan → 16 hari kontak
 * darurat/Saksi → verifikasi resmi. Dipakai sebagai narasi "alur pemicu"
 * di hero, bukan klaim generik.
 */
const TRIGGER_FLOW = [
  { label: "Check-in Aktif", detail: "Konfirmasi keaktifan tiap ≤30 hari" },
  { label: "Kontak Darurat", detail: "Saksi independen dihubungi" },
  { label: "Verifikasi Notaris", detail: "Akta kematian & 3 Saksi menyetujui" },
  { label: "Kunci Dilepas", detail: "Eksekutor gabungkan bagian kunci" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-10 blur-3xl bg-gradient-to-br from-primary via-accent to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        {/* ── Kolom teks ─────────────────────────────────────────── */}
        <div className="text-center lg:text-left">
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
          >
            <Badge
              variant="outline"
              className="mb-6 gap-2 border-accent/40 text-accent-foreground bg-accent/10 font-medium px-4 py-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              Sah Secara Hukum Islam &amp; Hukum Positif Indonesia
            </Badge>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.08]"
          >
            Kunci Warisan Digital Anda,{" "}
            <span className="rounded-md bg-accent/15 px-1.5">Tak Pernah Utuh</span>{" "}
            di Satu Tangan
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl mx-auto lg:mx-0"
          >
            Kredensial aset digital Anda dipecah menjadi 3 bagian kunci
            (Shamir&apos;s Secret Sharing) — server WarisTech hanya menyimpan
            satu bagian, sehingga tidak pernah cukup untuk membuka brankas
            sendirian. Kunci baru dilepas setelah Notaris memverifikasi akta
            kematian dan minimal 3 Saksi independen menyetujui.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Button
              size="lg"
              className="gap-2 h-12 px-8 text-base"
              render={
                <Link href="#download">
                  Download Gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
              render={<Link href="/#cara-kerja">Lihat Cara Kerjanya</Link>}
            />
          </motion.div>

          {/* Trust signals — mencerminkan mekanisme nyata, bukan klaim generik */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-accent" />
              Kunci Terpecah 3 Bagian
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Verifikasi Berjenjang Notaris
            </span>
            <span className="flex items-center gap-2">
              <Users2 className="h-4 w-4 text-accent" />
              Minimal 3 Saksi Independen
            </span>
          </motion.div>
        </div>

        {/* ── Kolom snapshot aplikasi ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          {/* Aksen mengambang di belakang mockup */}
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-8 -left-6 h-24 w-24 rounded-3xl bg-accent/20 blur-2xl"
          />
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-6 -right-4 h-32 w-32 rounded-3xl bg-primary/10 blur-2xl"
          />

          {/* Bingkai ponsel */}
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative mx-auto w-[280px] rounded-[2.5rem] border-[10px] border-foreground/90 bg-foreground/90 shadow-2xl sm:w-[320px]"
          >
            {/* Dynamic Island / Notch */}
            <div className="absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-foreground/95" />
            
            <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] bg-background">
              <Image
                src="/app-screenshot-home.png"
                alt="Tampilan dashboard brankas digital WarisTech"
                fill
                unoptimized
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Strip alur pemicu — sinkron dengan Proof-of-Life backend ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mx-auto mt-20 max-w-5xl px-6 lg:px-8"
      >
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Alur Pemicu Otomatis
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TRIGGER_FLOW.map((item, index) => (
            <div
              key={item.label}
              className="relative rounded-2xl border border-border bg-card/60 p-4 text-center backdrop-blur-sm"
            >
              <span className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                {index + 1}
              </span>
              <p className="text-sm font-semibold text-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground leading-snug">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
