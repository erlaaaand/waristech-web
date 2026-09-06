import type { Metadata } from "next";
import { HeroSection } from "@/components/public/hero-section";
import { ValuePropositionSection } from "@/components/public/value-proposition-section";
import { FeaturesSection } from "@/components/public/features-section";
import { HowItWorksSection } from "@/components/public/how-it-works-section";
import { CtaSection } from "@/components/public/cta-section";

export const metadata: Metadata = {
  title: "WarisTech — Warisan Digital yang Sah Secara Hukum",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuePropositionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
}
