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
  image,
  onSelect,
}: {
  label: string;
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
      onDragOver={(e) => e.preventDefault()}
      onDrop={async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) await handleFile(file);
      }}
      className="cursor-pointer border-2 border-dashed border-stone-300 hover:border-indigo-400 rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px] transition-colors bg-white"
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
        <img
          src={image}
          alt={label}
          className="max-h-[180px] rounded-lg object-contain"
        />
      ) : (
        <>
          <svg
            className="w-10 h-10 text-stone-300 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-stone-500 text-sm font-medium">{label}</p>
          <p className="text-stone-400 text-xs mt-1">
            Click or drag to upload
          </p>
        </>
      )}
    </div>
  );
}

export default function PhotoUpload({ photos, onChange, onNext }: Props) {
  const canProceed = photos.front && photos.side;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Upload Foot Photos</h2>
      <p className="text-stone-500 text-sm mb-6">
        Take clear photos of your feet so our AI can analyze your foot shape.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <DropZone
          label="Front View"
          image={photos.front}
          onSelect={(url) => onChange({ ...photos, front: url })}
        />
        <DropZone
          label="Side View"
          image={photos.side}
          onSelect={(url) => onChange({ ...photos, side: url })}
        />
      </div>
      <button
        disabled={!canProceed}
        onClick={onNext}
        className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}
