"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  Database,
  FileText,
  GitBranch,
  HelpCircle,
  Layers,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

interface EvidenceItem {
  type: string;
  summary: string;
  memoryId: string;
}

interface AlternativeOption {
  title: string;
  description: string;
  rejectedReason: string;
}

interface WhyInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  observation?: string;
  confidenceScore?: number;
  confidenceFactors?: {
    memoryFreshness: number;
    evidenceCount: number;
    historicalSuccess: number;
    relationshipStrength: number;
    goalAlignment: number;
  };
  evidence?: EvidenceItem[];
  historicalComparison?: string;
  expectedOutcome?: string;
  rejectedAlternatives?: AlternativeOption[];
}

export function WhyInspectionModal({
  isOpen,
  onClose,
  title = "Publish Docker Multi-Agent System Deep Dive This Thursday",
  observation = "Educational deep dive tutorials consistently outperform general tech commentary in watch time and subscriber conversion.",
  confidenceScore = 0.94,
  confidenceFactors = {
    memoryFreshness: 0.95,
    evidenceCount: 0.92,
    historicalSuccess: 0.94,
    relationshipStrength: 0.9,
    goalAlignment: 0.98,
  },
  evidence = [
    {
      type: "PERFORMANCE",
      summary: "Last 5 React/Docker videos exceeded channel baseline retention by +18%.",
      memoryId: "mem-perf-101",
    },
    {
      type: "COMMUNITY",
      summary: "317 audience Discord requests explicitly requested Docker orchestration tutorial.",
      memoryId: "mem-comm-204",
    },
    {
      type: "RELATIONSHIP",
      summary: "CloudCorp title sponsorship agreement references containerized agent series.",
      memoryId: "mem-rel-301",
    },
    {
      type: "GOAL",
      summary: "Q3 Creator Revenue Goal ($25k) relies on VIP course conversions.",
      memoryId: "mem-goal-401",
    },
  ],
  historicalComparison = "Thursday uploads historically deliver +24% higher 48-hour view velocity than Monday uploads.",
  expectedOutcome = "Higher retention (+18%), ~12,000 developer watch hours, and strong CloudCorp renewal positioning.",
  rejectedAlternatives = [
    {
      title: "Publish General AI Industry News Commentary",
      description: "Record a quick 8-minute summary of recent AI news headlines.",
      rejectedReason: "Historical performance memory shows commentary clips have 40% lower retention and 0 course conversions.",
    },
  ],
}: WhyInspectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-6 font-sans text-neutral-100 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 uppercase tracking-wider">
                Executive Reasoning Trace
              </span>
              <span className="text-xs text-neutral-500 font-mono">Grounded Memory Analysis</span>
            </div>
            <h2 className="text-lg font-bold text-neutral-100 leading-snug">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-200 rounded-lg hover:bg-neutral-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Observation & Calculated Confidence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-1.5">
            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Observation Statement</p>
            <p className="text-xs text-neutral-200 leading-relaxed font-normal">{observation}</p>
          </div>

          <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Confidence</span>
              <span className="text-cyan-400 font-bold text-sm">{Math.round(confidenceScore * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                style={{ width: `${confidenceScore * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-neutral-500">Multi-Factor Algorithmic Score</p>
          </div>
        </div>

        {/* Confidence Score Factor Breakdown */}
        <div className="bg-neutral-950/60 border border-neutral-850 rounded-xl p-4 space-y-3 font-mono text-xs">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Confidence Factor Metrics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[10px]">
            <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
              <span className="text-neutral-500 block">Freshness</span>
              <span className="text-neutral-200 font-bold">{Math.round(confidenceFactors.memoryFreshness * 100)}%</span>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
              <span className="text-neutral-500 block">Evidence</span>
              <span className="text-neutral-200 font-bold">{Math.round(confidenceFactors.evidenceCount * 100)}%</span>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
              <span className="text-neutral-500 block">Success</span>
              <span className="text-neutral-200 font-bold">{Math.round(confidenceFactors.historicalSuccess * 100)}%</span>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
              <span className="text-neutral-500 block">Relationship</span>
              <span className="text-neutral-200 font-bold">{Math.round(confidenceFactors.relationshipStrength * 100)}%</span>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
              <span className="text-neutral-500 block">Alignment</span>
              <span className="text-neutral-200 font-bold">{Math.round(confidenceFactors.goalAlignment * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Evidence Memory Citations */}
        <div className="space-y-2">
          <p className="text-[11px] font-mono font-medium text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5 text-blue-400" /> Grounded Evidence ({evidence.length} Citations)
          </p>
          <div className="space-y-2">
            {evidence.map((ev, idx) => (
              <div
                key={idx}
                className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 flex items-start gap-3 text-xs"
              >
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 shrink-0 mt-0.5">
                  {ev.type}
                </span>
                <div>
                  <p className="text-neutral-200 font-normal">{ev.summary}</p>
                  <p className="text-[10px] font-mono text-neutral-500 mt-1">Memory ID: {ev.memoryId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Comparison & Expected Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-1">
            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Historical Comparison</p>
            <p className="text-neutral-300 leading-relaxed font-normal">{historicalComparison}</p>
          </div>
          <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-1">
            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Expected Outcome</p>
            <p className="text-emerald-400 font-semibold leading-relaxed">{expectedOutcome}</p>
          </div>
        </div>

        {/* Rejected Alternatives */}
        {rejectedAlternatives.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-neutral-850">
            <p className="text-[11px] font-mono font-medium text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" /> Rejected Alternative Options ({rejectedAlternatives.length})
            </p>
            {rejectedAlternatives.map((alt, idx) => (
              <div key={idx} className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-200">{alt.title}</h4>
                  <span className="text-[10px] font-mono text-rose-400 font-bold">REJECTED</span>
                </div>
                <p className="text-neutral-400">{alt.description}</p>
                <div className="pt-2 border-t border-neutral-850 text-amber-300 font-mono text-[11px]">
                  <span className="font-bold">Why Not Selected:</span> {alt.rejectedReason}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold px-4 py-2 rounded-lg transition border border-neutral-700"
          >
            Close Reasoning Trace
          </button>
        </div>
      </div>
    </div>
  );
}
