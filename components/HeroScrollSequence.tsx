"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useImageSequencePreloader } from "@/hooks/useImageSequencePreloader";
import SequenceCanvas from "./SequenceCanvas";
import CinematicOverlay from "./CinematicOverlay";
import HeroTextLayers from "./HeroTextLayers";
import ScrollIndicator from "./ScrollIndicator";

const SCROLL_HEIGHT = "1000vh";

export default function HeroScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { images, isLoaded, progress: loadProgress } = useImageSequencePreloader();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /**
   * DOIS valores de progresso para propósitos distintos:
   *
   * 1. rawProgress → passado ao SequenceCanvas.
   *    O canvas tem seu próprio lerp interno e não precisa de spring.
   *    Usar valor raw = máxima responsividade no alvo, suavidade controlada
   *    pelo lerp cinematográfico do canvas.
   *
   * 2. uiProgress → para elementos UI (barra de progresso, textos, scroll indicator).
   *    Spring leve e responsivo — sem o "peso" exagerado do mass:2.2 anterior.
   *    stiffness:100 / damping:20 / mass:0.6 = resposta rápida sem jitter.
   */
  const uiProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.6,
    restDelta: 0.00005,
  });

  const heroTitleOpacity = useTransform(uiProgress, [0, 0.06], [1, 0]);

  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  useMotionValueEvent(uiProgress, "change", (latest) => {
    setShowScrollIndicator(latest < 0.02);
  });

  const [isAtTop, setIsAtTop] = useState(true);
  useEffect(() => {
    if (window.scrollY > 100) setIsAtTop(false);
  }, []);

  return (
    <>
      {/* ── Loading ────────────────────────────────────────────────── */}
      <div className={`loading-screen ${isLoaded ? "hidden" : ""}`}>
        <span className="shimmer-text text-label" style={{ letterSpacing: "0.4em" }}>
          MADU
        </span>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" style={{ width: `${loadProgress * 100}%` }} />
        </div>
        <span className="text-label" style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.55rem" }}>
          {Math.round(loadProgress * 100)}%
        </span>
      </div>

      {/* ── Progress bar (UI spring) ───────────────────────────────── */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: uiProgress, transformOrigin: "left" }}
        aria-hidden="true"
      />

      {/* ── Scroll indicator ───────────────────────────────────────── */}
      <ScrollIndicator visible={showScrollIndicator} />

      {/* ── Grain overlay (fixo) ────────────────────────────────────── */}
      <CinematicOverlay />

      {/* ── Textos scroll-driven (UI spring) ────────────────────────── */}
      <HeroTextLayers progress={uiProgress} rawProgress={scrollYProgress} />

      {/* ── Hero title — desaparece ao começar scroll ──────────────── */}
      <motion.div
        className="hero-title-container"
        style={{
          opacity: isAtTop ? heroTitleOpacity : 0,
          display: isAtTop ? "flex" : "none",
          position: "fixed",
          inset: 0,
          zIndex: 20,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <motion.div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <div
            style={{
              width: "40px", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.5), transparent)",
            }}
          />
          <span
            className="shimmer-text"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "0.25em",
              lineHeight: 1,
            }}
          >
            MADU
          </span>
          <motion.p
            className="text-label"
            style={{ color: "rgba(240,240,240,0.35)", letterSpacing: "0.35em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            beyond static motion
          </motion.p>
          <div
            style={{
              width: "40px", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.35), transparent)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Container tall — canvas sticky dentro dele ──────────────── */}
      <div
        ref={containerRef}
        style={{ position: "relative", height: SCROLL_HEIGHT, background: "#000000" }}
        aria-label="Cinematic scroll sequence"
      >
        {/*
         * Canvas recebe scrollYProgress RAW como target.
         * A suavização cinematográfica é feita INTERNAMENTE no rAF loop
         * via lerp frame-rate independente — isso é a chave para fluidity máxima.
         */}
        <SequenceCanvas images={images} progress={scrollYProgress} isLoaded={isLoaded} />
      </div>
    </>
  );
}
