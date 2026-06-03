"use client";

import { useEffect, useState } from "react";

/**
 * CinematicOverlay — Otimizado para Mobile.
 * Suaviza as sombras laterais em telas pequenas para não prejudicar a leitura.
 */
export default function CinematicOverlay() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {/* ── Sombra ESQUERDA (Mais sutil no mobile) ────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: isMobile ? "8%" : "20%",
          background: isMobile 
            ? "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 100%)"
            : "linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      />

      {/* ── Sombra DIREITA (Mais sutil no mobile) ─────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: isMobile ? "8%" : "20%",
          background: isMobile 
            ? "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%)"
            : "linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      />

      {/* ── Sombra INFERIOR (Cinematográfica, suave) ──── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "8vh",
          background: "linear-gradient(to top, #000000 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
