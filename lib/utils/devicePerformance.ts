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
  // Mobile com menos de 4 núcleos ou menos de 3GB → baixo desempenho
  if (isMobile && (cores < 4 || memory < 3)) return "low";
  // Mobile com 4+ núcleos e 3GB+ → tier médio (não alto, para preservar bateria)
  if (isMobile) return "medium";
  if (cores >= 8 && memory >= 6) return "high";
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
    case "high":   return 1; // Todos os 122 frames
    case "medium": return 2; // A cada 2 frames → 61 keyframes (mobile mid-range, tablets)
    case "low":    return 3; // A cada 3 frames → ~41 keyframes (mobile low-end)
  }
}

/**
 * getDevicePixelRatio
 * Caps the DPR to 2 on low-tier devices to avoid memory pressure.
 */
export function getDevicePixelRatio(tier: PerformanceTier): number {
  const dpr = window.devicePixelRatio ?? 1;
  // DPR reduzido em mobile economiza MUITO em memória de canvas e GPU
  if (tier === "low")    return Math.min(dpr, 1.0); // 1x máximo — canvas menor, rendering muito mais rápido
  if (tier === "medium") return Math.min(dpr, 1.5); // 1.5x — balanço qualidade/performance em mobile
  return Math.min(dpr, 2.5); // Desktop high-end — suporte até 2.5x
}
