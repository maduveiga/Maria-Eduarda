/**
 * getFramePath
 * Resolves the public URL for a numbered frame from the sequence folder.
 * Frames are named: frame-001.png → frame-122.png (zero-padded to 3 digits)
 */
export function getFramePath(index: number, folder = "/sequenciahero"): string {
  const padded = String(index + 1).padStart(3, "0");
  return `${folder}/frame-${padded}.png`;
}

/**
 * getTotalFrames
 * Returns the total number of frames in the sequence.
 */
export const TOTAL_FRAMES = 122;
