"use client";

import { ExperienceLevel } from "@/lib/types";

interface Props {
  experience: ExperienceLevel;
  onChange: (level: ExperienceLevel) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const levels: { value: ExperienceLevel; label: string; desc: string; icon: string }[] = [
  {
    value: "beginner",
    label: "Beginner",
    desc: "New to climbing. Comfort is the top priority.",
    icon: "V0–V2",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    desc: "Progressing well. Ready for more performance.",
    icon: "V3–V5",
  },
  {
    value: "advanced",
    label: "Advanced",
    desc: "Strong climber. Need precision and power.",
    icon: "V6–V9",
  },
  {
    value: "expert",
    label: "Expert",
    desc: "Elite level. Maximum performance required.",
    icon: "V10+",
  },
];

export default function Experience({
  experience,
  onChange,
  onSubmit,
  onBack,
}: Props) {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Experience Level</h2>
      <p className="text-slate-500 text-sm mb-5">
        This helps us balance comfort vs. performance in our recommendations.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {levels.map((lvl) => (
          <button
            key={lvl.value}
            onClick={() => onChange(lvl.value)}
            className={`text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
              experience === lvl.value
                ? "border-brand-500 bg-brand-50 shadow-md shadow-brand-100/50"
                : "border-slate-100 bg-slate-50/50 hover:border-brand-200 hover:bg-brand-50/30"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <p className={`font-bold text-sm ${experience === lvl.value ? "text-brand-700" : "text-slate-700"}`}>
                {lvl.label}
              </p>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                experience === lvl.value
                  ? "bg-brand-200 text-brand-700"
                  : "bg-slate-200 text-slate-500"
              }`}>
                {lvl.icon}
              </span>
            </div>
            <p className={`text-xs ${experience === lvl.value ? "text-brand-600" : "text-slate-400"}`}>
              {lvl.desc}
            </p>
          </button>
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
          onClick={onSubmit}
          className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 transition-all shadow-md shadow-brand-200/50"
        >
          Get Recommendations
        </button>
      </div>
    </div>
  );
}
