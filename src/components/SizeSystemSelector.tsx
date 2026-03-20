"use client";

import { SizeSystem } from "@/lib/types";
import { sizeLabels } from "@/data/sizeOptions";

interface Props {
  selected: SizeSystem;
  onChange: (system: SizeSystem) => void;
}

export default function SizeSystemSelector({ selected, onChange }: Props) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Size System</label>
      <div className="flex gap-2">
        {(["US", "EU", "UK", "KR"] as SizeSystem[]).map((sys) => (
          <button key={sys} onClick={() => onChange(sys)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              selected === sys
                ? "bg-accent text-white shadow-md shadow-accent/20"
                : "bg-surface-overlay border border-surface-border text-text-secondary hover:border-accent/40 hover:text-accent"
            }`}>
            {sizeLabels[sys]}
          </button>
        ))}
      </div>
      {selected === "KR" && <p className="text-[11px] text-text-muted mt-1.5">Korean sizes are in millimeters (foot length). e.g., 260mm = EU 41</p>}
    </div>
  );
}
