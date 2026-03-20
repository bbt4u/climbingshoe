"use client";

import { useState, useEffect, useRef } from "react";
import { getAverageBrightness, MIN_BRIGHTNESS } from "@/utils/brightness";

interface BrightnessState {
  brightness: number;
  isBright: boolean;
}

/** Periodically sample video brightness using a tiny offscreen canvas */
export function useBrightnessCheck(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  active: boolean
): BrightnessState {
  const [state, setState] = useState<BrightnessState>({ brightness: 0, isBright: false });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    // Create a tiny offscreen canvas for sampling
    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 120;
    canvasRef.current = canvas;

    const check = () => {
      const video = videoRef.current;
      const ctx = canvas.getContext("2d");
      if (!video || !ctx || video.readyState < 2) return;

      ctx.drawImage(video, 0, 0, 160, 120);
      const imageData = ctx.getImageData(0, 0, 160, 120);
      const brightness = getAverageBrightness(imageData);
      setState({ brightness, isBright: brightness >= MIN_BRIGHTNESS });
    };

    // Check every 500ms — minimal CPU overhead
    const interval = setInterval(check, 500);
    timerRef.current = interval as unknown as number;

    return () => {
      clearInterval(interval);
      canvasRef.current = null;
    };
  }, [active, videoRef]);

  return state;
}
