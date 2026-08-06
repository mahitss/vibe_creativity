"use client";

import React from "react";
import { CheckCircle2, HelpCircle, Lightbulb } from "lucide-react";

export interface StrategicInsightItem {
  id: string;
  insight: string;
  whyNow: string;
  whyThis: string;
  whyNotAlternatives: string;
  confidence: number;
}

export function StrategicInsights() {
  const insights: StrategicInsightItem[] = [
    {
      id: "ins-1",
      insight:
        "Developer tutorial content outperforms opinion vlogs by +68% average view duration.",
      whyNow: "YouTube push window is active following recent tech stack updates.",
      whyThis:
        "Historical episodic memory mem-101 confirms technical deep-dives generate 3x subscriber conversions.",
      whyNotAlternatives: "Opinion vlogs drop retention at 2.5 minutes.",
      confidence: 0.94,
    },
    {
      id: "ins-2",
      insight: "Community strongly requests a 4-part Docker & Kubernetes microservice series.",
      whyNow: "45 comment requests logged across 3 recent videos in the last 7 days.",
      whyThis: "High demand aligns directly with channel authority score in cloud infrastructure.",
      whyNotAlternatives: "A single video fails to cover production setup completely.",
      confidence: 0.91,
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
          <Lightbulb className="h-5 w-5 text-amber-400" /> Evidence-Grounded Strategic Insights
        </h3>
        <span className="font-mono text-xs text-slate-400">TRANSPARENCY EXPLANATIONS</span>
      </div>

      <div className="space-y-4">
        {insights.map((item) => (
          <div
            key={item.id}
            className="space-y-3 rounded-lg border border-slate-800/80 bg-slate-950/60 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" /> {item.insight}
              </p>
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400">
                {(item.confidence * 100).toFixed(0)}% CONFIDENCE
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 border-t border-slate-900 pt-2 text-xs md:grid-cols-3">
              <div className="space-y-1 rounded border border-slate-800/60 bg-slate-900/60 p-2.5">
                <span className="flex items-center gap-1 font-semibold text-cyan-400">
                  <HelpCircle className="h-3 w-3" /> Why now?
                </span>
                <p className="text-slate-300">{item.whyNow}</p>
              </div>

              <div className="space-y-1 rounded border border-slate-800/60 bg-slate-900/60 p-2.5">
                <span className="flex items-center gap-1 font-semibold text-purple-400">
                  <HelpCircle className="h-3 w-3" /> Why this?
                </span>
                <p className="text-slate-300">{item.whyThis}</p>
              </div>

              <div className="space-y-1 rounded border border-slate-800/60 bg-slate-900/60 p-2.5">
                <span className="flex items-center gap-1 font-semibold text-amber-400">
                  <HelpCircle className="h-3 w-3" /> Why not alternatives?
                </span>
                <p className="text-slate-300">{item.whyNotAlternatives}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
