/** Animated loading spinner shown while AI analyzes foot photos */
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-brand-600 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
        <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-brand-300 animate-pulse-ring" />
      </div>
      <p className="text-slate-700 font-semibold text-sm">Analyzing your feet...</p>
      <p className="text-slate-400 text-xs mt-1">Finding the perfect shoes for you</p>
    </div>
  );
}
