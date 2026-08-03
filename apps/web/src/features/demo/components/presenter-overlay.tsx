"use client";

import { useState } from "react";
import {
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  Database,
  Eye,
  EyeOff,
  GitBranch,
  Layers,
  Sparkles,
  Volume2,
  X,
  Zap,
} from "lucide-react";

interface PresenterOverlayProps {
  sceneNumber: number;
  title: string;
  subtitle: string;
  durationSeconds: number;
  talkingPoints: string[];
  memoryReferences: string[];
  isVisible: boolean;
  onClose: () => void;
}

export function PresenterOverlay({
  sceneNumber,
  title,
  subtitle,
  durationSeconds,
  talkingPoints,
  memoryReferences,
  isVisible,
  onClose,
}: PresenterOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-6 z-50 w-96 bg-neutral-900/95 border border-cyan-500/40 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-cyan-500/10 font-sans text-xs text-neutral-100 select-none animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-[10px]">
            PRESENTER MODE
          </div>
          <span className="font-mono text-[10px] text-neutral-400">Scene {sceneNumber} of 7</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-neutral-400 hover:text-neutral-200 rounded-md hover:bg-neutral-800 transition"
          title="Hide Presenter Overlay"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Scene Title & Countdown */}
      <div className="space-y-1 mb-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-neutral-100 text-sm leading-snug">{title}</h4>
          <span className="font-mono text-[11px] text-cyan-400 font-bold flex items-center gap-1">
            <Clock className="h-3 w-3" /> {durationSeconds}s
          </span>
        </div>
        <p className="text-[11px] text-neutral-400 leading-normal">{subtitle}</p>
      </div>

      {/* Presenter Talking Points */}
      <div className="space-y-2 mb-4 bg-neutral-950/80 border border-neutral-800 rounded-xl p-3.5">
        <p className="text-[10px] font-mono font-medium text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" /> Presenter Talking Points
        </p>
        <ul className="space-y-2 text-neutral-200 font-sans text-[11px] leading-relaxed">
          {talkingPoints.map((tp, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-cyan-400 font-mono font-bold shrink-0">{idx + 1}.</span>
              <span>{tp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Underlying Memory References */}
      <div className="space-y-1.5 pt-2 border-t border-neutral-800 font-mono text-[10px]">
        <p className="text-neutral-500 uppercase tracking-wider flex items-center gap-1">
          <Database className="h-3 w-3 text-blue-400" /> Underlying Memory Citations:
        </p>
        <div className="space-y-1">
          {memoryReferences.map((ref, idx) => (
            <div key={idx} className="text-neutral-300 bg-neutral-950 border border-neutral-850 px-2.5 py-1 rounded-md">
              • {ref}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
