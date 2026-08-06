"use client";

import React, { useState } from "react";
import {
  Atom,
  BookOpen,
  Brain,
  CheckCircle2,
  Cpu,
  Globe,
  GraduationCap,
  HardDrive,
  Lightbulb,
  Lock,
  Network,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

interface Domain {
  id: string;
  name: string;
  description: string;
  status: string;
}

export function Infrastructure2060Dashboard() {
  const [domains] = useState<Domain[]>([
    {
      id: "d-1",
      name: "Scientific Research Acceleration",
      description:
        "Literature synthesis across 89,000 journals & multi-variable trajectory simulation.",
      status: "AMBIENT & ACTIVE",
    },
    {
      id: "d-2",
      name: "Personalized Global Education Suite",
      description: "Adaptive lifelong learning tutors serving students across 190+ countries.",
      status: "AMBIENT & ACTIVE",
    },
    {
      id: "d-3",
      name: "Creative Media & Global Business Operations",
      description:
        "Cross-platform workflow orchestrators powering millions of creator enterprises.",
      status: "AMBIENT & ACTIVE",
    },
    {
      id: "d-4",
      name: "Public Sector & Civic Planning Grid",
      description:
        "Resource optimization and transparent decision support for public institutions.",
      status: "AMBIENT & ACTIVE",
    },
  ]);

  const [hypothesis, setHypothesis] = useState<string>(
    "Multi-organoid neural mapping under zero-gravity conditions",
  );
  const [discResult, setDiscResult] = useState<string | null>(null);

  const handleRunDiscovery = () => {
    setDiscResult(
      "SCIENTIFIC DISCOVERY ASSISTANCE RESULT (Hypothesis: '" +
        hypothesis +
        "'):\n✔ Literature Synthesis: 89,000 peer-reviewed papers analyzed\n✔ Reasoning Trace: Quantum trajectory verified\n✔ Confidence: 99.4% (Zero hallucination guaranteed)",
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Cpu className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                OMNIA 2060 — Universal Digital Infrastructure Grid
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Ambient intelligence infrastructure powering global education, scientific discovery, &
              human creativity — Year 2060
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-emerald-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            GRID UPTIME: 99.999%
          </div>
        </div>

        {/* Global Infrastructure Grid Telemetry */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Active Infrastructure Nodes</span>
            <p className="font-mono text-2xl font-bold text-cyan-400">4,500,000 Nodes</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Processed Requests (Annual)</span>
            <p className="font-mono text-2xl font-bold text-emerald-400">142.8 Trillion</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Global Avg Latency</span>
            <p className="font-mono text-2xl font-bold text-purple-400">4.2 Milliseconds</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Privacy Guarantee</span>
            <p className="font-mono text-2xl text-xs font-bold text-indigo-400">LOCAL STRICT DP</p>
          </div>
        </div>

        {/* Global Infrastructure Domains */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Globe className="h-5 w-5 text-cyan-400" /> Global Infrastructure Domains
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {domains.map((d) => (
              <div
                key={d.id}
                className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-100">{d.name}</h3>
                  <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                    {d.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{d.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Discovery Assistance Engine */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Atom className="h-5 w-5 text-indigo-400" /> Scientific Discovery Assistance Engine
          </h2>
          <div className="flex items-center gap-3 font-mono text-xs">
            <input
              type="text"
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              placeholder="Enter scientific hypothesis to verify..."
              className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 font-mono text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <button
              onClick={handleRunDiscovery}
              className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-5 py-2.5 font-mono font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              <Sparkles className="h-4 w-4 text-slate-950" /> Verify Hypothesis
            </button>
          </div>

          {discResult && (
            <div className="space-y-2 rounded-xl border border-cyan-800/60 bg-slate-950 p-5 font-mono text-xs text-slate-200">
              <span className="flex items-center gap-1 font-bold text-cyan-400">
                <Brain className="h-4 w-4" /> Discovery Reasoning Trace Output
              </span>
              <pre className="whitespace-pre-wrap pt-2 font-sans text-sm">{discResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
