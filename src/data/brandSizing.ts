import { BrandSizingData } from "@/lib/types";

/**
 * Brand sizing data for Evolv and Five Ten (Adidas).
 *
 * IMPORTANT: WebFetch was unavailable at generation time (2026-03-13).
 * This data is based on established brand sizing charts and publicly
 * available product specs. Verify against live sources before production use:
 *   - https://www.evolvsports.com/sizing
 *   - https://www.adidas.com/us/five_ten-climbing-shoes
 */

export const evolvSizing: BrandSizingData = {
  brand: "Evolv",
  sizeChart: {
    mens: [
      { us: 4, eu: 36, uk: 3, cm: 22.0 },
      { us: 4.5, eu: 36.5, uk: 3.5, cm: 22.4 },
      { us: 5, eu: 37, uk: 4, cm: 22.9 },
      { us: 5.5, eu: 37.5, uk: 4.5, cm: 23.3 },
      { us: 6, eu: 38, uk: 5, cm: 23.7 },
      { us: 6.5, eu: 38.5, uk: 5.5, cm: 24.1 },
      { us: 7, eu: 39, uk: 6, cm: 24.5 },
      { us: 7.5, eu: 39.5, uk: 6.5, cm: 24.9 },
      { us: 8, eu: 40.5, uk: 7, cm: 25.4 },
      { us: 8.5, eu: 41, uk: 7.5, cm: 25.8 },
      { us: 9, eu: 42, uk: 8, cm: 26.2 },
      { us: 9.5, eu: 42.5, uk: 8.5, cm: 26.7 },
      { us: 10, eu: 43, uk: 9, cm: 27.1 },
      { us: 10.5, eu: 43.5, uk: 9.5, cm: 27.5 },
      { us: 11, eu: 44, uk: 10, cm: 27.9 },
      { us: 11.5, eu: 44.5, uk: 10.5, cm: 28.3 },
      { us: 12, eu: 45, uk: 11, cm: 28.7 },
      { us: 13, eu: 46, uk: 12, cm: 29.6 },
      { us: 14, eu: 47, uk: 13, cm: 30.5 },
    ],
    womens: [
      { us: 4, eu: 35, uk: 2, cm: 21.0 },
      { us: 4.5, eu: 35.5, uk: 2.5, cm: 21.4 },
      { us: 5, eu: 36, uk: 3, cm: 21.9 },
      { us: 5.5, eu: 36.5, uk: 3.5, cm: 22.3 },
      { us: 6, eu: 37, uk: 4, cm: 22.7 },
      { us: 6.5, eu: 37.5, uk: 4.5, cm: 23.1 },
      { us: 7, eu: 38, uk: 5, cm: 23.5 },
      { us: 7.5, eu: 38.5, uk: 5.5, cm: 23.9 },
      { us: 8, eu: 39, uk: 6, cm: 24.4 },
      { us: 8.5, eu: 39.5, uk: 6.5, cm: 24.8 },
      { us: 9, eu: 40.5, uk: 7, cm: 25.2 },
      { us: 9.5, eu: 41, uk: 7.5, cm: 25.6 },
      { us: 10, eu: 42, uk: 8, cm: 26.0 },
      { us: 10.5, eu: 42.5, uk: 8.5, cm: 26.5 },
      { us: 11, eu: 43, uk: 9, cm: 26.9 },
    ],
  },
  sizingAdvice: {
    streetShoeRelation:
      "Evolv climbing shoes generally fit 0.5 to 1 full US size smaller than street shoes for a performance fit. Beginners may prefer half-size down from street shoe; advanced climbers often go 1-2 sizes down.",
    generalAdvice: [
      "Evolv shoes use synthetic (Synthratek) uppers on most models, which stretch minimally (about 0.25 size). Leather-lined models stretch more.",
      "The Shaman and Phantom run slightly wider than other aggressive brands, making Evolv a strong choice for wider feet.",
      "For a comfortable fit (gym/all-day use), go half-size down from street shoe. For a performance fit (bouldering), go 1-1.5 sizes down.",
      "Measure your foot in cm and use the size chart directly for the most accurate fit, as US/EU conversions vary between brands.",
      "Evolv's Love Bump midsole (on Shaman/Phantom) creates a slight arch bump -- if you have flat feet, you may need to size up 0.5.",
    ],
    beginnerTip:
      "Start with the Evolv Defy or Elektra (women's) in your street shoe size or half-size down. You want toes touching the front with no dead space, but no painful curling.",
    advancedTip:
      "For aggressive models (Shaman, Phantom), size 1-2 sizes down from street shoe. Toes should be curled and the heel should have zero dead space. Break-in will relax the fit slightly.",
  },
  boulderingModels: [
    {
      id: "evolv-shaman",
      name: "Shaman",
      closure: "velcro",
      rubber: "TRAX XT-5 (4.2mm)",
      aggressiveness: "aggressive",
      price: "$155-175",
      keySpecs: [
        "Dual velcro straps",
        "Love Bump midsole technology",
        "Synthratek upper (minimal stretch)",
        "Wide toe box relative to other aggressive shoes",
        "Knit tongue for comfort",
        "M-FIT 3D molded heel cup",
      ],
    },
    {
      id: "evolv-phantom",
      name: "Phantom",
      closure: "velcro",
      rubber: "TRAX XT-5 (3.5mm)",
      aggressiveness: "aggressive",
      price: "$170-190",
      keySpecs: [
        "Single velcro strap",
        "Ultra-lightweight (~180g per shoe)",
        "Thinner rubber for maximum sensitivity",
        "Minimal material upper",
        "Love Bump midsole",
        "Competition-oriented design",
      ],
    },
    {
      id: "evolv-zenist",
      name: "Zenist",
      closure: "velcro",
      rubber: "TRAX XT-5 (4.2mm)",
      aggressiveness: "moderate",
      price: "$145-165",
      keySpecs: [
        "Dual velcro closure",
        "Moderate downturn for all-around performance",
        "Synthratek upper",
        "Good balance of edging and smearing",
        "Wider toe box than competitors",
        "Suitable for gym and outdoor bouldering",
      ],
    },
    {
      id: "evolv-defy",
      name: "Defy",
      closure: "velcro",
      rubber: "TRAX (4.2mm)",
      aggressiveness: "flat",
      price: "$79-99",
      keySpecs: [
        "Dual velcro closure",
        "Flat profile for comfort",
        "Synthratek upper",
        "Generous toe box",
        "Entry-level price point",
        "Good for gym bouldering basics",
      ],
    },
    {
      id: "evolv-x1",
      name: "X1",
      closure: "lace",
      rubber: "TRAX XT-5 (4.2mm)",
      aggressiveness: "moderate",
      price: "$149-169",
      keySpecs: [
        "Lace-up precision closure",
        "Moderate downturn",
        "TRAX XT-5 high-friction rubber",
        "All-around outdoor bouldering shoe",
        "Durable construction",
        "Good edging platform",
      ],
    },
  ],
};

export const fiveTenSizing: BrandSizingData = {
  brand: "Five Ten",
  sizeChart: {
    // Five Ten uses Adidas sizing (UK-based). Conversions below.
    mens: [
      { us: 5, eu: 37.3, uk: 4.5, cm: 23.0 },
      { us: 5.5, eu: 38, uk: 5, cm: 23.5 },
      { us: 6, eu: 38.7, uk: 5.5, cm: 23.9 },
      { us: 6.5, eu: 39.3, uk: 6, cm: 24.3 },
      { us: 7, eu: 40, uk: 6.5, cm: 24.8 },
      { us: 7.5, eu: 40.7, uk: 7, cm: 25.2 },
      { us: 8, eu: 41.3, uk: 7.5, cm: 25.6 },
      { us: 8.5, eu: 42, uk: 8, cm: 26.0 },
      { us: 9, eu: 42.7, uk: 8.5, cm: 26.5 },
      { us: 9.5, eu: 43.3, uk: 9, cm: 26.9 },
      { us: 10, eu: 44, uk: 9.5, cm: 27.3 },
      { us: 10.5, eu: 44.7, uk: 10, cm: 27.8 },
      { us: 11, eu: 45.3, uk: 10.5, cm: 28.2 },
      { us: 11.5, eu: 46, uk: 11, cm: 28.6 },
      { us: 12, eu: 46.7, uk: 11.5, cm: 29.0 },
      { us: 12.5, eu: 47.3, uk: 12, cm: 29.5 },
      { us: 13, eu: 48, uk: 12.5, cm: 29.9 },
      { us: 13.5, eu: 48.7, uk: 13, cm: 30.3 },
      { us: 14, eu: 49.3, uk: 13.5, cm: 30.8 },
    ],
    womens: [
      { us: 5, eu: 36, uk: 3.5, cm: 21.5 },
      { us: 5.5, eu: 36.7, uk: 4, cm: 22.0 },
      { us: 6, eu: 37.3, uk: 4.5, cm: 22.4 },
      { us: 6.5, eu: 38, uk: 5, cm: 22.8 },
      { us: 7, eu: 38.7, uk: 5.5, cm: 23.3 },
      { us: 7.5, eu: 39.3, uk: 6, cm: 23.7 },
      { us: 8, eu: 40, uk: 6.5, cm: 24.1 },
      { us: 8.5, eu: 40.7, uk: 7, cm: 24.6 },
      { us: 9, eu: 41.3, uk: 7.5, cm: 25.0 },
      { us: 9.5, eu: 42, uk: 8, cm: 25.4 },
      { us: 10, eu: 42.7, uk: 8.5, cm: 25.9 },
      { us: 10.5, eu: 43.3, uk: 9, cm: 26.3 },
      { us: 11, eu: 44, uk: 9.5, cm: 26.7 },
    ],
  },
  sizingAdvice: {
    streetShoeRelation:
      "Five Ten climbing shoes (under Adidas) generally run true to Adidas street shoe size or 0.5 size smaller. Because Five Ten uses Adidas sizing (UK-based), if you know your Adidas size, start there. Compared to non-Adidas street shoes, go 0.5-1 size down.",
    generalAdvice: [
      "Five Ten uses Adidas UK-based sizing. If you wear Adidas sneakers, your climbing shoe size is the same or 0.5 smaller.",
      "Stealth rubber is famously sticky but wears faster than Vibram. The trade-off is superior friction on plastic (gym) holds.",
      "Synthetic uppers (Hiangle, Crawe) stretch very little. Leather uppers (Moccasym) stretch up to a full size.",
      "Five Ten shoes tend to fit a medium-to-narrow last. Climbers with wide feet may find them tight in the toe box.",
      "For the Moccasym (unlined leather slipper), size 1-1.5 sizes down from street shoe -- it stretches significantly.",
      "The NIAD and Crawe are designed on modern lasts and tend to be more true-to-size than older Five Ten models.",
    ],
    beginnerTip:
      "Start with the Five Ten NIAD Lace or Crawe in your Adidas street shoe size. These offer a comfortable fit with enough performance to grow into. Toes should be flat and touching the end -- no curling needed.",
    advancedTip:
      "For the Hiangle, size 0.5-1 size down from Adidas street shoe. For the Aleon, try your Adidas size first. Competition climbers often size the Hiangle 1-1.5 down for maximum power transfer.",
  },
  boulderingModels: [
    {
      id: "five-ten-hiangle-pro",
      name: "Hiangle Pro",
      closure: "lace",
      rubber: "Stealth C4 (4.2mm)",
      aggressiveness: "aggressive",
      price: "$175-195",
      keySpecs: [
        "Lace-up precision closure",
        "Stealth C4 high-friction rubber",
        "Aggressive downturn",
        "Large toe patch for toe hooks",
        "Synthetic upper (minimal stretch)",
        "Competition-grade bouldering shoe",
      ],
    },
    {
      id: "five-ten-hiangle",
      name: "Hiangle",
      closure: "lace",
      rubber: "Stealth C4 (4.2mm)",
      aggressiveness: "aggressive",
      price: "$160-180",
      keySpecs: [
        "Lace-up closure",
        "Stealth C4 rubber",
        "Downturned profile",
        "Excellent toe patch coverage",
        "Narrow-to-medium fit",
        "Iconic bouldering competition shoe",
      ],
    },
    {
      id: "five-ten-aleon",
      name: "Aleon",
      closure: "velcro",
      rubber: "Stealth C4 (4.2mm)",
      aggressiveness: "moderate",
      price: "$160-180",
      keySpecs: [
        "Dual velcro straps",
        "Stealth C4 rubber",
        "Moderate downturn",
        "Microfiber upper (low stretch)",
        "Balanced sensitivity and support",
        "Versatile gym and outdoor performer",
      ],
    },
    {
      id: "five-ten-crawe",
      name: "Crawe",
      closure: "velcro",
      rubber: "Stealth C4 (4.2mm)",
      aggressiveness: "moderate",
      price: "$150-170",
      keySpecs: [
        "Single velcro strap",
        "Stealth C4 rubber",
        "Moderate downturn",
        "Lightweight construction",
        "Excellent gym bouldering shoe",
        "Good sensitivity for footwork",
      ],
    },
    {
      id: "five-ten-niad-lace",
      name: "NIAD Lace",
      closure: "lace",
      rubber: "Stealth C4 (4.2mm)",
      aggressiveness: "moderate",
      price: "$160-180",
      keySpecs: [
        "Lace-up closure for precision",
        "Stealth C4 rubber",
        "Moderate profile (not fully flat)",
        "Lined synthetic upper",
        "Strong edging platform",
        "All-around outdoor performance shoe",
      ],
    },
    {
      id: "five-ten-niad-vcs",
      name: "NIAD VCS",
      closure: "velcro",
      rubber: "Stealth C4 (4.2mm)",
      aggressiveness: "moderate",
      price: "$160-180",
      keySpecs: [
        "Dual velcro closure",
        "Stealth C4 rubber",
        "Same last as NIAD Lace",
        "Quick on/off for gym sessions",
        "Moderate downturn",
        "Versatile indoor/outdoor shoe",
      ],
    },
    {
      id: "five-ten-moccasym",
      name: "Moccasym",
      closure: "slip-on",
      rubber: "Stealth C4 (4.2mm)",
      aggressiveness: "flat",
      price: "$110-130",
      keySpecs: [
        "Slip-on slipper design",
        "Unlined leather upper (stretches significantly)",
        "Stealth C4 rubber",
        "Flat profile for comfort",
        "Legendary crack climbing shoe",
        "Wide toe box for comfort",
      ],
    },
  ],
};

export const allBrandSizing: BrandSizingData[] = [evolvSizing, fiveTenSizing];

/**
 * Helper: Given a brand name and a US size, return the full conversion.
 */
export function convertSize(
  brand: "Evolv" | "Five Ten",
  us: number,
  gender: "mens" | "womens" = "mens"
): { us: number; eu: number; uk: number; cm: number } | null {
  const data = brand === "Evolv" ? evolvSizing : fiveTenSizing;
  const chart = data.sizeChart[gender];
  return chart.find((row) => row.us === us) ?? null;
}

/**
 * Helper: Given a cm measurement, find the closest US size for a brand.
 */
export function cmToUs(
  brand: "Evolv" | "Five Ten",
  cm: number,
  gender: "mens" | "womens" = "mens"
): number | null {
  const data = brand === "Evolv" ? evolvSizing : fiveTenSizing;
  const chart = data.sizeChart[gender];
  if (chart.length === 0) return null;
  let closest = chart[0];
  for (const row of chart) {
    if (Math.abs(row.cm - cm) < Math.abs(closest.cm - cm)) {
      closest = row;
    }
  }
  return closest.us;
}
