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
      rejection_reason:
        "Delaying release misses optimal CloudCorp sponsorship contract renewal window.",
    },
    {
      id: "strat-3",
      name: "Strategy C: Repurpose Existing Content Only",
      description: "Publish clip compilation from previous streams without new tutorial.",
      expected_impact: 0.45,
      risk_level: "HIGH",
      selected: false,
      rejection_reason:
        "Audience memory signals show 317 requests specifically requiring step-by-step code tutorial.",
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
    <div className="select-none space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2 font-mono text-xs">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-bold uppercase text-cyan-400">
              24/7 Autonomous Cognition
            </span>
            <span className="text-neutral-500">Continuous Cognitive Thinking Engine</span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Cognitive Loop Engine &amp; Strategy Evaluator
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-neutral-400">
            OMNIA continuously observes, reasons, evaluates strategies, executes safe actions, and
            learns from outcomes—even when you are offline.
          </p>
        </div>

        <button
          onClick={handleTriggerCycle}
          disabled={isTriggering}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50"
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
      <section className="grid grid-cols-2 gap-4 font-mono text-xs md:grid-cols-4">
        <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">Engine Status</p>
          <p className="flex items-center gap-1.5 text-base font-bold text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Thinking 24/7
          </p>
          <p className="text-[10px] text-neutral-500">Cycle #{cycleCount} Active</p>
        </div>

        <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">Avg Cycle Time</p>
          <p className="text-base font-bold text-neutral-100">1.42s</p>
          <p className="text-[10px] text-neutral-400">12 Pipeline Stages</p>
        </div>

        <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">Learning Accuracy</p>
          <p className="text-base font-bold text-cyan-400">94.2%</p>
          <p className="text-[10px] text-neutral-400">+4% Delta This Week</p>
        </div>

        <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">Acceptance Rate</p>
          <p className="text-base font-bold text-emerald-400">91.8%</p>
          <p className="text-[10px] text-neutral-400">Grounded Recommendations</p>
        </div>
      </section>

      {/* 12-Stage Cognitive Stepper */}
      <section className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-100">
            <Brain className="h-4 w-4 text-cyan-400" />
            Active 12-Stage Cognitive Loop Pipeline
          </h3>
          <span className="font-mono text-xs font-bold text-cyan-400">
            Stage {currentStageIndex + 1}/12: {stages[currentStageIndex]?.label}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 font-mono text-[11px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {stages.map((stg, idx) => {
            const isActive = idx === currentStageIndex;
            const isCompleted = idx < currentStageIndex;

            return (
              <div
                key={stg.id}
                className={`flex flex-col justify-between space-y-1.5 rounded-xl border p-3 transition ${
                  isActive
                    ? "border-cyan-500/50 bg-neutral-800 font-bold text-cyan-400 shadow-lg shadow-cyan-500/10"
                    : isCompleted
                      ? "border-neutral-850 bg-neutral-950 text-emerald-400"
                      : "border-neutral-900 bg-neutral-950/60 text-neutral-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] opacity-60">Step {idx + 1}</span>
                  {isCompleted && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                  {isActive && <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />}
                </div>
                <span className="leading-snug">{stg.label.replace(/^\d+\.\s*/, "")}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Multi-Strategy Evaluator Grid */}
      <section className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 font-sans">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-100">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Multi-Strategy Option Evaluation &amp; Rejection Rationale
          </h3>
          <span className="font-mono text-xs text-neutral-500">Evaluated 3 Candidate Paths</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {strategies.map((strat) => (
            <div
              key={strat.id}
              className={`flex flex-col justify-between space-y-4 rounded-2xl border p-5 transition ${
                strat.selected
                  ? "border-cyan-500/50 bg-neutral-950 shadow-lg shadow-cyan-500/10"
                  : "border-neutral-850 bg-neutral-950/60 opacity-80"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-bold uppercase ${
                      strat.selected
                        ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {strat.selected ? "OPTIMAL STRATEGY" : "REJECTED PATH"}
                  </span>
                  <span className="text-neutral-400">
                    Impact: {Math.round(strat.expected_impact * 100)}%
                  </span>
                </div>

                <h4 className="text-xs font-bold leading-snug text-neutral-100">{strat.name}</h4>
                <p className="text-xs leading-relaxed text-neutral-400">{strat.description}</p>
              </div>

              {strat.rejection_reason && (
                <div className="border-neutral-850 space-y-1 border-t pt-3 font-mono text-[11px] text-amber-300">
                  <span className="block text-[10px] font-bold uppercase text-amber-400">
                    Why Rejected:
                  </span>
                  <p className="text-[11px] leading-relaxed">{strat.rejection_reason}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 24-Hour Self-Evaluation Log */}
      <section className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 font-sans">
        <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-100">
          <Lightbulb className="h-4 w-4 text-cyan-400" />
          24-Hour Self-Evaluation &amp; Reflection Log
        </h3>
        <p className="border-neutral-850 rounded-xl border bg-neutral-950 p-4 font-mono text-xs leading-relaxed text-neutral-300">
          "Over the last 24 hours, OMNIA observed that prioritizing technical deep dive tutorials
          yielded +18% higher audience retention. Rejected commentary clip strategies saved 8 hours
          of wasted production time. Memory confidence model updated by +4%."
        </p>
      </section>
    </div>
  );
}
