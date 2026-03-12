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
    <div>
      <h2 className="text-xl font-semibold mb-1">Your Shoe Size</h2>
      <p className="text-stone-500 text-sm mb-6">
        Enter your regular (non-climbing) shoe size.
      </p>

      <div className="mb-5">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Size System
        </label>
        <div className="flex gap-2">
          {(["US", "EU"] as SizeSystem[]).map((sys) => (
            <button
              key={sys}
              onClick={() => onChange({ sizeSystem: sys, shoeSize: "", footWidth })}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                sizeSystem === sys
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-stone-300 text-stone-600 hover:border-indigo-400"
              }`}
            >
              {sys}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Size
        </label>
        <select
          value={shoeSize}
          onChange={(e) =>
            onChange({ sizeSystem, shoeSize: e.target.value, footWidth })
          }
          className="w-full border border-stone-300 rounded-lg px-4 py-2.5 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select size</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {sizeSystem} {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Foot Width
        </label>
        <div className="flex gap-2">
          {(["narrow", "medium", "wide"] as FootWidth[]).map((w) => (
            <button
              key={w}
              onClick={() => onChange({ sizeSystem, shoeSize, footWidth: w })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                footWidth === w
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-stone-300 text-stone-600 hover:border-indigo-400"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl font-semibold border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
        >
          Back
        </button>
        <button
          disabled={!canProceed}
          onClick={onNext}
          className="flex-1 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
