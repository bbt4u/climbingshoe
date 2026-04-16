"use client";

interface Props {
  angleOk: boolean;
  lightingOk: boolean;
  angleSupported: boolean;
  showA4?: boolean;
  a4Detected?: boolean;
}

function Badge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-sm transition-all ${
      ok ? "bg-teal/20 text-teal" : "bg-accent/20 text-accent"
    }`}>
      {ok ? (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
        </svg>
      )}
      {label}
    </div>
  );
}

export default function ConditionIndicators({ angleOk, lightingOk, angleSupported, showA4, a4Detected }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-center">
      {angleSupported ? (
        <Badge ok={angleOk} label={angleOk ? "Angle OK" : "Level phone"} />
      ) : (
        <Badge ok={true} label="Manual mode" />
      )}
      <Badge ok={lightingOk} label={lightingOk ? "Lighting OK" : "Too dark"} />
      {showA4 && a4Detected && (
        <Badge ok={true} label="A4 detected" />
      )}
    </div>
  );
}
