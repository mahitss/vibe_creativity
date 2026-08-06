"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  FileText,
  HelpCircle,
  History,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from "lucide-react";

interface ExplanationCard {
  id: string;
  title: string;
  evidence: string;
  memories: string[];
  analytics: string;
  goals: string[];
  confidence: number;
  alternatives: string[];
  uncertainties: string[];
}

export function TrustFrameworkDashboard() {
  const [card] = useState<ExplanationCard>({
    id: "exp-101",
    title: "Transition Content Schedule to 80% Deep-Dive Tutorials",
    evidence:
      "Validated across 142 Discord user requests, 3 YouTube tutorial releases, and 18 persistent memory rows.",
    memories: ["mem-101", "mem-204", "mem-308"],
    analytics: "30-day retention percentile: 88.5%, Sponsor conversion: 94.0%.",
    goals: ["goal-sub-growth-q3", "goal-sponsor-revenue-q3"],
    confidence: 0.96,
    alternatives: ["Maintain 50/50 opinion vlog split"],
    uncertainties: ["Sponsor mid-roll asset delivery timeline depends on external partner."],
  });

  const [feedbackSubmitted, setFeedbackSubmitted] = useState<string | null>(null);

  const handleFeedback = (action: string) => {
    setFeedbackSubmitted(action);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Human–AI Trust & Explainability Cockpit
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Transparent AI decision attribution — explicit memory grounding, uncertainty bounds, &
              human feedback controls
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-emerald-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            PREDICTION ACCURACY: 98.4%
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">User Trust Index</span>
            <p className="font-mono text-2xl font-bold text-slate-100">96.8 / 100</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Prediction Accuracy</span>
            <p className="font-mono text-2xl font-bold text-emerald-400">98.4%</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Total Corrections</span>
            <p className="font-mono text-2xl font-bold text-cyan-400">12 Items</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Avg Review Time</span>
            <p className="font-mono text-2xl font-bold text-purple-400">14.5 Seconds</p>
          </div>
        </div>

        {/* 8-Stage Explanation Attribution Card */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Sparkles className="h-5 w-5 text-cyan-400" /> 8-Stage Decision Attribution Card
          </h2>
          <div className="space-y-5 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100">{card.title}</h3>
                <span className="font-mono text-xs text-slate-400">
                  Recommendation ID: {card.id}
                </span>
              </div>
              <span className="rounded border border-cyan-800/40 bg-cyan-950/40 px-3 py-1.5 font-mono text-xs font-bold text-cyan-400">
                CONFIDENCE: {(card.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-2">
              <div className="space-y-1 rounded border border-slate-800 bg-slate-950/60 p-4">
                <span className="flex items-center gap-1 font-bold text-cyan-400">
                  <FileText className="h-4 w-4" /> Supporting Evidence & Analytics
                </span>
                <p className="text-slate-300">{card.evidence}</p>
                <p className="border-t border-slate-900 pt-1 text-slate-400">{card.analytics}</p>
              </div>

              <div className="space-y-1 rounded border border-slate-800 bg-slate-950/60 p-4">
                <span className="flex items-center gap-1 font-bold text-purple-400">
                  <History className="h-4 w-4" /> Grounded Memory Row References
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {card.memories.map((mem) => (
                    <span
                      key={mem}
                      className="rounded border border-purple-800/40 bg-purple-950/40 px-2 py-0.5 text-purple-300"
                    >
                      Memory ID: {mem}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 rounded border border-slate-800 bg-slate-950/60 p-4 font-mono text-xs">
              <span className="flex items-center gap-1 font-bold text-amber-400">
                <AlertCircle className="h-4 w-4" /> Known Uncertainties & Weak Evidence
              </span>
              <ul className="list-inside list-disc space-y-1 pl-2 text-slate-300">
                {card.uncertainties.map((u, idx) => (
                  <li key={idx}>{u}</li>
                ))}
              </ul>
            </div>

            {/* Human Review Controls */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4 font-mono text-xs">
              <span className="text-slate-400">Human Action:</span>
              {feedbackSubmitted ? (
                <span className="font-bold text-emerald-400">
                  HUMAN DECISION RECORDED: {feedbackSubmitted}
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleFeedback("APPROVED")}
                    className="flex items-center gap-1 rounded bg-emerald-500 px-3.5 py-1.5 font-bold text-slate-950 transition hover:bg-emerald-400"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => handleFeedback("CHALLENGED")}
                    className="flex items-center gap-1 rounded bg-amber-500 px-3.5 py-1.5 font-bold text-slate-950 transition hover:bg-amber-400"
                  >
                    <HelpCircle className="h-3.5 w-3.5" /> Challenge Assumption
                  </button>
                  <button
                    onClick={() => handleFeedback("REJECTED")}
                    className="flex items-center gap-1 rounded bg-rose-500 px-3.5 py-1.5 font-bold text-slate-950 transition hover:bg-rose-400"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
