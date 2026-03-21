"use client";

import { FitAnswers } from "@/lib/types";

interface Props {
  answers: FitAnswers;
  onChange: (answers: FitAnswers) => void;
  onNext: () => void;
  onBack: () => void;
}

type OptionValue = "yes" | "no" | "sometimes";

const questions: { key: keyof FitAnswers; label: string; desc: string; options: OptionValue[] }[] = [
  {
    key: "tightOnSides",
    label: "Do your shoes usually feel tight on the sides?",
    desc: "Think about your everyday shoes, not just climbing shoes.",
    options: ["yes", "sometimes", "no"],
  },
  {
    key: "sizeUpForWidth",
    label: "Do you size up because the front feels narrow?",
    desc: "Some people go up a size to get more width in the toe area.",
    options: ["yes", "no"],
  },
  {
    key: "heelSlips",
    label: "Does your heel often slip in shoes?",
    desc: "Heel slipping can indicate a narrow heel relative to forefoot.",
    options: ["yes", "sometimes", "no"],
  },
];

export default function FitQuestions({ answers, onChange, onNext, onBack }: Props) {
  const allAnswered = answers.tightOnSides !== "" && answers.sizeUpForWidth !== "" && answers.heelSlips !== "";

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-white mb-1">How Do Your Shoes Fit?</h2>
      <p className="text-text-secondary text-sm mb-1">These help us estimate your foot width from your experience.</p>
      <p className="text-text-muted text-[11px] mb-5">We&apos;ll also analyze your photos for a visual width estimate.</p>

      <div className="space-y-4 mb-6">
        {questions.map((q) => (
          <div key={q.key} className="p-4 bg-surface-overlay/60 rounded-xl border border-surface-border">
            <p className="text-sm font-bold text-text-primary mb-1">{q.label}</p>
            <p className="text-[11px] text-text-muted mb-3">{q.desc}</p>
            <div className="flex gap-2">
              {q.options.map((opt) => (
                <button key={opt} onClick={() => onChange({ ...answers, [q.key]: opt })}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                    answers[q.key] === opt
                      ? "bg-accent text-white shadow-sm"
                      : "bg-surface text-text-secondary border border-surface-border hover:border-accent/40"
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 rounded-xl font-semibold border border-surface-border text-text-secondary hover:bg-surface-overlay transition-all">Back</button>
        <button disabled={!allAnswered} onClick={onNext}
          className="flex-1 py-3 rounded-xl font-bold text-white bg-accent hover:bg-accent-light disabled:bg-surface-overlay disabled:text-text-muted disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20 disabled:shadow-none">
          Continue
        </button>
      </div>
    </div>
  );
}
