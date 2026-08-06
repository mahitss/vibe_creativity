"use client";

import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  HelpCircle,
  Layers,
  Mail,
  MessageSquare,
  Play,
  RefreshCw,
  Share2,
  ShieldCheck,
  Sparkles,
  Sun,
  ThumbsUp,
  Youtube,
  Zap,
} from "lucide-react";

export function GoldenCreatorJourney() {
  const [currentDay, setCurrentDay] = useState<number>(2);
  const [missionApproved, setMissionApproved] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"short" | "linkedin" | "x" | "email">("short");

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header & Simulator Stepper */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-amber-400" />
              <h1 className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                OMNIA — Golden Creator Journey (2-Minute Hackathon Demo)
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Memory → Continuity → Autonomous Follow-up → Content Repurposing → Evidence-backed
              reasoning
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 p-1 font-mono text-xs">
            <button
              onClick={() => {
                setCurrentDay(1);
                setMissionApproved(false);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 transition ${
                currentDay === 1
                  ? "bg-amber-500 font-bold text-slate-950"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Youtube className="h-4 w-4" /> Day 1: Connect YouTube
            </button>
            <button
              onClick={() => setCurrentDay(2)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 transition ${
                currentDay === 2
                  ? "bg-amber-500 font-bold text-slate-950"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sun className="h-4 w-4" /> Day 2: Autonomous Return
            </button>
          </div>
        </div>

        {/* DAY 1 VIEW */}
        {currentDay === 1 && (
          <div className="space-y-6">
            <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                    <Youtube className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-100">YouTube Account Connected</h2>
                    <p className="font-mono text-xs text-slate-400">
                      @mahit_ai • Mahit AI & Systems
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> MEMORY SYNCED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono md:grid-cols-4">
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <span className="text-xs text-slate-400">Subscribers</span>
                  <p className="text-xl font-bold text-slate-100">142,000</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <span className="text-xs text-slate-400">Videos Ingested</span>
                  <p className="text-xl font-bold text-slate-100">84 Videos</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <span className="text-xs text-slate-400">Comments Triaged</span>
                  <p className="text-xl font-bold text-slate-100">420 Comments</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <span className="text-xs text-slate-400">Memory Rows Created</span>
                  <p className="text-xl font-bold text-amber-400">3 Memory Rows</p>
                </div>
              </div>
            </div>

            {/* Day 1 Executive Brief */}
            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="flex items-center gap-2 font-mono text-sm font-bold text-amber-400">
                <Sun className="h-4 w-4" /> Initial Executive Brief (Day 1)
              </h3>
              <p className="text-base text-slate-200">Welcome to OMNIA, Mahit.</p>
              <p className="text-xs text-slate-400">
                Initial YouTube sync complete. 84 videos and 420 comments have been grounded into
                your persistent memory store. Return tomorrow to see OMNIA&apos;s overnight
                autonomous synthesis in action!
              </p>
              <button
                onClick={() => setCurrentDay(2)}
                className="mt-2 flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 font-mono text-xs font-bold text-slate-950 transition hover:bg-amber-400"
              >
                Fast-Forward to Day 2 Return <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* DAY 2 VIEW */}
        {currentDay === 2 && (
          <div className="space-y-8">
            {/* 1. EXECUTIVE BRIEF CARD */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
                  <Sun className="h-4 w-4" /> EXECUTIVE BRIEF • DAY 2 RETURN
                </div>
                <span className="rounded bg-slate-800 px-2.5 py-1 font-mono text-[10px] text-slate-400">
                  CONTINUITY ACTIVE: REMEMBERS YESTERDAY
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-100">Good morning, Mahit.</h2>

              <div className="grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-2">
                <div className="space-y-1 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
                  <span className="font-sans text-slate-400">Yesterday&apos;s Progress</span>
                  <p className="text-slate-200">
                    Ingested 84 videos, 420 comments, & stored CloudCorp Q4 sponsorship context.
                  </p>
                </div>

                <div className="space-y-1 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
                  <span className="font-sans text-amber-400">Community Trend</span>
                  <p className="text-slate-200">
                    14 repeated requests for Docker Multi-Agent System Deep Dive tutorial.
                  </p>
                </div>

                <div className="space-y-1 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
                  <span className="font-sans text-emerald-400">Sponsor Status</span>
                  <p className="text-slate-200">
                    CloudCorp Q4 $12,000 renewal agreement draft ready for review.
                  </p>
                </div>

                <div className="space-y-1 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
                  <span className="font-sans text-cyan-400">Today&apos;s Mission</span>
                  <p className="text-slate-200">
                    Publish Docker Multi-Agent System Tutorial & Repurpose Assets.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. EXACTLY ONE PRIORITY MISSION CARD */}
            <div className="space-y-5 rounded-2xl border border-amber-500/40 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5">
                    <Zap className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <span className="rounded border border-amber-500/30 bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                      TODAY&apos;S PRIORITY MISSION (EXACTLY 1)
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-slate-100">
                      Publish Docker Multi-Agent System Tutorial & Repurpose Assets
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-slate-400">Confidence Score</span>
                  <p className="font-mono text-xl font-extrabold text-emerald-400">96%</p>
                </div>
              </div>

              {/* Mission Reason ("Why now? Why this?") */}
              <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-4">
                <span className="flex items-center gap-1 font-mono text-xs font-bold text-amber-400">
                  <HelpCircle className="h-3.5 w-3.5" /> RATIONALE (WHY NOW? WHY THIS?)
                </span>
                <p className="text-xs text-slate-300">
                  14 audience comments specifically requested Docker container orchestration.
                  Historical analytics prove technical deep dive tutorials yield 2.4x higher watch
                  time and +18% subscriber conversion.
                </p>
              </div>

              {/* Supporting Memories */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold text-slate-400">
                  SUPPORTING MEMORY ROWS & EVIDENCE
                </span>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="rounded-lg border border-amber-500/30 bg-slate-950 px-3 py-1 text-amber-300">
                    mem-yt-comment-42 (14 Requests)
                  </span>
                  <span className="rounded-lg border border-cyan-500/30 bg-slate-950 px-3 py-1 text-cyan-300">
                    mem-yt-analytics-90d (+18% Retention)
                  </span>
                  <span className="rounded-lg border border-purple-500/30 bg-slate-950 px-3 py-1 text-purple-300">
                    mem-sponsor-contract-q4 ($12k Terms)
                  </span>
                </div>
              </div>

              {/* Expected Impact & Action Buttons */}
              <div className="flex flex-col justify-between gap-4 border-t border-slate-800 pt-2 md:flex-row md:items-center">
                <div className="font-mono text-xs text-slate-300">
                  <span className="text-slate-400">Expected Business Impact: </span>
                  <span className="font-bold text-emerald-400">
                    +1,800 Subscribers & $12,000 CloudCorp Sponsor Renewal
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  {missionApproved ? (
                    <span className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/20 px-5 py-2.5 font-bold text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" /> MISSION APPROVED & EXECUTED
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => setMissionApproved(true)}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-6 py-2.5 font-bold text-slate-950 transition hover:bg-emerald-400"
                      >
                        <ThumbsUp className="h-4 w-4" /> Approve Mission
                      </button>
                      <button className="rounded-lg bg-slate-800 px-4 py-2.5 text-slate-300 transition hover:bg-slate-700">
                        Dismiss
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 3. REPURPOSED CONTENT ASSETS PACKAGE */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-100">
                  <Share2 className="h-5 w-5 text-cyan-400" /> Repurposed Content Package (Generated
                  Automatically)
                </h3>
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-400">
                  4 ASSETS READY
                </span>
              </div>

              {/* Asset Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
                <button
                  onClick={() => setActiveTab("short")}
                  className={`rounded-lg px-4 py-2 transition ${
                    activeTab === "short"
                      ? "bg-cyan-500 font-bold text-slate-950"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  YouTube Short Script
                </button>
                <button
                  onClick={() => setActiveTab("linkedin")}
                  className={`rounded-lg px-4 py-2 transition ${
                    activeTab === "linkedin"
                      ? "bg-cyan-500 font-bold text-slate-950"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  LinkedIn Post
                </button>
                <button
                  onClick={() => setActiveTab("x")}
                  className={`rounded-lg px-4 py-2 transition ${
                    activeTab === "x"
                      ? "bg-cyan-500 font-bold text-slate-950"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  X Thread (3 Posts)
                </button>
                <button
                  onClick={() => setActiveTab("email")}
                  className={`rounded-lg px-4 py-2 transition ${
                    activeTab === "email"
                      ? "bg-cyan-500 font-bold text-slate-950"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sponsor Follow-up Email
                </button>
              </div>

              {/* Tab Content Box */}
              <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs text-slate-200">
                {activeTab === "short" && (
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    [HOOK 0:00-0:03] Stop deploying AI agents in single containers!{"\n"}
                    [BODY 0:03-0:45] Here is how we orchestrate 9 autonomous agents inside a single
                    Docker Compose stack with central Task Bus routing...{"\n"}
                    [CTA 0:45-0:60] Link in bio to get the full open-source repo.
                  </pre>
                )}
                {activeTab === "linkedin" && (
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    We just open-sourced our multi-agent container orchestration architecture.
                    {"\n\n"}
                    Key takeaways:{"\n"}
                    1. Decoupled Task Bus messaging{"\n"}
                    2. Memory grounding with zero hallucination{"\n"}
                    3. Multi-tenant Creator Isolation{"\n\n"}
                    Full breakdown & code in comments below! #AI #Docker #SystemArchitecture
                  </pre>
                )}
                {activeTab === "x" && (
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    1/ 🧵 Deploying autonomous AI agents isn&apos;t just about LLMs—it&apos;s about
                    robust system architecture.{"\n\n"}
                    2/ Today we&apos;re breaking down how OMNIA orchestrates 9 specialized agents in
                    Docker with zero memory duplication.{"\n\n"}
                    3/ Full code repository link below. What agent setup are you building?
                  </pre>
                )}
                {activeTab === "email" && (
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    Subject: CloudCorp Renewal & Q4 Multi-Agent Integration{"\n\n"}
                    Hi CloudCorp Team,{"\n\n"}
                    Our latest Docker Multi-Agent tutorial is launching this week, featuring
                    CloudCorp infrastructure. Attached are the updated Q4 renewal terms ($12,000)
                    for your review.{"\n\n"}
                    Best,{"\n"}Mahit
                  </pre>
                )}
              </div>
            </div>

            {/* 4. AUTONOMOUS ACTIVITY TIMELINE */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-100">
                <Activity className="h-5 w-5 text-purple-400" /> Autonomous Activity Log (Overnight
                Execution)
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <span className="font-bold text-purple-400">Memory updated</span>
                  <span className="text-slate-400">
                    • Analyzed 14 new overnight Discord & YouTube comments
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <span className="font-bold text-cyan-400">Reflection completed</span>
                  <span className="text-slate-400">
                    • Detected repeated audience demand: Docker Multi-Agent Deep Dive
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <span className="font-bold text-amber-400">Workflow executed</span>
                  <span className="text-slate-400">
                    • Executive Minds Agent generated Priority Mission #101
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <span className="font-bold text-emerald-400">Repurposing completed</span>
                  <span className="text-slate-400">
                    • Generated YouTube Short, LinkedIn Post, X Thread, and Sponsor Email
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <span className="font-bold text-indigo-400">Mission created</span>
                  <span className="text-slate-400">• Mission #101 ready for human approval</span>
                </div>
              </div>
            </div>

            {/* 5. EXPLAINABILITY CARD */}
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
                <Brain className="h-5 w-5 text-amber-400" /> Full Explainability Breakdown
              </h3>
              <div className="grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-2">
                <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-amber-400">Why now?</span>
                  <p className="text-slate-300">
                    14 audience comments specifically requested Docker orchestration, matching Q3
                    $25k revenue goal.
                  </p>
                </div>
                <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-cyan-400">Which memories?</span>
                  <p className="text-slate-300">
                    mem-yt-comment-42, mem-yt-analytics-90d, mem-sponsor-contract-q4
                  </p>
                </div>
                <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-emerald-400">Which analytics?</span>
                  <p className="text-slate-300">
                    Technical deep dives yield 2.4x higher watch time & +18% retention window.
                  </p>
                </div>
                <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-purple-400">Which goal?</span>
                  <p className="text-slate-300">
                    Goal #3: Scale Masterclass course to 1,000 VIP students & close CloudCorp
                    renewal ($12,000).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
