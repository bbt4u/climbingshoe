"use client";

const steps = ["Photos", "Size", "Current Shoes", "Experience"];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : isDone
                  ? "bg-indigo-200 text-indigo-700"
                  : "bg-stone-200 text-stone-400"
              }`}
            >
              {isDone ? "✓" : stepNum}
            </div>
            <span
              className={`hidden sm:inline text-sm ${
                isActive
                  ? "text-indigo-600 font-medium"
                  : isDone
                  ? "text-indigo-400"
                  : "text-stone-400"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 ${
                  isDone ? "bg-indigo-300" : "bg-stone-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
