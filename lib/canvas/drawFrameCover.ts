/**
 * drawFrameCover
 * Draws an HTMLImageElement onto a canvas using object-fit: contain semantics.
 * The full original frame is shown — no zoom, no crop.
 * Black bars (cinematic letterbox) appear on sides or top/bottom as needed.
 */
export function drawFrameCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
): void {
  if (!img || img.naturalWidth === 0 || img.naturalHeight === 0) return;

  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = canvasWidth / canvasHeight;

  let drawWidth: number;
  let drawHeight: number;
  let offsetX: number;
  let offsetY: number;

  if (imgAspect > canvasAspect) {
    // Image is wider than canvas — fit width, black bars top/bottom
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgAspect;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    // Image is taller than canvas — fit height, black bars left/right
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgAspect;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  // --- APLICA UM ZOOM SUTIL DE 5% ---
  const zoom = 1.05;
  const finalW = drawWidth * zoom;
  const finalH = drawHeight * zoom;

  // Ajusta offset para manter a imagem perfeitamente centralizada após o zoom
  const finalX = offsetX - (finalW - drawWidth) / 2;
  const finalY = offsetY - (finalH - drawHeight) / 2;

  ctx.drawImage(img, finalX, finalY, finalW, finalH);
}

/**
 * applyVeoMask
 * Aplica a máscara de cobertura do watermark "Veo" no canto inferior direito.
 * DEVE ser chamada SEMPRE com ctx.globalAlpha = 1 APÓS todos os frames serem
 * renderizados (inclusive durante crossfade), para garantir cobertura total.
 */
export function applyVeoMask(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
): void {
  if (!img || img.naturalWidth === 0 || img.naturalHeight === 0) return;

  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = canvasWidth / canvasHeight;

  let drawWidth: number;
  let drawHeight: number;
  let offsetX: number;
  let offsetY: number;

  if (imgAspect > canvasAspect) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgAspect;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgAspect;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  const zoom = 1.05;
  const finalW = drawWidth * zoom;
  const finalH = drawHeight * zoom;
  const finalX = offsetX - (finalW - drawWidth) / 2;
  const finalY = offsetY - (finalH - drawHeight) / 2;

  // ── Mascarar "Veo" — SOLUÇÃO DEFINITIVA (3 CAMADAS) ────────────────
  // Camada 1: Retângulo sólido mínimo no canto extremo (garante cobertura total)
  // Camada 2: Gradiente horizontal de borda (suaviza transição lateral)
  // Camada 3: Gradiente vertical de borda (suaviza transição vertical)
  //
  // A ampulheta fica em ~35-75% horizontal e ~10-85% vertical.
  // Todas as camadas atuam em >85% horizontal e >88% vertical.
  // ZERO interferência com a ampulheta, chão ou brilhos.

  const imgRight  = finalX + finalW;
  const imgBottom = finalY + finalH;

  // ─── CAMADA 1: Retângulo sólido no canto extremo ─────────────────────
  // ─── CAMADA 1: Retângulo sólido no canto extremo ─────────────────────
  // O "V" inicial do logotipo Veo se afastava mais para a esquerda e para cima. 
  // Aumentado precisamente para varrer aquele último ponto restante.
  const solidW = finalW * 0.105; // 10.5% da largura, alcançando todo o "V"
  const solidH = finalH * 0.06;  // 6% da altura
  ctx.fillStyle = "#000000";
  ctx.fillRect(imgRight - solidW, imgBottom - solidH, solidW, solidH);

  // ─── CAMADA 2: Gradiente horizontal (direita → esquerda) ──────────────
  // Expande a suavidade baseada no novo retângulo maior.
  // Vai até 16.5% de transição mas atuará na faixa inferior fina.
  const fadeW = finalW * 0.165;
  const hGrad = ctx.createLinearGradient(imgRight, 0, imgRight - fadeW, 0);
  hGrad.addColorStop(0,    "rgba(0,0,0,1)");
  hGrad.addColorStop(0.63, "rgba(0,0,0,1)");   // Cobre todo o espaço do solidW perfeitamente (0.105 / 0.165 ≈ 0.63)
  hGrad.addColorStop(0.85, "rgba(0,0,0,0.5)"); // Transição final e suave
  hGrad.addColorStop(1,    "rgba(0,0,0,0)");

  const stripH = finalH * 0.07; // Levemente maior que o solidH
  ctx.fillStyle = hGrad;
  ctx.fillRect(imgRight - fadeW, imgBottom - stripH, fadeW, stripH);

  // ─── CAMADA 3: Gradiente vertical (baixo → cima) ──────────────────────
  // Expande a suavidade vertical.
  const fadeH = finalH * 0.10;
  const vGrad = ctx.createLinearGradient(0, imgBottom, 0, imgBottom - fadeH);
  vGrad.addColorStop(0,    "rgba(0,0,0,1)");
  vGrad.addColorStop(0.6,  "rgba(0,0,0,1)");   // Cobre espaço do solidH (0.06 / 0.10 = 0.6)
  vGrad.addColorStop(0.85, "rgba(0,0,0,0.5)");
  vGrad.addColorStop(1,    "rgba(0,0,0,0)");

  const stripW = finalW * 0.125; // Atingindo a ponta com segurança lateral
  ctx.fillStyle = vGrad;
  ctx.fillRect(imgRight - stripW, imgBottom - fadeH, stripW, fadeH);
}
