"use client";

import { useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import ScanModeSelector from "@/components/ScanModeSelector";
import PhotoUpload from "@/components/steps/PhotoUpload";
import ShoeSize from "@/components/steps/ShoeSize";
import FitQuestions from "@/components/steps/FitQuestions";
import CurrentShoes from "@/components/steps/CurrentShoes";
import Experience from "@/components/steps/Experience";
import Results from "@/components/Results";
import LoadingSpinner from "@/components/LoadingSpinner";
import type { FormData, RecommendResponse, SizeSystem, ScanMode, FitAnswers, ExperienceLevel } from "@/lib/types";

const initialForm: FormData = {
  photos: { front: null, side: null },
  scanMode: "quick",
  sizeSystem: "US",
  streetSize: "",
  climbingSize: "",
  climbingBrand: "",
  fitAnswers: { tightOnSides: "", sizeUpForWidth: "", heelSlips: "" },
  currentShoes: [],
  experience: "beginner",
};

// 0=hero, 0.5=mode select, 1=photos, 2=size, 3=fit, 4=shoes, 5=experience
type Step = 0 | 0.5 | 1 | 2 | 3 | 4 | 5 | "loading" | "results";

export default function Home() {
  const [step, setStep] = useState<Step>(0);
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
      if (!res.ok) throw new Error(await res.text() || "Something went wrong");
      const data: RecommendResponse = await res.json();
      setResults(data);
      setStep("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep(5);
    }
  };

  const reset = () => { setForm(initialForm); setResults(null); setError(null); setStep(0); };

  // Hero
  if (step === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center animate-fade-in-up max-w-lg">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase border border-accent/20">AI-Powered</div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-4">Boulder<span className="text-accent">Fit</span></h1>
          <p className="text-text-secondary text-lg sm:text-xl mb-2">Stop guessing your shoe size. Start sending.</p>
          <p className="text-text-muted text-sm mb-10 max-w-sm mx-auto">Upload a photo of your feet and get personalized climbing shoe recommendations powered by AI.</p>
          <button onClick={() => setStep(0.5)}
            className="px-10 py-4 bg-accent hover:bg-accent-light text-white font-bold text-lg rounded-2xl shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            Find My Shoe
          </button>
        </div>
        <footer className="fixed bottom-0 left-0 right-0 py-4 text-center"><p className="text-text-muted text-xs">Built by climbers, for climbers</p></footer>
      </main>
    );
  }

  // Map step numbers to StepIndicator (5 visible steps)
  const stepNum = typeof step === "number" ? Math.ceil(step) : 0;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10">
      <button onClick={() => setStep(0)} className="mb-6 group">
        <h1 className="text-2xl font-extrabold tracking-tight text-white group-hover:text-accent transition-colors">Boulder<span className="text-accent">Fit</span></h1>
      </button>

      <div className="w-full max-w-xl">
        <div className="bg-surface/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-surface-border/50 p-5 sm:p-7">
          {stepNum >= 1 && stepNum <= 5 && <StepIndicator current={stepNum} />}

          {error && (
            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400 flex items-start gap-2">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {error}
            </div>
          )}

          {step === 0.5 && <ScanModeSelector selected={form.scanMode} onChange={(scanMode: ScanMode) => setForm({ ...form, scanMode })} onNext={() => setStep(1)} />}
          {step === 1 && <PhotoUpload photos={form.photos} scanMode={form.scanMode} onChange={(photos) => setForm({ ...form, photos })} onNext={() => setStep(2)} />}
          {step === 2 && (
            <ShoeSize sizeSystem={form.sizeSystem} streetSize={form.streetSize} climbingSize={form.climbingSize} climbingBrand={form.climbingBrand}
              onChange={(d: { sizeSystem: SizeSystem; streetSize: string; climbingSize: string; climbingBrand: string }) => setForm({ ...form, ...d })}
              onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && <FitQuestions answers={form.fitAnswers} onChange={(fitAnswers: FitAnswers) => setForm({ ...form, fitAnswers })} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
          {step === 4 && <CurrentShoes selected={form.currentShoes} onChange={(currentShoes: string[]) => setForm({ ...form, currentShoes })} onNext={() => setStep(5)} onBack={() => setStep(3)} />}
          {step === 5 && <Experience experience={form.experience} onChange={(experience: ExperienceLevel) => setForm({ ...form, experience })} onSubmit={handleSubmit} onBack={() => setStep(4)} />}
          {step === "loading" && <LoadingSpinner />}
          {step === "results" && results && <Results data={results} onReset={reset} />}
        </div>
        <p className="text-center text-xs text-text-muted mt-6">
          {step === "results" ? "Smear with confidence." : "Built by climbers, for climbers"}
        </p>
      </div>
    </main>
  );
}
