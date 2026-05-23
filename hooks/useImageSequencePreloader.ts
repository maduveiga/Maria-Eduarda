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
 * Preloads all frames from the sequence folder into memory.
 * Returns the image array, loading progress, and ready state.
 *
 * Strategy:
 * - Priority-loads first 10 frames immediately (for instant first-frame display)
 * - Then loads remaining frames in parallel batches
 * - Caches all images in a ref to avoid garbage collection
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

    // Build list of frame indices to load (respecting step for low-tier devices)
    const indices: number[] = [];
    for (let i = 0; i < totalFrames; i += step) {
      indices.push(i);
    }

    const total = indices.length;
    let loaded = 0;

    // Pre-allocate array
    const images = new Array<HTMLImageElement>(totalFrames);

    const loadOne = (index: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = getFramePath(index, folder);

        const onFinish = () => {
          images[index] = img;
          if (step === 2 && index + 1 < totalFrames) {
            images[index + 1] = img;
          }
          loaded++;
          const progress = loaded / total;
          setState((prev) => ({ ...prev, progress }));
          resolve();
        };

        img.onload = onFinish;
        img.onerror = onFinish;
      });

    // Load in fast, dense parallel batches without artificial delays to hit 100% ASAP
    const BATCH_SIZE = 30; // Max parallel connections
    for (let i = 0; i < total; i += BATCH_SIZE) {
      const batch = indices.slice(i, i + BATCH_SIZE);
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
