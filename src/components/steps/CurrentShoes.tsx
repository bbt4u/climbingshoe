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
    <div>
      <h2 className="text-xl font-semibold mb-1">Current Climbing Shoes</h2>
      <p className="text-stone-500 text-sm mb-4">
        Select any climbing shoes you currently own or have used.
      </p>

      <button
        onClick={() => toggle("none")}
        className={`w-full mb-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
          hasNone
            ? "bg-indigo-600 text-white"
            : "bg-white border border-stone-300 text-stone-600 hover:border-indigo-400"
        }`}
      >
        I don&apos;t have climbing shoes yet
      </button>

      <div className="max-h-[300px] overflow-y-auto space-y-4 mb-6">
        {brands.map((brand) => (
          <div key={brand}>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1.5">
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
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selected.includes(shoe.id)
                        ? "bg-indigo-600 text-white"
                        : "bg-white border border-stone-300 text-stone-600 hover:border-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed"
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
