import { drawFrameCover } from "./drawFrameCover";

/**
 * renderFrame
 * Clears the canvas and draws the given image using cover semantics.
 * Only renders if the image is fully loaded.
 */
export function renderFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  clearCanvas: boolean = true
): void {
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const { width, height } = canvas;

  if (clearCanvas) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
  }

  // Draw with cover-fit
  drawFrameCover(ctx, img, width, height);
}
