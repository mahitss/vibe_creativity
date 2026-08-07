"use client";

import React from "react";
import {
  BarChart3,
  Brain,
  CheckCircle2,
  Clock,
  LineChart,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

export function AnalyticsWorkspace() {
  return (
    <div className="min-h-screen bg-[#000000] p-6 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-10">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      <div className="mx-auto max-w-7xl space-y-8 pt-2">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
                {"///"} ANALYTICS WORKSPACE (CREATOR GROWTH STORIES)
              </h1>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[#bbbbbb]">
              WATCH TIME RETENTION CURVES, COMPARATIVE BENCHMARKS &amp; AI RECOMMENDATIONS
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-3.5 py-1.5 font-bold text-white">
              PROJECTED RETENTION LIFT: +18%
            </span>
            <button className="border border-white bg-white px-5 py-1.5 font-extrabold uppercase text-black hover:bg-[#e6e6e6]">
              REFRESH ANALYTICS →
            </button>
          </div>
        </div>

        {/* RETENTION DELTA STORY (NO BORING KPIS, ALWAYS GROWTH STORIES) */}
        <div className="space-y-6 border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
              <TrendingUp className="h-4 w-4 text-[#1c69d4]" /> AUDIENCE RETENTION COMPARATIVE STORY
            </span>
            <span className="border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 font-bold text-emerald-400">
              BASELINE: 48% AT 3:00 MIN
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-sans text-xl font-extrabold text-white">
                React Authentication vs. Expected Docker Masterclass Retention
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#e6e6e6]">
                Your React Authentication Part 4 video dropped from 65% to 48% retention at the 3:00
                minute mark due to abstract theoretical explanations without code overlays.
              </p>
              <div className="space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-4 font-mono text-xs">
                <span className="font-bold text-[#1c69d4]">AI GROWTH RECOMMENDATION:</span>
                <p className="text-[#bbbbbb]">
                  Structure Docker Containerization Part 1 with immediate live code snippets at 1:30
                  to maintain a <strong className="text-white">66% retention curve at 3:00</strong>{" "}
                  (+18% lift baseline).
                </p>
              </div>
            </div>

            {/* RETENTION GRAPH SIMULATION */}
            <div className="flex flex-col justify-between space-y-4 border border-[#3c3c3c] bg-[#0d0d0d] p-6 font-mono text-xs">
              <span className="font-bold text-white">RETENTION CURVE OVERLAY (MINUTES 0 - 10)</span>
              <div className="flex h-36 items-end justify-between gap-2 border-b border-l border-[#3c3c3c] p-2">
                <div className="h-full w-1/6 bg-[#1c69d4]" title="0-2 min: 92%" />
                <div className="h-4/5 w-1/6 bg-[#1c69d4]" title="2-4 min: 78%" />
                <div className="h-3/4 w-1/6 bg-[#1c69d4]" title="4-6 min: 66%" />
                <div className="h-2/3 w-1/6 bg-[#1c69d4]" title="6-8 min: 58%" />
                <div className="h-1/2 w-1/6 bg-[#1c69d4]" title="8-10 min: 50%" />
              </div>
              <div className="flex justify-between text-[10px] text-[#7e7e7e]">
                <span>0m</span>
                <span>2m</span>
                <span>4m</span>
                <span>6m</span>
                <span>8m</span>
                <span>10m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
