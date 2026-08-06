"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Cloud,
  CloudLightning,
  Eye,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

interface EcosystemTrend {
  id: string;
  category: string;
  title: string;
  growth: number;
  sampleSize: number;
  evidence: string;
}

interface Benchmark {
  id: string;
  niche: string;
  metric: string;
  percentile: number;
  average: number;
}

export function IntelligenceCloudDashboard() {
  const [trends] = useState<EcosystemTrend[]>([
    {
      id: "tr-101",
      category: "CREATOR_NICHE",
      title: "Autonomous Agent Systems & AI DevOps Pipelines",
      growth: 148.5,
      sampleSize: 1420,
      evidence:
        "Aggregated across 1,420 anonymized tech creator channels showing +148% audience engagement.",
    },
    {
      id: "tr-102",
      category: "SPONSOR_DEMAND",
      title: "Developer Tooling & Cloud Infrastructure Sponsorships",
      growth: 84.2,
      sampleSize: 850,
      evidence: "Aggregated across 850 anonymized sponsorship deals showing 3.2x CPM premium.",
    },
  ]);

  const [benchmarks] = useState<Benchmark[]>([
    {
      id: "bm-1",
      niche: "Software Engineering & AI",
      metric: "Avg 30-day Viewer Retention",
      percentile: 88.5,
      average: 48.2,
    },
    {
      id: "bm-2",
      niche: "Software Engineering & AI",
      metric: "Sponsor Conversion Rate",
      percentile: 94.0,
      average: 3.4,
    },
  ]);

  const [optIn, setOptIn] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <CloudLightning className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                OMNIA Intelligence Cloud
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Privacy-preserving collective learning — ecosystem trends, peer benchmarks, &
              differential privacy controls
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-emerald-400">
            <Lock className="h-4 w-4 text-emerald-400" />
            DIFFERENTIAL PRIVACY THRESHOLD: N ≥ 100
          </div>
        </div>

        {/* Anonymized Ecosystem Trends */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <TrendingUp className="h-5 w-5 text-cyan-400" /> Anonymized Ecosystem Trends
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {trends.map((t) => (
              <div
                key={t.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-cyan-400">
                    {t.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" /> +{t.growth}% Growth
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-100">{t.title}</h3>
                <p className="rounded border border-slate-800 bg-slate-950/60 p-3 font-mono text-xs text-slate-400">
                  {t.evidence} (Sample size: N={t.sampleSize} creators)
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Anonymous Peer Group Benchmarks */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <BarChart3 className="h-5 w-5 text-purple-400" /> Anonymous Peer Group Benchmarks
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {benchmarks.map((bm) => (
              <div
                key={bm.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100">{bm.metric}</h3>
                  <span className="font-mono text-xs text-purple-400">Niche: {bm.niche}</span>
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Your Channel Percentile</span>
                    <strong className="text-emerald-400">{bm.percentile}th Percentile</strong>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                      style={{ width: `${bm.percentile}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Industry Average: {bm.average}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Controls & Opt-in */}
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
                <ShieldCheck className="h-5 w-5 text-emerald-400" /> Transparent Privacy & Opt-in
                Controls
              </h3>
              <p className="mt-1 font-mono text-xs text-slate-400">
                Individual memories & content are NEVER uploaded. Only aggregate non-identifiable
                telemetry is contributed.
              </p>
            </div>
            <button
              onClick={() => setOptIn(!optIn)}
              className={`rounded-lg px-4 py-2 font-mono text-xs font-bold transition ${
                optIn
                  ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                  : "border border-slate-700 bg-slate-800 text-slate-400"
              }`}
            >
              {optIn ? "TELEMETRY OPTED IN" : "OPTED OUT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
