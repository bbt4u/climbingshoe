"use client";

import { useState } from "react";
import { RecommendResponse, FootShape } from "@/lib/types";
import { onlineStores, retailTips, getShoeSearchUrl } from "@/data/buyLinks";

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

const rankLabels = ["Best Match", "Runner Up", "Great Option"];

const footShapeInfo: Record<FootShape, { label: string; desc: string }> = {
  egyptian: {
    label: "Egyptian",
    desc: "Big toe longest, tapering diagonal line. Best with asymmetric shoes that follow the natural taper.",
  },
  roman: {
    label: "Roman",
    desc: "First three toes similar length, squared front. Best with wider toe box shoes that don't compress toes.",
  },
  greek: {
    label: "Greek",
    desc: "Second toe extends past big toe. Best with shoes that have extra room in the toe box peak.",
  },
  german: {
    label: "German",
    desc: "Big toe longest, other four similar length. Best with shoes offering a roomy, square-shaped toe box.",
  },
  celtic: {
    label: "Celtic",
    desc: "Second toe longest with uneven profile. Best with flexible shoes that adapt to irregular toe lengths.",
  },
};

function FootShapeIcon({ shape }: { shape: FootShape }) {
  const toeHeights: Record<FootShape, number[]> = {
    egyptian: [44, 38, 32, 26, 20],
    roman: [40, 40, 40, 30, 22],
    greek: [36, 44, 34, 26, 20],
    german: [44, 32, 32, 32, 32],
    celtic: [34, 44, 40, 28, 22],
  };
  const heights = toeHeights[shape];
  const toeX = [18, 32, 46, 58, 68];
  const toeW = [10, 9, 8, 7, 6];

  return (
    <svg viewBox="0 0 86 56" className="w-16 h-10">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={toeX[i]}
          y={56 - h}
          width={toeW[i]}
          height={h}
          rx={toeW[i] / 2}
          fill="currentColor"
          opacity={0.7 + i * 0.05}
        />
      ))}
    </svg>
  );
}

export default function Results({ data, onReset }: Props) {
  const shapeInfo = footShapeInfo[data.footShape];
  const [expandedBuy, setExpandedBuy] = useState<string | null>(null);

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-5">
        <h2 className="text-lg font-bold text-slate-800">Your Top 3 Picks</h2>
        <p className="text-slate-500 text-xs mt-0.5">Personalized for your feet</p>
      </div>

      {/* Foot Shape Card */}
      <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 border border-brand-200/60 rounded-xl p-4 mb-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-14 h-14 rounded-xl bg-white/80 border border-brand-200/50 flex items-center justify-center text-brand-500">
            <FootShapeIcon shape={data.footShape} />
          </div>
          <div>
            <p className="text-xs font-bold text-brand-400 uppercase tracking-wider">Your Foot Type</p>
            <p className="text-lg font-bold text-brand-700">{shapeInfo.label} Foot</p>
          </div>
        </div>
        <p className="text-xs text-brand-600 leading-relaxed">{shapeInfo.desc}</p>
      </div>

      {/* AI Analysis */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 mb-5">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">AI Analysis</p>
            <p className="text-sm text-slate-600 leading-relaxed">{data.footAnalysis}</p>
          </div>
        </div>
      </div>

      {/* Shoe Recommendations */}
      <div className="space-y-3 mb-5">
        {data.recommendations.map((rec, i) => (
          <div
            key={rec.shoeId}
            className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${rankColors[i]} text-white font-extrabold text-sm shadow-sm`}>
                  #{i + 1}
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase">{rankLabels[i]}</span>
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
                <div className="flex gap-1.5 mb-3 flex-wrap">
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
                  {rec.shoe.idealFootShapes.includes(data.footShape) && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-green-50 text-green-600 border border-green-200">
                      {shapeInfo.label} foot match
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{rec.reasoning}</p>

                {/* Sizing Card */}
                {rec.recommendedSize && (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg mb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-bold text-blue-700">Recommended: EU {rec.recommendedSize}</span>
                    </div>
                    {rec.sizingNote && (
                      <p className="text-[11px] text-blue-500 mb-1">{rec.sizingNote}</p>
                    )}
                    {/* Downsize Guidance */}
                    {rec.downsizeAmount && (
                      <div className="mt-2 pt-2 border-t border-blue-200/50">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                          <span className="text-[11px] font-semibold text-blue-600">Downsize Guide</span>
                        </div>
                        <p className="text-[11px] text-blue-500 mt-0.5">{rec.downsizeAmount}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Features */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {rec.shoe.keyFeatures.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] bg-slate-50 text-slate-500 px-2.5 py-1 rounded-full border border-slate-100"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Where to Buy */}
                <button
                  onClick={() => setExpandedBuy(expandedBuy === rec.shoeId ? null : rec.shoeId)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Where to buy / try on
                  <svg className={`w-3 h-3 transition-transform ${expandedBuy === rec.shoeId ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedBuy === rec.shoeId && (
                  <div className="mt-2 p-3 bg-slate-50 border border-slate-100 rounded-lg animate-fade-in-up">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Shop Online</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {["REI", "Backcountry", "EVO"].map((store) => (
                        <a
                          key={store}
                          href={getShoeSearchUrl(store, rec.shoe.brand, rec.shoe.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 bg-white border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-50 hover:border-brand-300 transition-all"
                        >
                          {store}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ))}
                      <a
                        href={getShoeSearchUrl("google", rec.shoe.brand, rec.shoe.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all"
                      >
                        Search All
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </a>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Try In Person</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Visit your local climbing gym pro shop or REI store to try these on. Many gyms host demo days where you can test multiple brands.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* General Shopping Tips */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs font-bold text-slate-600">Fitting Tips</p>
        </div>
        <ul className="space-y-1">
          {retailTips.slice(0, 3).map((tip, i) => (
            <li key={i} className="text-[11px] text-slate-500 flex items-start gap-1.5">
              <span className="text-brand-400 mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Online Retailers */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Major Retailers</p>
        <div className="grid grid-cols-2 gap-2">
          {onlineStores.slice(0, 4).map((store) => (
            <a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-2.5 bg-slate-50 border border-slate-100 rounded-lg hover:border-brand-200 hover:bg-brand-50/30 transition-all group"
            >
              <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-600 flex items-center gap-1">
                {store.name}
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">{store.description}</span>
            </a>
          ))}
        </div>
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
