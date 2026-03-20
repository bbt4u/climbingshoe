// Where to buy/try climbing shoes — major online retailers and tips for local shops

export interface StoreInfo {
  name: string;
  url: string;
  type: "online" | "retail";
  description: string;
}

export const onlineStores: StoreInfo[] = [
  {
    name: "REI",
    url: "https://www.rei.com/c/climbing-shoes",
    type: "online",
    description: "Free shipping & returns. Try in-store at 180+ locations.",
  },
  {
    name: "Backcountry",
    url: "https://www.backcountry.com/climbing-shoes",
    type: "online",
    description: "Wide selection with expert Gearheads available for advice.",
  },
  {
    name: "Moosejaw",
    url: "https://www.moosejaw.com/climbing-shoes",
    type: "online",
    description: "Competitive prices and frequent sales.",
  },
  {
    name: "Outdoor Gear Exchange",
    url: "https://www.gearx.com/climbing-shoes",
    type: "online",
    description: "Great selection with knowledgeable staff.",
  },
  {
    name: "EVO",
    url: "https://www.evo.com/climbing-shoes",
    type: "online",
    description: "Free shipping on orders over $50.",
  },
];

export const retailTips = [
  "Visit your local climbing gym — most have a pro shop with shoes to try on.",
  "REI has 180+ stores across the US where you can try climbing shoes in person.",
  "Local outdoor specialty shops often have the best fitting advice.",
  "Many gyms offer demo days where you can try multiple brands.",
  "Try shoes in the afternoon when feet are slightly swollen for a more realistic fit.",
];

/**
 * Generate a search URL for a specific shoe on a given store
 */
export function getShoeSearchUrl(store: string, brand: string, shoeName: string): string {
  const query = encodeURIComponent(`${brand} ${shoeName} climbing shoe`);
  switch (store) {
    case "REI":
      return `https://www.rei.com/search?q=${query}`;
    case "Backcountry":
      return `https://www.backcountry.com/Store/catalog/search.jsp?q=${query}`;
    case "EVO":
      return `https://www.evo.com/shop?text=${query}`;
    default:
      return `https://www.google.com/search?q=${query}+buy`;
  }
}
