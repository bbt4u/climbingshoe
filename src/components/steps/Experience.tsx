"use client";

import { ExperienceLevel } from "@/lib/types";

interface Props {
  experience: ExperienceLevel;
  onChange: (level: ExperienceLevel) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const levels: { value: ExperienceLevel; label: string; desc: string; grade: string }[] = [
  { value: "beginner", label: "Beginner", desc: "New to climbing. Comfort is the top priority.", grade: "V0-V2" },
  { value: "intermediate", label: "Intermediate", desc: "Progressing well. Ready for more performance.", grade: "V3-V5" },
  { value: "advanced", label: "Advanced", desc: "Strong climber. Need precision and power.", grade: "V6-V9" },
  { value: "expert", label: "Expert", desc: "Elite level. Maximum performance required.", grade: "V10+" },
];

export default function Experience({ experience, onChange, onSubmit, onBack }: Props) {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-white mb-1">Experience Level</h2>
      <p className="text-text-secondary text-sm mb-5">This helps us balance comfort vs. performance.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {levels.map((lvl) => (
          <button key={lvl.value} onClick={() => onChange(lvl.value)}
            className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              experience === lvl.value
                ? "border-accent bg-accent/10 shadow-md shadow-accent/10"
                : "border-surface-border bg-surface-overlay/50 hover:border-accent/30 hover:bg-surface-overlay"
            }`}>
            <div className="flex items-center justify-between mb-1">
              <p className={`font-bold text-sm ${experience === lvl.value ? "text-accent" : "text-text-primary"}`}>{lvl.label}</p>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                experience === lvl.value ? "bg-accent/20 text-accent" : "bg-surface-overlay text-text-muted"
              }`}>{lvl.grade}</span>
            </div>
            <p className={`text-xs ${experience === lvl.value ? "text-accent/70" : "text-text-muted"}`}>{lvl.desc}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 rounded-xl font-semibold border border-surface-border text-text-secondary hover:bg-surface-overlay transition-all">Back</button>
        <button onClick={onSubmit}
          className="flex-1 py-3.5 rounded-xl font-bold text-white bg-accent hover:bg-accent-light transition-all shadow-lg shadow-accent/20">
          Get Recommendations
        </button>
      </div>
    </div>
  );
}
