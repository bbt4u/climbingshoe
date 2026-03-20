"use client";

interface Props {
  angleOk: boolean;
  lightingOk: boolean;
  angleSupported: boolean;
}

function Badge({ ok, label, icon }: { ok: boolean; label: string; icon: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm transition-all ${
      ok ? "bg-teal/20 text-teal" : "bg-accent/20 text-accent"
    }`}>
      {icon}
      {label}
    </div>
  );
}

export default function ConditionIndicators({ angleOk, lightingOk, angleSupported }: Props) {
  return (
    <div className="flex gap-2">
      {angleSupported ? (
        <Badge ok={angleOk} label={angleOk ? "Angle OK" : "Level your phone"}
          icon={
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18V6m0 0l-4 4m4-4l4 4" />
            </svg>
          }
        />
      ) : (
        <Badge ok={true} label="Manual mode"
          icon={
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
      )}
      <Badge ok={lightingOk} label={lightingOk ? "Lighting OK" : "Too dark"}
        icon={
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        }
      />
    </div>
  );
}
