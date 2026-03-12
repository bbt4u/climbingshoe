"use client";

import { shoes } from "@/data/shoes";

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const brands = [...new Set(shoes.map((s) => s.brand))];

export default function CurrentShoes({
  selected,
  onChange,
  onNext,
  onBack,
}: Props) {
  const hasNone = selected.includes("none");

  const toggle = (id: string) => {
    if (id === "none") {
      onChange(["none"]);
      return;
    }
    const without = selected.filter((s) => s !== "none");
    if (without.includes(id)) {
      onChange(without.filter((s) => s !== id));
    } else {
      onChange([...without, id]);
    }
  };

  const canProceed = selected.length > 0;

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Current Climbing Shoes</h2>
      <p className="text-slate-500 text-sm mb-4">
        Select any climbing shoes you currently own or have used.
      </p>

      <button
        onClick={() => toggle("none")}
        className={`w-full mb-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
          hasNone
            ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-200/50"
            : "bg-slate-50 border-2 border-dashed border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-600"
        }`}
      >
        I don&apos;t have climbing shoes yet
      </button>

      <div className="max-h-[280px] overflow-y-auto space-y-4 mb-6 pr-1">
        {brands.map((brand) => (
          <div key={brand}>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {brand}
            </p>
            <div className="flex flex-wrap gap-2">
              {shoes
                .filter((s) => s.brand === brand)
                .map((shoe) => (
                  <button
                    key={shoe.id}
                    onClick={() => toggle(shoe.id)}
                    disabled={hasNone}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selected.includes(shoe.id)
                        ? "bg-brand-600 text-white shadow-sm"
                        : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    }`}
                  >
                    {shoe.name}
                  </button>
                ))}
            </div>
          </div>
        ))}
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
