"use client";

import { useState, useEffect, useRef } from "react";
import { detectA4Paper, type A4Detection } from "@/utils/a4Detection";

const INITIAL: A4Detection = { detected: false, ratioOk: false, coveragePct: 0, message: "Place your foot on an A4 sheet" };

/** Periodically check for A4 paper in the camera feed */
export function useA4Detection(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  active: boolean
): A4Detection {
  const [state, setState] = useState<A4Detection>(INITIAL);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) { setState(INITIAL); return; }

    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;

    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) return;
      setState(detectA4Paper(video, canvas));
    }, 400);

    return () => {
      clearInterval(interval);
      canvasRef.current = null;
    };
  }, [active, videoRef]);

  return state;
}
