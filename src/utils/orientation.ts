/** Check if phone is roughly pointing straight down (beta ≈ 90°) */
export function isTopDownAngle(beta: number | null, tolerance = 10): boolean {
  if (beta === null) return false;
  return Math.abs(beta - 90) <= tolerance;
}

/** Check if phone is roughly horizontal for side view (beta ≈ 0°) */
export function isSideAngle(beta: number | null, tolerance = 15): boolean {
  if (beta === null) return false;
  return Math.abs(beta) <= tolerance;
}

/** Safari 13+ requires explicit permission request triggered by user gesture */
export function needsOrientationPermission(): boolean {
  return typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown }).requestPermission === "function";
}
