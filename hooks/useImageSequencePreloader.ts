"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getFramePath, TOTAL_FRAMES } from "@/lib/canvas/getFramePath";
import {
  getDevicePerformanceTier,
  getFrameStep,
} from "@/lib/utils/devicePerformance";

export interface PreloaderState {
  images: HTMLImageElement[];
  isLoaded: boolean;
  progress: number; // 0–1
  error: string | null;
}

/**
 * useImageSequencePreloader
 *
 * Estratégia de carregamento em duas fases:
 * 1. Fase Prioritária — primeiros 6 frames carregam IMEDIATAMENTE
 *    → o usuário vê o primeiro frame em < 500ms mesmo em mobile lento
 * 2. Fase Principal — restante carrega em batches adaptativos
 *    → mobile: batches menores (10 req paralelas) para não saturar a rede
 *    → desktop: batches maiores (25 req paralelas) para velocidade máxima
 */
export function useImageSequencePreloader(
  folder = "/sequenciahero",
  totalFrames = TOTAL_FRAMES
): PreloaderState {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [state, setState] = useState<PreloaderState>({
    images: [],
    isLoaded: false,
    progress: 0,
    error: null,
  });

  const loadImages = useCallback(async () => {
    const tier = getDevicePerformanceTier();
    const step = getFrameStep(tier);

    // Tamanho de batch adaptativo — mobile usa menos conexões paralelas
    const isMobile = window.innerWidth < 1024;
    const BATCH_SIZE = isMobile ? 10 : 25;

    // Build lista de índices respeitando o step do dispositivo
    const indices: number[] = [];
    for (let i = 0; i < totalFrames; i += step) {
      indices.push(i);
    }

    const total = indices.length;
    let loaded = 0;

    const images = new Array<HTMLImageElement>(totalFrames);

    const loadOne = (index: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = getFramePath(index, folder);

        const onFinish = () => {
          images[index] = img;
          // Preenche frames intermediários (para step > 1)
          for (let s = 1; s < step && index + s < totalFrames; s++) {
            images[index + s] = img;
          }
          loaded++;
          setState((prev) => ({ ...prev, progress: loaded / total }));
          resolve();
        };

        img.onload = onFinish;
        img.onerror = onFinish;
      });

    // ── FASE 1: Prioridade — primeiros 6 frames (aparece rápido na tela) ──
    const PRIORITY_COUNT = Math.min(6, indices.length);
    const priorityIndices = indices.slice(0, PRIORITY_COUNT);
    await Promise.all(priorityIndices.map(loadOne));
    imagesRef.current = [...images];

    // Disponibiliza os primeiros frames imediatamente (ainda não "isLoaded")
    setState((prev) => ({ ...prev, images: [...images] }));

    // ── FASE 2: Restante em batches adaptativos ────────────────────────
    const remainingIndices = indices.slice(PRIORITY_COUNT);
    for (let i = 0; i < remainingIndices.length; i += BATCH_SIZE) {
      const batch = remainingIndices.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(loadOne));
      imagesRef.current = [...images];
    }

    setState({
      images,
      isLoaded: true,
      progress: 1,
      error: null,
    });
  }, [folder, totalFrames]);

  useEffect(() => {
    loadImages().catch((err) => {
      setState((prev) => ({
        ...prev,
        error: String(err),
        isLoaded: true,
      }));
    });
  }, [loadImages]);

  return state;
}
