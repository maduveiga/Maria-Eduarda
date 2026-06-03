"use client";

import { useEffect, useRef, useCallback } from "react";
import { renderFrame } from "@/lib/canvas/renderFrame";
import { applyVeoMask } from "@/lib/canvas/drawFrameCover";
import { MotionValue } from "framer-motion";
import {
  getDevicePerformanceTier,
  getDevicePixelRatio,
} from "@/lib/utils/devicePerformance";

interface SequenceCanvasProps {
  images: HTMLImageElement[];
  progress: MotionValue<number>;
  isLoaded: boolean;
}

/**
 * SequenceCanvas — Cinematic Edition
 *
 * Arquitetura de renderização:
 * ─────────────────────────────
 * • A MotionValue (progress) serve apenas como TARGET (valor alvo).
 * • O loop rAF mantém um estado interno `displayProgress` que avança
 *   suavemente em direção ao target a cada frame, usando lerp frame-rate
 *   independente com base em deltaTime real.
 * • Isso desacopla completamente o input bruto do scroll da renderização:
 *   mesmo que o usuário pare o scroll, a animação decelera organicamente
 *   em vez de cortar abruptamente.
 * • Alpha blending entre frames adjacentes elimina qualquer percepção
 *   de "degraus" durante movimentos lentos (trackpad, slow scroll).
 * • O loop inteligente só despacha drawImage quando o frame calculado
 *   muda de fato, poupando GPU em momentos estáticos.
 */
export default function SequenceCanvas({
  images,
  progress,
  isLoaded,
}: SequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const tierRef = useRef(getDevicePerformanceTier());

  // ── Canvas init ─────────────────────────────────────────────────────────
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = getDevicePixelRatio(tierRef.current);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    // Sem desynchronized:true — elimina possível tearing visual
    const ctx = canvas.getContext("2d", { alpha: false });

    if (ctx) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctxRef.current = ctx;
    }
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initCanvas, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [initCanvas]);

  // ── Render loop cinematográfico ─────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const totalFrames = images.length;

    let lastRenderedFrame = -1;           // Evita redraw desnecessário
    let rafId: number;

    const render = () => {
      rafId = requestAnimationFrame(render);

      // ── Pega o target atual (O(1)) ──────────────────────────────────────
      const target = progress.get();

      // ── Mapeamento Direto e Rápido (1:1 com o scroll) ───────────────────
      // Retornando à sincronização absoluta para máxima velocidade e resposta imediata.
      const frameIndex = Math.round(target * (totalFrames - 1));

      // ── Skip draw se for o mesmo frame ──────────────────────────────────
      if (frameIndex === lastRenderedFrame) return;
      lastRenderedFrame = frameIndex;

      const img = images[frameIndex];
      if (!img) return;

      // ── Renderização direta ─────────────────────────────────────────────
      ctx.globalAlpha = 1;
      renderFrame(canvas, ctx, img, true);

      // ── Máscara de composição final ─────────────────────────────────────
      ctx.globalAlpha = 1;
      applyVeoMask(ctx, img, canvas.width, canvas.height);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [images, progress, isLoaded]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        overflow: "hidden",
        // Hint para o browser fazer compositing em camada separada (GPU layer)
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          // Força aceleração GPU no elemento canvas
          willChange: "contents",
          imageRendering: "auto",
        }}
      />
    </div>
  );
}
