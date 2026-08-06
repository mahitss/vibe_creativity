"use client";

import React, { useEffect, useState } from "react";
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
import { ExecutiveSyncOverlay } from "./executive-sync-overlay";
import { ExplainabilityDrawer } from "../../reasoning/components/explainability-drawer";

export function MissionControlCockpit() {
  const [showSyncOverlay, setShowSyncOverlay] = useState<boolean>(true);
  const [isCardRevealed, setIsCardRevealed] = useState<boolean>(false);
  const [showExplainability, setShowExplainability] = useState<boolean>(false);
  const [approvalStep, setApprovalStep] = useState<number>(-1);
  const [activeRepurposeStep, setActiveRepurposeStep] = useState<number>(0);

  const approvalSequence = [
    "Mission Accepted",
    "Workflow Started",
    "Repurposing Started",
    "Memory Updated",
    "Reflection Scheduled",
  ];

  const handleSyncComplete = () => {
    setShowSyncOverlay(false);
    // 800ms intentional pause before revealing Today's Mission card
    setTimeout(() => {
      setIsCardRevealed(true);
    }, 800);
  };

  const handleApprove = () => {
    // Play approval audio chime
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch {
      // Audio fallback
    }

    setApprovalStep(0);
    const interval = setInterval(() => {
      setApprovalStep((prev) => {
        if (prev >= approvalSequence.length - 1) {
          clearInterval(interval);
          return approvalSequence.length - 1;
        }
        return prev + 1;
      });
    }, 450);
  };

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
    <div className="relative min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      {/* 3-Second Executive Sync Overlay */}
      {showSyncOverlay && <ExecutiveSyncOverlay onComplete={handleSyncComplete} />}

      {/* Explainability Panel Drawer */}
      <ExplainabilityDrawer
        isOpen={showExplainability}
        onClose={() => setShowExplainability(false)}
        missionTitle="Create Docker Part 1"
      />

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
              Autonomous Operating System for Creators — Live Runtime, Grounded Memory, &amp;
              Executive Strategy
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => {
                setShowSyncOverlay(true);
                setIsCardRevealed(false);
                setApprovalStep(-1);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-300 transition hover:bg-slate-800"
            >
              <RefreshCw className="h-3.5 w-3.5 text-cyan-400" /> Replay Executive Sync
            </button>
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-cyan-400 backdrop-blur-md">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
              EXECUTIVE MIND: ACTIVE
            </div>
          </div>
        </div>

        {/* TOP HERO: EXECUTIVE BRIEF & GREETING */}
        <div className="space-y-6 rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-amber-400">
              <Sun className="h-4 w-4 text-amber-400" /> EXECUTIVE GREETING • WHILE YOU WERE AWAY
            </div>
            <span className="rounded-full border border-slate-700/50 bg-slate-800/60 px-3 py-1 font-mono text-[10px] text-slate-400">
              CREATOR ID: WS-101
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-slate-100">Good evening, Mahit.</h2>
            <p className="text-sm text-slate-400">
              While you were away, OMNIA continuously monitored your business and prepared
              today&apos;s directives.
            </p>
          </div>

          {/* Executive Greeting Checklist */}
          <div className="grid grid-cols-1 gap-3 pt-2 font-mono text-xs md:grid-cols-5">
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>327 new comments analyzed</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Memory updated with 19 new insights</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>1 sponsor opportunity detected</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>3 content ideas prepared</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Tomorrow&apos;s mission is ready</span>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT 2 COLUMNS: TODAY'S MISSION & REPURPOSING */}
          <div className="space-y-8 lg:col-span-2">
            {/* TODAY'S MISSION (ANIMATED 800ms PAUSE CARD) */}
            {isCardRevealed ? (
              <div className="animate-fade-in space-y-5 rounded-2xl border border-amber-500/50 bg-slate-900/80 p-6 shadow-2xl ring-1 ring-amber-500/20 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5">
                      <Zap className="h-6 w-6 animate-pulse text-amber-400" />
                    </div>
                    <div>
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                        TODAY&apos;S PRIORITY MISSION
                      </span>
                      <h3 className="mt-1 text-2xl font-extrabold text-slate-100">
                        Create Docker Part 1
                      </h3>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs text-slate-400">Confidence</span>
                    <p className="text-2xl font-extrabold text-emerald-400">94%</p>
                  </div>
                </div>

                {/* Reason & Evidence */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1.5 rounded-xl border border-slate-800 bg-slate-950 p-4 font-sans">
                    <span className="flex items-center gap-1 font-mono text-xs font-bold text-amber-400">
                      <HelpCircle className="h-3.5 w-3.5" /> REASON
                    </span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      127 community members requested Docker after your React Authentication video.
                    </p>
                  </div>

                  <div className="space-y-1.5 rounded-xl border border-slate-800 bg-slate-950 p-4 font-sans">
                    <span className="flex items-center gap-1 font-mono text-xs font-bold text-cyan-400">
                      <BarChart3 className="h-3.5 w-3.5" /> EVIDENCE &amp; EXPECTED IMPACT
                    </span>
                    <div className="space-y-1 font-mono text-xs text-slate-300">
                      <div>
                        Evidence:{" "}
                        <span className="font-bold text-cyan-300">Most requested topic</span>
                      </div>
                      <div>
                        Expected Impact: <span className="font-bold text-emerald-400">High</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Executive Moments Micro-Badges */}
                <div className="space-y-2 font-mono text-xs">
                  <span className="text-[11px] font-semibold uppercase text-slate-400">
                    EXECUTIVE MEMORY MOMENTS
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="rounded-lg border border-amber-500/30 bg-slate-950 px-3 py-1.5 text-amber-300">
                      &ldquo;I remembered your publishing schedule.&rdquo;
                    </span>
                    <span className="rounded-lg border border-cyan-500/30 bg-slate-950 px-3 py-1.5 text-cyan-300">
                      &ldquo;I noticed your audience changed.&rdquo;
                    </span>
                    <span className="rounded-lg border border-purple-500/30 bg-slate-950 px-3 py-1.5 text-purple-300">
                      &ldquo;I prepared this while you were offline.&rdquo;
                    </span>
                    <span className="rounded-lg border border-emerald-500/30 bg-slate-950 px-3 py-1.5 text-emerald-300">
                      &ldquo;I used your previous successful videos.&rdquo;
                    </span>
                  </div>
                </div>

                {/* Actions & Animation Sequence */}
                <div className="space-y-4 border-t border-slate-800 pt-4 font-mono text-xs">
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-2">
                      {approvalStep < 0 ? (
                        <>
                          <button
                            onClick={handleApprove}
                            className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-6 py-2.5 font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
                          >
                            <ThumbsUp className="h-4 w-4" /> Approve
                          </button>
                          <button className="flex items-center gap-1 rounded-xl bg-slate-800 px-4 py-2.5 text-slate-300 transition hover:bg-slate-700">
                            <Edit3 className="h-3.5 w-3.5" /> Modify
                          </button>
                        </>
                      ) : (
                        <span className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-6 py-2.5 font-bold text-emerald-300">
                          <CheckCircle2 className="h-4 w-4" /> MISSION ACCEPTED
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setShowExplainability(true)}
                      className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 font-bold text-amber-300 transition hover:bg-amber-500/20"
                    >
                      <Brain className="h-4 w-4 text-amber-400" /> View Why
                    </button>
                  </div>

                  {/* After Approval Animation Sequence */}
                  {approvalStep >= 0 && (
                    <div className="animate-fade-in space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        WORKFLOW AUTOMATION PIPELINE
                      </span>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
                        {approvalSequence.map((seqStep, sIdx) => {
                          const isDone = sIdx <= approvalStep;
                          return (
                            <div
                              key={seqStep}
                              className={`rounded-lg border p-2.5 text-center font-bold transition-all duration-300 ${
                                isDone
                                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                                  : "border-slate-800 bg-slate-900 text-slate-600"
                              }`}
                            >
                              <div className="mb-0.5 text-[10px] text-slate-500">
                                STEP {sIdx + 1}
                              </div>
                              <div>{seqStep}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Skeleton during 800ms pause */
              <div className="animate-pulse space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
                <div className="h-6 w-1/3 rounded-lg bg-slate-800" />
                <div className="h-12 w-full rounded-xl bg-slate-800" />
                <div className="h-20 w-full rounded-xl bg-slate-800" />
              </div>
            )}

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
            </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <div className="space-y-6">
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 font-mono text-xs backdrop-blur-xl">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-100">
                <Brain className="h-4 w-4 text-purple-400" /> Executive Memory Health
              </h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Grounded Memory Rows</span>
                  <span className="font-bold text-emerald-400">4,281</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Session Continuity</span>
                  <span className="font-bold text-cyan-400">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Autonomous Follow-ups</span>
                  <span className="font-bold text-amber-400">9 Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
