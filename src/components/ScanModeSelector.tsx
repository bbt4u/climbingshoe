"use client";

import { ScanMode } from "@/lib/types";

interface Props {
  selected: ScanMode;
  onChange: (mode: ScanMode) => void;
  onNext: () => void;
}

/** Mode selection: Quick Scan vs Precision Scan */
export default function ScanModeSelector({ selected, onChange, onNext }: Props) {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-white mb-1">Choose Scan Mode</h2>
      <p className="text-text-secondary text-sm mb-5">How accurate do you need your recommendations?</p>

      <div className="space-y-3 mb-6">
        <button onClick={() => onChange("quick")}
          className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
            selected === "quick" ? "border-accent bg-accent/10" : "border-surface-border bg-surface-overlay/50 hover:border-accent/30"
          }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected === "quick" ? "bg-accent text-white" : "bg-surface-overlay text-text-muted"}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className={`font-bold text-sm ${selected === "quick" ? "text-accent" : "text-text-primary"}`}>Quick Scan</p>
              <p className="text-[11px] text-text-muted mt-0.5">Fast, no setup needed. Good enough for most climbers.</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-overlay text-text-muted">~30s</span>
          </div>
        </button>

        <button onClick={() => onChange("precision")}
          className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
            selected === "precision" ? "border-teal bg-teal/10" : "border-surface-border bg-surface-overlay/50 hover:border-teal/30"
          }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected === "precision" ? "bg-teal text-white" : "bg-surface-overlay text-text-muted"}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className={`font-bold text-sm ${selected === "precision" ? "text-teal" : "text-text-primary"}`}>Precision Scan</p>
              <p className="text-[11px] text-text-muted mt-0.5">Uses A4 paper for calibrated measurements. More accurate sizing.</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal/20 text-teal">Recommended</span>
          </div>
        </button>
      </div>

      <button onClick={onNext}
        className="w-full py-3.5 rounded-xl font-bold text-white bg-accent hover:bg-accent-light transition-all shadow-lg shadow-accent/20">
        Continue
      </button>
    </div>
  );
}
