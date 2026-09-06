import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Reveal } from "./reveal";

export function CtaSection() {
  return (
    <section id="download" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="relative isolate overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center shadow-2xl sm:px-16">
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl"
          />

          <Smartphone className="mx-auto h-12 w-12 text-primary-foreground/70 mb-6" />

          <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
            Mulai Jaga Warisan Anda Hari Ini
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70 max-w-xl mx-auto">
            Download aplikasi WarisTech secara gratis dan mulai mendaftarkan harta digital Anda dalam hitungan menit.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-semibold"
              render={
                <Link href="https://github.com/erlaaaand/waristech-mobile/releases/latest/download/app-release.apk">
                  Download di Android
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              render={<Link href="/contact">Hubungi Tim Kami</Link>}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
