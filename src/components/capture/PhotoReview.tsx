"use client";

interface Props {
  photoUrl: string;
  label: string;
  stepLabel: string;
  onConfirm: () => void;
  onRetake: () => void;
}

/** Full-screen review of a captured photo with confirm/retake actions */
export default function PhotoReview({ photoUrl, label, stepLabel, onConfirm, onRetake }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-sm px-4 py-4 flex items-center justify-between">
        <span className="text-white/50 text-xs font-bold uppercase tracking-wider">{stepLabel}</span>
        <span className="text-white font-bold text-sm">{label}</span>
        <div className="w-16" />
      </div>

      {/* Photo */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <img src={photoUrl} alt={label} className="w-full h-full object-contain" />
      </div>

      {/* Actions */}
      <div className="bg-black/90 backdrop-blur-sm p-5 pb-8 flex gap-4">
        <button onClick={onRetake}
          className="flex-1 py-3.5 rounded-xl font-semibold text-white/80 border border-white/20 hover:bg-white/10 transition-all">
          Retake
        </button>
        <button onClick={onConfirm}
          className="flex-1 py-3.5 rounded-xl font-bold text-white bg-teal hover:bg-teal-dark transition-all shadow-lg">
          Use This Photo
        </button>
      </div>
    </div>
  );
}
