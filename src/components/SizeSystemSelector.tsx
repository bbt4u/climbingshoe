"use client";

import { SizeSystem } from "@/lib/types";
import { sizeLabels } from "@/data/sizeOptions";

interface Props {
  selected: SizeSystem;
  onChange: (system: SizeSystem) => void;
}

/** Shared size system toggle (US / EU / UK / KR) */
export default function SizeSystemSelector({ selected, onChange }: Props) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        Size System
      </label>
      <div className="flex gap-2">
        {(["US", "EU", "UK", "KR"] as SizeSystem[]).map((sys) => (
          <button
            key={sys}
            onClick={() => onChange(sys)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              selected === sys
                ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-200/50"
                : "bg-slate-50 border border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-600"
            }`}
          >
            {sizeLabels[sys]}
          </button>
        ))}
      </div>
      {selected === "KR" && (
        <p className="text-[11px] text-slate-400 mt-1.5">Korean sizes are in millimeters (foot length). e.g., 260mm = EU 41</p>
      )}
    </div>
  );
}
