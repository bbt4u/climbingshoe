/** Minimum brightness (0-255) for an acceptable photo */
export const MIN_BRIGHTNESS = 75;

/** Calculate average perceived luminance from ImageData. Samples every Nth pixel for performance. */
export function getAverageBrightness(imageData: ImageData, sampleRate = 20): number {
  const { data } = imageData;
  let sum = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += sampleRate * 4) {
    // Perceived luminance: 0.299R + 0.587G + 0.114B
    sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    count++;
  }

  return count > 0 ? sum / count : 0;
}

export function isBrightEnough(imageData: ImageData): boolean {
  return getAverageBrightness(imageData) >= MIN_BRIGHTNESS;
}
