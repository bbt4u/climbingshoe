"use client";

interface Props {
  step: 1 | 2 | 3;
  onNext: () => void;
  onBack: () => void;
  onStart: () => void;
  onRequestPermission: () => void;
  permissionNeeded: boolean;
}

const steps = [
  {
    title: "Place A4 paper on the floor",
    desc: "This gives us a size reference for accurate measurements. Use any standard A4 or Letter paper.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Stand naturally with bare feet",
    desc: "Place both feet on or near the paper with your full weight distributed evenly. Remove socks for best results.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Hold phone directly above",
    desc: "Point the camera straight down at your feet. We'll check the angle and lighting before capturing.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22v-4" />
      </svg>
    ),
  },
];

export default function CaptureGuidance({ step, onNext, onBack, onStart, onRequestPermission, permissionNeeded }: Props) {
  const s = steps[step - 1];
  const isLast = step === 3;

  return (
    <div className="fixed inset-0 z-50 bg-[#12121f] flex flex-col items-center justify-center px-6">
      {/* Progress dots */}
      <div className="flex gap-2 mb-10">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`w-2.5 h-2.5 rounded-full transition-all ${n === step ? "bg-accent scale-125" : n < step ? "bg-accent/50" : "bg-surface-border"}`} />
        ))}
      </div>

      <div className="text-accent mb-6">{s.icon}</div>
      <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Step {step} of 3</p>
      <h2 className="text-xl font-extrabold text-white text-center mb-3">{s.title}</h2>
      <p className="text-text-secondary text-sm text-center max-w-xs mb-10 leading-relaxed">{s.desc}</p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {isLast ? (
          <>
            {permissionNeeded && (
              <button onClick={onRequestPermission}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-teal hover:bg-teal-dark transition-all shadow-lg mb-1">
                Enable Sensors
              </button>
            )}
            <button onClick={onStart}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-accent hover:bg-accent-light transition-all shadow-lg shadow-accent/25">
              Open Camera
            </button>
          </>
        ) : (
          <button onClick={onNext}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-accent hover:bg-accent-light transition-all shadow-lg shadow-accent/25">
            Next
          </button>
        )}
        {step > 1 && (
          <button onClick={onBack}
            className="w-full py-3 rounded-xl font-semibold text-text-secondary border border-surface-border hover:bg-surface-overlay transition-all">
            Back
          </button>
        )}
      </div>
    </div>
  );
}
