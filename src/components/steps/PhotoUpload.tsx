"use client";

import { useRef, useState } from "react";

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

function FootOutlineFront() {
  return (
    <svg viewBox="0 0 120 200" className="w-20 h-28 text-brand-300 opacity-60">
      <ellipse cx="60" cy="160" rx="35" ry="38" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <ellipse cx="38" cy="115" rx="8" ry="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      <ellipse cx="52" cy="108" rx="7" ry="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      <ellipse cx="65" cy="112" rx="6" ry="9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      <ellipse cx="76" cy="118" rx="5.5" ry="8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      <ellipse cx="85" cy="128" rx="5" ry="7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  );
}

function FootOutlineSide() {
  return (
    <svg viewBox="0 0 180 120" className="w-28 h-16 text-brand-300 opacity-60">
      <path
        d="M 20 100 Q 15 60 30 35 Q 45 15 70 12 Q 95 10 110 15 Q 125 20 140 30 Q 160 45 165 70 Q 168 85 160 95 Q 150 105 20 100 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
    </svg>
  );
}

function CameraZone({
  label,
  subtitle,
  tip,
  image,
  outline,
  onCapture,
  onUpload,
}: {
  label: string;
  subtitle: string;
  tip: string;
  image: string | null;
  outline: React.ReactNode;
  onCapture: (dataUrl: string) => void;
  onUpload: (dataUrl: string) => void;
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [removing, setRemoving] = useState(false);

  const handleFile = async (file: File) => {
    const dataUrl = await resizeImage(file);
    return dataUrl;
  };

  return (
    <div className="rounded-xl border-2 border-slate-100 bg-slate-50/50 overflow-hidden transition-all duration-200">
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt={label}
            className="w-full h-[220px] object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-1.5">
            <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => {
              setRemoving(true);
              setTimeout(() => {
                onCapture("");
                setRemoving(false);
              }, 150);
            }}
            className={`absolute bottom-2 right-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg hover:bg-black/80 transition-all ${removing ? "opacity-50" : ""}`}
          >
            Retake
          </button>
          <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
            <p className="text-white text-xs font-medium">{label}</p>
          </div>
        </div>
      ) : (
        <div className="p-5">
          {/* Guide area */}
          <div className="flex flex-col items-center justify-center h-[140px] mb-4 rounded-lg bg-gradient-to-b from-brand-50/50 to-white border border-dashed border-brand-200 relative">
            {outline}
            <p className="text-[11px] text-brand-400 mt-2 font-medium">{tip}</p>
          </div>

          <p className="text-sm font-bold text-slate-700 text-center mb-1">{label}</p>
          <p className="text-xs text-slate-400 text-center mb-4">{subtitle}</p>

          {/* Camera button (mobile) */}
          <div className="flex gap-2">
            <button
              onClick={() => cameraRef.current?.click()}
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

          {/* Hidden file inputs */}
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = await handleFile(file);
                onCapture(url);
              }
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
              if (file) {
                const url = await handleFile(file);
                onUpload(url);
              }
              e.target.value = "";
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function PhotoUpload({ photos, onChange, onNext }: Props) {
  const canProceed = photos.front && photos.side;

  const handlePhoto = (key: "front" | "side") => (url: string) => {
    if (url === "") {
      onChange({ ...photos, [key]: null });
    } else {
      onChange({ ...photos, [key]: url });
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Upload Foot Photos</h2>
      <p className="text-slate-500 text-sm mb-5">
        Align your foot with the guide for the best AI analysis.
      </p>

      <div className="space-y-3 mb-5">
        <CameraZone
          label="Front View"
          subtitle="Position toes facing the camera"
          tip="Align your foot here"
          image={photos.front}
          outline={<FootOutlineFront />}
          onCapture={handlePhoto("front")}
          onUpload={handlePhoto("front")}
        />
        <CameraZone
          label="Side View"
          subtitle="Show the arch profile of your foot"
          tip="Align your foot here"
          image={photos.side}
          outline={<FootOutlineSide />}
          onCapture={handlePhoto("side")}
          onUpload={handlePhoto("side")}
        />
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
