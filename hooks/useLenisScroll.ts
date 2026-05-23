"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * useLenisScroll
 *
 * Initializes Lenis smooth scroll and keeps it running via rAF.
 * Returns the Lenis instance so consumers can read .scroll, .progress, etc.
 *
 * Config tuned for a luxury, high-inertia feel:
 * - duration: 1.4s — long, silk-smooth deceleration
 * - easing:   exponential ease-out — premium deceleration curve
 * - smoothWheel: true — intercepts native scroll for smooth wheel
 */
export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Mais longo para sensação de peso e luxo
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.05,    // Interpolação suave
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
