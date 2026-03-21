"use client";

import { useRef, useEffect, useCallback } from "react";
import { useCaptureFlow } from "@/hooks/useCaptureFlow";
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";
import { useBrightnessCheck } from "@/hooks/useBrightnessCheck";
import { useA4Detection } from "@/hooks/useA4Detection";
import { isTopDownAngle, isSideAngle, needsOrientationPermission } from "@/utils/orientation";
import CaptureGuidance from "@/components/capture/CaptureGuidance";
import CaptureOverlay from "@/components/capture/CaptureOverlay";
import CaptureControls from "@/components/capture/CaptureControls";
import PhotoReview from "@/components/capture/PhotoReview";
import type { ScanMode } from "@/lib/types";

interface Props {
  stream: MediaStream;
  scanMode: ScanMode;
  onComplete: (photos: { front: string; side: string }) => void;
  onClose: () => void;
}

export default function CameraView({ stream, scanMode, onComplete, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, dispatch, canCapture } = useCaptureFlow();
  const orientation = useDeviceOrientation();
  const isLive = state.phase === "capture-top" || state.phase === "capture-side";
  const { isBright } = useBrightnessCheck(videoRef, isLive);
  const isPrecision = scanMode === "precision";
  const a4 = useA4Detection(videoRef, isLive && isPrecision);

  useEffect(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, [stream]);

  // Sync conditions — precision mode also requires A4 detection for top-down
  useEffect(() => {
    if (!isLive) return;
    const angleSupported = orientation.permission === "granted";
    const isTopDown = state.phase === "capture-top";
    const angleOk = !angleSupported ? true
      : isTopDown ? isTopDownAngle(orientation.beta, isPrecision ? 5 : 10) // tighter tolerance for precision
      : isSideAngle(orientation.beta);

    // For precision top-down, also need A4 detected
    let lightingAndA4Ok = isBright;
    if (isPrecision && isTopDown) {
      lightingAndA4Ok = isBright && a4.detected && a4.ratioOk;
    }
    dispatch({ type: "UPDATE_CONDITIONS", angleOk, lightingOk: lightingAndA4Ok });
  }, [isLive, orientation.beta, orientation.permission, isBright, state.phase, isPrecision, a4, dispatch]);

  useEffect(() => {
    if (state.phase === "complete" && state.topPhoto && state.sidePhoto) {
      stream.getTracks().forEach((t) => t.stop());
      onComplete({ front: state.topPhoto, side: state.sidePhoto });
    }
  }, [state.phase, state.topPhoto, state.sidePhoto, stream, onComplete]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")!.drawImage(video, 0, 0);
    dispatch({ type: "CAPTURE_PHOTO", dataUrl: canvas.toDataURL("image/jpeg", 0.85) });
  }, [dispatch]);

  const handleClose = () => { stream.getTracks().forEach((t) => t.stop()); onClose(); };

  if (state.phase === "guidance") {
    return (
      <CaptureGuidance step={state.guidanceStep}
        onNext={() => dispatch({ type: "NEXT_GUIDANCE" })}
        onBack={() => state.guidanceStep === 1 ? handleClose() : dispatch({ type: "PREV_GUIDANCE" })}
        onStart={() => dispatch({ type: "START_CAPTURE" })}
        onRequestPermission={orientation.requestPermission}
        permissionNeeded={needsOrientationPermission() && orientation.permission === "prompt"} />
    );
  }

  if (state.phase === "review-top" && state.topPhoto) {
    return <PhotoReview photoUrl={state.topPhoto} label="Top-down view" stepLabel="Photo 1 of 2"
      onConfirm={() => dispatch({ type: "CONFIRM_PHOTO" })} onRetake={() => dispatch({ type: "RETAKE" })} />;
  }
  if (state.phase === "review-side" && state.sidePhoto) {
    return <PhotoReview photoUrl={state.sidePhoto} label="Side view" stepLabel="Photo 2 of 2"
      onConfirm={() => dispatch({ type: "CONFIRM_PHOTO" })} onRetake={() => dispatch({ type: "RETAKE" })} />;
  }

  const mode = state.phase === "capture-top" ? "top" : "side";
  const angleSupported = orientation.permission === "granted";

  // Build contextual hint
  let hint: string | undefined;
  if (state.phase === "capture-side") hint = "Now capture a side view of one foot";
  else if (isPrecision && !a4.detected) hint = a4.message;
  else if (isPrecision && !a4.ratioOk) hint = a4.message;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="relative flex-1 overflow-hidden">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        <CaptureOverlay mode={mode} angleOk={state.angleOk} lightingOk={state.lightingOk}
          angleSupported={angleSupported} isPrecision={isPrecision} a4Detected={a4.detected && a4.ratioOk} />
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <CaptureControls canCapture={canCapture} onCapture={capture} onCancel={handleClose} hint={hint} />
    </div>
  );
}
