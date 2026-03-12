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
    <main className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
          AI-Powered
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 bg-clip-text text-transparent">
          Boulder Fit
        </h1>
        <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-md mx-auto">
          Upload your foot photos. Get personalized climbing shoe recommendations powered by AI.
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-brand-100/50 border border-white/60 p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {typeof step === "number" && <StepIndicator current={step} />}

          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
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
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center">
                  <svg className="w-7 h-7 text-brand-600 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
                <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-brand-300 animate-pulse-ring" />
              </div>
              <p className="text-slate-700 font-semibold text-sm">Analyzing your feet...</p>
              <p className="text-slate-400 text-xs mt-1">Finding the perfect shoes for you</p>
            </div>
          )}

          {step === "results" && results && (
            <Results data={results} onReset={reset} />
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Recommendations are AI-generated and should be combined with in-store fitting.
        </p>
      </div>
    </main>
  );
}
