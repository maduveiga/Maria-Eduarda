"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useImageSequencePreloader } from "@/hooks/useImageSequencePreloader";
import SequenceCanvas from "./SequenceCanvas";
import CinematicOverlay from "./CinematicOverlay";
import HeroTextLayers from "./HeroTextLayers";
import ScrollIndicator from "./ScrollIndicator";

const SCROLL_HEIGHT = "750vh";

export default function HeroScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const { images, isLoaded, progress: loadProgress } = useImageSequencePreloader();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsAtTop(latest < 0.05);
  });

  // Letras do MADU para animação de surgimento letra-a-letra
  const letters = ["M", "A", "D", "U"];

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

      {/* ── Progress bar ───────────────────────────────────────────── */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: uiProgress, transformOrigin: "left" }}
        aria-hidden="true"
      />

      {/* ── Scroll indicator ───────────────────────────────────────── */}
      <ScrollIndicator visible={showScrollIndicator} />

      {/* ── Grain overlay (fixo) ───────────────────────────────────── */}
      <CinematicOverlay />

      {/* ── Textos scroll-driven ──────────────────────────────────── */}
      <HeroTextLayers progress={uiProgress} rawProgress={scrollYProgress} />

      {/* ── Hero title — MADU ────────────────────────────────────── */}
      <motion.div
        className="hero-title-container"
        style={{
          opacity: heroTitleOpacity,
          position: "fixed",
          inset: 0,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          // Mobile: alinha à esquerda com padding; Desktop: centraliza
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: isMobile ? "center" : "center",
          paddingLeft: isMobile ? "clamp(32px, 12vw, 85px)" : "0",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "16px",
          }}
        >
          {/* Linha decorativa ouro — sutil */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            style={{
              width: "32px",
              height: "1px",
              background: "linear-gradient(90deg, rgba(184,151,90,0.5), transparent)",
              transformOrigin: "left",
            }}
          />

          {/* MADU — Efeito de surgimento cinematográfico */}
          {isMobile ? (
            <div style={{ display: "flex", gap: "0.08em" }}>
              {letters.map((letter, i) => (
                <motion.span
                  key={letter + i}
                  initial={{ opacity: 0, y: 15, filter: "blur(8px)", scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  transition={{
                    duration: 1.4,
                    delay: 0.6 + i * 0.2,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(2.6rem, 11vw, 4.2rem)",
                    fontWeight: 300,
                    letterSpacing: "0.18em",
                    lineHeight: 1,
                    color: "rgba(184, 151, 90, 0.98)",
                    display: "inline-block",
                    textShadow: "0 0 20px rgba(184,151,90,0.15)",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          ) : (
            <motion.span
              initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.8, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 300,
                letterSpacing: "0.25em",
                lineHeight: 1,
                color: "rgba(184, 151, 90, 0.95)",
              }}
            >
              MADU
            </motion.span>
          )}

          <motion.p
            className="text-label"
            style={{
              color: "rgba(240,240,240,0.30)",
              letterSpacing: "0.3em",
              fontSize: isMobile ? "0.55rem" : undefined,
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: isMobile ? 1.4 : 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            Beyond Surface
          </motion.p>

          {/* Linha decorativa inferior */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.19, 1, 0.22, 1] }}
            style={{
              width: "28px",
              height: "1px",
              background: "linear-gradient(90deg, rgba(184,151,90,0.35), transparent)",
              transformOrigin: "left",
            }}
          />
        </div>
      </motion.div>

      {/* ── Container tall — canvas sticky dentro dele ──────────────── */}
      <div
        ref={containerRef}
        style={{ position: "relative", height: SCROLL_HEIGHT, background: "#000000" }}
        aria-label="Cinematic scroll sequence"
      >
        <SequenceCanvas images={images} progress={scrollYProgress} isLoaded={isLoaded} />
      </div>
    </>
  );
}
