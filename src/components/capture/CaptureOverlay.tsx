"use client";

import BothFeetOutline from "@/components/BothFeetOutline";
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
      {/* Condition badges — informational only */}
      <div className="flex justify-center pt-12 pointer-events-auto">
        <ConditionIndicators angleOk={angleOk} lightingOk={lightingOk} angleSupported={angleSupported}
          showA4={mode === "top"} a4Detected={a4Detected} />
      </div>

      {/* Alignment guide */}
      <div className="flex-1 flex items-center justify-center">
        {mode === "top" ? (
          <BothFeetOutline className="w-56 h-56 text-white/60" />
        ) : (
          <SideViewOutline className="w-64 h-auto text-white/50" />
        )}
      </div>

      {/* Instruction text */}
      <div className="pb-4 text-center px-4">
        <p className="text-white/85 text-sm font-semibold">
          {mode === "top" ? "Align both feet inside the outline" : "Show the side of one foot"}
        </p>
        <p className="text-white/50 text-[11px] mt-1">
          {mode === "top"
            ? "Tip: A4 paper underneath helps accuracy"
            : "Tip: keep camera at ankle height"}
        </p>
      </div>
    </div>
  );
}
