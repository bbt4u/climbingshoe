"use client";

import { SizeSystem } from "@/lib/types";
import { streetSizeOptions, sizeLabels } from "@/data/sizeOptions";
import { brandSizes, formatEuSize } from "@/data/brandSizes";
import SizeSystemSelector from "@/components/SizeSystemSelector";

interface Props {
  sizeSystem: SizeSystem;
  streetSize: string;
  climbingSize: string;
  climbingBrand: string;
  onChange: (data: { sizeSystem: SizeSystem; streetSize: string; climbingSize: string; climbingBrand: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const climbingBrands = brandSizes.map((b) => b.brand);
const selectCls = "w-full border border-surface-border rounded-xl px-4 py-3 bg-surface-overlay text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm";

export default function ShoeSize({ sizeSystem, streetSize, climbingSize, climbingBrand, onChange, onNext, onBack }: Props) {
  const streetSizes = streetSizeOptions[sizeSystem];
  const selectedBrand = brandSizes.find((b) => b.brand === climbingBrand);
  const climbingSizes = selectedBrand?.euSizes ?? [];

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-white mb-1">Your Shoe Size</h2>
      <p className="text-text-secondary text-sm mb-5">We use both sizes to give the most accurate recommendations.</p>

      <SizeSystemSelector selected={sizeSystem} onChange={(sys) => onChange({ sizeSystem: sys, streetSize: "", climbingSize: "", climbingBrand })} />

      <div className="mb-4 p-4 bg-surface-overlay/60 rounded-xl border border-surface-border">
        <label className="block text-xs font-bold text-text-primary mb-1">What&apos;s your normal shoe size? <span className="text-accent">*</span></label>
        <p className="text-[11px] text-text-muted mb-3">Your everyday street shoe size.</p>
        <select value={streetSize} onChange={(e) => onChange({ sizeSystem, streetSize: e.target.value, climbingSize, climbingBrand })} className={selectCls}>
          <option value="">Select your size</option>
          {streetSizes.map((s) => <option key={s} value={s}>{sizeLabels[sizeSystem]} {s}</option>)}
        </select>
      </div>

      <div className="mb-5 p-4 bg-teal/5 rounded-xl border border-teal/20">
        <label className="block text-xs font-bold text-text-primary mb-1">What&apos;s your climbing shoe size? <span className="text-text-muted font-normal">(optional)</span></label>
        <p className="text-[11px] text-teal mb-3">If you already climb, entering your climbing shoe size helps us give more accurate recommendations.</p>
        <label className="block text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">Brand</label>
        <select value={climbingBrand} onChange={(e) => onChange({ sizeSystem, streetSize, climbingSize: "", climbingBrand: e.target.value })} className={`${selectCls} mb-3`}>
          <option value="">Select brand</option>
          {climbingBrands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        {climbingBrand && (
          <>
            <label className="block text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">Size (EU)</label>
            <select value={climbingSize} onChange={(e) => onChange({ sizeSystem, streetSize, climbingSize: e.target.value, climbingBrand })} className={selectCls}>
              <option value="">Select size</option>
              {climbingSizes.map((s) => <option key={s} value={String(s)}>EU {formatEuSize(s)}</option>)}
            </select>
            {selectedBrand && selectedBrand.system !== "half" && (
              <p className="text-[10px] text-teal/70 mt-1.5">
                {selectedBrand.system === "third" && `${climbingBrand} uses ⅓ size increments.`}
                {selectedBrand.system === "whole" && `${climbingBrand} uses whole EU sizes only.`}
                {selectedBrand.system === "quarter" && `${climbingBrand} uses ¼ size increments.`}
                {selectedBrand.system === "irregular" && `${climbingBrand} uses non-uniform EU increments.`}
              </p>
            )}
          </>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 rounded-xl font-semibold border border-surface-border text-text-secondary hover:bg-surface-overlay transition-all">Back</button>
        <button disabled={!streetSize} onClick={onNext}
          className="flex-1 py-3 rounded-xl font-bold text-white bg-accent hover:bg-accent-light disabled:bg-surface-overlay disabled:text-text-muted disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20 disabled:shadow-none">
          Continue
        </button>
      </div>
    </div>
  );
}
