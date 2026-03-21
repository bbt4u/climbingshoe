"use client";

import { useRef, useState, useCallback } from "react";
import { resizeImage } from "@/utils/resizeImage";
import CameraView from "@/components/CameraView";
import type { ScanMode } from "@/lib/types";

interface Props {
  photos: { front: string | null; side: string | null };
  scanMode: ScanMode;
  onChange: (photos: { front: string | null; side: string | null }) => void;
  onNext: () => void;
}

export default function PhotoUpload({ photos, scanMode, onChange, onNext }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [dragging, setDragging] = useState(false);
  const hasBothPhotos = !!photos.front && !!photos.side;

  const openCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 960 } },
      });
      setCameraStream(stream);
    } catch { fileRef.current?.click(); }
  }, []);

  const handleCameraComplete = useCallback((p: { front: string; side: string }) => {
    setCameraStream(null); onChange(p);
  }, [onChange]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { const url = await resizeImage(file); onChange({ front: url, side: photos.side }); }
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) { const url = await resizeImage(file); onChange({ front: url, side: photos.side }); }
  };

  const modeLabel = scanMode === "precision" ? "Precision Scan" : "Quick Scan";

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-white mb-1">Photos of Your Feet</h2>
      <p className="text-text-secondary text-sm mb-2">We need a top-down and side view for the best recommendations.</p>
      <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-4 ${
        scanMode === "precision" ? "bg-teal/15 text-teal border border-teal/30" : "bg-accent/15 text-accent border border-accent/30"
      }`}>{modeLabel}</span>

      {cameraStream && (
        <CameraView stream={cameraStream} scanMode={scanMode} onComplete={handleCameraComplete}
          onClose={() => { cameraStream.getTracks().forEach((t) => t.stop()); setCameraStream(null); }} />
      )}

      <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}
        className={`rounded-xl border-2 overflow-hidden mb-5 transition-all ${dragging ? "border-accent bg-accent/5" : "border-surface-border bg-surface-overlay/50"}`}>
        {hasBothPhotos ? (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="relative rounded-lg overflow-hidden">
                <img src={photos.front!} alt="Top-down" className="w-full h-[140px] object-cover" />
                <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded">Top-down</span>
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <img src={photos.side!} alt="Side view" className="w-full h-[140px] object-cover" />
                <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded">Side view</span>
              </div>
            </div>
            <button onClick={() => onChange({ front: null, side: null })}
              className="w-full py-2.5 text-xs font-semibold text-text-secondary border border-surface-border rounded-lg hover:bg-surface-overlay transition-all">
              Retake Photos
            </button>
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-surface/60 border-2 border-dashed border-surface-border flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-text-secondary text-sm font-semibold mb-1">Two photos needed</p>
            <p className="text-text-muted text-xs mb-5">
              {scanMode === "precision" ? "Place feet on A4 paper, then capture top-down + side view" : "Top-down view + side view of your feet"}
            </p>
            <div className="flex gap-3 w-full">
              <button onClick={openCamera}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent-light text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 transition-all">
                Take Photos
              </button>
              <button onClick={() => fileRef.current?.click()}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-surface-overlay text-text-secondary border border-surface-border rounded-xl text-sm font-semibold hover:bg-surface-border/50 transition-all">
                Upload
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
        )}
      </div>

      <button disabled={!hasBothPhotos} onClick={onNext}
        className="w-full py-3.5 rounded-xl font-bold text-white bg-accent hover:bg-accent-light disabled:bg-surface-overlay disabled:text-text-muted disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20 disabled:shadow-none">
        Continue
      </button>
    </div>
  );
}
