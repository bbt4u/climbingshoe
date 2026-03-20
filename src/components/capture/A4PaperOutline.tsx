/** SVG overlay showing A4 paper rectangle (210:297 ratio) with corner brackets */
export default function A4PaperOutline({ className }: { className?: string }) {
  // A4 ratio: 210mm x 297mm ≈ 0.707:1
  const w = 180;
  const h = Math.round(w / 0.707);
  const b = 20; // corner bracket length

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      {/* Dashed border */}
      <rect x="0" y="0" width={w} height={h} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 5" rx="4" />
      {/* Corner brackets for alignment */}
      {[[0, 0], [w, 0], [0, h], [w, h]].map(([cx, cy], i) => {
        const dx = cx === 0 ? 1 : -1;
        const dy = cy === 0 ? 1 : -1;
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={cx + dx * b} y2={cy} stroke="currentColor" strokeWidth="3" />
            <line x1={cx} y1={cy} x2={cx} y2={cy + dy * b} stroke="currentColor" strokeWidth="3" />
          </g>
        );
      })}
      {/* Label */}
      <text x={w - 8} y={h - 8} textAnchor="end" fill="currentColor" fontSize="12" fontWeight="bold" opacity="0.6">A4</text>
    </svg>
  );
}
