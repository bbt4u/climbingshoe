"use client";

import { RecommendResponse } from "@/lib/types";

interface Props {
  data: RecommendResponse;
  onReset: () => void;
}

const aggressivenessColor: Record<string, string> = {
  flat: "bg-green-100 text-green-700",
  moderate: "bg-amber-100 text-amber-700",
  aggressive: "bg-red-100 text-red-700",
};

export default function Results({ data, onReset }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Your Recommendations</h2>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
        <p className="text-sm font-medium text-indigo-700 mb-1">
          Foot Analysis
        </p>
        <p className="text-sm text-indigo-900">{data.footAnalysis}</p>
      </div>

      <div className="space-y-4 mb-6">
        {data.recommendations.map((rec, i) => (
          <div
            key={rec.shoeId}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-lg shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-lg">
                    {rec.shoe.brand} {rec.shoe.name}
                  </h3>
                  <span className="text-sm text-stone-500">
                    {rec.shoe.priceRange}
                  </span>
                </div>
                <div className="flex gap-2 mt-1.5 mb-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                      aggressivenessColor[rec.shoe.aggressiveness]
                    }`}
                  >
                    {rec.shoe.aggressiveness}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-stone-100 text-stone-600 capitalize">
                    {rec.shoe.fitProfile} fit
                  </span>
                </div>
                <p className="text-sm text-stone-700 mb-3">{rec.reasoning}</p>
                <div className="flex flex-wrap gap-1.5">
                  {rec.shoe.keyFeatures.map((f) => (
                    <span
                      key={f}
                      className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-md"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl font-semibold border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
      >
        Start Over
      </button>
    </div>
  );
}
