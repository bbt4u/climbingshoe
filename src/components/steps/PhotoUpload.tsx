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

  // Shared handler for both file inputs to avoid duplication
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handlePhoto(await resizeImage(file));
    e.target.value = "";
  };

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Photo of Your Feet</h2>
      <p className="text-slate-500 text-sm mb-5">
        Stand on a flat surface and take a photo of both feet from above.
      </p>

      {cameraStream && (
        <CameraView
          stream={cameraStream}
          onCapture={(url) => { setCameraStream(null); handlePhoto(url); }}
          onClose={() => { cameraStream.getTracks().forEach((t) => t.stop()); setCameraStream(null); }}
        />
      )}

      <div className="rounded-xl border-2 border-slate-100 bg-slate-50/50 overflow-hidden mb-5">
        {photos.front ? (
          <div className="relative">
            <img src={photos.front} alt="Both feet" className="w-full h-[280px] object-cover" />
            <div className="absolute top-2 right-2">
              <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <button
              onClick={() => onChange({ front: null, side: null })}
              className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg hover:bg-black/80 transition-all"
            >
              Retake
            </button>
          </div>
        ) : (
          <div className="p-5">
            <div className="flex flex-col items-center justify-center h-[200px] mb-4 rounded-lg bg-gradient-to-b from-brand-50/50 to-white border border-dashed border-brand-200">
              <BothFeetOutline className="w-48 h-36 text-brand-300 opacity-60" />
              <p className="text-[11px] text-brand-400 mt-2 font-medium">Place both feet side by side</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={openCamera}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-brand-200/50 hover:from-brand-700 hover:to-brand-600 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Take Photo
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-all"
              >
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

      <button
        disabled={!photos.front}
        onClick={onNext}
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-brand-200/50 disabled:shadow-none"
      >
        Continue
      </button>
    </div>
  );
}
