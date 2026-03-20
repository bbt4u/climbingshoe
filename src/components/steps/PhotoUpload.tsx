"use client";

import { useRef, useState, useCallback } from "react";
import { resizeImage } from "@/utils/resizeImage";
import BothFeetOutline from "@/components/BothFeetOutline";
import CameraView from "@/components/CameraView";

interface Props {
  photos: { front: string | null; side: string | null };
  onChange: (photos: { front: string | null; side: string | null }) => void;
  onNext: () => void;
}

export default function PhotoUpload({ photos, onChange, onNext }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [dragging, setDragging] = useState(false);

  const openCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 960 } },
      });
      setCameraStream(stream);
    } catch {
      cameraInputRef.current?.click();
    }
  }, []);

  const handlePhoto = (url: string) => onChange({ front: url, side: url });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handlePhoto(await resizeImage(file));
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) handlePhoto(await resizeImage(file));
  };

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-white mb-1">Photo of Your Feet</h2>
      <p className="text-text-secondary text-sm mb-5">Stand on a flat surface and take a photo of both feet from above.</p>

      {cameraStream && (
        <CameraView stream={cameraStream}
          onCapture={(url) => { setCameraStream(null); handlePhoto(url); }}
          onClose={() => { cameraStream.getTracks().forEach((t) => t.stop()); setCameraStream(null); }} />
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`rounded-xl border-2 overflow-hidden mb-5 transition-all duration-200 ${
          dragging ? "border-accent bg-accent/5" : "border-surface-border bg-surface-overlay/50"
        }`}
      >
        {photos.front ? (
          <div className="relative">
            <img src={photos.front} alt="Both feet" className="w-full h-[300px] object-cover" />
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <button onClick={() => onChange({ front: null, side: null })}
              className="absolute bottom-3 right-3 px-4 py-2 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded-lg hover:bg-black/90 transition-all">
              Retake
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex flex-col items-center justify-center h-[220px] mb-5 rounded-xl bg-surface/60 border-2 border-dashed border-surface-border">
              <BothFeetOutline className="w-52 h-40 text-text-muted opacity-40" />
              <p className="text-xs text-text-muted mt-3 font-medium">Place both feet side by side</p>
              <p className="text-[10px] text-text-muted/50 mt-1">Drag & drop an image here</p>
            </div>
            <div className="flex gap-3">
              <button onClick={openCamera}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent-light text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Take Photo
              </button>
              <button onClick={() => fileRef.current?.click()}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-surface-overlay text-text-secondary border border-surface-border rounded-xl text-sm font-semibold hover:bg-surface-border/50 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload
              </button>
            </div>
            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
        )}
      </div>

      <button disabled={!photos.front} onClick={onNext}
        className="w-full py-3.5 rounded-xl font-bold text-white bg-accent hover:bg-accent-light disabled:bg-surface-overlay disabled:text-text-muted disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20 disabled:shadow-none">
        Continue
      </button>
    </div>
  );
}
