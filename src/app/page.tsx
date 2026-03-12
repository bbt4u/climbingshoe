"use client";

import { useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import PhotoUpload from "@/components/steps/PhotoUpload";
import ShoeSize from "@/components/steps/ShoeSize";
import CurrentShoes from "@/components/steps/CurrentShoes";
import Experience from "@/components/steps/Experience";
import Results from "@/components/Results";
import type {
  FormData,
  RecommendResponse,
  SizeSystem,
  FootWidth,
  ExperienceLevel,
} from "@/lib/types";

const initialForm: FormData = {
  photos: { front: null, side: null },
  sizeSystem: "US",
  shoeSize: "",
  footWidth: "medium",
  currentShoes: [],
  experience: "beginner",
};

type Step = 1 | 2 | 3 | 4 | "loading" | "results";

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [results, setResults] = useState<RecommendResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setStep("loading");
    setError(null);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Something went wrong");
      }
      const data: RecommendResponse = await res.json();
      setResults(data);
      setStep("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep(4);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setResults(null);
    setError(null);
    setStep(1);
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-2">Boulder Fit</h1>
        <p className="text-center text-stone-500 text-sm mb-8">
          AI-powered bouldering shoe recommendations
        </p>

        {typeof step === "number" && <StepIndicator current={step} />}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        {step === 1 && (
          <PhotoUpload
            photos={form.photos}
            onChange={(photos) => setForm({ ...form, photos })}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <ShoeSize
            sizeSystem={form.sizeSystem}
            shoeSize={form.shoeSize}
            footWidth={form.footWidth}
            onChange={({
              sizeSystem,
              shoeSize,
              footWidth,
            }: {
              sizeSystem: SizeSystem;
              shoeSize: string;
              footWidth: FootWidth;
            }) => setForm({ ...form, sizeSystem, shoeSize, footWidth })}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <CurrentShoes
            selected={form.currentShoes}
            onChange={(currentShoes: string[]) =>
              setForm({ ...form, currentShoes })
            }
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <Experience
            experience={form.experience}
            onChange={(experience: ExperienceLevel) =>
              setForm({ ...form, experience })
            }
            onSubmit={handleSubmit}
            onBack={() => setStep(3)}
          />
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <p className="text-stone-500 text-sm">
              Analyzing your feet and finding the perfect shoes...
            </p>
          </div>
        )}

        {step === "results" && results && (
          <Results data={results} onReset={reset} />
        )}
      </div>
    </main>
  );
}
