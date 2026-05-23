"use client";

import { useLenisScroll } from "@/hooks/useLenisScroll";
import HeroScrollSequence from "@/components/HeroScrollSequence";
import PortfolioExperience from "@/components/PortfolioExperience";
import CreativeSignature from "@/components/CreativeSignature";
import ManuscriptSection from "@/components/ManuscriptSection";
import PremiumSection from "@/components/PremiumSection";
import FooterCTA from "@/components/FooterCTA";

/**
 * Page — root of the MADU cinematic experience.
 *
 * Structure:
 * A. HeroScrollSequence  — 500vh sticky cinematic frame sequence
 * B. IntroSection        — brand statement
 * C. PremiumSection      — concept / technology showcase
 * D. FooterCTA           — closing call-to-action
 */
export default function Page() {
  // Initialize Lenis smooth scroll globally
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

      {/* B.5 — Contemporary Manuscript — Contact & Connection */}
      <ManuscriptSection />

      {/* C — Portfolio cinematic showcase */}
      <PortfolioExperience />


      {/* E — Technology concept */}
      <PremiumSection />

      {/* D — Closing CTA */}
      <FooterCTA />
    </main>
  );
}
