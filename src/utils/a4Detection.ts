/**
 * Lightweight A4 paper detection using canvas.
 * Finds a bright rectangular region and validates A4 aspect ratio (1:1.414).
 * No ML libraries — uses simple thresholding and bounding box analysis.
 */

const A4_RATIO = 1.414; // 297mm / 210mm
const RATIO_TOLERANCE = 0.15; // ±15% from ideal A4 ratio
const MIN_AREA_FRACTION = 0.08; // paper must cover at least 8% of frame
const BRIGHTNESS_THRESHOLD = 180; // white paper detection threshold

export interface A4Detection {
  detected: boolean;
  ratioOk: boolean;
  coveragePct: number;
  message: string;
}

/** Detect a bright rectangle (paper) in a video frame */
export function detectA4Paper(video: HTMLVideoElement, canvas: HTMLCanvasElement): A4Detection {
  const w = 120;
  const h = 90;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(video, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  // Build binary mask of bright pixels (paper candidates)
  let minX = w, maxX = 0, minY = h, maxY = 0;
  let brightCount = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      if (lum > BRIGHTNESS_THRESHOLD) {
        brightCount++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const totalPixels = w * h;
  const coveragePct = (brightCount / totalPixels) * 100;

  if (coveragePct < MIN_AREA_FRACTION * 100) {
    return { detected: false, ratioOk: false, coveragePct, message: "Place your foot on an A4 sheet for accurate measurement" };
  }

  // Check bounding box aspect ratio
  const boxW = maxX - minX;
  const boxH = maxY - minY;
  if (boxW < 10 || boxH < 10) {
    return { detected: false, ratioOk: false, coveragePct, message: "Align the paper inside the frame" };
  }

  const ratio = Math.max(boxW, boxH) / Math.min(boxW, boxH);
  const ratioOk = Math.abs(ratio - A4_RATIO) < A4_RATIO * RATIO_TOLERANCE;

  if (!ratioOk) {
    return { detected: true, ratioOk: false, coveragePct, message: "Align the paper squarely inside the frame" };
  }

  // Check fill density within bounding box (should be mostly bright)
  const boxArea = boxW * boxH;
  const fillRatio = brightCount / boxArea;

  if (fillRatio < 0.4) {
    return { detected: true, ratioOk: false, coveragePct, message: "Make sure the full sheet is visible" };
  }

  return { detected: true, ratioOk: true, coveragePct, message: "A4 paper detected" };
}
