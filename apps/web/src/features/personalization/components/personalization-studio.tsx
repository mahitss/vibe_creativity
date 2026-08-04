"use client";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Cpu,
  Database,
  Filter,
  Flame,
  GitBranch,
  Globe,
  Handshake,
  Layers,
  Lightbulb,
  Lock,
  Pin,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Sliders,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

interface LearnedHabit {
  id: string;
  category: string;
  title: string;
  description: string;
  confidence: number;
  evidence_count: number;
  trend: "STRENGTHENING" | "STABLE" | "WEAKENING";
  status: "PROPOSED" | "ACCEPTED" | "REJECTED" | "PINNED" | "AUTO_APPLIED";
}

interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  variant_a: string;
  variant_b: string;
  winner: string | null;
  confidence: number;
  status: string;
}

export function PersonalizationStudio() {
  const [autoAdaptEnabled, setAutoAdaptEnabled] = useState<boolean>(true);
  const [habits, setHabits] = useState<LearnedHabit[]>([
    {
      id: "hbt-101",
      category: "WORK_HOURS",
      title: "Evening High-Productivity Work Window (17:00 - 21:00 UTC)",
      description: "84% of completed missions occur during evening hours.",
      confidence: 0.94,
      evidence_count: 42,
      trend: "STRENGTHENING",
      status: "AUTO_APPLIED",
    },
    {
      id: "hbt-102",
      category: "PUBLISHING_CADENCE",
      title: "Thursday Video Upload Routine",
      description:
        "Consistently publishes YouTube videos on Thursdays for optimal 72h view velocity.",
      confidence: 0.96,
      evidence_count: 18,
      trend: "STRENGTHENING",
      status: "PINNED",
    },
    {
      id: "hbt-103",
      category: "CONTENT_LENGTH",
      title: "22-26 Minute Technical Deep Dive Format",
      description: "Audience retention peaks (+18%) on videos between 22 and 26 minutes.",
      confidence: 0.91,
      evidence_count: 14,
      trend: "STABLE",
      status: "ACCEPTED",
    },
    {
      id: "hbt-104",
      category: "SPONSOR_RESPONSE",
      title: "Next-Day Sponsor Email Response Window",
      description:
        "Sponsor outreach emails responded to within 18 hours yield 92% deal conversion.",
      confidence: 0.89,
      evidence_count: 9,
      trend: "STABLE",
      status: "PROPOSED",
    },
    {
      id: "hbt-105",
      category: "COMMUNITY_ENGAGEMENT",
      title: "Friday Discord Q&A Digest",
      description:
        "Discord community engagement peaks on Friday afternoons following Thursday uploads.",
      confidence: 0.88,
      evidence_count: 12,
      trend: "STRENGTHENING",
      status: "AUTO_APPLIED",
    },
  ]);

  const [experiments] = useState<Experiment[]>([
    {
      id: "exp-101",
      name: "Notification Timing Strategy",
      hypothesis:
        "Evening notifications (18:00 UTC) result in +34% higher mission completion rate than morning.",
      variant_a: "Morning (09:00 UTC)",
      variant_b: "Evening (18:00 UTC)",
      winner: "Evening (18:00 UTC)",
      confidence: 0.95,
      status: "COMPLETED",
    },
    {
      id: "exp-102",
      name: "Mission Complexity Granularity",
      hypothesis: "Breaking missions into 3 micro-steps increases completion speed by 28%.",
      variant_a: "Single Monolithic Mission",
      variant_b: "3 Step-by-Step Sub-Missions",
      winner: null,
      confidence: 0.82,
      status: "RUNNING",
    },
  ]);

  const handleUpdateStatus = (id: string, newStatus: LearnedHabit["status"]) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, status: newStatus } : h)));
  };

  const handleResetModel = () => {
    setHabits((prev) => prev.map((h) => ({ ...h, status: "AUTO_APPLIED" })));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-400">
              <Sliders className="h-3 w-3" /> Adaptive Evolution Engine
            </span>
            <span className="font-mono text-xs italic text-neutral-400">
              &quot;Every interaction teaches OMNIA something.&quot;
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Personalization Studio
          </h1>
          <p className="mt-1 max-w-3xl text-xs text-neutral-400">
            Continuously learns your working hours, publishing cadence, editing preferences, and
            decision speed. OMNIA automatically adapts notifications, mission ordering, and
            recommendations to your unique creator routine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoAdaptEnabled(!autoAdaptEnabled)}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
              autoAdaptEnabled
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-neutral-800 bg-neutral-900 text-neutral-400"
            }`}
          >
            <UserCheck className="h-4 w-4" />
            Auto-Adaptation: {autoAdaptEnabled ? "ENABLED" : "DISABLED"}
          </button>
          <button
            onClick={handleResetModel}
            className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-300 transition hover:bg-neutral-800"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset Baseline
          </button>
        </div>
      </header>

      {/* Metrics Bar */}
      <section className="grid grid-cols-2 gap-4 font-sans text-xs md:grid-cols-4">
        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Habits Detected
          </span>
          <p className="font-mono text-xl font-bold text-violet-400">5 Habits</p>
          <span className="font-mono text-[10px] text-neutral-400">95 Average Evidence Points</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Adaptation Confidence
          </span>
          <p className="font-mono text-xl font-bold text-cyan-400">92% Average</p>
          <span className="font-mono text-[10px] text-neutral-400">High Statistical Validity</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Notification Timing
          </span>
          <p className="font-mono text-xl font-bold text-emerald-400">18:00 UTC</p>
          <span className="font-mono text-[10px] text-neutral-400">Evening Focus Window</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Productivity Boost
          </span>
          <p className="font-mono text-xl font-bold text-amber-400">+34% Speed</p>
          <span className="font-mono text-[10px] text-neutral-400">Compared to Default Layout</span>
        </div>
      </section>

      {/* Productivity Insights Grid */}
      <section className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 font-sans">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
          <Sparkles className="h-4 w-4 text-violet-400" />
          <h3 className="text-sm font-bold text-neutral-100">
            Creator Productivity &amp; Routine Insights
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-3">
          <div className="border-neutral-850 space-y-1.5 rounded-xl border bg-neutral-950 p-4">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
              Best Working Hours
            </span>
            <p className="text-sm font-bold text-violet-300">17:00 - 21:00 UTC (Peak Focus)</p>
            <p className="text-xs text-neutral-400">
              84% of completed tasks occur during this window.
            </p>
          </div>

          <div className="border-neutral-850 space-y-1.5 rounded-xl border bg-neutral-950 p-4">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
              Most Productive Day
            </span>
            <p className="text-sm font-bold text-emerald-300">Thursday (1.8x Output vs Mon)</p>
            <p className="text-xs text-neutral-400">Aligned with YouTube publishing cadence.</p>
          </div>

          <div className="border-neutral-850 space-y-1.5 rounded-xl border bg-neutral-950 p-4">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
              Most Effective Format
            </span>
            <p className="text-sm font-bold text-cyan-300">25-min Technical Deep Dives</p>
            <p className="text-xs text-neutral-400">Yields +18% higher subscriber retention.</p>
          </div>
        </div>
      </section>

      {/* Active Learned Habits List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-100">
            <Zap className="h-4 w-4 text-amber-400" /> Detected Habits &amp; Behaviors
          </h3>
          <span className="font-mono text-xs text-neutral-400">{habits.length} Habits Tracked</span>
        </div>

        <div className="space-y-3">
          {habits.map((h) => (
            <article
              key={h.id}
              className="hover:border-neutral-750 flex flex-col justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 font-sans text-xs transition md:flex-row md:items-center"
            >
              <div className="max-w-3xl space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                  <span className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-neutral-400">
                    Category: {h.category}
                  </span>
                  <span className="rounded border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-violet-300">
                    Confidence: {(h.confidence * 100).toFixed(0)}%
                  </span>
                  <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                    Evidence: {h.evidence_count} Events
                  </span>
                  <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-cyan-300">
                    Status: {h.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-neutral-100">{h.title}</h4>
                <p className="text-xs leading-relaxed text-neutral-400">{h.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex shrink-0 items-center gap-2">
                {h.status !== "ACCEPTED" && h.status !== "PINNED" && (
                  <button
                    onClick={() => handleUpdateStatus(h.id, "ACCEPTED")}
                    className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Accept
                  </button>
                )}
                {h.status !== "PINNED" && (
                  <button
                    onClick={() => handleUpdateStatus(h.id, "PINNED")}
                    className="flex items-center gap-1 rounded-lg border border-cyan-500/40 bg-cyan-600/20 px-3 py-1.5 font-mono text-[11px] font-semibold text-cyan-300 transition hover:bg-cyan-600/30"
                  >
                    <Pin className="h-3.5 w-3.5" /> Pin
                  </button>
                )}
                {h.status !== "REJECTED" && (
                  <button
                    onClick={() => handleUpdateStatus(h.id, "REJECTED")}
                    className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 font-medium text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-200"
                  >
                    Reject
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AI Workflow Experiments Section */}
      <section className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 font-sans text-xs">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-neutral-100">AI Workflow Experiment Engine</h3>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            Controlled Strategy Optimization
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className="border-neutral-850 space-y-2 rounded-xl border bg-neutral-950 p-4"
            >
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="font-bold text-cyan-300">{exp.name}</span>
                <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-neutral-400">
                  {exp.status}
                </span>
              </div>
              <p className="font-sans text-xs text-neutral-300">{exp.hypothesis}</p>
              <div className="border-neutral-850 space-y-1 border-t pt-2 font-mono text-[11px]">
                <span className="block text-neutral-500">Tested Variants:</span>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Variant A: {exp.variant_a}</span>
                  <span>Variant B: {exp.variant_b}</span>
                </div>
                {exp.winner && (
                  <span className="block pt-1 font-semibold text-emerald-400">
                    Winner Variant: {exp.winner} ({(exp.confidence * 100).toFixed(0)}% Confidence)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
