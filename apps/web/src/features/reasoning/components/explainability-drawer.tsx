"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  Layers,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";

interface ExplainabilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  missionTitle?: string;
}

export function ExplainabilityDrawer({ isOpen, onClose, missionTitle }: ExplainabilityDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex justify-end bg-slate-950/80 font-sans backdrop-blur-sm">
      <div className="w-full max-w-2xl space-y-6 overflow-y-auto border-l border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-amber-400" />
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Executive Reasoning &amp; Explainability
              </h2>
              <p className="font-mono text-xs text-slate-400">
                WHY AM I SEEING THIS RECOMMENDATION?
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mission Title & Confidence Level */}
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-5">
          <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-amber-400">
            MISSION EXPLANATION
          </span>
          <h3 className="text-lg font-bold text-slate-100">
            {missionTitle ?? "Publish Docker Multi-Agent System Tutorial & Repurpose Content"}
          </h3>
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              CONFIDENCE: VERY HIGH (96%)
            </div>
            <span className="text-slate-400">PRIORITY: CRITICAL</span>
          </div>
          <p className="font-mono text-[11px] italic text-slate-400">
            &ldquo;Confidence boosted +0.05 due to 14 repeated audience requests.&rdquo;
          </p>
        </div>

        {/* Why this mission? */}
        <div className="space-y-2">
          <h4 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-amber-400">
            <HelpCircle className="h-4 w-4" /> Why this recommendation exists
          </h4>
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs leading-relaxed text-slate-200">
            14 audience comments specifically requested Docker container orchestration for
            multi-agent setups. Historical analytics prove technical deep dive tutorials yield 2.4x
            higher watch time and +18% subscriber conversion, directly supporting your Q3 $25k
            revenue milestone.
          </div>
        </div>

        {/* Evidence Ranking Matrix */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase text-cyan-400">
            <BarChart3 className="h-4 w-4" /> Grounded Evidence Ranking (5 Scoring Factors)
          </h4>
          <div className="space-y-2">
            <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3.5">
              <div className="flex justify-between font-bold">
                <span className="text-slate-200">1. Historical Watch Time Performance</span>
                <span className="text-emerald-400">SCORE: 0.965</span>
              </div>
              <p className="font-sans text-[11px] text-slate-400">
                Last 5 React/Docker tutorials exceeded channel baseline retention by +18%.
              </p>
              <div className="pt-1 text-[10px] text-slate-500">
                Relevance: 0.98 • Recency: 0.95 • Reliability: 0.99 • Goal Alignment: 0.97
              </div>
            </div>

            <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3.5">
              <div className="flex justify-between font-bold">
                <span className="text-slate-200">2. Community Demand Signal</span>
                <span className="text-emerald-400">SCORE: 0.942</span>
              </div>
              <p className="font-sans text-[11px] text-slate-400">
                14 audience Discord &amp; YouTube comments requested Docker orchestration tutorial.
              </p>
              <div className="pt-1 text-[10px] text-slate-500">
                Relevance: 0.96 • Recency: 0.98 • Reliability: 0.95 • Goal Alignment: 0.92
              </div>
            </div>

            <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3.5">
              <div className="flex justify-between font-bold">
                <span className="text-slate-200">3. Sponsor Contract Alignment</span>
                <span className="text-emerald-400">SCORE: 0.936</span>
              </div>
              <p className="font-sans text-[11px] text-slate-400">
                CloudCorp title sponsorship agreement references containerized agent series ($12,000
                value).
              </p>
              <div className="pt-1 text-[10px] text-slate-500">
                Relevance: 0.92 • Recency: 0.90 • Reliability: 0.96 • Goal Alignment: 0.98
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Memories */}
        <div className="space-y-2 font-mono text-xs">
          <h4 className="font-sans text-xs font-bold uppercase text-slate-300">
            SUPPORTING MEMORY ROWS
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg border border-amber-500/30 bg-slate-950 px-3 py-1.5 text-amber-300">
              mem-yt-comment-42 (14 Requests)
            </span>
            <span className="rounded-lg border border-cyan-500/30 bg-slate-950 px-3 py-1.5 text-cyan-300">
              mem-yt-analytics-90d (+18% Retention)
            </span>
            <span className="rounded-lg border border-purple-500/30 bg-slate-950 px-3 py-1.5 text-purple-300">
              mem-sponsor-contract-q4 ($12k Terms)
            </span>
          </div>
        </div>

        {/* Alternative Strategies (Why Rejected?) */}
        <div className="space-y-2 font-mono text-xs">
          <h4 className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase text-rose-400">
            <AlertTriangle className="h-4 w-4" /> Alternative Options Considered &amp; Rejected
          </h4>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <span className="font-bold text-slate-200">
              Rejected Option: Publish General AI Industry News Commentary
            </span>
            <p className="font-sans text-xs text-slate-400">
              Reason for Rejection: Historical performance memory shows commentary clips have 40%
              lower retention and 0 course conversions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
