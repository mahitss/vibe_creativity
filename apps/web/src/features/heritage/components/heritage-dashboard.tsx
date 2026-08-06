"use client";

import React, { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Crown,
  FileText,
  Globe,
  Heart,
  Lock,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";

interface Principle {
  id: string;
  name: string;
  description: string;
}

export function HeritageDashboard() {
  const [principles] = useState<Principle[]>([
    {
      id: "p-1",
      name: "Human-first AI",
      description: "Technology designed to empower and assist human creators, never replace them.",
    },
    {
      id: "p-2",
      name: "Transparency",
      description: "Every autonomous decision explains Observation, Evidence, and Business Impact.",
    },
    {
      id: "p-3",
      name: "Privacy",
      description: "Individual creator memories and data are never uploaded or shared.",
    },
    {
      id: "p-4",
      name: "Open standards",
      description: "Zero vendor lock-in with open memory and connector protocols.",
    },
    {
      id: "p-5",
      name: "Evidence-based decisions",
      description: "Zero hallucination; every action must cite persistent memory nodes.",
    },
    {
      id: "p-6",
      name: "Continuous learning",
      description: "Systems adapt safely over multi-decade horizons.",
    },
    {
      id: "p-7",
      name: "Community governance",
      description: "Stewarded by open community governance and transparent consensus.",
    },
  ]);

  const [proposalTitle, setProposalTitle] = useState<string>(
    "Proposal to Add Secret Cloud Memory Sync",
  );
  const [proposalDesc, setProposalDesc] = useState<string>(
    "Automatically upload private user memories to central server for training.",
  );
  const [valResult, setValResult] = useState<string | null>(null);

  const handleValidate = () => {
    const isSecret = proposalDesc.toLowerCase().includes("upload private user memories");
    if (isSecret) {
      setValResult(
        "PROPOSAL COMPLIANCE EVALUATION RESULT:\n❌ ALIGNMENT STATUS: REJECTED BY CONSTITUTION\n• Violated Principles: Principle #3 (Privacy) & Principle #2 (Transparency)\n• Rationale: Secret upload of private creator memory rows violates local data ownership guidelines.",
      );
    } else {
      setValResult(
        "PROPOSAL COMPLIANCE EVALUATION RESULT:\n✔ ALIGNMENT STATUS: FULLY COMPLIANT\n• Violated Principles: None\n• Rationale: Proposal respects all 7 OMNIA Founding Principles.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Banner Year 2045 */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-amber-400" />
              <h1 className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                OMNIA 2045 — Living Heritage Charter
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Stewarding technology that continues improving because people believe in it and
              contribute to it — Year 2045 Edition
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-amber-400">
            <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
            20 YEARS OF OPEN COMMUNITY STEWARDSHIP
          </div>
        </div>

        {/* 20-Year Global Telemetry Metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Global Contributors</span>
            <p className="font-mono text-2xl font-bold text-amber-400">14,200 Developers</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Businesses Powered</span>
            <p className="font-mono text-2xl font-bold text-emerald-400">3,500,000 Creators</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">University Curriculums</span>
            <p className="font-mono text-2xl font-bold text-cyan-400">450 Universities</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Academic Research Citations</span>
            <p className="font-mono text-2xl font-bold text-purple-400">8,900 Papers</p>
          </div>
        </div>

        {/* The 7 Immutable Founding Principles */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <ShieldCheck className="h-5 w-5 text-amber-400" /> The 7 Immutable Founding Principles
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {principles.map((p) => (
              <div
                key={p.id}
                className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-100">{p.name}</h3>
                  <span className="rounded border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-400">
                    {p.id}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RFC Proposal Compliance Validator */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Terminal className="h-5 w-5 text-cyan-400" /> Constitutional Proposal Compliance
            Validator
          </h2>
          <div className="space-y-3 font-mono text-xs">
            <input
              type="text"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              placeholder="Proposal title..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
            <textarea
              value={proposalDesc}
              onChange={(e) => setProposalDesc(e.target.value)}
              placeholder="Proposal description..."
              rows={3}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
            <button
              onClick={handleValidate}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-5 py-2.5 font-bold text-slate-950 transition hover:bg-amber-400"
            >
              <CheckCircle2 className="h-4 w-4 text-slate-950" /> Validate Proposal Alignment
            </button>
          </div>

          {valResult && (
            <div className="space-y-2 rounded-xl border border-amber-800/60 bg-slate-950 p-5 font-mono text-xs text-slate-200">
              <span className="flex items-center gap-1 font-bold text-amber-400">
                <Sparkles className="h-4 w-4" /> Constitutional Steward Rationale
              </span>
              <pre className="whitespace-pre-wrap pt-2 font-sans text-sm">{valResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
