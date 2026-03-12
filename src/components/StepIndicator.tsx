"use client";

const steps = ["Photos", "Size", "Shoes", "Level"];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-md shadow-brand-200 scale-110"
                    : isDone
                    ? "bg-brand-100 text-brand-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {isDone ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-[11px] mt-1.5 font-medium transition-colors ${
                  isActive
                    ? "text-brand-600"
                    : isDone
                    ? "text-brand-400"
                    : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 mx-2 mb-5">
                <div className="h-[2px] rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDone ? "bg-brand-400 w-full" : "w-0"
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
