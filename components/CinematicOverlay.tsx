"use client";

/**
 * CinematicOverlay — versão limpa.
 * Mantém apenas o grain atmosférico muito sutil.
 * Vignette radial, glow dourado e scan lines REMOVIDOS (causavam manchas/sombras).
 */
export default function CinematicOverlay() {
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
      {/* ── Sombra ESQUERDA ────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "20%",
          background: "linear-gradient(to right, #000000 0%, transparent 100%)",
        }}
      />

      {/* ── Sombra DIREITA ─────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "20%",
          background: "linear-gradient(to left, #000000 0%, transparent 100%)",
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
