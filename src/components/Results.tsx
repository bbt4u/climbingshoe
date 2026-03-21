"use client";

import { useState } from "react";
import { RecommendResponse } from "@/lib/types";
import { footShapeInfo } from "@/data/footShapes";
import FootShapeIcon from "@/components/FootShapeIcon";
import WhereToBuy, { RetailerGrid } from "@/components/WhereToBuy";

interface Props {
  data: RecommendResponse;
  onReset: () => void;
}

const aggressivenessStyle: Record<string, string> = {
  flat: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  moderate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  aggressive: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

const rankBorders = ["border-yellow-500/50", "border-slate-400/40", "border-amber-700/40"];
const rankBgs = ["from-yellow-500/10 to-yellow-600/5", "from-slate-400/10 to-slate-500/5", "from-amber-700/10 to-amber-800/5"];
const rankBadgeColors = ["bg-yellow-500 text-black", "bg-slate-400 text-black", "bg-amber-700 text-white"];
const rankLabels = ["Best Match", "Runner Up", "Great Option"];
// Simulated match scores based on rank
const matchScores = [95, 88, 82];

export default function Results({ data, onReset }: Props) {
  const shapeInfo = footShapeInfo[data.footShape];
  const [expandedBuy, setExpandedBuy] = useState<string | null>(null);

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-5">
        <h2 className="text-xl font-extrabold text-white">Your Top 3 Picks</h2>
        <p className="text-text-muted text-xs mt-1">Personalized for your feet</p>
        <span className={`inline-block mt-2 text-[10px] font-bold px-3 py-1 rounded-full ${
          data.scanMode === "precision"
            ? "bg-teal/15 text-teal border border-teal/30"
            : "bg-surface-overlay text-text-muted border border-surface-border"
        }`}>
          {data.scanMode === "precision" ? "Precision Measurement" : "Quick Estimate"}
        </span>
      </div>

      {/* Foot Shape */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-14 h-14 rounded-xl bg-surface-overlay border border-accent/20 flex items-center justify-center text-accent">
            <FootShapeIcon shape={data.footShape} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-accent uppercase tracking-wider">Your Foot Type</p>
            <p className="text-lg font-extrabold text-white">{shapeInfo.label} Foot</p>
          </div>
        </div>
        <p className="text-xs text-accent/70 leading-relaxed">{shapeInfo.desc}</p>
      </div>

      {/* AI Analysis */}
      <div className="bg-surface-overlay/50 border border-surface-border rounded-xl p-4 mb-5">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-teal/20 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">AI Analysis</p>
            <p className="text-sm text-text-secondary leading-relaxed">{data.footAnalysis}</p>
          </div>
        </div>
      </div>

      {/* Shoe Cards */}
      <div className="space-y-3 mb-5">
        {data.recommendations.map((rec, i) => (
          <div key={rec.shoeId} className={`bg-gradient-to-br ${rankBgs[i]} rounded-xl border ${rankBorders[i]} p-5 hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${rankBadgeColors[i]} font-extrabold text-sm shadow-lg`}>
                  #{i + 1}
                </div>
                <span className="text-[9px] font-bold text-text-muted uppercase">{rankLabels[i]}</span>
                {/* Match score */}
                <div className="mt-1 w-11 bg-surface-overlay rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-teal rounded-full" style={{ width: `${matchScores[i]}%` }} />
                </div>
                <span className="text-[10px] font-bold text-teal">{matchScores[i]}%</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap mb-2">
                  <h3 className="font-extrabold text-base text-white">{rec.shoe.name}</h3>
                  <span className="text-xs font-medium text-text-muted">{rec.shoe.brand}</span>
                  <span className="text-xs font-bold text-accent ml-auto">{rec.shoe.priceRange}</span>
                </div>
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold capitalize border ${aggressivenessStyle[rec.shoe.aggressiveness]}`}>{rec.shoe.aggressiveness}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-surface-overlay text-text-muted border border-surface-border capitalize">{rec.shoe.fitProfile} fit</span>
                  {rec.shoe.idealFootShapes.includes(data.footShape) && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-teal/15 text-teal border border-teal/30">{shapeInfo.label} foot match</span>
                  )}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">{rec.reasoning}</p>

                {rec.recommendedSize && (
                  <div className="p-3 bg-teal/10 border border-teal/20 rounded-lg mb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <svg className="w-4 h-4 text-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-bold text-teal">EU {rec.recommendedSize}</span>
                    </div>
                    {rec.sizingNote && <p className="text-[11px] text-teal/70 mb-1">{rec.sizingNote}</p>}
                    {rec.downsizeAmount && (
                      <div className="mt-2 pt-2 border-t border-teal/15">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-teal/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                          <span className="text-[11px] font-bold text-teal/80">Downsize Guide</span>
                        </div>
                        <p className="text-[11px] text-teal/60 mt-0.5">{rec.downsizeAmount}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {rec.shoe.keyFeatures.map((f) => (
                    <span key={f} className="text-[11px] bg-surface-overlay text-text-muted px-2.5 py-1 rounded-full border border-surface-border">{f}</span>
                  ))}
                </div>

                <WhereToBuy brand={rec.shoe.brand} shoeName={rec.shoe.name} shoeId={rec.shoeId}
                  isExpanded={expandedBuy === rec.shoeId} onToggle={() => setExpandedBuy(expandedBuy === rec.shoeId ? null : rec.shoeId)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <RetailerGrid />

      {/* Upgrade prompt for quick scan users */}
      {data.scanMode !== "precision" && (
        <div className="bg-teal/5 border border-teal/20 rounded-xl p-4 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-teal mb-0.5">Want more accurate results?</p>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Get more accurate shoe recommendations with Precision Scan — uses A4 paper for calibrated foot measurements.
              </p>
            </div>
          </div>
        </div>
      )}

      <button onClick={onReset}
        className="w-full py-3 rounded-xl font-semibold border border-surface-border text-text-secondary hover:bg-surface-overlay hover:text-white transition-all">
        Start Over
      </button>
    </div>
  );
}
