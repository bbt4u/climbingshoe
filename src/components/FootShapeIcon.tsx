import { FootShape } from "@/lib/types";
import { toeHeights } from "@/data/footShapes";

/** Bar-chart style visualization of a foot shape's toe profile */
export default function FootShapeIcon({ shape }: { shape: FootShape }) {
  const heights = toeHeights[shape];
  const toeX = [18, 32, 46, 58, 68];
  const toeW = [10, 9, 8, 7, 6];

  return (
    <svg viewBox="0 0 86 56" className="w-16 h-10">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={toeX[i]}
          y={56 - h}
          width={toeW[i]}
          height={h}
          rx={toeW[i] / 2}
          fill="currentColor"
          opacity={0.7 + i * 0.05}
        />
      ))}
    </svg>
  );
}
