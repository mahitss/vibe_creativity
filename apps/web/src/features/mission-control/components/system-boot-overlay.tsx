"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Cpu, RefreshCw, Zap } from "lucide-react";

interface SystemBootOverlayProps {
  onComplete: () => void;
}

export function SystemBootOverlay({ onComplete }: SystemBootOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const bootMessages = [
    "Restoring persistent memory substrate (#mem-yt-comment-42)...",
    "Syncing 523 community comments & audience demand clusters...",
    "Activating sponsor contract monitor (CloudCorp $15k offer)...",
    "Executive Mind Online.",
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStepIndex(1), 600);
    const timer2 = setTimeout(() => setStepIndex(2), 1200);
    const timer3 = setTimeout(() => setStepIndex(3), 1800);
    const timer4 = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] p-6 font-mono text-xs text-white selection:bg-[#1c69d4]">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      <div className="animate-fade-in w-full max-w-md space-y-6 border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
        {/* Header Branding */}
        <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4">
          <div className="flex items-center gap-3">
            <div className="bmw-m-tricolor-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="font-extrabold uppercase tracking-widest text-white">
              {"///"} OMNIA OS SYSTEM BOOT
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> INITIALIZING
          </span>
        </div>

        {/* Boot Sequence Stream */}
        <div className="space-y-3">
          {bootMessages.slice(0, stepIndex + 1).map((msg, idx) => (
            <div key={idx} className="animate-fade-in flex items-center gap-3 text-white">
              {idx === stepIndex && idx < 3 ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#1c69d4]" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              )}
              <span className="font-sans text-xs">{msg}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 border-t border-[#3c3c3c] pt-4">
          <div className="flex justify-between text-[10px] text-[#bbbbbb]">
            <span>SYSTEM INITIALIZATION</span>
            <span>{Math.min(100, (stepIndex + 1) * 25)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden border border-[#3c3c3c] bg-[#0d0d0d]">
            <div
              className="h-full bg-gradient-to-r from-[#0066b1] via-[#1c69d4] to-[#e22718] transition-all duration-500"
              style={{ width: `${(stepIndex + 1) * 25}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
