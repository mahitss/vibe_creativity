"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Database,
  FileText,
  Filter,
  Flame,
  GitBranch,
  Handshake,
  Layers,
  Lightbulb,
  Lock,
  MessageSquare,
  Plus,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

interface DecisionReview {
  decision_id: string;
  agent_id: string;
  reasoning_chain: string;
  supporting_evidence: string;
  initial_confidence: number;
  recalibrated_confidence: number;
  expected_outcome: string;
  actual_outcome: string;
  outcome_rating: "EXCEEDED_EXPECTATIONS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED" | "IGNORED";
  success_score: number;
  failure_reason?: string;
  lessons_learned: string;
  evaluated_at: string;
}

interface AgentMetric {
  agent_id: string;
  agent_name: string;
  total_recommendations: number;
  acceptance_rate: number;
  prediction_accuracy: number;
  average_confidence: number;
  rating_trend: string;
}

interface StrategyExperiment {
  experiment_id: string;
  name: string;
  variant_a: string;
  variant_b: string;
  metric_tracked: string;
  winner: string;
  confidence_score: number;
}

export function EvaluationDashboard() {
  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "REVIEWS font-sans" | "AGENTS" | "EXPERIMENTS"
  >("OVERVIEW");
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>("dec-101");
  const [isRunningCycle, setIsRunningCycle] = useState<boolean>(false);

  const [reviews, setReviews] = useState<DecisionReview[]>([
    {
      decision_id: "dec-101",
      agent_id: "agent-executive",
      reasoning_chain:
        "Prioritize React Part 5 scripting over Docker research due to 8-day delay & 142 waiting subs.",
      supporting_evidence: "Memory #mem-promise-react5 + Discord community inquiry cluster.",
      initial_confidence: 0.97,
      recalibrated_confidence: 0.98,
      expected_outcome:
        "Publish React Part 5 by tomorrow 18:00 UTC and secure CloudCorp $15k title agreement.",
      actual_outcome:
        "React Part 5 script completed ahead of schedule; CloudCorp media kit dispatched.",
      outcome_rating: "EXCEEDED_EXPECTATIONS",
      success_score: 0.98,
      lessons_learned:
        "Evidence-grounded prioritization of overdue series episodes increases creator completion velocity by 40%.",
      evaluated_at: "2026-08-04T19:30:00Z",
    },
    {
      decision_id: "dec-102",
      agent_id: "agent-content",
      reasoning_chain: "Recommend immediate video release on Thursday evening.",
      supporting_evidence: "YouTube retention analytics peak data.",
      initial_confidence: 0.92,
      recalibrated_confidence: 0.86,
      expected_outcome: "Maximum day-1 view velocity.",
      actual_outcome: "Release held by 24 hours to include CloudCorp $15k sponsor read.",
      outcome_rating: "PARTIAL_SUCCESS",
      success_score: 0.82,
      failure_reason: "Failed to account for active sponsor deal negotiation window.",
      lessons_learned:
        "Content Strategy Agent must consult Sponsor Intelligence Agent prior to confirming release dates.",
      evaluated_at: "2026-08-03T14:00:00Z",
    },
  ]);

  const [agentMetrics] = useState<AgentMetric[]>([
    {
      agent_id: "agent-executive",
      agent_name: "Executive COO Strategy Agent",
      total_recommendations: 42,
      acceptance_rate: 0.95,
      prediction_accuracy: 0.96,
      average_confidence: 0.96,
      rating_trend: "UPWARD",
    },
    {
      agent_id: "agent-content",
      agent_name: "Content Strategy Agent",
      total_recommendations: 38,
      acceptance_rate: 0.91,
      prediction_accuracy: 0.92,
      average_confidence: 0.9,
      rating_trend: "STABLE",
    },
    {
      agent_id: "agent-sponsor",
      agent_name: "Sponsor Intelligence Agent",
      total_recommendations: 24,
      acceptance_rate: 0.96,
      prediction_accuracy: 0.94,
      average_confidence: 0.94,
      rating_trend: "UPWARD",
    },
    {
      agent_id: "agent-community",
      agent_name: "Community Intelligence Agent",
      total_recommendations: 30,
      acceptance_rate: 0.92,
      prediction_accuracy: 0.9,
      average_confidence: 0.91,
      rating_trend: "STABLE",
    },
  ]);

  const [experiments] = useState<StrategyExperiment[]>([
    {
      experiment_id: "exp-101",
      name: "Sponsor Follow-up Reminder Timing (3 Days vs 5 Days)",
      variant_a: "Send follow-up draft after 3 days of unanswered reply",
      variant_b: "Send follow-up draft after 5 days of unanswered reply",
      metric_tracked: "Sponsor Deal Renewal Rate",
      winner: "Variant A (3 Days - 88% Conversion)",
      confidence_score: 0.94,
    },
    {
      experiment_id: "exp-102",
      name: "Mission Priority Wording (Urgency-Based vs Goal-Based)",
      variant_a: "Emphasize deadline urgency in mission title",
      variant_b: "Emphasize long-term creator goal alignment in title",
      metric_tracked: "Creator Mission Completion Rate",
      winner: "Variant B (Goal-Based - 92% Completion)",
      confidence_score: 0.96,
    },
  ]);

  const selectedReview = reviews.find((r) => r.decision_id === selectedReviewId);

  const handleRunEvaluation = () => {
    setIsRunningCycle(true);
    setTimeout(() => {
      const newRev: DecisionReview = {
        decision_id: `dec-${Math.floor(Math.random() * 900 + 100)}`,
        agent_id: "agent-evaluator",
        reasoning_chain:
          "Closed-loop evaluation cycle performed across 63 verified decision reviews.",
        supporting_evidence: "100% test coverage & zero error monorepo typecheck.",
        initial_confidence: 0.96,
        recalibrated_confidence: 0.97,
        expected_outcome:
          "Recalibrated AI confidence scores & updated agent performance leaderboard.",
        actual_outcome: "Evaluation cycle complete. Learning velocity increased by +4.2%.",
        outcome_rating: "SUCCESS",
        success_score: 0.96,
        lessons_learned:
          "Continuous closed-loop recalibration maintains zero-hallucination trust guarantee.",
        evaluated_at: new Date().toISOString(),
      };
      setReviews((prev) => [newRev, ...prev]);
      setIsRunningCycle(false);
    }, 1000);
  };

  const getRatingBadgeColor = (r: string) => {
    switch (r) {
      case "EXCEEDED_EXPECTATIONS":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "SUCCESS":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "PARTIAL_SUCCESS":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default:
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              <TrendingUp className="h-3 w-3" /> Closed-Loop Learning &amp; Evaluation Engine
            </span>
            <span className="font-mono text-xs italic text-neutral-400">
              &quot;Every recommendation is a hypothesis. Every outcome is learning.&quot;
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Self-Improvement &amp; Quality Engine
          </h1>
          <p className="mt-1 max-w-3xl text-xs text-neutral-400">
            Continuously evaluates decision accuracy, recalibrates AI confidence based on actual
            outcomes, conducts failure root-cause analysis, and runs strategy A/B tests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunEvaluation}
            disabled={isRunningCycle}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:from-emerald-500 hover:to-cyan-500 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRunningCycle ? "animate-spin" : ""}`} />
            {isRunningCycle ? "Evaluating Decision Outcomes..." : "Run Quality Evaluation Cycle"}
          </button>
        </div>
      </header>

      {/* Metrics Bar */}
      <section className="grid grid-cols-2 gap-4 font-sans text-xs md:grid-cols-4">
        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Recommendation Accuracy
          </span>
          <p className="font-mono text-xl font-bold text-emerald-400">91% Accuracy</p>
          <span className="font-mono text-[10px] text-neutral-400">+2.1% Over Last 30 Days</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Mission Completion Rate
          </span>
          <p className="font-mono text-xl font-bold text-cyan-400">92% Completed</p>
          <span className="font-mono text-[10px] text-neutral-400">High Creator Execution</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Prediction Accuracy
          </span>
          <p className="font-mono text-xl font-bold text-violet-400">91% Validated</p>
          <span className="font-mono text-[10px] text-neutral-400">Grounded in Memory</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Learning Velocity
          </span>
          <p className="font-mono text-xl font-bold text-amber-400">+4.2% Growth</p>
          <span className="font-mono text-[10px] text-neutral-400">
            Active Confidence Recalibration
          </span>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-neutral-850 flex items-center gap-2 border-b pb-2 font-sans text-xs">
        {(
          [
            { id: "OVERVIEW", label: "Evaluation Overview", count: reviews.length },
            { id: "AGENTS", label: "Agent Performance Leaderboard", count: agentMetrics.length },
            { id: "EXPERIMENTS", label: "Strategy A/B Experiments", count: experiments.length },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "OVERVIEW" | "AGENTS" | "EXPERIMENTS")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-medium transition ${
              activeTab === tab.id
                ? "border border-neutral-700 bg-neutral-800 font-semibold text-neutral-100 shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {tab.label}
            <span className="rounded-full border border-neutral-800 bg-neutral-950 px-2 py-0.5 font-mono text-[10px]">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Evaluation Overview & Decision Outcomes View */}
      {activeTab === "OVERVIEW" && (
        <div className="grid grid-cols-1 gap-6 font-sans lg:grid-cols-3">
          {/* Decision Outcome Reviews List */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Closed-Loop Decision Reviews
              &amp; Recalibrations
            </h3>

            {reviews.map((r) => (
              <article
                key={r.decision_id}
                onClick={() => setSelectedReviewId(r.decision_id)}
                className={`cursor-pointer space-y-3 rounded-2xl border bg-neutral-900 p-5 transition ${
                  selectedReviewId === r.decision_id
                    ? "border-emerald-500 shadow-xl ring-2 ring-emerald-500/30"
                    : "hover:border-neutral-750 border-neutral-800"
                }`}
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${getRatingBadgeColor(r.outcome_rating)}`}
                      >
                        {r.outcome_rating.replace("_", " ")}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-500">{r.agent_id}</span>
                    </div>
                    <h4 className="text-xs font-bold text-neutral-100">{r.reasoning_chain}</h4>
                  </div>

                  <div className="border-neutral-850 flex shrink-0 items-center gap-2 rounded-xl border bg-neutral-950 px-3 py-1.5 font-mono text-xs">
                    <span className="text-[10px] text-neutral-500">Confidence</span>
                    <span className="text-[10px] text-neutral-400 line-through">
                      {(r.initial_confidence * 100).toFixed(0)}%
                    </span>
                    <span className="font-bold text-emerald-400">
                      {(r.recalibrated_confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3 font-mono text-xs">
                  <span className="block text-[10px] uppercase text-neutral-500">
                    Actual Outcome Observed
                  </span>
                  <p className="font-sans text-[11px] text-neutral-300">{r.actual_outcome}</p>
                </div>

                <div className="border-neutral-850 flex items-center justify-between border-t pt-2 font-sans text-xs font-semibold text-emerald-400">
                  <span>Lesson: {r.lessons_learned}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Selected Review Inspector Sidebar */}
          <aside className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 font-sans text-xs">
            {selectedReview ? (
              <>
                <div className="space-y-1 border-b border-neutral-800 pb-3">
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${getRatingBadgeColor(selectedReview.outcome_rating)}`}
                  >
                    {selectedReview.outcome_rating.replace("_", " ")}
                  </span>
                  <h3 className="text-base font-bold text-neutral-100">
                    {selectedReview.agent_id}
                  </h3>
                  <span className="block font-mono text-[10px] text-neutral-500">
                    Score: {(selectedReview.success_score * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Reasoning Chain
                  </span>
                  <p className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5 text-[10px] leading-relaxed text-neutral-300">
                    {selectedReview.reasoning_chain}
                  </p>
                </div>

                {selectedReview.failure_reason && (
                  <div className="border-neutral-850 space-y-2 border-t pt-2">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      Failure Cause Analysis
                    </span>
                    <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2.5 font-mono text-[10px] leading-relaxed text-rose-300">
                      {selectedReview.failure_reason}
                    </p>
                  </div>
                )}

                <div className="border-neutral-850 space-y-2 border-t pt-2">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Lessons Learned
                  </span>
                  <p className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5 text-[10px] font-semibold text-emerald-300">
                    {selectedReview.lessons_learned}
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-2 py-12 text-center font-mono text-xs text-neutral-500">
                <CheckCircle2 className="mx-auto h-6 w-6 text-neutral-600" />
                <p>Select any decision review card to inspect outcome evidence.</p>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Agent Performance Leaderboard View */}
      {activeTab === "AGENTS" && (
        <div className="grid grid-cols-1 gap-6 font-sans md:grid-cols-2">
          {agentMetrics.map((ag) => (
            <div
              key={ag.agent_id}
              className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-emerald-400">
                    {ag.rating_trend} TREND
                  </span>
                  <h3 className="text-base font-bold text-neutral-100">{ag.agent_name}</h3>
                </div>
                <span className="border-neutral-850 rounded border bg-neutral-950 px-3 py-1 font-mono text-xs font-bold text-cyan-400">
                  {(ag.prediction_accuracy * 100).toFixed(0)}% Accuracy
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5">
                  <span className="block text-[9px] uppercase text-neutral-500">Total Recs</span>
                  <span className="font-bold text-neutral-200">{ag.total_recommendations}</span>
                </div>
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5">
                  <span className="block text-[9px] uppercase text-neutral-500">Acceptance</span>
                  <span className="font-bold text-emerald-400">
                    {(ag.acceptance_rate * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5">
                  <span className="block text-[9px] uppercase text-neutral-500">Confidence</span>
                  <span className="font-bold text-violet-400">
                    {(ag.average_confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Strategy A/B Experiments View */}
      {activeTab === "EXPERIMENTS" && (
        <div className="grid grid-cols-1 gap-6 font-sans md:grid-cols-2">
          {experiments.map((exp) => (
            <div
              key={exp.experiment_id}
              className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-sm font-bold text-neutral-100">{exp.name}</h3>
                <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
                  Winning Strategy
                </span>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5">
                  <span className="block text-[10px] text-neutral-500">Variant A:</span>
                  <span className="text-neutral-300">{exp.variant_a}</span>
                </div>
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5">
                  <span className="block text-[10px] text-neutral-500">Variant B:</span>
                  <span className="text-neutral-300">{exp.variant_b}</span>
                </div>
              </div>

              <div className="border-neutral-850 flex items-center justify-between border-t pt-2 font-sans text-xs">
                <span className="font-semibold text-emerald-400">{exp.winner}</span>
                <span className="font-mono text-[10px] text-neutral-500">
                  Confidence: {(exp.confidence_score * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
