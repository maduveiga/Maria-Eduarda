"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * useLenisScroll
 *
 * Desktop → Lenis smooth scroll com inércia de luxo.
 * Mobile/Tablet → scroll nativo (mais fluido e eficiente em touch).
 *
 * A decisão de desativar o Lenis em mobile é intencional:
 * browsers modernos em touch já fornecem scroll nativo 60/120fps
 * com momentum próprio. O Lenis adiciona latência extra em touch.
 */
export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Detecta tela de toque — usa scroll nativo para máxima fluidez
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 1024;

    if (isTouchDevice) {
      // Nenhuma interceptação — scroll nativo do browser
      return;
    }

    // Desktop: Lenis com configuração luxury
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.06,
      smoothWheel: true,
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
