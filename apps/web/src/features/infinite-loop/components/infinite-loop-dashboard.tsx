"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Code,
  GitCommit,
  GitPullRequest,
  Infinity as InfinityIcon,
  Layers,
  Play,
  RefreshCw,
  Repeat,
  Rocket,
  Terminal,
  Zap,
} from "lucide-react";

export function InfiniteLoopDashboard() {
  const [engStage, setEngStage] = useState<number>(0);
  const engSteps = ["Imagine", "Build", "Ship", "Listen", "Learn", "Improve", "Repeat"];

  const [founderStage, setFounderStage] = useState<number>(0);
  const founderSteps = [
    "Vision",
    "Prototype",
    "Users",
    "Feedback",
    "Iteration",
    "Growth",
    "New Vision",
  ];

  const [devStage, setDevStage] = useState<number>(0);
  const devSteps = [
    "Write Code",
    "Test",
    "Debug",
    "Review",
    "Deploy",
    "Monitor",
    "Refactor",
    "Write Better Code",
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <InfinityIcon className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                OMNIA Continuous Evolution & Infinite Loop Engine
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              There is no Version Infinity. There is no final release. Roadmaps end — products
              evolve.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-cyan-400">
            <GitCommit className="h-4 w-4 text-cyan-400" />
            142,800 COMMITS PUSHED
          </div>
        </div>

        {/* Continuous Telemetry */}
        <div className="grid grid-cols-1 gap-4 font-mono md:grid-cols-4">
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="font-sans text-xs text-slate-400">Total Commits Pushed</span>
            <p className="text-2xl font-bold text-cyan-400">142,800</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="font-sans text-xs text-slate-400">Iterated Features</span>
            <p className="text-2xl font-bold text-emerald-400">8,900</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="font-sans text-xs text-slate-400">Feedback Cycles Completed</span>
            <p className="text-2xl font-bold text-purple-400">42,000</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="font-sans text-xs text-slate-400">Active Global Developers</span>
            <p className="text-2xl font-bold text-amber-400">14,200</p>
          </div>
        </div>

        {/* 1. The Engineering Loop */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-100">
              <Layers className="h-4 w-4 text-cyan-400" /> The Engineering Loop
            </h2>
            <button
              onClick={() => setEngStage((prev) => (prev + 1) % engSteps.length)}
              className="flex items-center gap-1.5 rounded bg-cyan-500 px-3 py-1.5 font-mono text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              Advance Step <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {engSteps.map((s, idx) => (
              <React.Fragment key={s}>
                <span
                  className={`rounded-lg border px-3 py-1.5 transition ${
                    idx === engStage
                      ? "border-cyan-400 bg-cyan-500/20 font-bold text-cyan-300"
                      : "border-slate-800 bg-slate-950 text-slate-400"
                  }`}
                >
                  {s}
                </span>
                {idx < engSteps.length - 1 && <span className="text-slate-600">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 2. The Founder's Loop */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-100">
              <Rocket className="h-4 w-4 text-emerald-400" /> The Founder&apos;s Loop
            </h2>
            <button
              onClick={() => setFounderStage((prev) => (prev + 1) % founderSteps.length)}
              className="flex items-center gap-1.5 rounded bg-emerald-500 px-3 py-1.5 font-mono text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              Advance Step <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {founderSteps.map((s, idx) => (
              <React.Fragment key={s}>
                <span
                  className={`rounded-lg border px-3 py-1.5 transition ${
                    idx === founderStage
                      ? "border-emerald-400 bg-emerald-500/20 font-bold text-emerald-300"
                      : "border-slate-800 bg-slate-950 text-slate-400"
                  }`}
                >
                  {s}
                </span>
                {idx < founderSteps.length - 1 && <span className="text-slate-600">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3. The Developer's Loop */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-100">
              <Code className="h-4 w-4 text-purple-400" /> The Developer&apos;s Loop
            </h2>
            <button
              onClick={() => setDevStage((prev) => (prev + 1) % devSteps.length)}
              className="flex items-center gap-1.5 rounded bg-purple-500 px-3 py-1.5 font-mono text-xs font-bold text-slate-950 transition hover:bg-purple-400"
            >
              Advance Step <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {devSteps.map((s, idx) => (
              <React.Fragment key={s}>
                <span
                  className={`rounded-lg border px-3 py-1.5 transition ${
                    idx === devStage
                      ? "border-purple-400 bg-purple-500/20 font-bold text-purple-300"
                      : "border-slate-800 bg-slate-950 text-slate-400"
                  }`}
                >
                  {s}
                </span>
                {idx < devSteps.length - 1 && <span className="text-slate-600">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* The Final Message Banner */}
        <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
            THE FINAL MESSAGE
          </span>
          <p className="text-lg font-semibold italic text-slate-100">
            &ldquo;The future is never designed all at once. It is built one commit at a
            time.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
