import { SizeSystem } from "@/lib/types";

/** Street shoe sizes use standard whole/half increments */
const usStreetSizes = Array.from({ length: 25 }, (_, i) => String(4 + i * 0.5));
const euStreetSizes = Array.from({ length: 27 }, (_, i) => String(35 + i * 0.5));
const ukStreetSizes = Array.from({ length: 25 }, (_, i) => String(3 + i * 0.5));
const krStreetSizes = Array.from({ length: 21 }, (_, i) => String(220 + i * 5));

export const streetSizeOptions: Record<SizeSystem, string[]> = {
  US: usStreetSizes,
  EU: euStreetSizes,
  UK: ukStreetSizes,
  KR: krStreetSizes,
};

export const sizeLabels: Record<SizeSystem, string> = {
  US: "US",
  EU: "EU",
  UK: "UK",
  KR: "KR (mm)",
};
