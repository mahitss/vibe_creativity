"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Database,
  FileText,
  GitBranch,
  HelpCircle,
  Layers,
  Lightbulb,
  Play,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

interface CognitiveStrategy {
  id: string;
  name: string;
  description: string;
  expected_impact: number;
  risk_level: string;
  selected: boolean;
  rejection_reason?: string;
}

export function CognitiveLoopVisualizer() {
  const [isRunning, setIsRunning] = useState(true);
  const [currentStageIndex, setCurrentStageIndex] = useState(11); // UPDATE_MEMORY
  const [cycleCount, setCycleCount] = useState(14);
  const [isTriggering, setIsTriggering] = useState(false);

  const stages = [
    { id: "OBSERVE", label: "1. Observe" },
    { id: "UNDERSTAND", label: "2. Understand" },
    { id: "RETRIEVE_MEMORY", label: "3. Retrieve Memory" },
    { id: "GENERATE_CONTEXT", label: "4. Generate Context" },
    { id: "REASON", label: "5. Reason" },
    { id: "EVALUATE_OPTIONS", label: "6. Evaluate Options" },
    { id: "CREATE_PLAN", label: "7. Create Plan" },
    { id: "EXECUTE_SAFE_ACTIONS", label: "8. Execute Safe Actions" },
    { id: "WAIT_FOR_OUTCOME", label: "9. Wait For Outcome" },
    { id: "EVALUATE_SUCCESS", label: "10. Evaluate Success" },
    { id: "LEARN", label: "11. Learn" },
    { id: "UPDATE_MEMORY", label: "12. Update Memory" },
  ];

  const strategies: CognitiveStrategy[] = [
    {
      id: "strat-1",
      name: "Strategy A: Publish Docker System Tutorial This Thursday",
      description: "Optimize video release for peak Thursday engagement window.",
      expected_impact: 0.94,
      risk_level: "LOW",
      selected: true,
    },
    {
      id: "strat-2",
      name: "Strategy B: Delay Release Until Next Week",
      description: "Extend script revision window by 5 days.",
      expected_impact: 0.6,
      risk_level: "MEDIUM",
      selected: false,
      rejection_reason: "Delaying release misses optimal CloudCorp sponsorship contract renewal window.",
    },
    {
      id: "strat-3",
      name: "Strategy C: Repurpose Existing Content Only",
      description: "Publish clip compilation from previous streams without new tutorial.",
      expected_impact: 0.45,
      risk_level: "HIGH",
      selected: false,
      rejection_reason: "Audience memory signals show 317 requests specifically requiring step-by-step code tutorial.",
    },
  ];

  function handleTriggerCycle() {
    setIsTriggering(true);
    setCurrentStageIndex(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= stages.length) {
        clearInterval(interval);
        setCurrentStageIndex(11);
        setCycleCount((prev) => prev + 1);
        setIsTriggering(false);
      } else {
        setCurrentStageIndex(step);
      }
    }, 250);
  }

  return (
    <div className="space-y-8 font-sans select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold uppercase">
              24/7 Autonomous Cognition
            </span>
            <span className="text-neutral-500">Continuous Cognitive Thinking Engine</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100 flex items-center gap-2">
            Cognitive Loop Engine &amp; Strategy Evaluator
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            OMNIA continuously observes, reasons, evaluates strategies, executes safe actions, and learns from outcomes—even when you are offline.
          </p>
        </div>

        <button
          onClick={handleTriggerCycle}
          disabled={isTriggering}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-md shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50 shrink-0"
        >
          {isTriggering ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4 fill-current" />
          )}
          <span>Trigger Cognitive Cycle #{cycleCount + 1}</span>
        </button>
      </div>

      {/* Telemetry Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Engine Status</p>
          <p className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Thinking 24/7
          </p>
          <p className="text-[10px] text-neutral-500">Cycle #{cycleCount} Active</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Avg Cycle Time</p>
          <p className="text-base font-bold text-neutral-100">1.42s</p>
          <p className="text-[10px] text-neutral-400">12 Pipeline Stages</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Learning Accuracy</p>
          <p className="text-base font-bold text-cyan-400">94.2%</p>
          <p className="text-[10px] text-neutral-400">+4% Delta This Week</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Acceptance Rate</p>
          <p className="text-base font-bold text-emerald-400">91.8%</p>
          <p className="text-[10px] text-neutral-400">Grounded Recommendations</p>
        </div>
      </section>

      {/* 12-Stage Cognitive Stepper */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
            <Brain className="h-4 w-4 text-cyan-400" />
            Active 12-Stage Cognitive Loop Pipeline
          </h3>
          <span className="text-xs font-mono text-cyan-400 font-bold">
            Stage {currentStageIndex + 1}/12: {stages[currentStageIndex]?.label}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 font-mono text-[11px]">
          {stages.map((stg, idx) => {
            const isActive = idx === currentStageIndex;
            const isCompleted = idx < currentStageIndex;

            return (
              <div
                key={stg.id}
                className={`p-3 rounded-xl border transition flex flex-col justify-between space-y-1.5 ${
                  isActive
                    ? "bg-neutral-800 border-cyan-500/50 text-cyan-400 font-bold shadow-lg shadow-cyan-500/10"
                    : isCompleted
                    ? "bg-neutral-950 border-neutral-850 text-emerald-400"
                    : "bg-neutral-950/60 border-neutral-900 text-neutral-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] opacity-60">Step {idx + 1}</span>
                  {isCompleted && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                  {isActive && <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />}
                </div>
                <span className="leading-snug">{stg.label.replace(/^\d+\.\s*/, "")}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Multi-Strategy Evaluator Grid */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 font-sans">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Multi-Strategy Option Evaluation &amp; Rejection Rationale
          </h3>
          <span className="text-xs font-mono text-neutral-500">Evaluated 3 Candidate Paths</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategies.map((strat) => (
            <div
              key={strat.id}
              className={`rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition ${
                strat.selected
                  ? "bg-neutral-950 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                  : "bg-neutral-950/60 border-neutral-850 opacity-80"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      strat.selected
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {strat.selected ? "OPTIMAL STRATEGY" : "REJECTED PATH"}
                  </span>
                  <span className="text-neutral-400">Impact: {Math.round(strat.expected_impact * 100)}%</span>
                </div>

                <h4 className="font-bold text-neutral-100 text-xs leading-snug">{strat.name}</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">{strat.description}</p>
              </div>

              {strat.rejection_reason && (
                <div className="pt-3 border-t border-neutral-850 text-amber-300 font-mono text-[11px] space-y-1">
                  <span className="font-bold uppercase text-[10px] text-amber-400 block">Why Rejected:</span>
                  <p className="leading-relaxed text-[11px]">{strat.rejection_reason}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 24-Hour Self-Evaluation Log */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-3 font-sans">
        <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-cyan-400" />
          24-Hour Self-Evaluation &amp; Reflection Log
        </h3>
        <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950 border border-neutral-850 rounded-xl p-4 font-mono">
          "Over the last 24 hours, OMNIA observed that prioritizing technical deep dive tutorials yielded +18% higher audience retention. Rejected commentary clip strategies saved 8 hours of wasted production time. Memory confidence model updated by +4%."
        </p>
      </section>
    </div>
  );
}
