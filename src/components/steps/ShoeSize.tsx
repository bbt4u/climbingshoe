"use client";

import { SizeSystem, SizeType, FootWidth } from "@/lib/types";
import { sizeOptions, sizeLabels, widthInfo } from "@/data/sizeOptions";

interface Props {
  sizeSystem: SizeSystem;
  sizeType: SizeType;
  shoeSize: string;
  footWidth: FootWidth;
  onChange: (data: {
    sizeSystem: SizeSystem;
    sizeType: SizeType;
    shoeSize: string;
    footWidth: FootWidth;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ShoeSize({
  sizeSystem,
  sizeType,
  shoeSize,
  footWidth,
  onChange,
  onNext,
  onBack,
}: Props) {
  const sizes = sizeOptions[sizeSystem];

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Your Shoe Size</h2>
      <p className="text-slate-500 text-sm mb-5">
        Enter your shoe size — either street shoes or climbing shoes.
      </p>

      {/* Size Type Toggle */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Size Type</label>
        <div className="flex gap-2">
          {(["street", "climbing"] as SizeType[]).map((t) => (
            <button
              key={t}
              onClick={() => onChange({ sizeSystem, sizeType: t, shoeSize: "", footWidth })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
                sizeType === t
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-200/50"
                  : "bg-slate-50 border border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              <span className="block">{t === "street" ? "Street Shoe" : "Climbing Shoe"}</span>
              <span className={`block text-[10px] font-normal mt-0.5 ${sizeType === t ? "text-brand-200" : "text-slate-400"}`}>
                {t === "street" ? "Regular shoes" : "Existing climbing shoes"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Size System */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Size System</label>
        <div className="flex gap-2">
          {(["US", "EU", "UK", "KR"] as SizeSystem[]).map((sys) => (
            <button
              key={sys}
              onClick={() => onChange({ sizeSystem: sys, sizeType, shoeSize: "", footWidth })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                sizeSystem === sys
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-200/50"
                  : "bg-slate-50 border border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              {sizeLabels[sys]}
            </button>
          ))}
        </div>
      </div>

      {/* Size Dropdown */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Size</label>
        <select
          value={shoeSize}
          onChange={(e) => onChange({ sizeSystem, sizeType, shoeSize: e.target.value, footWidth })}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
        >
          <option value="">Select your size</option>
          {sizes.map((s) => (
            <option key={s} value={s}>{sizeLabels[sizeSystem]} {s}</option>
          ))}
        </select>
        {sizeType === "climbing" && (
          <p className="text-[11px] text-amber-600 mt-1.5">We&apos;ll use your climbing shoe size as reference — sizing recommendations will adjust accordingly.</p>
        )}
        {sizeSystem === "KR" && (
          <p className="text-[11px] text-slate-400 mt-1.5">Korean sizes are in millimeters (foot length). e.g., 260mm = EU 41</p>
        )}
      </div>

      {/* Foot Width */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Foot Width</label>
        <div className="flex gap-2">
          {(["narrow", "medium", "wide"] as FootWidth[]).map((w) => (
            <button
              key={w}
              onClick={() => onChange({ sizeSystem, sizeType, shoeSize, footWidth: w })}
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
          disabled={!shoeSize}
          onClick={onNext}
          className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-200/50 disabled:shadow-none"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
