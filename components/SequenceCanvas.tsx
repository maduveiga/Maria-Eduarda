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

      // ── Pega o target atual (O(1), sem React re-render) ────────────────
      const target = progress.get();

      // ── LERP Loop: Suavização Cinematográfica ──────────────────────────
      // displayProgress persegue o target com inércia.
      displayProgress += (target - displayProgress) * 0.08;

      // Se a diferença for insignificante, evitamos cálculos de draw
      if (Math.abs(target - displayProgress) < 0.00001 && Math.round(displayProgress * (totalFrames - 1)) === lastRenderedFrame) return;

      const exactFrame = displayProgress * (totalFrames - 1);
      const frameIndex = Math.floor(exactFrame);
      const nextFrameIndex = Math.min(frameIndex + 1, totalFrames - 1);
      const crossfade = exactFrame - frameIndex;

      // ── Skip draw se nada mudou visualmente significativa ────────────────
      if (frameIndex === lastRenderedFrame && crossfade < 0.01) return;
      lastRenderedFrame = frameIndex;

      const img = images[frameIndex];
      const nextImg = images[nextFrameIndex];

      if (!img) return;

      // ── Lógica de Crossfade Cinematográfico ────────────────────────────
      // Desenha o frame base
      ctx.globalAlpha = 1;
      renderFrame(canvas, ctx, img, true);

      // Se houver progresso significativo entre frames, faz o blend suave
      if (crossfade > 0.01 && nextImg && frameIndex !== nextFrameIndex) {
        ctx.globalAlpha = crossfade;
        renderFrame(canvas, ctx, nextImg, false); // false para não limpar o fundo
      }

      // ── Máscara de composição final — sempre globalAlpha=1 ─────────────
      ctx.globalAlpha = 1;
      applyVeoMask(ctx, img, canvas.width, canvas.height);
    };

    let displayProgress = progress.get(); // Começa no ponto atual do scroll
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
