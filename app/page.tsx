"use client";

import { useLenisScroll } from "@/hooks/useLenisScroll";
import HeroScrollSequence from "@/components/HeroScrollSequence";
import PortfolioExperience from "@/components/PortfolioExperience";
import CreativeSignature from "@/components/CreativeSignature";
import ManuscriptSection from "@/components/ManuscriptSection";
import FooterCTA from "@/components/FooterCTA";

/**
 * Page — root of the MADU cinematic experience.
 */
export default function Page() {
  useLenisScroll();

  return (
    <main
      id="main-content"
      aria-label="MADU cinematic experience"
      style={{ background: "#000000" }}
    >
      {/* A — Cinematic hero scroll sequence */}
      <HeroScrollSequence />

      {/* B — Creative Identity & Human Pause */}
      <CreativeSignature />

      {/* C — Contemporary Manuscript — Contact & Connection */}
      <ManuscriptSection />

      {/* D — Portfolio cinematic showcase */}
      <PortfolioExperience />

      {/* E — Closing CTA */}
      <FooterCTA />
    </main>
  );
}
