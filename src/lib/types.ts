export type SizeSystem = "US" | "EU" | "UK" | "KR";
export type SizeType = "street" | "climbing";
export type FootWidth = "narrow" | "medium" | "wide";
export type ExperienceLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type Aggressiveness = "flat" | "moderate" | "aggressive";
export type FitProfile = "narrow" | "medium" | "wide" | "high-volume";
export type FootShape = "egyptian" | "roman" | "greek" | "german" | "celtic";

export interface Shoe {
  id: string;
  name: string;
  brand: string;
  priceRange: string;
  aggressiveness: Aggressiveness;
  bestFor: ExperienceLevel[];
  fitProfile: FitProfile;
  idealFootShapes: FootShape[];
  keyFeatures: string[];
  description: string;
  buyLinks?: BuyLink[];
}

export interface BuyLink {
  store: string;
  url: string;
  type: "online" | "retail";
}

export interface FormData {
  photos: { front: string | null; side: string | null };
  sizeSystem: SizeSystem;
  sizeType: SizeType;
  shoeSize: string;
  footWidth: FootWidth;
  currentShoes: string[];
  experience: ExperienceLevel;
}

export interface Recommendation {
  shoeId: string;
  shoe: Shoe;
  reasoning: string;
  recommendedSize: string;
  sizingNote: string;
  downsizeAmount: string;
}

export interface RecommendResponse {
  recommendations: Recommendation[];
  footAnalysis: string;
  footShape: FootShape;
}
