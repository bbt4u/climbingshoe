"use client";

import { ExperienceLevel } from "@/lib/types";

interface Props {
  experience: ExperienceLevel;
  onChange: (level: ExperienceLevel) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const levels: { value: ExperienceLevel; label: string; desc: string }[] = [
  {
    value: "beginner",
    label: "Beginner",
    desc: "New to climbing. Comfort is the top priority.",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    desc: "Climbing V3–V5. Ready for more performance.",
  },
  {
    value: "advanced",
    label: "Advanced",
    desc: "Climbing V6–V9. Need precision and power.",
  },
  {
    value: "expert",
    label: "Expert",
    desc: "Climbing V10+. Maximum performance required.",
  },
];

export default function Experience({
  experience,
  onChange,
  onSubmit,
  onBack,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Experience Level</h2>
      <p className="text-stone-500 text-sm mb-6">
        This helps us balance comfort vs. performance in our recommendations.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {levels.map((lvl) => (
          <button
            key={lvl.value}
            onClick={() => onChange(lvl.value)}
            className={`text-left p-4 rounded-xl border-2 transition-colors ${
              experience === lvl.value
                ? "border-indigo-600 bg-indigo-50"
                : "border-stone-200 bg-white hover:border-indigo-300"
            }`}
          >
            <p className="font-semibold text-sm">{lvl.label}</p>
            <p className="text-xs text-stone-500 mt-0.5">{lvl.desc}</p>
          </button>
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
          onClick={onSubmit}
          className="flex-1 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          Get Recommendations
        </button>
      </div>
    </div>
  );
}
