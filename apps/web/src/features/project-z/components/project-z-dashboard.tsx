"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  Heart,
  HelpCircle,
  Key,
  Lightbulb,
  Lock,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  VolumeX,
  Zap,
} from "lucide-react";

export function ProjectZDashboard() {
  const [stages] = useState<string[]>([
    "DREAM",
    "IMAGINE",
    "PLAN",
    "CREATE",
    "LEARN",
    "REFLECT",
    "TEACH",
    "INSPIRE",
  ]);

  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  const handleNextStage = () => {
    setActiveStageIdx((prev) => (prev + 1) % stages.length);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Manifesto Banner */}
        <div className="space-y-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-950 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-9 w-9 text-amber-400" />
              <h1 className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
                PROJECT Z — Year 2100 Manifesto
              </h1>
            </div>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-400">
              PHILOSOPHY OF INTELLIGENT SYSTEMS
            </span>
          </div>
          <p className="max-w-4xl text-base leading-relaxed text-slate-300">
            PROJECT Z is not software. It is a philosophy for building intelligent systems. Reduce
            the distance between a person&apos;s idea and its realization while ensuring humans
            remain the source of purpose, values, and responsibility. AI exists to remove friction —
            not humanity.
          </p>
        </div>

        {/* The 3 Laws of Project Z */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-amber-400">
              <Zap className="h-5 w-5" /> LAW I: AGENCY
            </div>
            <p className="text-sm font-semibold text-slate-100">
              AI should reduce effort. Never reduce human agency.
            </p>
            <p className="text-xs text-slate-400">
              Technology eliminates mundane friction while leaving humans as sole authors of purpose
              and strategy.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-emerald-400">
              <Lock className="h-5 w-5" /> LAW II: OWNERSHIP
            </div>
            <p className="text-sm font-semibold text-slate-100">
              AI should preserve knowledge. Never own knowledge.
            </p>
            <p className="text-xs text-slate-400">
              The user owns their memories. The user owns their work. Zero vendor lock-in; complete
              data sovereignty.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-cyan-400">
              <ShieldCheck className="h-5 w-5" /> LAW III: EXPLAINABILITY
            </div>
            <p className="text-sm font-semibold text-slate-100">
              AI should explain itself. Never demand blind trust.
            </p>
            <p className="text-xs text-slate-400">
              Every important recommendation provides transparent observation, evidence attribution,
              and confidence scores.
            </p>
          </div>
        </div>

        {/* The 8-Stage Human Loop Visualizer */}
        <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-100">
                <RefreshCw className="h-5 w-5 text-amber-400" /> The Human Loop Cycle
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                AI accelerates every step. Humans define every destination.
              </p>
            </div>
            <button
              onClick={handleNextStage}
              className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 font-mono text-xs font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Accelerate Loop Step <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono md:grid-cols-8">
            {stages.map((stage, idx) => {
              const isActive = idx === activeStageIdx;
              return (
                <div
                  key={stage}
                  className={`flex flex-col items-center justify-center space-y-2 rounded-xl border p-4 text-center transition ${
                    isActive
                      ? "border-amber-500 bg-amber-500/20 font-bold text-amber-300 shadow-lg shadow-amber-500/10"
                      : "border-slate-800 bg-slate-950/60 text-slate-400"
                  }`}
                >
                  <span className="text-[10px] text-slate-500">STAGE {idx + 1}</span>
                  <span className="text-xs tracking-wider">{stage}</span>
                  {isActive && (
                    <Sparkles className="mt-1 h-3.5 w-3.5 animate-pulse text-amber-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* True Human Impact Metrics (2100) */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Heart className="h-5 w-5 fill-rose-400 text-rose-400" /> True Human Impact Telemetry
            (Year 2100 Horizon)
          </h2>
          <div className="grid grid-cols-1 gap-4 font-mono md:grid-cols-4">
            <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="font-sans text-xs text-slate-400">Humans Helped Directly</span>
              <p className="text-2xl font-bold text-emerald-400">3,500,000,000</p>
            </div>
            <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="font-sans text-xs text-slate-400">
                Meaningful Creations Realized
              </span>
              <p className="text-2xl font-bold text-amber-400">1,200,000,000</p>
            </div>
            <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="font-sans text-xs text-slate-400">Problems Solved Together</span>
              <p className="text-2xl font-bold text-cyan-400">980,000,000</p>
            </div>
            <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="font-sans text-xs text-slate-400">Businesses Started</span>
              <p className="text-2xl font-bold text-purple-400">85,000,000</p>
            </div>
          </div>
        </div>

        {/* The Final Principle Footer */}
        <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-center">
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-slate-400">
            <VolumeX className="h-4 w-4 text-amber-400" /> THE FINAL PRINCIPLE OF PROJECT Z
          </div>
          <p className="mx-auto max-w-2xl font-serif text-sm italic text-slate-200">
            &ldquo;Technology should become quieter over time. The person should become louder. The
            greatest AI is the one that helps people achieve things they once thought impossible,
            while never taking away their ownership, creativity, or responsibility.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
