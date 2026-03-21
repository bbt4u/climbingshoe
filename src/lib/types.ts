export type SizeSystem = "US" | "EU" | "UK" | "KR";
export type ExperienceLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type Aggressiveness = "flat" | "moderate" | "aggressive";
export type FitProfile = "narrow" | "medium" | "wide" | "high-volume";
export type FootShape = "egyptian" | "roman" | "greek" | "german" | "celtic";
export type ScanMode = "quick" | "precision";

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

/** Indirect fit questions instead of direct width self-assessment */
export interface FitAnswers {
  tightOnSides: "yes" | "no" | "sometimes" | "";
  sizeUpForWidth: "yes" | "no" | "";
  heelSlips: "yes" | "no" | "sometimes" | "";
}

export interface FormData {
  photos: { front: string | null; side: string | null };
  scanMode: ScanMode;
  sizeSystem: SizeSystem;
  streetSize: string;
  climbingSize: string;
  climbingBrand: string;
  fitAnswers: FitAnswers;
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
  scanMode: ScanMode;
}
