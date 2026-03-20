"use client";

interface Props {
  canCapture: boolean;
  onCapture: () => void;
  onCancel: () => void;
  hint?: string;
}

/** Bottom control bar with cancel and shutter button */
export default function CaptureControls({ canCapture, onCapture, onCancel, hint }: Props) {
  return (
    <div className="bg-black/90 backdrop-blur-sm p-5 pb-8">
      {hint && (
        <p className="text-center text-xs text-accent font-semibold mb-3">{hint}</p>
      )}
      <div className="flex items-center justify-center gap-8">
        <button onClick={onCancel}
          className="px-5 py-2.5 rounded-full text-white/70 text-sm font-medium border border-white/20 hover:bg-white/10 transition-all">
          Cancel
        </button>
        <button
          onClick={onCapture}
          disabled={!canCapture}
          className={`w-18 h-18 rounded-full border-4 flex items-center justify-center transition-all ${
            canCapture
              ? "border-accent bg-accent/20 hover:bg-accent/30 animate-glow"
              : "border-white/20 bg-white/5 opacity-40 cursor-not-allowed"
          }`}
        >
          <div className={`w-14 h-14 rounded-full transition-colors ${canCapture ? "bg-accent" : "bg-white/30"}`} />
        </button>
        {/* Spacer to keep shutter centered */}
        <div className="w-[88px]" />
      </div>
    </div>
  );
}
