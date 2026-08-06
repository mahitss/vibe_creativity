"use client";

import React from "react";
import { Activity, ShieldCheck, Zap } from "lucide-react";

export function RuntimeHealthPanel() {
  const subsystems = [
    { name: "Executive Mind Engine", status: "HEALTHY", score: 98.5 },
    { name: "Persistent Memory Substrate", status: "HEALTHY", score: 96.0 },
    { name: "Workflow Execution Engine", status: "HEALTHY", score: 99.0 },
    { name: "Runtime Scheduler Queue", status: "HEALTHY", score: 99.5 },
    { name: "Security Governance Gateway", status: "HEALTHY", score: 100.0 },
    { name: "Tool Execution Sandbox", status: "HEALTHY", score: 95.0 },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-100">
          <Activity className="h-4 w-4 text-cyan-400" /> Runtime Kernel Health
        </h3>
        <span className="flex items-center gap-1 rounded border border-emerald-800/40 bg-emerald-950/40 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
          <Zap className="h-3 w-3 animate-pulse" /> ONLINE
        </span>
      </div>

      <div className="space-y-2.5">
        {subsystems.map((sub, i) => (
          <div
            key={i}
            className="space-y-1.5 rounded-lg border border-slate-800/60 bg-slate-950/60 p-2.5"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-300">{sub.name}</span>
              <span className="font-mono text-[11px] font-bold text-cyan-400">{sub.score}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-cyan-400" style={{ width: `${sub.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-800/60 pt-2 font-mono text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> System Certified Grade A+
        </span>
        <span className="text-cyan-400">OTel Live</span>
      </div>
    </div>
  );
}
