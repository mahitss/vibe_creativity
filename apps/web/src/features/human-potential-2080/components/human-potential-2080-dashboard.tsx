"use client";

import React, { useState } from "react";
import {
  Archive,
  Award,
  CheckCircle2,
  Eye,
  Heart,
  Key,
  Lock,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

interface KnowledgeArchive {
  id: string;
  title: string;
  lineage: string;
  tier: string;
  nodes: number;
}

export function HumanPotential2080Dashboard() {
  const [archives] = useState<KnowledgeArchive[]>([
    {
      id: "arch-1",
      title: "OMNIA Autonomous Operating System Founding Architecture",
      lineage: "OMNIA Core Pioneers & Global Contributors (2025 - 2080)",
      tier: "CENTURY_IMMUTABLE",
      nodes: 1420,
    },
    {
      id: "arch-2",
      title: "Universal Protocol & Memory Portability Format Standard",
      lineage: "Global Intelligence Ecosystem Foundation",
      tier: "CENTURY_IMMUTABLE",
      nodes: 890,
    },
  ]);

  const [proposedAction, setProposedAction] = useState<string>(
    "Launch Global Multi-Workspace Sponsor Campaign",
  );
  const [gateOutput, setGateOutput] = useState<string | null>(null);

  const handleRequestGate = () => {
    setGateOutput(
      "HUMAN DECISION GATE EVALUATION:\n✔ TRANSPARENT REASONING: Action cites 42 memory rows (mem-8f1, mem-9e2) with 98.4% confidence\n⚠ MANDATORY ACTION: Requires explicit human signature before execution\n• Approver: Creator Context (ws-101)\n• Status: PENDING HUMAN SIGNATURE (Zero autonomous execution without approval)",
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-emerald-400" />
              <h1 className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                OMNIA 2080 — Human Potential Amplification Platform
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Invisible AI technology multiplying human capability while preserving 100% human
              agency & judgment — Year 2080
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-emerald-400">
            <UserCheck className="h-4 w-4 text-emerald-400" />
            HUMAN AGENCY SCORE: 100%
          </div>
        </div>

        {/* Human Amplification Scoreboard */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Human Capability Multiplier</span>
            <p className="font-mono text-2xl font-bold text-emerald-400">14.2x Amplified</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Human Agency Index</span>
            <p className="font-mono text-2xl font-bold text-cyan-400">1.00 (Strict 100%)</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Intergenerational Archives</span>
            <p className="font-mono text-2xl font-bold text-purple-400">2,310 Vaults</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Evidence Grounding</span>
            <p className="font-mono text-2xl font-bold text-amber-400">100% CITED</p>
          </div>
        </div>

        {/* Intergenerational Knowledge Vault */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Archive className="h-5 w-5 text-purple-400" /> Intergenerational Knowledge Vault
            (Century-Immutable)
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {archives.map((a) => (
              <div
                key={a.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-100">{a.title}</h3>
                  <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-purple-400">
                    {a.tier}
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span>Lineage: {a.lineage}</span>
                  <span>{a.nodes} Evidence Nodes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Human Decision Gate Cockpit */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <ShieldCheck className="h-5 w-5 text-emerald-400" /> Human Decision Gate & Transparency
            Cockpit
          </h2>
          <p className="font-mono text-xs text-slate-400">
            AI explains before it recommends. Humans make all high-impact decisions with complete
            evidence attribution.
          </p>
          <div className="flex items-center gap-3 font-mono text-xs">
            <input
              type="text"
              value={proposedAction}
              onChange={(e) => setProposedAction(e.target.value)}
              placeholder="Enter high-impact action proposal..."
              className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleRequestGate}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-5 py-2.5 font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              <Eye className="h-4 w-4 text-slate-950" /> Request Decision Gate Review
            </button>
          </div>

          {gateOutput && (
            <div className="space-y-2 rounded-xl border border-emerald-800/60 bg-slate-950 p-5 font-mono text-xs text-slate-200">
              <span className="flex items-center gap-1 font-bold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Human Approval Requirement Gate
              </span>
              <pre className="whitespace-pre-wrap pt-2 font-sans text-sm">{gateOutput}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
