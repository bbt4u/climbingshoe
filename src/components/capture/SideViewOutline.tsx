/** SVG showing a side-profile foot silhouette outline for the side capture step */
export default function SideViewOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 140" className={className}>
      <path
        d="M40 120 C40 80 55 50 80 35 C100 22 130 18 155 22 C175 25 195 35 210 40 L240 45 C255 47 265 55 265 65 L265 95 C265 110 255 118 240 120 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      {/* Ankle indicator */}
      <line x1="42" y1="40" x2="42" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <text x="42" y="33" textAnchor="middle" fill="currentColor" fontSize="10" opacity="0.5">ankle</text>
    </svg>
  );
}
