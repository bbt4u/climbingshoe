"use client";

import { SizeSystem, FootWidth } from "@/lib/types";
import { streetSizeOptions, sizeLabels, widthInfo } from "@/data/sizeOptions";
import { brandSizes, formatEuSize } from "@/data/brandSizes";
import SizeSystemSelector from "@/components/SizeSystemSelector";

interface Props {
  sizeSystem: SizeSystem;
  streetSize: string;
  climbingSize: string;
  climbingBrand: string;
  footWidth: FootWidth;
  onChange: (data: {
    sizeSystem: SizeSystem;
    streetSize: string;
    climbingSize: string;
    climbingBrand: string;
    footWidth: FootWidth;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

const climbingBrands = brandSizes.map((b) => b.brand);

export default function ShoeSize({
  sizeSystem, streetSize, climbingSize, climbingBrand,
  footWidth, onChange, onNext, onBack,
}: Props) {
  const streetSizes = streetSizeOptions[sizeSystem];

  // Get climbing sizes for selected brand (EU only, converted label for display)
  const selectedBrand = brandSizes.find((b) => b.brand === climbingBrand);
  const climbingSizes = selectedBrand?.euSizes ?? [];

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Your Shoe Size</h2>
      <p className="text-slate-500 text-sm mb-5">
        We use both sizes to give the most accurate recommendations.
      </p>

      {/* Shared size system selector */}
      <SizeSystemSelector
        selected={sizeSystem}
        onChange={(sys) => onChange({ sizeSystem: sys, streetSize: "", climbingSize: "", climbingBrand, footWidth })}
      />

      {/* Section 1: Street shoe size (required) */}
      <div className="mb-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <label className="block text-xs font-bold text-slate-700 mb-1">
          What&apos;s your normal shoe size? <span className="text-rose-500">*</span>
        </label>
        <p className="text-[11px] text-slate-400 mb-3">Your everyday street shoe size.</p>
        <select
          value={streetSize}
          onChange={(e) => onChange({ sizeSystem, streetSize: e.target.value, climbingSize, climbingBrand, footWidth })}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
        >
          <option value="">Select your size</option>
          {streetSizes.map((s) => (
            <option key={s} value={s}>{sizeLabels[sizeSystem]} {s}</option>
          ))}
        </select>
      </div>

      {/* Section 2: Climbing shoe size (optional) */}
      <div className="mb-5 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
        <label className="block text-xs font-bold text-slate-700 mb-1">
          What&apos;s your climbing shoe size? <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <p className="text-[11px] text-blue-500 mb-3">
          Climbers typically downsize from their street shoe size. If you already climb, entering your climbing shoe size helps us give more accurate recommendations.
        </p>

        {/* Brand selector */}
        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Brand</label>
        <select
          value={climbingBrand}
          onChange={(e) => onChange({ sizeSystem, streetSize, climbingSize: "", climbingBrand: e.target.value, footWidth })}
          className="w-full border border-blue-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm mb-3"
        >
          <option value="">Select brand</option>
          {climbingBrands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {/* Size selector — shows brand-specific EU sizes */}
        {climbingBrand && (
          <>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Size (EU)</label>
            <select
              value={climbingSize}
              onChange={(e) => onChange({ sizeSystem, streetSize, climbingSize: e.target.value, climbingBrand, footWidth })}
              className="w-full border border-blue-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            >
              <option value="">Select size</option>
              {climbingSizes.map((s) => (
                <option key={s} value={String(s)}>EU {formatEuSize(s)}</option>
              ))}
            </select>
            {selectedBrand && selectedBrand.system !== "half" && (
              <p className="text-[10px] text-blue-400 mt-1.5">
                {selectedBrand.system === "third" && `${climbingBrand} uses ⅓ size increments (Adidas system).`}
                {selectedBrand.system === "whole" && `${climbingBrand} uses whole EU sizes only.`}
                {selectedBrand.system === "quarter" && `${climbingBrand} uses ¼ size increments (UK-derived).`}
                {selectedBrand.system === "irregular" && `${climbingBrand} uses non-uniform EU increments.`}
              </p>
            )}
          </>
        )}
      </div>

      {/* Foot Width */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Foot Width</label>
        <div className="flex gap-2">
          {(["narrow", "medium", "wide"] as FootWidth[]).map((w) => (
            <button
              key={w}
              onClick={() => onChange({ sizeSystem, streetSize, climbingSize, climbingBrand, footWidth: w })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
                footWidth === w
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-200/50"
                  : "bg-slate-50 border border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              <span className="block">{w}</span>
              <span className={`block text-[10px] font-normal mt-0.5 ${footWidth === w ? "text-brand-200" : "text-slate-400"}`}>{widthInfo[w]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 rounded-xl font-semibold border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all">Back</button>
        <button
          disabled={!streetSize}
          onClick={onNext}
          className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-200/50 disabled:shadow-none"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
