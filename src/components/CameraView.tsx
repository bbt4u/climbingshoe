"use client";

import { useRef, useEffect } from "react";
import BothFeetOutline from "./BothFeetOutline";

interface Props {
  stream: MediaStream;
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
}

/** Full-screen camera view with foot outline overlay */
export default function CameraView({ stream, onCapture, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    stream.getTracks().forEach((t) => t.stop());
    onCapture(dataUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <BothFeetOutline className="w-64 h-52 text-white/50" />
        </div>
        <p className="absolute top-8 left-0 right-0 text-center text-white/70 text-sm font-medium">
          Place both feet inside the outlines
        </p>
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <div className="bg-black/90 p-6 flex items-center justify-center gap-6">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-full text-white/70 text-sm font-medium border border-white/20"
        >
          Cancel
        </button>
        <button
          onClick={capture}
          className="w-16 h-16 rounded-full border-4 border-white bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-white" />
        </button>
        <div className="w-[72px]" />
      </div>
    </div>
  );
}
