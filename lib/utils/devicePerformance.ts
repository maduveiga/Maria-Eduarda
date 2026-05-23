/**
 * devicePerformance
 * Detects device capability to enable graceful degradation:
 * - "high"   → full frame density, all atmospheric layers
 * - "medium" → slightly reduced atmospheric overlays
 * - "low"    → reduced frame density, minimal overlays
 */

export type PerformanceTier = "high" | "medium" | "low";

export function getDevicePerformanceTier(): PerformanceTier {
  if (typeof window === "undefined") return "high";

  // Check for hardware concurrency
  const cores = navigator.hardwareConcurrency ?? 4;

  // Check for device memory (Chrome-only API)
  const memory = (navigator as any).deviceMemory ?? 4;

  // Check for battery-saver mode via prefers-reduced-motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile detection
  const isMobile =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (prefersReduced) return "low";
  if (isMobile && (cores < 4 || memory < 2)) return "low";
  if (isMobile) return "medium";
  if (cores >= 8 && memory >= 4) return "high";
  if (cores >= 4 && memory >= 2) return "medium";

  return "low";
}



/**
 * getFrameStep
 * Returns how many source frames to skip per canvas frame based on device tier.
 * step=1 → all 122 frames. step=2 → every other frame (61 keyframes), etc.
 */
export function getFrameStep(tier: PerformanceTier): number {
  switch (tier) {
    case "high":   return 1;
    case "medium": return 1;
    case "low":    return 2;
  }
}

/**
 * getDevicePixelRatio
 * Caps the DPR to 2 on low-tier devices to avoid memory pressure.
 */
export function getDevicePixelRatio(tier: PerformanceTier): number {
  const dpr = window.devicePixelRatio ?? 1;
  if (tier === "low") return Math.min(dpr, 1.5);
  if (tier === "medium") return Math.min(dpr, 2);
  return Math.min(dpr, 3); // Support up to 3x DPR (true 4k feeling on high-end devices)
}
