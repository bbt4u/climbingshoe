"use client";

import { SizeSystem, FootWidth } from "@/lib/types";

interface Props {
  sizeSystem: SizeSystem;
  shoeSize: string;
  footWidth: FootWidth;
  onChange: (data: {
    sizeSystem: SizeSystem;
    shoeSize: string;
    footWidth: FootWidth;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

const usSizes = Array.from({ length: 25 }, (_, i) => String(4 + i * 0.5));
const euSizes = Array.from({ length: 16 }, (_, i) => String(35 + i));

const widthInfo: Record<FootWidth, string> = {
  narrow: "Slim profile",
  medium: "Standard fit",
  wide: "Broad profile",
};

export default function ShoeSize({
  sizeSystem,
  shoeSize,
  footWidth,
  onChange,
  onNext,
  onBack,
}: Props) {
  const sizes = sizeSystem === "US" ? usSizes : euSizes;
  const canProceed = shoeSize !== "";

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Your Shoe Size</h2>
      <p className="text-slate-500 text-sm mb-5">
        Enter your regular (non-climbing) shoe size.
      </p>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Size System
        </label>
        <div className="flex gap-2">
          {(["US", "EU"] as SizeSystem[]).map((sys) => (
            <button
              key={sys}
              onClick={() => onChange({ sizeSystem: sys, shoeSize: "", footWidth })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                sizeSystem === sys
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-200/50"
                  : "bg-slate-50 border border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              {sys}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Size
        </label>
        <select
          value={shoeSize}
          onChange={(e) =>
            onChange({ sizeSystem, shoeSize: e.target.value, footWidth })
          }
          className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
        >
          <option value="">Select your size</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {sizeSystem} {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Foot Width
        </label>
        <div className="flex gap-2">
          {(["narrow", "medium", "wide"] as FootWidth[]).map((w) => (
            <button
              key={w}
              onClick={() => onChange({ sizeSystem, shoeSize, footWidth: w })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
                footWidth === w
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-200/50"
                  : "bg-slate-50 border border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              <span className="block">{w}</span>
              <span className={`block text-[10px] font-normal mt-0.5 ${footWidth === w ? "text-brand-200" : "text-slate-400"}`}>
                {widthInfo[w]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl font-semibold border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
        >
          Back
        </button>
        <button
          disabled={!canProceed}
          onClick={onNext}
          className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-200/50 disabled:shadow-none"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
