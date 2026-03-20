/**
 * Actual EU size increments offered by each brand.
 * Researched from official brand websites and authorized retailers.
 * Brands use different increment systems: whole, half, third, quarter, or irregular.
 */

export type BrandSizeSystem = "half" | "third" | "whole" | "quarter" | "irregular";

export interface BrandSizeInfo {
  brand: string;
  system: BrandSizeSystem;
  euSizes: number[];
}

export const brandSizes: BrandSizeInfo[] = [
  {
    brand: "La Sportiva",
    system: "half",
    euSizes: [
      33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5,
      38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5,
      43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48,
    ],
  },
  {
    brand: "Scarpa",
    system: "half",
    euSizes: [
      35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5,
      40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45,
    ],
  },
  {
    // Five Ten uses Adidas third-size system
    brand: "Five Ten",
    system: "third",
    euSizes: [
      36, 36.67, 37.33, 38, 38.67, 39.33, 40, 40.67, 41.33,
      42, 42.67, 43.33, 44, 44.67, 45.33, 46, 46.67, 47.33, 48,
    ],
  },
  {
    brand: "Evolv",
    system: "irregular",
    euSizes: [
      35.5, 36, 37, 37.5, 38, 39, 39.5, 40, 41, 41.5,
      42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48,
    ],
  },
  {
    brand: "Black Diamond",
    system: "irregular",
    euSizes: [
      35.5, 36, 37, 37.5, 38, 39, 39.5, 40, 41, 41.5,
      42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48,
    ],
  },
  {
    brand: "Unparallel",
    system: "half",
    euSizes: [
      34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5,
      40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5,
      45, 45.5, 46, 46.5, 47, 47.5, 48,
    ],
  },
  {
    // Tenaya uses whole EU sizes only
    brand: "Tenaya",
    system: "whole",
    euSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
  },
  {
    brand: "Red Chili",
    system: "irregular",
    euSizes: [
      34, 34.5, 35, 35.5, 36, 37, 37.5, 38, 38.5, 39,
      40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47, 47.5, 48,
    ],
  },
  {
    // Boreal uses UK-derived quarter sizes
    brand: "Boreal",
    system: "quarter",
    euSizes: [
      35, 35.5, 36.25, 37, 37.5, 38, 38.75, 39.5, 40, 40.75,
      41.5, 42, 42.5, 43.25, 44, 44.5, 45.25, 46, 46.5, 47, 47.75, 48.5,
    ],
  },
  {
    brand: "Ocun",
    system: "irregular",
    euSizes: [
      35, 36, 37, 37.5, 38, 38.5, 39, 40, 41, 41.5,
      42, 42.5, 43, 44, 45, 45.5, 46, 46.5, 47, 48,
    ],
  },
  {
    brand: "Butora",
    system: "irregular",
    euSizes: [
      34.5, 35, 35.5, 36, 37, 37.5, 38, 39, 39.5, 40,
      41, 41.5, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48,
    ],
  },
  {
    brand: "Mad Rock",
    system: "irregular",
    euSizes: [
      34.5, 35, 35.5, 36, 37, 37.5, 38, 39, 39.5, 40,
      41, 41.5, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48.5,
    ],
  },
  {
    brand: "So iLL",
    system: "irregular",
    euSizes: [
      34.5, 35, 35.5, 36, 37, 37.5, 38, 39, 39.5, 40,
      41, 41.5, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48,
    ],
  },
];

/** Format a EU size for display — handles thirds and quarters */
export function formatEuSize(size: number): string {
  const frac = size % 1;
  const whole = Math.floor(size);

  if (frac === 0) return String(whole);
  if (Math.abs(frac - 0.5) < 0.01) return `${whole}.5`;
  if (Math.abs(frac - 0.25) < 0.01) return `${whole}¼`;
  if (Math.abs(frac - 0.75) < 0.01) return `${whole}¾`;
  // Third sizes (Five Ten / Adidas)
  if (Math.abs(frac - 0.33) < 0.02) return `${whole}⅓`;
  if (Math.abs(frac - 0.67) < 0.02) return `${whole}⅔`;

  return size.toFixed(1);
}

/** Get brand size info, falling back to standard half sizes */
export function getBrandSizes(brand: string): BrandSizeInfo {
  const found = brandSizes.find(
    (b) => b.brand.toLowerCase() === brand.toLowerCase()
  );
  if (found) return found;

  // Fallback: standard half-size range
  return {
    brand,
    system: "half",
    euSizes: Array.from({ length: 27 }, (_, i) => 35 + i * 0.5),
  };
}
