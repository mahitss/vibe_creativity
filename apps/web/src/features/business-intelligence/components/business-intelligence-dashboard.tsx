"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart2,
  BrainCircuit,
  CheckCircle2,
  DollarSign,
  HelpCircle,
  Lightbulb,
  Play,
  PlayCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface Opportunity {
  id: string;
  category: string;
  title: string;
  impact: string;
  confidence: number;
  evidence: string;
}

interface DecisionCard {
  id: string;
  title: string;
  observation: string;
  evidence: string;
  assumptions: string;
  confidence: number;
  risks: string[];
  alternatives: string[];
  outcome: string;
}

export function BusinessIntelligenceDashboard() {
  const [opportunities] = useState<Opportunity[]>([
    {
      id: "opp-101",
      category: "PRODUCT_LAUNCH",
      title: "Launch Production AI Infrastructure Micro-Course",
      impact: "+$18,500 projected Q3 ARR",
      confidence: 0.94,
      evidence: "Driven by 142 Discord community requests & 68.4% tutorial watch retention.",
    },
    {
      id: "opp-102",
      category: "SPONSOR_DEAL",
      title: "Expand CloudCorp Sponsorship to Multi-Video Bundle",
      impact: "+$12,000 sponsor revenue",
      confidence: 0.91,
      evidence: "Based on 94% renewal probability & 3.2x CPM benchmark in tech niche.",
    },
  ]);

  const [decision] = useState<DecisionCard>({
    id: "dec-1",
    title: "Transition Content Schedule to 80% Deep-Dive Tutorials",
    observation: "Audience watch duration on tutorials is 68.4% vs 32.1% on general opinion vlogs.",
    evidence:
      "Grounded in 142 Discord user requests, 3 YouTube tutorial releases, and 18 persistent memory nodes.",
    assumptions: "Weekly release cadence maintained with 2 editor team members.",
    confidence: 0.95,
    risks: ["Production delay if mid-roll sponsor assets arrive late."],
    alternatives: ["Maintain 50/50 vlog vs tutorial split", "Pivot to monthly masterclass only"],
    outcome: "+34% subscriber growth velocity & $18,500 new course ARR.",
  });

  const [simQuery, setSimQuery] = useState<string>("What if I publish twice a week?");
  const [simResult, setSimResult] = useState<string | null>(null);

  const handleRunSimulation = () => {
    setSimResult(
      "SIMULATION OUTCOME (Query: '" +
        simQuery +
        "'):\n• Projected Revenue: +24.5% ($46,000 Q3 total)\n• Audience Retention: +14.2%\n• Production Risk: MODERATE (Requires +1 video editor)",
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Autonomous Business Intelligence & Decision Lab
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Strategic simulation engine — &quot;What-If&quot; scenario forecasting, opportunity
              discovery, &amp; explainable decision cards
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-cyan-400">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            HUMAN APPROVAL GATE REQUIRED FOR HIGH-RISK DEALS
          </div>
        </div>

        {/* Revenue Forecast Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Conservative Forecast (Q3)</span>
            <p className="font-mono text-2xl font-bold text-slate-300">$28,500</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Projected Forecast (Target)</span>
            <p className="font-mono text-2xl font-bold text-cyan-400">$37,000</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">
              Aggressive Forecast (Multi-Course)
            </span>
            <p className="font-mono text-2xl font-bold text-emerald-400">$48,500</p>
          </div>
        </div>

        {/* Interactive "What-If" Scenario Simulator */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <HelpCircle className="h-5 w-5 text-indigo-400" /> Interactive &quot;What-If&quot;
            Scenario Simulator
          </h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={simQuery}
              onChange={(e) => setSimQuery(e.target.value)}
              placeholder="Ask a scenario (e.g. What if I launch a course? What if I stop making Shorts?)"
              className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 font-mono text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <button
              onClick={handleRunSimulation}
              className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-5 py-2.5 font-mono text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              <Play className="h-4 w-4 fill-slate-950" /> Run Simulation
            </button>
          </div>

          {simResult && (
            <div className="space-y-2 rounded-xl border border-indigo-800/60 bg-slate-950 p-5 font-mono text-xs text-slate-200">
              <span className="flex items-center gap-1 font-bold text-indigo-400">
                <Sparkles className="h-4 w-4" /> Strategic Simulation Projection
              </span>
              <pre className="whitespace-pre-wrap pt-2 font-sans text-sm">{simResult}</pre>
            </div>
          )}
        </div>

        {/* Discovered Opportunities */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Lightbulb className="h-5 w-5 text-amber-400" /> High-Impact Strategic Opportunities
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-amber-400">
                    {opp.category}
                  </span>
                  <span className="rounded border border-emerald-800/40 bg-emerald-950/40 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400">
                    {opp.impact}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-100">{opp.title}</h3>
                <p className="font-mono text-xs text-slate-400">Evidence: {opp.evidence}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Lab Rationale Card */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <CheckCircle2 className="h-5 w-5 text-cyan-400" /> Decision Lab — Why? Transparency &
            Evidence Card
          </h2>
          <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">{decision.title}</h3>
              <span className="rounded border border-cyan-800/40 bg-cyan-950/40 px-3 py-1 font-mono text-xs font-bold text-cyan-400">
                CONFIDENCE: {(decision.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-2">
              <div className="space-y-1 rounded border border-slate-800 bg-slate-950/60 p-4">
                <span className="font-bold text-slate-400">Supporting Evidence</span>
                <p className="text-slate-200">{decision.evidence}</p>
              </div>
              <div className="space-y-1 rounded border border-slate-800 bg-slate-950/60 p-4">
                <span className="font-bold text-slate-400">Assumptions</span>
                <p className="text-slate-200">{decision.assumptions}</p>
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <span className="flex items-center gap-1 font-bold text-rose-400">
                <AlertTriangle className="h-4 w-4" /> Evaluated Risks
              </span>
              <ul className="list-inside list-disc space-y-1 pl-2 text-slate-300">
                {decision.risks.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-3 font-mono text-xs">
              <span className="font-bold text-slate-400">Rejected Alternatives</span>
              <div className="flex items-center gap-2">
                {decision.alternatives.map((alt, idx) => (
                  <span
                    key={idx}
                    className="rounded border border-slate-800 bg-slate-950 px-2.5 py-1 text-slate-400 line-through"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
