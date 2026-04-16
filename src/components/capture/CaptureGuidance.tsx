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
    title: "Stand with bare feet",
    desc: "Remove socks and stand naturally with weight evenly distributed on both feet. If you have A4 paper handy, stand on it — it helps accuracy but isn't required.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Point camera down at feet",
    desc: "Hold your phone roughly above your feet with the camera pointing down. Perfect alignment isn't needed — just capture when you can see both feet in the frame.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22v-4" />
      </svg>
    ),
  },
  {
    title: "Then capture a side view",
    desc: "After the top-down shot, you'll take a side view of one foot at ankle height. This helps us see arch and volume.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3v18h18M7 17l4-4 4 4 5-5" />
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
