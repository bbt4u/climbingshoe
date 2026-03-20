"use client";

import { shoes } from "@/data/shoes";

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const MAX_SHOES = 3;
const brands = [...new Set(shoes.map((s) => s.brand))];

export default function CurrentShoes({ selected, onChange, onNext, onBack }: Props) {
  const hasNone = selected.includes("none");
  const shoeCount = selected.filter((s) => s !== "none").length;

  const toggle = (id: string) => {
    if (id === "none") { onChange(["none"]); return; }
    const without = selected.filter((s) => s !== "none");
    if (without.includes(id)) onChange(without.filter((s) => s !== id));
    else if (without.length < MAX_SHOES) onChange([...without, id]);
  };

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-white mb-1">Best-Fitting Climbing Shoes</h2>
      <p className="text-text-secondary text-sm mb-1">Select up to {MAX_SHOES} climbing shoes that fit you well.</p>
      <p className="text-accent/80 text-xs mb-4 flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Only select shoes that fit well — these help us calibrate your recommendations.
      </p>

      <button onClick={() => toggle("none")}
        className={`w-full mb-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
          hasNone ? "bg-accent text-white shadow-md shadow-accent/20" : "bg-surface-overlay border-2 border-dashed border-surface-border text-text-secondary hover:border-accent/40 hover:text-accent"
        }`}>
        I don&apos;t have climbing shoes yet
      </button>

      {!hasNone && shoeCount > 0 && (
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-accent">{shoeCount} of {MAX_SHOES} selected</span>
          <div className="flex gap-1">
            {Array.from({ length: MAX_SHOES }).map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < shoeCount ? "bg-accent" : "bg-surface-border"}`} />
            ))}
          </div>
        </div>
      )}

      <div className="max-h-[280px] overflow-y-auto space-y-4 mb-6 pr-1">
        {brands.map((brand) => (
          <div key={brand}>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">{brand}</p>
            <div className="flex flex-wrap gap-2">
              {shoes.filter((s) => s.brand === brand).map((shoe) => {
                const isSelected = selected.includes(shoe.id);
                const isDisabled = hasNone || (!isSelected && shoeCount >= MAX_SHOES);
                return (
                  <button key={shoe.id} onClick={() => toggle(shoe.id)} disabled={isDisabled}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isSelected ? "bg-accent text-white shadow-sm" : "bg-surface-overlay border border-surface-border text-text-secondary hover:border-accent/40 hover:text-accent disabled:opacity-25 disabled:cursor-not-allowed"
                    }`}>
                    {shoe.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 rounded-xl font-semibold border border-surface-border text-text-secondary hover:bg-surface-overlay transition-all">Back</button>
        <button disabled={selected.length === 0} onClick={onNext}
          className="flex-1 py-3 rounded-xl font-bold text-white bg-accent hover:bg-accent-light disabled:bg-surface-overlay disabled:text-text-muted disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20 disabled:shadow-none">
          Continue
        </button>
      </div>
    </div>
  );
}
