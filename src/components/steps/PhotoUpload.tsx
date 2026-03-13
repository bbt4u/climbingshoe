"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface Props {
  photos: { front: string | null; side: string | null };
  onChange: (photos: { front: string | null; side: string | null }) => void;
  onNext: () => void;
}

function resizeImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 1200;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = (h / w) * maxDim;
            w = maxDim;
          } else {
            w = (w / h) * maxDim;
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function BothFeetOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 220" className={className}>
      {/* Left foot */}
      <g transform="translate(20, 10)">
        <ellipse cx="55" cy="160" rx="38" ry="42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
        <ellipse cx="75" cy="110" rx="8" ry="11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="63" cy="103" rx="7" ry="10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="50" cy="107" rx="6.5" ry="9.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="39" cy="113" rx="6" ry="8.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="30" cy="122" rx="5.5" ry="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
      </g>
      {/* Right foot */}
      <g transform="translate(130, 10)">
        <ellipse cx="55" cy="160" rx="38" ry="42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
        <ellipse cx="35" cy="110" rx="8" ry="11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="47" cy="103" rx="7" ry="10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="60" cy="107" rx="6.5" ry="9.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="71" cy="113" rx="6" ry="8.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="80" cy="122" rx="5.5" ry="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
      </g>
    </svg>
  );
}

function CameraView({
  stream,
  onCapture,
  onClose,
}: {
  stream: MediaStream;
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
}) {
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
        {/* Overlay guide */}
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

export default function PhotoUpload({ photos, onChange, onNext }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const canProceed = !!photos.front;

  const openCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 960 } },
      });
      setCameraStream(stream);
    } catch {
      // Fallback to native camera input if getUserMedia fails
      cameraInputRef.current?.click();
    }
  }, []);

  const handlePhoto = (url: string) => {
    onChange({ front: url, side: url });
  };

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Photo of Your Feet</h2>
      <p className="text-slate-500 text-sm mb-5">
        Stand on a flat surface and take a photo of both feet from above. Align with the guides for best results.
      </p>

      {cameraStream && (
        <CameraView
          stream={cameraStream}
          onCapture={(url) => {
            setCameraStream(null);
            handlePhoto(url);
          }}
          onClose={() => {
            cameraStream.getTracks().forEach((t) => t.stop());
            setCameraStream(null);
          }}
        />
      )}

      <div className="rounded-xl border-2 border-slate-100 bg-slate-50/50 overflow-hidden mb-5">
        {photos.front ? (
          <div className="relative">
            <img
              src={photos.front}
              alt="Both feet"
              className="w-full h-[280px] object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-1.5">
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
            {/* Guide area */}
            <div className="flex flex-col items-center justify-center h-[200px] mb-4 rounded-lg bg-gradient-to-b from-brand-50/50 to-white border border-dashed border-brand-200 relative">
              <BothFeetOutline className="w-48 h-36 text-brand-300 opacity-60" />
              <p className="text-[11px] text-brand-400 mt-2 font-medium">
                Place both feet side by side
              </p>
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

            {/* Hidden inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) handlePhoto(await resizeImage(file));
                e.target.value = "";
              }}
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) handlePhoto(await resizeImage(file));
                e.target.value = "";
              }}
            />
          </div>
        )}
      </div>

      <button
        disabled={!canProceed}
        onClick={onNext}
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-brand-200/50 disabled:shadow-none"
      >
        Continue
      </button>
    </div>
  );
}
