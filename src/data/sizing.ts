// Unified sizing data across all major climbing shoe brands
// Size conversions and brand-specific fit advice

export interface BrandSizing {
  brand: string;
  /** How many EU sizes to downsize from street shoe for performance fit */
  performanceDownsize: number;
  /** How many EU sizes to downsize from street shoe for comfort fit */
  comfortDownsize: number;
  /** General fit tendency */
  fitTendency: "runs-small" | "true-to-size" | "runs-large";
  /** Brand-specific sizing notes */
  notes: string;
}

export const brandSizing: BrandSizing[] = [
  {
    brand: "La Sportiva",
    performanceDownsize: 1.5,
    comfortDownsize: 0.5,
    fitTendency: "runs-small",
    notes:
      "La Sportiva uses Italian sizing which runs about 0.5-1 EU size smaller than other brands. Their performance shoes (Solution, Skwama, Theory) fit very snug. Beginners should start 0.5 EU above street size. Unlined shoes stretch 0.5-1 full size.",
  },
  {
    brand: "Scarpa",
    performanceDownsize: 1.0,
    comfortDownsize: 0,
    fitTendency: "true-to-size",
    notes:
      "Scarpa tends to be true to EU size. Their shoes run slightly wider than La Sportiva. The Instinct line fits medium-volume feet well. Drago runs narrow. Origin and Veloce are generous for beginners.",
  },
  {
    brand: "Five Ten",
    performanceDownsize: 1.0,
    comfortDownsize: 0,
    fitTendency: "true-to-size",
    notes:
      "Five Ten (Adidas) shoes are generally true to US street shoe size for comfort fit. Stealth rubber is famously sticky. The Hiangle runs narrow; Moccasym stretches significantly as unlined leather.",
  },
  {
    brand: "Evolv",
    performanceDownsize: 0,
    comfortDownsize: -1.0,
    fitTendency: "runs-small",
    notes:
      "Evolv does NOT recommend downsizing. Start at street shoe size for performance fit, go 1-2 sizes UP for comfort. Their shoes run small compared to other brands. Shaman is their widest aggressive shoe.",
  },
  {
    brand: "Butora",
    performanceDownsize: 0.5,
    comfortDownsize: 0,
    fitTendency: "true-to-size",
    notes:
      "Butora offers many models in both narrow and wide versions (marked 'N' or 'W'). True to street shoe size for comfort. Their NEO Fuse rubber is soft and sticky.",
  },
  {
    brand: "Mad Rock",
    performanceDownsize: 1.0,
    comfortDownsize: 0,
    fitTendency: "true-to-size",
    notes:
      "Mad Rock shoes are generally true to size. Known for good value. Science Friction rubber performs well. Concave soles on performance models add power.",
  },
  {
    brand: "Unparallel",
    performanceDownsize: 0.5,
    comfortDownsize: 0,
    fitTendency: "true-to-size",
    notes:
      "Unparallel shoes fit true to size. RH rubber compound is very sticky. Many models come in LV (low volume) versions for narrower feet. TN Pro and Flagship are their top performers.",
  },
  {
    brand: "Tenaya",
    performanceDownsize: 0.5,
    comfortDownsize: 0,
    fitTendency: "runs-large",
    notes:
      "Tenaya tends to run slightly larger. Known for wider toe boxes than Italian brands. The Iati and Oasi are popular for wider feet. Great for Roman and German foot types.",
  },
  {
    brand: "Ocun",
    performanceDownsize: 1.0,
    comfortDownsize: 0,
    fitTendency: "true-to-size",
    notes:
      "Ocun is a Czech brand offering excellent value. Cat rubber performs well. Their shoes tend to fit medium width. Bullit and Ozone are popular beginner/intermediate options.",
  },
  {
    brand: "Black Diamond",
    performanceDownsize: 0.5,
    comfortDownsize: 0,
    fitTendency: "true-to-size",
    notes:
      "Black Diamond shoes fit true to size with a medium-width last. NEO Fuse and BlackLabel rubber options. Zone and Shadow are their performance models. Good value across the range.",
  },
  {
    brand: "Boreal",
    performanceDownsize: 0.5,
    comfortDownsize: 0,
    fitTendency: "true-to-size",
    notes:
      "Boreal is a Spanish brand, one of the original climbing shoe makers. Zenith rubber is their proprietary compound. Shoes generally fit true to size with medium width.",
  },
  {
    brand: "Red Chili",
    performanceDownsize: 0.5,
    comfortDownsize: 0,
    fitTendency: "true-to-size",
    notes:
      "Red Chili is a German brand. Their VCR rubber is grippy. Shoes tend to fit medium-to-wide. Voltage line is their top performance series. Good value for the quality.",
  },
  {
    brand: "So iLL",
    performanceDownsize: 0.5,
    comfortDownsize: 0,
    fitTendency: "true-to-size",
    notes:
      "So iLL uses Dark Matter rubber. Shoes are true to size with a street-style aesthetic. Known for comfortable gym shoes. The Runner and Kick are popular all-rounders.",
  },
];

// Universal EU to US/UK/cm conversion chart
export const sizeChart = {
  mens: [
    { eu: 35, us: 4, uk: 3, cm: 22.5 },
    { eu: 35.5, us: 4.5, uk: 3.5, cm: 22.8 },
    { eu: 36, us: 4.5, uk: 3.5, cm: 23.0 },
    { eu: 36.5, us: 5, uk: 4, cm: 23.5 },
    { eu: 37, us: 5.5, uk: 4.5, cm: 23.8 },
    { eu: 37.5, us: 5.5, uk: 4.5, cm: 24.0 },
    { eu: 38, us: 6, uk: 5, cm: 24.5 },
    { eu: 38.5, us: 6.5, uk: 5.5, cm: 24.8 },
    { eu: 39, us: 7, uk: 6, cm: 25.0 },
    { eu: 39.5, us: 7, uk: 6, cm: 25.3 },
    { eu: 40, us: 7.5, uk: 6.5, cm: 25.5 },
    { eu: 40.5, us: 8, uk: 7, cm: 25.8 },
    { eu: 41, us: 8.5, uk: 7.5, cm: 26.0 },
    { eu: 41.5, us: 8.5, uk: 7.5, cm: 26.3 },
    { eu: 42, us: 9, uk: 8, cm: 26.5 },
    { eu: 42.5, us: 9.5, uk: 8.5, cm: 27.0 },
    { eu: 43, us: 10, uk: 9, cm: 27.5 },
    { eu: 43.5, us: 10.5, uk: 9.5, cm: 27.8 },
    { eu: 44, us: 11, uk: 10, cm: 28.0 },
    { eu: 44.5, us: 11.5, uk: 10.5, cm: 28.5 },
    { eu: 45, us: 12, uk: 11, cm: 29.0 },
    { eu: 45.5, us: 12.5, uk: 11.5, cm: 29.3 },
    { eu: 46, us: 13, uk: 12, cm: 29.5 },
    { eu: 47, us: 13.5, uk: 12.5, cm: 30.0 },
    { eu: 48, us: 14, uk: 13, cm: 30.5 },
  ],
  womens: [
    { eu: 34, us: 4, uk: 1.5, cm: 21.5 },
    { eu: 34.5, us: 4.5, uk: 2, cm: 22.0 },
    { eu: 35, us: 5, uk: 2.5, cm: 22.5 },
    { eu: 35.5, us: 5.5, uk: 3, cm: 22.8 },
    { eu: 36, us: 6, uk: 3.5, cm: 23.0 },
    { eu: 36.5, us: 6.5, uk: 4, cm: 23.5 },
    { eu: 37, us: 7, uk: 4.5, cm: 23.8 },
    { eu: 37.5, us: 7.5, uk: 5, cm: 24.0 },
    { eu: 38, us: 8, uk: 5.5, cm: 24.5 },
    { eu: 38.5, us: 8.5, uk: 6, cm: 24.8 },
    { eu: 39, us: 9, uk: 6.5, cm: 25.0 },
    { eu: 39.5, us: 9.5, uk: 7, cm: 25.3 },
    { eu: 40, us: 10, uk: 7.5, cm: 25.5 },
    { eu: 40.5, us: 10.5, uk: 8, cm: 25.8 },
    { eu: 41, us: 11, uk: 8.5, cm: 26.0 },
  ],
};

/**
 * Get recommended climbing shoe EU size based on street shoe size and brand
 */
export function getRecommendedSize(
  streetSize: number,
  sizeSystem: "US" | "EU",
  brand: string,
  experience: "beginner" | "intermediate" | "advanced" | "expert"
): { eu: number; note: string } {
  // Convert to EU if needed
  let euSize = streetSize;
  if (sizeSystem === "US") {
    const match = sizeChart.mens.find((s) => s.us === streetSize);
    euSize = match ? match.eu : streetSize + 33; // rough fallback
  }

  const brandData = brandSizing.find(
    (b) => b.brand.toLowerCase() === brand.toLowerCase()
  );
  if (!brandData) {
    return { eu: euSize, note: "No brand-specific data available." };
  }

  const isPerformance = experience === "advanced" || experience === "expert";
  const downsize = isPerformance
    ? brandData.performanceDownsize
    : brandData.comfortDownsize;

  const recommendedEu = euSize - downsize;

  return {
    eu: recommendedEu,
    note: brandData.notes,
  };
}
