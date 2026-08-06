"use client";

import React, { useEffect, useState } from "react";
import { Brain, CheckCircle2, Cpu, Sparkles, ShieldCheck } from "lucide-react";

interface ExecutiveSyncOverlayProps {
  onComplete: () => void;
}

export function ExecutiveSyncOverlay({ onComplete }: ExecutiveSyncOverlayProps) {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const steps = [
    "Loading memories",
    "Reviewing yesterday",
    "Scanning community",
    "Checking sponsors",
    "Updating strategy",
    "Preparing today's mission",
  ];

  useEffect(() => {
    // Web Audio Chime on sync completion
    const playStartupChime = () => {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.2); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.4); // G5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } catch {
        // Audio synthesis fallback
      }
    };

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          playStartupChime();
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length ? prev + 1 : prev));
    }, 450);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [onComplete, steps.length]);

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 p-6 font-sans text-slate-100 backdrop-blur-2xl">
      <div className="w-full max-w-lg space-y-8 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-center shadow-2xl backdrop-blur-xl">
        {/* Logo & Spinner */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-purple-500/20 blur-xl" />
          <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <Brain className="h-10 w-10 animate-bounce text-amber-400" />
          </div>
        </div>

        {/* Sync Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-300">
            <Cpu className="h-3.5 w-3.5" /> EXECUTIVE SYNC IN PROGRESS
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">Synchronizing Autonomous Mind</h2>
          <p className="font-mono text-xs text-slate-400">
            Restoring session memory &amp; synthesizing 24h background work...
          </p>
        </div>

        {/* Animated Checkmarks */}
        <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950 p-5 text-left font-mono text-xs">
          {steps.map((step, idx) => {
            const isCompleted = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            return (
              <div
                key={step}
                className={`flex items-center justify-between transition-all duration-300 ${
                  isCompleted
                    ? "text-emerald-400 opacity-100"
                    : isCurrent
                      ? "font-bold text-amber-300 opacity-100"
                      : "text-slate-600 opacity-40"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="h-2 w-2 animate-ping rounded-full bg-amber-400" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-slate-700" />
                  )}
                  <span>{step}</span>
                </div>
                <span className="text-[10px]">
                  {isCompleted ? "DONE" : isCurrent ? "SYNCING..." : "PENDING"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2.5 w-full overflow-hidden rounded-full border border-slate-800 bg-slate-950 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-slate-500">
            <span>OMNIA EXECUTIVE RUNTIME</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
