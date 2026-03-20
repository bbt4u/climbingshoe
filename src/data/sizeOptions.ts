import { SizeSystem, FootWidth } from "@/lib/types";

const usSizes = Array.from({ length: 25 }, (_, i) => String(4 + i * 0.5));
const euSizes = Array.from({ length: 16 }, (_, i) => String(35 + i));
const ukSizes = Array.from({ length: 25 }, (_, i) => String(3 + i * 0.5));
const krSizes = Array.from({ length: 21 }, (_, i) => String(220 + i * 5));

export const sizeOptions: Record<SizeSystem, string[]> = {
  US: usSizes,
  EU: euSizes,
  UK: ukSizes,
  KR: krSizes,
};

export const sizeLabels: Record<SizeSystem, string> = {
  US: "US",
  EU: "EU",
  UK: "UK",
  KR: "KR (mm)",
};

export const widthInfo: Record<FootWidth, string> = {
  narrow: "Slim profile",
  medium: "Standard fit",
  wide: "Broad profile",
};
