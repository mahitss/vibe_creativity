"use client";

import React, { useState } from "react";
import {
  Atom,
  Award,
  BookOpen,
  Compass,
  Cpu,
  Database,
  Eye,
  FlaskConical,
  Globe,
  Layers,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

interface FlagshipProject {
  id: string;
  name: string;
  codename: string;
  mission: string;
  status: string;
}

interface Benchmark {
  id: string;
  agent: string;
  latency: number;
  accuracy: number;
  alignment: number;
}

export function ResearchInstituteDashboard() {
  const [projects] = useState<FlagshipProject[]>([
    {
      id: "p-1",
      name: "Project Atlas",
      codename: "Long-term Knowledge Organization",
      mission: "Compresses multi-year creator memory graphs with zero factual decay.",
      status: "ACTIVE EXPERIMENT",
    },
    {
      id: "p-2",
      name: "Project Compass",
      codename: "Strategic Planning Under Uncertainty",
      mission: "Simulates long-horizon trajectory outcomes across multi-variable environments.",
      status: "ACTIVE EXPERIMENT",
    },
    {
      id: "p-3",
      name: "Project Echo",
      codename: "Human Preference & Feedback Evolution",
      mission: "Tracks preference drift over multi-year creator-agent alignment lifecycles.",
      status: "VALIDATED MODEL",
    },
    {
      id: "p-4",
      name: "Project Aurora",
      codename: "Privacy-Preserving Collective Intelligence",
      mission: "Differential privacy benchmarks for ecosystem-wide telemetry learning.",
      status: "OPEN BENCHMARK",
    },
    {
      id: "p-5",
      name: "Project Forge",
      codename: "Evaluation & Agent Benchmarking",
      mission: "Automated test harnesses for autonomous agent reasoning & alignment.",
      status: "OPEN BENCHMARK",
    },
  ]);

  const [benchmarks] = useState<Benchmark[]>([
    {
      id: "b-1",
      agent: "Executive Mind Agent v4.2",
      latency: 142.5,
      accuracy: 98.4,
      alignment: 0.991,
    },
    {
      id: "b-2",
      agent: "Community Intelligence Specialist",
      latency: 88.2,
      accuracy: 97.1,
      alignment: 0.985,
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <FlaskConical className="h-8 w-8 text-indigo-400" />
              <h1 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                OMNIA Adaptive Intelligence Institute
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Scientific research on long-term AI systems — Project Atlas, Compass, Echo, Aurora, &
              Forge
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-indigo-400">
            <Atom className="h-4 w-4 text-indigo-400" />
            REPRODUCIBLE EXPERIMENTATION FIRST
          </div>
        </div>

        {/* Flagship Research Projects */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Globe className="h-5 w-5 text-indigo-400" /> Flagship Research Projects
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-100">{p.name}</h3>
                  <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-400">
                    {p.status}
                  </span>
                </div>
                <p className="font-mono text-xs text-cyan-400">{p.codename}</p>
                <p className="text-xs text-slate-400">{p.mission}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Agent Benchmark Leaderboard (Project Forge) */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Award className="h-5 w-5 text-cyan-400" /> Project Forge — Open Agent Benchmark
            Leaderboard
          </h2>
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full border-collapse text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                  <th className="p-4">Agent Architecture</th>
                  <th className="p-4">Latency (ms)</th>
                  <th className="p-4">Accuracy (%)</th>
                  <th className="p-4">Alignment Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {benchmarks.map((bm) => (
                  <tr key={bm.id} className="transition hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-slate-200">{bm.agent}</td>
                    <td className="p-4 text-purple-400">{bm.latency} ms</td>
                    <td className="p-4 font-bold text-emerald-400">{bm.accuracy}%</td>
                    <td className="p-4 text-cyan-400">{bm.alignment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Research Papers Directory */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <BookOpen className="h-5 w-5 text-purple-400" /> Published Research Publications
          </h2>
          <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100">
                Continuous Knowledge Evolution in Autonomous Creator Agents
              </h3>
              <span className="text-slate-500">DOI: 10.1016/j.omnia.2026.04.012</span>
            </div>
            <p className="text-slate-400">
              Authors: Dr. A. Vance, OMNIA Research Collective (Published: April 2026)
            </p>
            <p className="pt-1 font-sans text-xs text-slate-300">
              Abstract: We introduce a temporal graph distillation framework that compresses
              multi-year creator memories with zero factual decay while maintaining complete human
              oversight and explainability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
