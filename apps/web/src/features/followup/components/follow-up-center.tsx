"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
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
  Play,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

interface FollowUp {
  id: string;
  title: string;
  description: string;
  reason: string;
  trigger: string;
  followup_type: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "SOMEDAY";
  state: "PENDING" | "SCHEDULED" | "DISMISSED" | "APPROVED" | "COMPLETED" | "CONVERTED_TO_MISSION";
  risk_level: "LOW" | "HIGH";
  confidence: number;
  deadline?: string;
  supporting_memories: string[];
  related_goals: string[];
  related_projects: string[];
  suggested_actions: string[];
  approval_status: string;
  outcome: string;
  score: number;
}

export function FollowUpCenter() {
  const [activeTab, setActiveTab] = useState<
    "URGENT" | "UPCOMING" | "COMPLETED" | "DISMISSED" | "ALL"
  >("URGENT");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [items, setItems] = useState<FollowUp[]>([
    {
      id: "flw-101",
      title: "Audience Promise: React Series Part 5 Overdue (8 Days)",
      description:
        "Promised 'React Part 5 next week' in video #4 pinned comment. 8 days have elapsed with no upload.",
      reason:
        "Audience retention risk: 142 subscribers asked for Part 5 update across Discord & YouTube comments.",
      trigger: "UNFULFILLED_AUDIENCE_PROMISE",
      followup_type: "AUDIENCE_PROMISE_REMINDER",
      priority: "CRITICAL",
      state: "SCHEDULED",
      risk_level: "LOW",
      confidence: 0.96,
      deadline: "2026-08-05T18:00:00Z",
      supporting_memories: ["mem-promise-react5", "mem-community-react-requests"],
      related_goals: ["goal-audience-retention", "goal-publishing-schedule"],
      related_projects: ["proj-react-series"],
      suggested_actions: ["Draft script for React Part 5", "Post community status update"],
      approval_status: "AUTO_EXECUTED_DRAFT",
      outcome: "Prepared draft mission & notified creator in Mission Control.",
      score: 0.95,
    },
    {
      id: "flw-102",
      title: "Sponsor Request: CloudCorp Media Kit Response Pending (3 Days)",
      description:
        "CloudCorp requested updated Q3/Q4 audience demographics and view benchmarks 3 days ago.",
      reason:
        "Revenue opportunity at risk: $15,000 sponsorship renewal depends on media kit submission.",
      trigger: "SPONSOR_UNANSWERED_REQUEST",
      followup_type: "SPONSOR_REMINDER",
      priority: "HIGH",
      state: "PENDING",
      risk_level: "HIGH",
      confidence: 0.94,
      deadline: "2026-08-05T12:00:00Z",
      supporting_memories: ["mem-cloudcorp-deal", "mem-sponsor-email-sync"],
      related_goals: ["goal-q3-revenue"],
      related_projects: ["proj-sponsor-q4"],
      suggested_actions: ["Approve media kit PDF release", "Send email to CloudCorp sponsor lead"],
      approval_status: "REQUIRES_CREATOR_APPROVAL",
      outcome: "Draft response prepared; awaiting creator authorization to send email.",
      score: 0.92,
    },
    {
      id: "flw-103",
      title: "Community Signal: Docker Tutorial Request Cluster",
      description:
        "42 Discord users & 18 YouTube comments requested a step-by-step Docker multi-agent deployment guide.",
      reason:
        "High audience demand cluster detected with high engagement probability (+18% expected retention).",
      trigger: "COMMUNITY_REQUEST_CLUSTER",
      followup_type: "COMMUNITY_FOLLOW_UP",
      priority: "HIGH",
      state: "SCHEDULED",
      risk_level: "LOW",
      confidence: 0.91,
      deadline: "2026-08-07T00:00:00Z",
      supporting_memories: ["mem-101", "mem-104"],
      related_goals: ["goal-audience-growth"],
      related_projects: ["proj-docker-course"],
      suggested_actions: ["Generate video outline", "Create GitHub starter repo draft"],
      approval_status: "AUTO_EXECUTED_DRAFT",
      outcome: "Content mission created in draft state.",
      score: 0.88,
    },
    {
      id: "flw-104",
      title: "Analytics Warning: 3 Consecutive Video Retention Drops",
      description:
        "Average 30-second retention dropped from 68% to 51% across the last 3 published videos.",
      reason:
        "Content quality alert: Early drop-off coincides with long introductory sponsorship reads.",
      trigger: "ANALYTICS_RETENTION_DROP",
      followup_type: "ANALYTICS_INVESTIGATION",
      priority: "MEDIUM",
      state: "PENDING",
      risk_level: "LOW",
      confidence: 0.89,
      deadline: "2026-08-09T00:00:00Z",
      supporting_memories: ["mem-analytics-retention"],
      related_goals: ["goal-audience-retention"],
      related_projects: ["proj-content-audit"],
      suggested_actions: ["Run pacing audit", "Move sponsor placement to minute 3:00"],
      approval_status: "AUTO_EXECUTED_REPORT",
      outcome: "Investigation report generated with pacing breakdown.",
      score: 0.79,
    },
  ]);

  const filteredItems = items.filter((item) => {
    if (activeTab === "URGENT") return item.priority === "CRITICAL" || item.priority === "HIGH";
    if (activeTab === "UPCOMING") return item.priority === "MEDIUM" || item.priority === "LOW";
    if (activeTab === "COMPLETED")
      return (
        item.state === "APPROVED" ||
        item.state === "COMPLETED" ||
        item.state === "CONVERTED_TO_MISSION"
      );
    if (activeTab === "DISMISSED") return item.state === "DISMISSED";
    return true;
  });

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => setIsEvaluating(false), 450);
  };

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              state: "APPROVED",
              approval_status: "APPROVED_BY_CREATOR",
              outcome: "Executed & dispatched.",
            }
          : i,
      ),
    );
  };

  const handleConvertToMission = (id: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              state: "CONVERTED_TO_MISSION",
              approval_status: "MISSION_CREATED",
              outcome: "Converted into Mission Control task.",
            }
          : i,
      ),
    );
  };

  const handleDismiss = (id: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              state: "DISMISSED",
              approval_status: "DISMISSED",
              outcome: "Dismissed by creator.",
            }
          : i,
      ),
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-rose-400">
              <Bell className="h-3 w-3 animate-pulse" /> Autonomous Follow-up Engine
            </span>
            <span className="font-mono text-xs italic text-neutral-400">
              &quot;Creators forget. OMNIA doesn&apos;t.&quot;
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Follow-up Center
          </h1>
          <p className="mt-1 max-w-3xl text-xs text-neutral-400">
            Proactively monitors creator memory, community promises, sponsor requests, and
            deadlines. Automatically prepares drafts and queues action recommendations so nothing
            slips through the cracks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunEvaluation}
            disabled={isEvaluating}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:from-rose-500 hover:to-amber-500"
          >
            {isEvaluating ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            Run Evaluation Loop
          </button>
        </div>
      </header>

      {/* Statistics Metric Bar */}
      <section className="grid grid-cols-2 gap-4 font-sans text-xs md:grid-cols-4">
        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Urgent Follow-ups
          </span>
          <p className="flex items-center gap-2 text-xl font-bold text-rose-400">
            2 Items <AlertTriangle className="h-4 w-4 text-rose-400" />
          </p>
          <span className="font-mono text-[10px] text-neutral-400">
            1 Overdue Promise | 1 Sponsor Pending
          </span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Auto-Executed Drafts
          </span>
          <p className="flex items-center gap-2 text-xl font-bold text-emerald-400">
            2 Drafted <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </p>
          <span className="font-mono text-[10px] text-neutral-400">Low-Risk Actions Executed</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Revenue / Audience at Risk
          </span>
          <p className="font-mono text-xl font-bold text-amber-400">$15,000 / 142 Subs</p>
          <span className="font-mono text-[10px] text-neutral-400">
            CloudCorp Renewal + React Series
          </span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Memory Grounding Rate
          </span>
          <p className="font-mono text-xl font-bold text-cyan-400">100% Provenance</p>
          <span className="font-mono text-[10px] text-neutral-400">
            Every item linked to memory ID
          </span>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-neutral-850 flex items-center gap-2 border-b pb-2 font-sans text-xs">
        {(
          [
            {
              id: "URGENT",
              label: "Urgent Attention",
              count: items.filter((i) => i.priority === "CRITICAL" || i.priority === "HIGH").length,
            },
            {
              id: "UPCOMING",
              label: "Upcoming & Medium",
              count: items.filter((i) => i.priority === "MEDIUM" || i.priority === "LOW").length,
            },
            {
              id: "COMPLETED",
              label: "Completed & Approved",
              count: items.filter(
                (i) => i.state === "APPROVED" || i.state === "CONVERTED_TO_MISSION",
              ).length,
            },
            {
              id: "DISMISSED",
              label: "Dismissed",
              count: items.filter((i) => i.state === "DISMISSED").length,
            },
            { id: "ALL", label: "All Follow-ups", count: items.length },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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

      {/* Follow-up Cards List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className={`space-y-4 rounded-2xl border bg-neutral-900 p-5 transition ${
              item.priority === "CRITICAL"
                ? "border-rose-500/40 shadow-rose-950/20"
                : item.priority === "HIGH"
                  ? "border-amber-500/40 shadow-amber-950/20"
                  : "border-neutral-800"
            }`}
          >
            {/* Card Top Row */}
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                      item.priority === "CRITICAL"
                        ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                        : item.priority === "HIGH"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          : "border-neutral-700 bg-neutral-800 text-neutral-300"
                    }`}
                  >
                    {item.priority} PRIORITY
                  </span>

                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                      item.risk_level === "HIGH"
                        ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    }`}
                  >
                    {item.risk_level === "HIGH"
                      ? "Requires Creator Approval"
                      : "Auto-Executed Draft"}
                  </span>

                  <span className="border-neutral-850 rounded border bg-neutral-950 px-2 py-0.5 font-mono text-[10px] text-neutral-500">
                    State: {item.state}
                  </span>
                </div>

                <h2 className="flex items-center gap-2 text-base font-bold text-neutral-100">
                  {item.title}
                </h2>
              </div>

              <div className="border-neutral-850 flex shrink-0 items-center gap-2 rounded-xl border bg-neutral-950 px-3 py-1.5 font-mono text-xs">
                <span className="text-[10px] text-neutral-500">Score</span>
                <span className="font-bold text-amber-400">{(item.score * 100).toFixed(0)}</span>
              </div>
            </div>

            {/* Description */}
            <p className="border-neutral-850 rounded-xl border bg-neutral-950 p-3.5 font-sans text-xs leading-relaxed text-neutral-300">
              {item.description}
            </p>

            {/* "Why Now? / Why This?" Transparency Block */}
            <div className="border-neutral-850 space-y-2 rounded-xl border bg-gradient-to-r from-neutral-950 to-neutral-900 p-3.5 font-sans text-xs">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-cyan-400">
                <Sparkles className="h-3.5 w-3.5" /> Why Now? / Why This?
              </div>
              <p className="text-xs leading-relaxed text-neutral-300">{item.reason}</p>

              {/* Supporting Memories & Goal Citations */}
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px]">
                <span className="text-neutral-500">Grounded Memories:</span>
                {item.supporting_memories.map((m, mIdx) => (
                  <span
                    key={mIdx}
                    className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-cyan-300"
                  >
                    {m}
                  </span>
                ))}
                <span className="ml-2 text-neutral-500">Related Goals:</span>
                {item.related_goals.map((g, gIdx) => (
                  <span
                    key={gIdx}
                    className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Actions */}
            <div className="space-y-1.5 font-sans text-xs">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Suggested Actions
              </span>
              <div className="flex flex-wrap gap-2">
                {item.suggested_actions.map((act, aIdx) => (
                  <span
                    key={aIdx}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-neutral-300"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {act}
                  </span>
                ))}
              </div>
            </div>

            {/* Outcome & Action Bar */}
            <div className="border-neutral-850 flex flex-col justify-between gap-3 border-t pt-2 font-sans text-xs sm:flex-row sm:items-center">
              <span className="font-mono text-[11px] italic text-neutral-400">
                Status: {item.outcome || item.approval_status}
              </span>

              <div className="flex items-center gap-2">
                {item.state !== "APPROVED" &&
                  item.state !== "CONVERTED_TO_MISSION" &&
                  item.state !== "DISMISSED" && (
                    <>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approve &amp; Execute
                      </button>
                      <button
                        onClick={() => handleConvertToMission(item.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-600/20 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-600/30"
                      >
                        <Target className="h-3.5 w-3.5" /> Convert to Mission
                      </button>
                      <button
                        onClick={() => handleDismiss(item.id)}
                        className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-medium text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-200"
                      >
                        Dismiss
                      </button>
                    </>
                  )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
