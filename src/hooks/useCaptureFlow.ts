"use client";

import { useReducer } from "react";

export type CapturePhase =
  | "guidance"
  | "capture-top"
  | "review-top"
  | "capture-side"
  | "review-side"
  | "complete";

export interface CaptureState {
  phase: CapturePhase;
  guidanceStep: 1 | 2 | 3;
  topPhoto: string | null;
  sidePhoto: string | null;
  angleOk: boolean;
  lightingOk: boolean;
}

export type CaptureAction =
  | { type: "NEXT_GUIDANCE" }
  | { type: "PREV_GUIDANCE" }
  | { type: "START_CAPTURE" }
  | { type: "UPDATE_CONDITIONS"; angleOk: boolean; lightingOk: boolean }
  | { type: "CAPTURE_PHOTO"; dataUrl: string }
  | { type: "CONFIRM_PHOTO" }
  | { type: "RETAKE" }
  | { type: "RESET" };

const initialState: CaptureState = {
  phase: "guidance",
  guidanceStep: 1,
  topPhoto: null,
  sidePhoto: null,
  angleOk: false,
  lightingOk: false,
};

function reducer(state: CaptureState, action: CaptureAction): CaptureState {
  switch (action.type) {
    case "NEXT_GUIDANCE":
      if (state.guidanceStep < 3) return { ...state, guidanceStep: (state.guidanceStep + 1) as 2 | 3 };
      return state;
    case "PREV_GUIDANCE":
      if (state.guidanceStep > 1) return { ...state, guidanceStep: (state.guidanceStep - 1) as 1 | 2 };
      return state;
    case "START_CAPTURE":
      return { ...state, phase: "capture-top", angleOk: false, lightingOk: false };
    case "UPDATE_CONDITIONS":
      return { ...state, angleOk: action.angleOk, lightingOk: action.lightingOk };
    case "CAPTURE_PHOTO":
      if (state.phase === "capture-top") return { ...state, phase: "review-top", topPhoto: action.dataUrl };
      if (state.phase === "capture-side") return { ...state, phase: "review-side", sidePhoto: action.dataUrl };
      return state;
    case "CONFIRM_PHOTO":
      if (state.phase === "review-top") return { ...state, phase: "capture-side", angleOk: false, lightingOk: false };
      if (state.phase === "review-side") return { ...state, phase: "complete" };
      return state;
    case "RETAKE":
      if (state.phase === "review-top") return { ...state, phase: "capture-top", topPhoto: null };
      if (state.phase === "review-side") return { ...state, phase: "capture-side", sidePhoto: null };
      return state;
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useCaptureFlow() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const canCapture = state.angleOk && state.lightingOk;
  return { state, dispatch, canCapture };
}
