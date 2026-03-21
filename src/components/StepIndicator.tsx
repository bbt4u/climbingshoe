"use client";

const steps = [
  { label: "Photos", icon: "camera" },
  { label: "Size", icon: "ruler" },
  { label: "Fit", icon: "shoe" },
  { label: "Shoes", icon: "shoe" },
  { label: "Level", icon: "chart" },
];

function StepIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? "text-white" : "currentColor";
  const cls = `w-4 h-4 ${color}`;
  if (type === "camera") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
  if (type === "ruler") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
  if (type === "shoe") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-7 px-1">
      {steps.map((s, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={s.label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-accent text-white shadow-lg shadow-accent/30 animate-glow"
                  : isDone
                  ? "bg-accent/20 text-accent"
                  : "bg-surface-overlay text-text-muted"
              }`}>
                {isDone ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <StepIcon type={s.icon} active={isActive} />
                )}
              </div>
              <span className={`text-[10px] mt-1.5 font-semibold transition-colors ${
                isActive ? "text-accent" : isDone ? "text-accent/60" : "text-text-muted"
              }`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 mx-2 mb-5">
                <div className="h-[2px] rounded-full bg-surface-overlay overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${isDone ? "bg-accent w-full" : "w-0"}`} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
