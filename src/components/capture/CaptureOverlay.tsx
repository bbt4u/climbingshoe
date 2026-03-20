"use client";

import BothFeetOutline from "@/components/BothFeetOutline";
import A4PaperOutline from "./A4PaperOutline";
import SideViewOutline from "./SideViewOutline";
import ConditionIndicators from "./ConditionIndicators";

interface Props {
  mode: "top" | "side";
  angleOk: boolean;
  lightingOk: boolean;
  angleSupported: boolean;
}

/** Camera overlay composing appropriate guides based on capture mode */
export default function CaptureOverlay({ mode, angleOk, lightingOk, angleSupported }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col">
      {/* Top: condition badges */}
      <div className="flex justify-center pt-12 pointer-events-auto">
        <ConditionIndicators angleOk={angleOk} lightingOk={lightingOk} angleSupported={angleSupported} />
      </div>

      {/* Center: alignment guides */}
      <div className="flex-1 flex items-center justify-center">
        {mode === "top" ? (
          <div className="relative flex flex-col items-center">
            <A4PaperOutline className="w-56 h-auto text-white/25 absolute" />
            <BothFeetOutline className="w-52 h-40 text-white/50 z-10" />
          </div>
        ) : (
          <SideViewOutline className="w-64 h-auto text-white/50" />
        )}
      </div>

      {/* Bottom: instruction text */}
      <div className="pb-4 text-center">
        <p className="text-white/80 text-sm font-semibold">
          {mode === "top"
            ? "Align both feet inside the outline on A4 paper"
            : "Show the side of one foot at ankle height"}
        </p>
        {!angleOk && angleSupported && (
          <p className="text-accent text-xs mt-1 font-medium">Hold your phone directly above your feet</p>
        )}
        {!lightingOk && (
          <p className="text-accent text-xs mt-1 font-medium">Increase lighting for better accuracy</p>
        )}
      </div>
    </div>
  );
}
