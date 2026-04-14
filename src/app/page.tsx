"use client";

import { useState, useEffect } from "react";

type Experience = "" | "beginner" | "intermediate" | "advanced" | "expert";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [experience, setExperience] = useState<Experience>("");
  const [instagram, setInstagram] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [position, setPosition] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/waitlist").then((r) => r.json()).then((d) => setCount(d.count)).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, experience, instagram }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error); setStatus("error"); return; }
      setPosition(data.position);
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center animate-fade-in-up max-w-md">
          <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3">You&apos;re on the list!</h1>
          {position > 0 && <p className="text-accent font-bold text-lg mb-2">#{position} in line</p>}
          <p className="text-text-secondary text-sm mb-8">We&apos;ll email you when BoulderFit is ready. Get stoked.</p>
          <div className="bg-surface-overlay/50 border border-surface-border rounded-xl p-5">
            <p className="text-text-muted text-xs mb-3">Know someone who needs better-fitting shoes?</p>
            <button onClick={() => navigator.share?.({ url: window.location.href, title: "BoulderFit — Find your perfect climbing shoe" }).catch(() => {})}
              className="px-6 py-2.5 bg-accent/20 text-accent font-bold text-sm rounded-xl border border-accent/30 hover:bg-accent/30 transition-all">
              Share with a climbing partner
            </button>
          </div>
        </div>
        <footer className="fixed bottom-0 left-0 right-0 py-4 text-center">
          <p className="text-text-muted text-xs">Find the beta for your shoes</p>
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center animate-fade-in-up max-w-lg w-full">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase border border-accent/20">
          Coming Soon
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-4">
          Boulder<span className="text-accent">Fit</span>
        </h1>
        <p className="text-text-secondary text-lg sm:text-xl mb-3">The beta for your perfect shoe.</p>
        <p className="text-text-muted text-sm mb-8 max-w-sm mx-auto">
          AI-powered climbing shoe recommendations. Scan your feet, find your fit.
        </p>

        {/* Pain points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 max-w-md mx-auto text-left">
          {[
            "Wondering what climbing shoe to get next?",
            "Been buying the same shoe every time?",
            "Hear that air bubble when you drop off?",
            "Failed at downsizing your shoes?",
          ].map((q) => (
            <div key={q} className="flex items-start gap-2 p-3 bg-surface-overlay/40 rounded-lg border border-surface-border/50">
              <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-text-secondary text-xs leading-relaxed">{q}</p>
            </div>
          ))}
        </div>

        {/* Signup form */}
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-3">
          <input type="email" required placeholder="Your email *" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-surface-overlay border border-surface-border rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" />
          <input type="text" placeholder="First name (optional)" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-surface-overlay border border-surface-border rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" />
          <select value={experience} onChange={(e) => setExperience(e.target.value as Experience)}
            className="w-full px-4 py-3 bg-surface-overlay border border-surface-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            style={{ color: experience ? "white" : undefined }}>
            <option value="">Climbing experience (optional)</option>
            <option value="beginner">Beginner — just started</option>
            <option value="intermediate">Intermediate — climbing regularly</option>
            <option value="advanced">Advanced — projecting hard</option>
            <option value="expert">Expert — been at it for years</option>
          </select>
          <input type="text" placeholder="Instagram handle (optional)" value={instagram} onChange={(e) => setInstagram(e.target.value)}
            className="w-full px-4 py-3 bg-surface-overlay border border-surface-border rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" />

          {status === "error" && (
            <p className="text-red-400 text-xs font-semibold">{errorMsg}</p>
          )}

          <button type="submit" disabled={status === "submitting" || !email}
            className="w-full py-3.5 bg-accent hover:bg-accent-light text-white font-bold text-sm rounded-xl shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {status === "submitting" ? "Joining..." : "Join the Waitlist"}
          </button>
        </form>

        {count > 0 && (
          <p className="text-text-muted text-xs mt-4">
            {count} climber{count !== 1 ? "s" : ""} already waiting
          </p>
        )}
      </div>
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center">
        <p className="text-text-muted text-xs">Find the beta for your shoes</p>
      </footer>
    </main>
  );
}
