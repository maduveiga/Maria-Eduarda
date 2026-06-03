"use client";

import { useEffect, useState } from "react";
import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";

interface HeroTextLayersProps {
  progress: MotionValue<number>;
  rawProgress: MotionValue<number>;
}

export default function HeroTextLayers({ progress, rawProgress }: HeroTextLayersProps) {
  const [isReady, setIsReady] = useState(false);
  const [isValidSection, setIsValidSection] = useState(true);
  const [isMobileTablet, setIsMobileTablet] = useState(false);

  // Detecta mobile/tablet para layout alternativo
  useEffect(() => {
    const check = () => setIsMobileTablet(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hard clamp para garantir que não vai renderizar fora de hora
  useMotionValueEvent(rawProgress, "change", (latest) => {
    if (latest >= 0.98) {
      if (isValidSection) setIsValidSection(false);
    } else {
      if (!isValidSection) setIsValidSection(true);
    }
  });

  useEffect(() => {
    // Delay de segurança anti-flicker no reload
    const delay = window.scrollY > 100 ? 1800 : 100;
    const timer = setTimeout(() => setIsReady(true), delay);
    return () => clearTimeout(timer);
  }, []);

  // ── WRAPPER — apaga tudo ao fim do hero de forma contida ─────────────────────────
  const wrapperOpacity = useTransform(progress, [0.93, 0.98], [1, 0]);

  // ── TEXTO 1 ────────────────────────────────────────────────────────
  const t1Opacity = useTransform(progress, [0.015, 0.05, 0.15, 0.18], [0, 1, 1, 0]);
  const t1Y = useTransform(progress, [0.015, 0.18], [60, -60]);

  // ── TEXTO 2 ─────────────────────────────────────────────────────────
  const t2Opacity = useTransform(progress, [0.22, 0.28, 0.55, 0.60], [0, 1, 1, 0]);
  const t2Y = useTransform(progress, [0.22, 0.60], [60, -60]);

  // ── TEXTO 3 ─────────────────────────────────────────────────────────
  const t3Opacity = useTransform(progress, [0.65, 0.70, 0.82, 0.85], [0, 1, 1, 0]);
  const t3Y = useTransform(progress, [0.65, 0.85], [60, -60]);

  // ── TEXTO 4 ─────────────────────────────────────────────────────────
  const t4Opacity = useTransform(progress, [0.88, 0.92, 0.95, 0.98], [0, 1, 1, 0]);
  const t4Y = useTransform(progress, [0.88, 0.98], [60, -40]);

  // ── Estilos DESKTOP (inalterados) ──────────────────────────────────
  const rightLayerStyleDesktop: React.CSSProperties = {
    position: "absolute",
    right: "clamp(20px, 5vw, 72px)",
    top: "50%",
    transform: "translateY(-50%)",
    maxWidth: "clamp(260px, 30vw, 420px)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    pointerEvents: "none",
    textAlign: "left",
  };

  const leftLayerStyleDesktop: React.CSSProperties = {
    position: "absolute",
    left: "clamp(20px, 5vw, 72px)",
    top: "50%",
    transform: "translateY(-50%)",
    maxWidth: "clamp(260px, 30vw, 420px)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    pointerEvents: "none",
    textAlign: "left",
  };

  // ── Estilos MOBILE/TABLET — textos nas áreas escuras (letterbox) ───
  // A imagem da ampulheta em mobile é mais alta que larga (portrait),
  // então o canvas cria letterbox nas laterais (pretas).
  // Posicionamos os textos na zona escura INFERIOR (sob a ampulheta).
  // ── Estilos MOBILE/TABLET — Otimizados para experiência cinematográfica ──
  const mobileTextStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    padding: "0 24px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    pointerEvents: "none",
    textAlign: "center",
    alignItems: "center",
    // Zona inferior — ajustada para ficar mais próxima da ampulheta mas sem sobrepor demais
    bottom: "clamp(40px, 12vh, 100px)",
    zIndex: 30,
  };

  // Para o texto 1 usamos uma zona superior mais equilibrada
  const mobileTextTopStyle: React.CSSProperties = {
    ...mobileTextStyle,
    bottom: "auto",
    top: "clamp(32px, 8vh, 80px)",
  };

  // ── Tipografia ──────────────────────────────────────────────────────
  const titleStyle: React.CSSProperties = {
    fontFamily: "var(--font-cormorant)",
    fontSize: isMobileTablet
      ? "clamp(1.35rem, 5vw, 1.9rem)"
      : "clamp(1.6rem, 2.8vw, 2.4rem)",
    fontWeight: 300,
    color: "rgba(245, 245, 245, 0.95)",
    lineHeight: 1.25,
    fontStyle: "italic",
    letterSpacing: "0.02em",
    margin: 0,
  };

  const enStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontSize: isMobileTablet ? "0.65rem" : "clamp(0.65rem, 0.9vw, 0.78rem)",
    color: "rgba(240, 240, 240, 0.25)",
    lineHeight: 1.5,
    fontStyle: "italic",
    fontWeight: 300,
    letterSpacing: "0.05em",
    margin: 0,
    marginTop: "4px",
  };

  const pStyle: React.CSSProperties = {
    fontFamily: "var(--font-cormorant)",
    fontSize: isMobileTablet
      ? "clamp(1.15rem, 4vw, 1.5rem)"
      : "clamp(1.23rem, 1.57vw, 1.45rem)",
    color: "rgba(240, 240, 240, 0.85)",
    lineHeight: 1.45,
    fontWeight: 300,
    fontStyle: "italic",
    letterSpacing: "0.02em",
    margin: 0,
  };

  const pEnStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontSize: isMobileTablet ? "0.62rem" : "clamp(0.68rem, 0.85vw, 0.78rem)",
    color: "rgba(240, 240, 240, 0.22)",
    lineHeight: 1.6,
    fontStyle: "italic",
    fontWeight: 300,
    margin: 0,
    marginTop: "6px",
  };

  const gold = "rgba(184, 151, 90, 0.85)";
  const divider: React.CSSProperties = {
    width: "28px",
    height: "1px",
    background: "rgba(184,151,90,0.35)",
    margin: isMobileTablet ? "2px auto" : "4px 0",
  };

  // ── Seleciona o estilo correto com base no dispositivo ───────────────
  const rightLayerStyle = isMobileTablet ? mobileTextStyle : rightLayerStyleDesktop;
  const leftLayerStyle  = isMobileTablet ? mobileTextTopStyle : leftLayerStyleDesktop;

  return (
    <motion.div 
      style={{ 
        position: "fixed", 
        inset: 0, 
        zIndex: 10, 
        pointerEvents: "none", 
        opacity: isReady ? wrapperOpacity : 0,
        display: isValidSection ? "block" : "none",
        visibility: isReady ? "visible" : "hidden"
      }}
    >

      {/* ── TEXTO 1 — TOPO (mobile) / LADO ESQUERDO (desktop) ─────── */}
      <motion.div style={{ ...leftLayerStyle, opacity: t1Opacity, y: t1Y }}>
        <div style={divider} />
        <h2 style={titleStyle}>
          Marcas memoráveis sobrevivem ao tempo.
          {isMobileTablet ? " " : <br />}As comuns apenas passam.
        </h2>
        <p style={enStyle}>
          memorable brands survive time. ordinary ones simply fade.
        </p>
      </motion.div>

      {/* ── TEXTO 2 — PARTE INFERIOR (mobile) / LADO DIREITO (desktop) */}
      <motion.div style={{ ...rightLayerStyle, opacity: t2Opacity, y: t2Y }}>
        <div style={divider} />
        <p style={pStyle}>
          Meu olhar une estética refinada, estratégia e percepção para criar
          experiências digitais sofisticadas, inesquecíveis e feitas para transmitir valor.
        </p>
        <p style={pEnStyle}>
          my vision blends refined aesthetics, strategy and perception to create
          sophisticated, unforgettable digital experiences designed to convey value.
        </p>
      </motion.div>

      {/* ── TEXTO 3 — PARTE INFERIOR (mobile) / LADO DIREITO (desktop) */}
      <motion.div style={{ ...rightLayerStyle, opacity: t3Opacity, y: t3Y }}>
        <div style={divider} />
        <h2 style={{ ...titleStyle, color: gold }}>
          Ser visto é diferente de ser lembrado.
        </h2>
        <p style={enStyle}>
          being seen is different from being remembered.
        </p>
      </motion.div>

      {/* ── TEXTO 4 — PARTE INFERIOR (mobile) / LADO DIREITO (desktop) */}
      <motion.div style={{ ...rightLayerStyle, opacity: t4Opacity, y: t4Y }}>
        <div style={divider} />
        <h2 style={titleStyle}>
          O desejo começa antes do clique.
        </h2>
        <p style={enStyle}>
          desire begins before the click.
        </p>
      </motion.div>

    </motion.div>
  );
}
