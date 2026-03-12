"use client";

import { RecommendResponse } from "@/lib/types";

interface Props {
  data: RecommendResponse;
  onReset: () => void;
}

const aggressivenessStyle: Record<string, string> = {
  flat: "bg-emerald-50 text-emerald-700 border-emerald-200",
  moderate: "bg-amber-50 text-amber-700 border-amber-200",
  aggressive: "bg-rose-50 text-rose-700 border-rose-200",
};

const rankColors = [
  "from-yellow-400 to-amber-500",
  "from-slate-300 to-slate-400",
  "from-amber-600 to-amber-700",
];

export default function Results({ data, onReset }: Props) {
  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-5">
        <h2 className="text-lg font-bold text-slate-800">Your Top Picks</h2>
        <p className="text-slate-500 text-xs mt-0.5">Personalized for your feet</p>
      </div>

      <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 border border-brand-200/60 rounded-xl p-4 mb-5">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-200 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">
              Foot Analysis
            </p>
            <p className="text-sm text-brand-900 leading-relaxed">{data.footAnalysis}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {data.recommendations.map((rec, i) => (
          <div
            key={rec.shoeId}
            className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start gap-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${rankColors[i]} text-white font-extrabold text-sm shrink-0 shadow-sm`}>
                #{i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap mb-2">
                  <h3 className="font-bold text-base text-slate-800">
                    {rec.shoe.name}
                  </h3>
                  <span className="text-xs font-medium text-slate-400">
                    {rec.shoe.brand}
                  </span>
                  <span className="text-xs font-bold text-brand-600 ml-auto">
                    {rec.shoe.priceRange}
                  </span>
                </div>
                <div className="flex gap-1.5 mb-3">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-semibold capitalize border ${
                      aggressivenessStyle[rec.shoe.aggressiveness]
                    }`}
                  >
                    {rec.shoe.aggressiveness}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-slate-50 text-slate-500 border border-slate-200 capitalize">
                    {rec.shoe.fitProfile} fit
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{rec.reasoning}</p>
                <div className="flex flex-wrap gap-1.5">
                  {rec.shoe.keyFeatures.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] bg-slate-50 text-slate-500 px-2.5 py-1 rounded-full border border-slate-100"
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
        className="w-full py-3 rounded-xl font-semibold border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all"
      >
        Start Over
      </button>
    </div>
  );
}
