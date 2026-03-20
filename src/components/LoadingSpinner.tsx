export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-accent animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
        <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-accent/40 animate-pulse-ring" />
      </div>
      <p className="text-white font-bold text-sm">Analyzing your feet...</p>
      <p className="text-text-muted text-xs mt-1">Finding the perfect shoes for you</p>
    </div>
  );
}
