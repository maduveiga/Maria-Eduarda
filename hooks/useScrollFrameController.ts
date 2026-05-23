"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useScrollFrameController
 *
 * Maps scroll progress within a target element to a smoothed frame index.
 *
 * - Reads raw scroll position via native scroll events
 * - Applies lerp (linear interpolation) for cinematic inertia
 * - Exposes both raw progress (0–1) and smoothed frameIndex
 * - requestAnimationFrame loop ensures sub-frame precision
 */

export interface ScrollFrameState {
  rawProgress: number;    // 0–1, instant scroll position
  progress: number;       // 0–1, lerped smooth progress
  frameIndex: number;     // integer, maps progress to frame
}

// Double-lerp is removed since useLenisScroll globally smooths the physical scroll value.

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function useScrollFrameController(
  totalFrames: number,
  containerRef: React.RefObject<HTMLElement>
): ScrollFrameState {
  const rawProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [state, setState] = useState<ScrollFrameState>({
    rawProgress: 0,
    progress: 0,
    frameIndex: 0,
  });

  useEffect(() => {
    const animate = () => {
      const container = containerRef.current;
      if (container) {
        // Read native layout geometry natively inside the 60hz render loop
        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        const scrollableDistance = containerHeight - viewportHeight;
        if (scrollableDistance > 0) {
          const scrolled = -rect.top;
          const raw = clamp(scrolled / scrollableDistance, 0, 1);
          const targetFrame = Math.min(Math.round(raw * (totalFrames - 1)), totalFrames - 1);

          // Only trigger a React re-render if the integer frame actually changed,
          // saving massive amounts of Virtual DOM recalculations which causes typical stutters.
          if (targetFrame !== smoothProgressRef.current) {
            smoothProgressRef.current = targetFrame;
            setState({
              rawProgress: raw,
              progress: raw,
              frameIndex: targetFrame,
            });
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Kick off the loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, totalFrames]);

  return state;
}
