"use client";

import React from "react";
import { AlertOctagon, Brain, ExternalLink, Sparkles, TrendingUp } from "lucide-react";

export interface ExecutiveBriefProps {
  summary?: string;
  todayFocus?: string;
  topOpportunity?: string;
  highestRisk?: string;
  supportingMemories?: { id: string; title: string }[];
}

export function ExecutiveBrief({
  summary = "Executive Mind completed strategic reasoning cycle. High subscriber retention velocity detected following YouTube tutorial release.",
  todayFocus = "Finalize sponsored post timing & execute community Q&A draft.",
  topOpportunity = "Capitalize on 34% subscriber conversion lift by releasing Docker tutorial before brand launch.",
  highestRisk = "Delaying upload past 48 hours risks missing current YouTube push algorithm window.",
  supportingMemories = [
    { id: "mem-101", title: "Tutorial Retention Benchmark #4" },
    { id: "mem-204", title: "Acme Sponsorship Terms" },
  ],
}: ExecutiveBriefProps) {
  return (
    <div className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-400">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Executive Brief</h2>
            <p className="text-xs text-slate-400">
              Grounded strategic direction from Executive Mind & Persistent Memory
            </p>
          </div>
        </div>
        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-cyan-400">
          WHY THIS RECOMMENDATION?
        </span>
      </div>

      <p className="rounded-lg border border-slate-800/60 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-300">
        {summary}
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Today's Focus */}
        <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-950/40 p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" /> Today&apos;s Focus
          </span>
          <p className="text-xs font-medium text-slate-200">{todayFocus}</p>
        </div>

        {/* Top Opportunity */}
        <div className="space-y-2 rounded-lg border border-emerald-800/40 bg-emerald-950/20 p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" /> Top Opportunity
          </span>
          <p className="text-xs font-medium text-slate-200">{topOpportunity}</p>
        </div>

        {/* Highest Risk */}
        <div className="space-y-2 rounded-lg border border-amber-800/40 bg-amber-950/20 p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <AlertOctagon className="h-3.5 w-3.5" /> Highest Risk
          </span>
          <p className="text-xs font-medium text-slate-200">{highestRisk}</p>
        </div>
      </div>

      {/* Memory Evidence Links */}
      {supportingMemories.length > 0 && (
        <div className="flex items-center gap-2 border-t border-slate-800/60 pt-2">
          <span className="text-xs font-medium text-slate-400">Memory Evidence:</span>
          <div className="flex flex-wrap gap-2">
            {supportingMemories.map((mem) => (
              <span
                key={mem.id}
                className="inline-flex cursor-pointer items-center gap-1 rounded border border-slate-700 bg-slate-800/80 px-2.5 py-1 font-mono text-[11px] text-cyan-300 transition hover:text-cyan-200"
              >
                {mem.title} <ExternalLink className="h-3 w-3 text-slate-400" />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
