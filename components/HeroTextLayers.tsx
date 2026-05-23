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
  // Desaparece por completo antes de 100% para não invadir a seção abaixo
  const wrapperOpacity = useTransform(progress, [0.93, 0.98], [1, 0]);

  // ── TEXTO 1 (ESQUERDO) ────────────────────────────────────────────
  const t1Opacity = useTransform(progress, [0.015, 0.05, 0.15, 0.18], [0, 1, 1, 0]);
  const t1Y = useTransform(progress, [0.015, 0.18], [60, -60]);

  // ── TEXTO 2 (DIREITO - Tempo de leitura expandido!) ─────────────────────────────────────────────
  // O texto mais longo do hero; agora fica estável por quase 30% do scroll inteiro
  const t2Opacity = useTransform(progress, [0.22, 0.28, 0.55, 0.60], [0, 1, 1, 0]);
  const t2Y = useTransform(progress, [0.22, 0.60], [60, -60]);

  // ── TEXTO 3 (DIREITO) ─────────────────────────────────────────────
  const t3Opacity = useTransform(progress, [0.65, 0.70, 0.82, 0.85], [0, 1, 1, 0]);
  const t3Y = useTransform(progress, [0.65, 0.85], [60, -60]);

  // ── TEXTO 4 (DIREITO) — Evapora elegantemente ────────────────────
  const t4Opacity = useTransform(progress, [0.88, 0.92, 0.95, 0.98], [0, 1, 1, 0]);
  const t4Y = useTransform(progress, [0.88, 0.98], [60, -40]);

  // ── Estilos base ──────────────────────────────────────────────────
  const rightLayerStyle: React.CSSProperties = {
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

  const leftLayerStyle: React.CSSProperties = {
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

  const titleStyle: React.CSSProperties = {
    fontFamily: "var(--font-cormorant)",
    fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
    fontWeight: 300,
    color: "rgba(240, 240, 240, 0.92)",
    lineHeight: 1.15,
    fontStyle: "italic",
    letterSpacing: "0.01em",
    margin: 0,
  };

  const enStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontSize: "clamp(0.65rem, 0.9vw, 0.78rem)",
    color: "rgba(240, 240, 240, 0.25)",
    lineHeight: 1.5,
    fontStyle: "italic",
    fontWeight: 300,
    letterSpacing: "0.04em",
    margin: 0,
    marginTop: "2px",
  };

  const pStyle: React.CSSProperties = {
    fontFamily: "var(--font-cormorant)",
    fontSize: "clamp(1.23rem, 1.57vw, 1.45rem)", // +7% adicionais no tamanho da tipografia
    color: "rgba(240, 240, 240, 0.75)", // Um toque a mais de brilho para facilitar a leitura
    lineHeight: 1.4,
    fontWeight: 300,
    fontStyle: "italic", // Replicando o visual do texto inicial
    letterSpacing: "0.02em",
    margin: 0,
  };

  const pEnStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontSize: "clamp(0.68rem, 0.85vw, 0.78rem)",
    color: "rgba(240, 240, 240, 0.22)",
    lineHeight: 1.55,
    fontStyle: "italic",
    fontWeight: 300,
    margin: 0,
    marginTop: "6px",
  };

  const gold = "rgba(184, 151, 90, 0.85)";
  const divider: React.CSSProperties = {
    width: "32px",
    height: "1px",
    background: "rgba(184,151,90,0.35)",
    margin: "4px 0",
  };

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

      {/* ── TEXTO 1 — LADO ESQUERDO ────────────────────────────── */}
      <motion.div style={{ ...leftLayerStyle, opacity: t1Opacity, y: t1Y }}>
        <div style={divider} />
        <h2 style={titleStyle}>
          Marcas memoráveis sobrevivem ao tempo.
          <br />As comuns apenas passam.
        </h2>
        <p style={enStyle}>
          memorable brands survive time. ordinary ones simply fade.
        </p>
      </motion.div>

      {/* ── TEXTO 2 — LADO DIREITO ─────────────────────────────── */}
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

      {/* ── TEXTO 3 — LADO DIREITO ─────────────────────────────── */}
      <motion.div style={{ ...rightLayerStyle, opacity: t3Opacity, y: t3Y }}>
        <div style={divider} />
        <h2 style={{ ...titleStyle, color: gold }}>
          Ser visto é diferente de ser lembrado.
        </h2>
        <p style={enStyle}>
          being seen is different from being remembered.
        </p>
      </motion.div>

      {/* ── TEXTO 4 — LADO DIREITO ─────────────────────────────── */}
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
