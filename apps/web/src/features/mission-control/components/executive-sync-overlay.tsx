"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface ExecutiveSyncOverlayProps {
  onComplete: () => void;
}

export function ExecutiveSyncOverlay({ onComplete }: ExecutiveSyncOverlayProps) {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const steps = [
    "LOADING MEMORY CORE",
    "REVIEWING YESTERDAY'S PERFORMANCE",
    "SCANNING AUDIENCE COMMUNITY SIGNALS",
    "CHECKING SPONSOR RENEWAL THRESHOLDS",
    "UPDATING EXECUTIVE STRATEGY",
    "PREPARING TODAY'S PRIORITY MISSION",
  ];

  useEffect(() => {
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
    <div className="animate-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-6 font-sans text-white backdrop-blur-3xl">
      {/* BMW M Tricolor Header Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0" />

      <div className="relative w-full max-w-xl space-y-8 overflow-hidden rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-8 text-center shadow-2xl">
        {/* Tricolor skew badge */}
        <div className="absolute right-0 top-0 p-4">
          <div className="bmw-m-tricolor-dots">
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* M Power Logo & Badge */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 border border-[#3c3c3c] bg-[#0d0d0d] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-white">
            <div className="bmw-m-tricolor-dots">
              <span />
              <span />
              <span />
            </div>
            <span>{"///"} M EXECUTIVE SYNC</span>
          </div>

          <h2 className="font-sans text-3xl font-extrabold uppercase tracking-wider text-white">
            EXECUTIVE SYNCHRONIZATION
          </h2>
          <p className="font-mono text-xs uppercase tracking-wide text-[#bbbbbb]">
            RESTORING SESSION MEMORY &amp; SYNTHESIZING 24H AUTONOMOUS WORK...
          </p>
        </div>

        {/* Animated Motorsport Checklist */}
        <div className="space-y-2.5 rounded-none border border-[#3c3c3c] bg-[#0d0d0d] p-6 text-left font-mono text-xs">
          {steps.map((step, idx) => {
            const isCompleted = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            return (
              <div
                key={step}
                className={`flex items-center justify-between transition-all duration-300 ${
                  isCompleted
                    ? "font-semibold text-white opacity-100"
                    : isCurrent
                      ? "font-bold text-[#1c69d4] opacity-100"
                      : "text-[#7e7e7e] opacity-40"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-[#0066b1]" />
                  ) : isCurrent ? (
                    <div className="bmw-m-tricolor-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-[#3c3c3c]" />
                  )}
                  <span className="tracking-wider">{step}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {isCompleted ? "VERIFIED" : isCurrent ? "PROCESSING..." : "QUEUED"}
                </span>
              </div>
            );
          })}
        </div>

        {/* M Tricolor Progress Bar */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded-none border border-[#3c3c3c] bg-[#0d0d0d] p-0.5">
            <div
              className="h-full transition-all duration-75"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0066b1 0%, #1c69d4 50%, #e22718 100%)",
              }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-[#7e7e7e]">
            <span>{"///"} M EXECUTIVE RUNTIME ENGINE</span>
            <span className="text-white">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
