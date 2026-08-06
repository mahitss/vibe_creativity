"use client";

import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  DollarSign,
  Edit3,
  Eye,
  FileText,
  Globe,
  HardDrive,
  Heart,
  HelpCircle,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Play,
  RefreshCw,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Sun,
  ThumbsUp,
  Users,
  Volume2,
  Zap,
} from "lucide-react";

export function MissionControlCockpit() {
  const [missionApproved, setMissionApproved] = useState<boolean>(false);
  const [activeRepurposeStep, setActiveRepurposeStep] = useState<number>(0);

  const repurposeSteps = [
    {
      name: "Original Video",
      status: "Published",
      quality: "4K Master",
      detail: "Docker Multi-Agent Deep Dive (24m 12s)",
    },
    {
      name: "YouTube Short",
      status: "Ready",
      quality: "98.4%",
      detail: "3-minute hook script & vertical crop",
    },
    {
      name: "LinkedIn Post",
      status: "Ready",
      quality: "99.1%",
      detail: "Key architectural takeaways & GitHub link",
    },
    { name: "X Thread", status: "Ready", quality: "97.8%", detail: "3-post technical breakdown" },
    {
      name: "Newsletter",
      status: "Drafted",
      quality: "96.5%",
      detail: "Weekly VIP developer roundup #42",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Command Center Top Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Cpu className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
                OMNIA Mission Control Command Center
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Autonomous Operating System for Creators — Live Runtime, Grounded Memory, & Executive
              Strategy
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-cyan-400 backdrop-blur-md">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
              EXECUTIVE MIND: ACTIVE
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-emerald-400 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              GROUNDING: 100%
            </div>
          </div>
        </div>

        {/* TOP HERO: EXECUTIVE BRIEF */}
        <div className="space-y-6 rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-amber-400">
              <Sun className="h-4 w-4 text-amber-400" /> EXECUTIVE BRIEF • DAILY SYNTHESIS
            </div>
            <span className="rounded-full border border-slate-700/50 bg-slate-800/60 px-3 py-1 font-mono text-[10px] text-slate-400">
              CREATOR ID: WS-101
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-slate-100">Good Morning, Mahit.</h2>
            <p className="text-sm text-slate-400">
              Here is your 5-second business status and daily strategic update.
            </p>
          </div>

          {/* Yesterday vs Today Summary Cards */}
          <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
            {/* Yesterday Column */}
            <div className="space-y-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-400">
                <Clock className="h-3.5 w-3.5 text-cyan-400" /> YESTERDAY&apos;S COMPLETED PROGRESS
              </span>
              <div className="space-y-2 font-mono text-xs text-slate-200">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Video Published (&quot;Docker Multi-Agent
                  Deep Dive&quot;)
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Community Scanned (420 comments & Discord
                  triaged)
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Reflection Completed (+18% watch time window
                  detected)
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Memory Updated (3 persistent memory rows
                  stored)
                </div>
              </div>
            </div>

            {/* Today Column */}
            <div className="space-y-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-400">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" /> TODAY&apos;S EXECUTIVE DIRECTIVE
              </span>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-400">Executive Summary:</span>
                  <span>
                    14 repeated audience requests identify a high-value Docker tutorial opportunity.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-cyan-400">Priority Mission:</span>
                  <span>Publish Docker Multi-Agent System Tutorial & Repurpose Assets.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-purple-400">Next Recommendation:</span>
                  <span>Send CloudCorp $12,000 Q4 sponsorship renewal proposal today.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID (Content on Left, Intelligence & Sidebar on Right) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT 2 COLUMNS: TODAY'S MISSION, REPURPOSING, TIMELINE, COMMUNITY, SPONSORS */}
          <div className="space-y-8 lg:col-span-2">
            {/* TODAY'S MISSION (LARGE CARD) */}
            <div className="space-y-5 rounded-2xl border border-amber-500/40 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5">
                    <Zap className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                      TODAY&apos;S PRIORITY MISSION
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-slate-100">
                      Publish Docker Multi-Agent System Tutorial & Repurpose Content
                    </h3>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs text-slate-400">Confidence</span>
                  <p className="text-xl font-extrabold text-emerald-400">96%</p>
                </div>
              </div>

              {/* Reason */}
              <div className="space-y-1.5 rounded-xl border border-slate-800 bg-slate-950 p-4 font-sans">
                <span className="flex items-center gap-1 font-mono text-xs font-bold text-amber-400">
                  <HelpCircle className="h-3.5 w-3.5" /> WHY NOW? WHY THIS?
                </span>
                <p className="text-xs leading-relaxed text-slate-300">
                  14 audience comments requested containerized multi-agent setups. Technical deep
                  dive tutorials yield 2.4x higher watch time and +18% subscriber conversion,
                  directly supporting your Q3 $25k revenue milestone.
                </p>
              </div>

              {/* Supporting Evidence Tags */}
              <div className="space-y-2 font-mono text-xs">
                <span className="text-[11px] font-semibold uppercase text-slate-400">
                  SUPPORTING EVIDENCE (MEMORY ROWS & COMMENTS)
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-amber-500/30 bg-slate-950 px-3 py-1 text-amber-300">
                    mem-yt-comment-42 (14 Requests)
                  </span>
                  <span className="rounded-lg border border-cyan-500/30 bg-slate-950 px-3 py-1 text-cyan-300">
                    mem-yt-analytics-90d (+18% Retention)
                  </span>
                  <span className="rounded-lg border border-purple-500/30 bg-slate-950 px-3 py-1 text-purple-300">
                    mem-sponsor-contract-q4 ($12k Renewal)
                  </span>
                </div>
              </div>

              {/* Impact & Actions */}
              <div className="flex flex-col justify-between gap-4 border-t border-slate-800 pt-3 font-mono text-xs md:flex-row md:items-center">
                <div>
                  <span className="text-slate-400">Expected Impact: </span>
                  <span className="font-bold text-emerald-400">
                    +1,800 Subscribers & $12,000 Sponsor Renewal
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {missionApproved ? (
                    <span className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/20 px-5 py-2.5 font-bold text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" /> APPROVED & EXECUTED
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => setMissionApproved(true)}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-5 py-2 font-bold text-slate-950 transition hover:bg-emerald-400"
                      >
                        <ThumbsUp className="h-4 w-4" /> Approve
                      </button>
                      <button className="flex items-center gap-1 rounded-lg bg-slate-800 px-4 py-2 text-slate-300 transition hover:bg-slate-700">
                        <Edit3 className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button className="rounded-lg bg-slate-900 px-3 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200">
                        Dismiss
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* CONTENT REPURPOSING PIPELINE */}
            <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
                  <Share2 className="h-5 w-5 text-cyan-400" /> Content Repurposing Pipeline
                </h3>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
                  4 ASSETS READY TO PUBLISH
                </span>
              </div>

              {/* Visual Pipeline Flow */}
              <div className="grid grid-cols-1 gap-3 font-mono text-xs md:grid-cols-5">
                {repurposeSteps.map((step, idx) => (
                  <button
                    key={step.name}
                    onClick={() => setActiveRepurposeStep(idx)}
                    className={`flex flex-col justify-between space-y-2 rounded-xl border p-3.5 text-left transition ${
                      idx === activeRepurposeStep
                        ? "border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-lg shadow-cyan-500/10"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">STEP {idx + 1}</span>
                      <span className="text-[10px] font-bold text-emerald-400">{step.status}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-100">{step.name}</span>
                    <span className="text-[10px] text-slate-400">Quality: {step.quality}</span>
                  </button>
                ))}
              </div>

              {/* Active Step Preview */}
              <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>
                    Selected Asset: {repurposeSteps[activeRepurposeStep]?.name ?? "Original Video"}
                  </span>
                  <span className="font-bold text-emerald-400">
                    Status: {repurposeSteps[activeRepurposeStep]?.status ?? "Ready"}
                  </span>
                </div>
                <p className="font-sans text-sm text-slate-200">
                  {repurposeSteps[activeRepurposeStep]?.detail ?? ""}
                </p>
              </div>
            </div>

            {/* AUTONOMOUS ACTIVITY TIMELINE */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
                <Activity className="h-5 w-5 text-purple-400" /> Autonomous Activity Timeline
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="w-36 font-bold text-purple-400">Memory Updated</span>
                  <span className="text-slate-300">
                    Ingested 420 comments & 90-day retention analytics
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="w-36 font-bold text-cyan-400">Workflow Finished</span>
                  <span className="text-slate-300">
                    Executive Mind Agent routed 9 specialized tasks
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="w-36 font-bold text-emerald-400">Content Repurposed</span>
                  <span className="text-slate-300">
                    Generated YouTube Short, LinkedIn Post, X Thread, & Email
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="w-36 font-bold text-amber-400">Community Trend</span>
                  <span className="text-slate-300">
                    14 repeated audience requests for Docker Multi-Agent setup
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="w-36 font-bold text-indigo-400">Reflection Complete</span>
                  <span className="text-slate-300">
                    Verified zero hallucination & grounded memory citations
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="w-36 font-bold text-rose-400">Sponsor Reminder</span>
                  <span className="text-slate-300">
                    Generated CloudCorp Q4 renewal follow-up draft ($12,000)
                  </span>
                </div>
              </div>
            </div>

            {/* COMMUNITY & SPONSOR INTELLIGENCE (2 CARDS GRID) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Community Intelligence */}
              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
                  <Users className="h-5 w-5 text-cyan-400" /> Community Intelligence
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">Sentiment Score</span>
                    <span className="font-bold text-emerald-400">94% Positive</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">Top Supporter</span>
                    <span className="font-bold text-cyan-300">@dev_alex (42 posts)</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">Community Health</span>
                    <span className="font-bold text-emerald-400">98 / 100 EXCELLENT</span>
                  </div>
                </div>
              </div>

              {/* Sponsor Intelligence */}
              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
                  <DollarSign className="h-5 w-5 text-emerald-400" /> Sponsor Intelligence
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">Q3 Revenue Goal</span>
                    <span className="font-bold text-emerald-400">$18,500 / $25,000 (74%)</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">Pending Deal</span>
                    <span className="font-bold text-amber-400">CloudCorp Q4 ($12,000)</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">Contract Deadline</span>
                    <span className="text-slate-200">Aug 15, 2026 (14 Days)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: EXECUTIVE MIND STATUS, MEMORY HEALTH, CONNECTED PLATFORMS, WORKFLOWS */}
          <div className="space-y-6">
            {/* Executive Mind Status */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <h3 className="flex items-center gap-2 font-mono text-sm font-bold text-slate-100">
                <Brain className="h-4 w-4 text-purple-400" /> Executive Mind Status
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                  <span className="text-[10px] text-slate-400">Operating Mode</span>
                  <p className="font-bold text-purple-400">Autonomous Strategic Coordinator</p>
                </div>
                <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                  <span className="text-[10px] text-slate-400">Active Agents Managed</span>
                  <p className="font-bold text-slate-100">9 Specialized Agents</p>
                </div>
              </div>
            </div>

            {/* Memory Health */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <h3 className="flex items-center gap-2 font-mono text-sm font-bold text-slate-100">
                <HardDrive className="h-4 w-4 text-cyan-400" /> Memory Health & Grounding
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-400">Grounding Score</span>
                  <span className="font-bold text-emerald-400">100% CITED</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-400">Hallucination Index</span>
                  <span className="font-bold text-emerald-400">0.0% ZERO</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-400">Memory Rows</span>
                  <span className="font-bold text-amber-400">1,420 Active</span>
                </div>
              </div>
            </div>

            {/* Connected Platforms */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <h3 className="flex items-center gap-2 font-mono text-sm font-bold text-slate-100">
                <Globe className="h-4 w-4 text-emerald-400" /> Connected Creator Platforms
              </h3>
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-200">YouTube Channel</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> CONNECTED
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-200">Discord Developer Guild</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-200">X / Twitter</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-200">LinkedIn Business Page</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Running Workflows */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <h3 className="flex items-center gap-2 font-mono text-sm font-bold text-slate-100">
                <Layers className="h-4 w-4 text-amber-400" /> Running Background Workflows
              </h3>
              <div className="space-y-2.5 font-mono text-xs">
                <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <div className="flex justify-between text-slate-200">
                    <span>Comment Triage Worker</span>
                    <span className="font-bold text-emerald-400">RUNNING</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[85%] bg-emerald-400" />
                  </div>
                </div>

                <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <div className="flex justify-between text-slate-200">
                    <span>Sponsor Contract Monitor</span>
                    <span className="font-bold text-cyan-400">IDLE</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[100%] bg-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER: RUNTIME STATUS */}
        <div className="flex flex-col items-center justify-between gap-2 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 font-mono text-xs text-slate-400 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            OMNIA Autonomous OS v1.0 • Task Bus Latency: 2ms • Memory Grounding: 100%
          </div>
          <div>Tenant Isolation: Creator X-Creator-Id (ws-101)</div>
        </div>
      </div>
    </div>
  );
}
