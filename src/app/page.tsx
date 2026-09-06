import type { Metadata } from "next";
import { HeroSection } from "../components/public/hero-section";
import { ValuePropositionSection } from "../components/public/value-proposition-section";
import { FeaturesSection } from "../components/public/features-section";
import { HowItWorksSection } from "../components/public/how-it-works-section";
import { CtaSection } from "../components/public/cta-section";
import { PublicNavbar } from "../components/public/public-navbar";
import { PublicFooter } from "../components/public/public-footer";

export const metadata: Metadata = {
  title: "WarisTech — Warisan Digital yang Sah Secara Hukum",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1">
        <HeroSection />
        <ValuePropositionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <PublicFooter />
    </div>
  );
}
