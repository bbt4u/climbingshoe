/** Realistic foot silhouette outlines for alignment — shows a natural foot shape with 5 toes */
function SingleFoot() {
  return (
    <g>
      {/* Foot body: narrower heel, wider forefoot, slight arch on inner side */}
      <path
        d="M 50 245 Q 16 243 14 200 Q 9 155 19 113 Q 25 85 38 72 Q 52 62 68 68 Q 84 75 89 95 Q 93 135 90 180 Q 87 222 78 240 Q 65 250 50 245 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeDasharray="7 4"
      />
      {/* 5 toes — big toe largest, decreasing to pinky */}
      <ellipse cx="71" cy="46" rx="9" ry="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 3" />
      <ellipse cx="55" cy="38" rx="7" ry="12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 3" />
      <ellipse cx="42" cy="42" rx="6" ry="10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 3" />
      <ellipse cx="31" cy="48" rx="5.5" ry="9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 3" />
      <ellipse cx="22" cy="57" rx="5" ry="8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 3" />
    </g>
  );
}

export default function BothFeetOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 260" className={className}>
      {/* Right foot (user's right — appears on left side of image when looking at feet) */}
      <g transform="translate(0, 0)">
        <SingleFoot />
      </g>
      {/* Left foot (mirrored) */}
      <g transform="translate(240, 0) scale(-1, 1)">
        <SingleFoot />
      </g>
    </svg>
  );
}
