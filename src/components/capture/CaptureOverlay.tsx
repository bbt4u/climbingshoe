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
  a4Detected?: boolean;
}

export default function CaptureOverlay({ mode, angleOk, lightingOk, angleSupported, a4Detected }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col">
      {/* Condition badges */}
      <div className="flex justify-center pt-12 pointer-events-auto">
        <ConditionIndicators angleOk={angleOk} lightingOk={lightingOk} angleSupported={angleSupported}
          showA4={mode === "top"} a4Detected={a4Detected} />
      </div>

      {/* Alignment guides */}
      <div className="flex-1 flex items-center justify-center">
        {mode === "top" ? (
          <div className="relative flex flex-col items-center">
            <A4PaperOutline className={`w-64 h-auto absolute transition-colors ${a4Detected ? "text-teal/40" : "text-accent/30"}`} />
            <BothFeetOutline className="w-52 h-40 text-white/50 z-10" />
          </div>
        ) : (
          <SideViewOutline className="w-64 h-auto text-white/50" />
        )}
      </div>

      {/* Instruction text */}
      <div className="pb-4 text-center">
        <p className="text-white/80 text-sm font-semibold">
          {mode === "top" ? "Align feet and A4 paper inside the guides" : "Show the side of one foot at ankle height"}
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
