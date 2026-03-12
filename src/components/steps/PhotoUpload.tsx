"use client";

import { useRef } from "react";

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

function DropZone({
  label,
  subtitle,
  image,
  onSelect,
}: {
  label: string;
  subtitle: string;
  image: string | null;
  onSelect: (dataUrl: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const dataUrl = await resizeImage(file);
    onSelect(dataUrl);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-brand-400", "bg-brand-50/50"); }}
      onDragLeave={(e) => { e.currentTarget.classList.remove("border-brand-400", "bg-brand-50/50"); }}
      onDrop={async (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-brand-400", "bg-brand-50/50");
        const file = e.dataTransfer.files[0];
        if (file) await handleFile(file);
      }}
      className="group cursor-pointer border-2 border-dashed border-slate-200 hover:border-brand-400 rounded-xl p-5 flex flex-col items-center justify-center min-h-[200px] transition-all duration-200 bg-slate-50/50 hover:bg-brand-50/30"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) await handleFile(file);
        }}
      />
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt={label}
            className="max-h-[170px] rounded-lg object-contain shadow-sm"
          />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      ) : (
        <>
          <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <svg
              className="w-5 h-5 text-brand-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p className="text-slate-700 text-sm font-semibold">{label}</p>
          <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>
        </>
      )}
    </div>
  );
}

export default function PhotoUpload({ photos, onChange, onNext }: Props) {
  const canProceed = photos.front && photos.side;

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Upload Foot Photos</h2>
      <p className="text-slate-500 text-sm mb-5">
        Clear photos help our AI analyze your foot shape for the best match.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <DropZone
          label="Front View"
          subtitle="Toes facing camera"
          image={photos.front}
          onSelect={(url) => onChange({ ...photos, front: url })}
        />
        <DropZone
          label="Side View"
          subtitle="Profile of your foot"
          image={photos.side}
          onSelect={(url) => onChange({ ...photos, side: url })}
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
