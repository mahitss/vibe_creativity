"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Brain,
  CheckCircle2,
  Cpu,
  Edit3,
  HelpCircle,
  RefreshCw,
  Share2,
  ShieldCheck,
  Sun,
  ThumbsUp,
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
    "MISSION ACCEPTED",
    "WORKFLOW STARTED",
    "REPURPOSING STARTED",
    "MEMORY UPDATED",
    "REFLECTION SCHEDULED",
  ];

  const handleSyncComplete = () => {
    setShowSyncOverlay(false);
    setTimeout(() => {
      setIsCardRevealed(true);
    }, 800);
  };

  const handleApprove = () => {
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
    <div className="relative min-h-screen bg-[#000000] p-8 font-sans text-white selection:bg-[#1c69d4] selection:text-white">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      {/* 3-Second Executive Sync Overlay */}
      {showSyncOverlay && <ExecutiveSyncOverlay onComplete={handleSyncComplete} />}

      {/* Explainability Panel Drawer */}
      <ExplainabilityDrawer
        isOpen={showExplainability}
        onClose={() => setShowExplainability(false)}
        missionTitle="Create Docker Part 1"
      />

      <div className="mx-auto max-w-7xl space-y-8 pt-4">
        {/* Command Center Top Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-3xl font-extrabold uppercase tracking-wider text-white">
                {"///"} OMNIA MISSION CONTROL COMMAND CENTER
              </h1>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[#bbbbbb]">
              AUTONOMOUS CREATOR OPERATING SYSTEM • MOTORSPORT ENGINEERING RUNTIME &amp; MEMORY CORE
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => {
                setShowSyncOverlay(true);
                setIsCardRevealed(false);
                setApprovalStep(-1);
              }}
              className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-4 py-2 font-bold uppercase tracking-wider text-white transition hover:border-white"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#1c69d4]" /> REPLAY M SYNC
            </button>
            <div className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-4 py-2 font-bold uppercase tracking-widest text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#0066b1]" />
              {"///"} M EXECUTIVE MIND: ACTIVE
            </div>
          </div>
        </div>

        {/* TOP HERO: EXECUTIVE BRIEF & GREETING */}
        <div className="relative space-y-6 rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white">
              <Sun className="h-4 w-4 text-[#1c69d4]" /> {"///"} EXECUTIVE GREETING • WHILE YOU WERE
              AWAY
            </div>
            <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#bbbbbb]">
              CREATOR ID: WS-101
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="font-sans text-3xl font-extrabold uppercase tracking-wider text-white">
              GOOD EVENING, MAHIT.
            </h2>
            <p className="font-mono text-xs uppercase tracking-wide text-[#bbbbbb]">
              WHILE YOU WERE AWAY, OMNIA CONTINUOUSLY MONITORED YOUR BUSINESS &amp; PREPARED
              TODAY&apos;S DIRECTIVES.
            </p>
          </div>

          {/* Executive Greeting Checklist */}
          <div className="grid grid-cols-1 gap-3 pt-2 font-mono text-xs md:grid-cols-5">
            <div className="flex items-center gap-3 border border-[#3c3c3c] bg-[#0d0d0d] p-4 font-bold uppercase tracking-wider text-white">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066b1]" />
              <span>327 NEW COMMENTS ANALYZED</span>
            </div>
            <div className="flex items-center gap-3 border border-[#3c3c3c] bg-[#0d0d0d] p-4 font-bold uppercase tracking-wider text-white">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066b1]" />
              <span>19 MEMORY INSIGHTS STORED</span>
            </div>
            <div className="flex items-center gap-3 border border-[#3c3c3c] bg-[#0d0d0d] p-4 font-bold uppercase tracking-wider text-white">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1c69d4]" />
              <span>1 SPONSOR DEAL DETECTED</span>
            </div>
            <div className="flex items-center gap-3 border border-[#3c3c3c] bg-[#0d0d0d] p-4 font-bold uppercase tracking-wider text-white">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1c69d4]" />
              <span>3 IDEAS PREPARED</span>
            </div>
            <div className="flex items-center gap-3 border border-[#3c3c3c] bg-[#0d0d0d] p-4 font-bold uppercase tracking-wider text-white">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#e22718]" />
              <span>MISSION READY</span>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT 2 COLUMNS: TODAY'S MISSION & REPURPOSING */}
          <div className="space-y-8 lg:col-span-2">
            {/* TODAY'S MISSION (ANIMATED CARD) */}
            {isCardRevealed ? (
              <div className="animate-fade-in relative space-y-6 rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="bmw-m-tricolor-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div>
                      <span className="border border-[#0066b1]/40 bg-[#0066b1]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                        {"///"} TODAY&apos;S PRIORITY MISSION
                      </span>
                      <h3 className="mt-2 font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
                        CREATE DOCKER PART 1
                      </h3>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-[10px] uppercase tracking-widest text-[#bbbbbb]">
                      CONFIDENCE SCORE
                    </span>
                    <p className="text-3xl font-extrabold tracking-wider text-white">94%</p>
                  </div>
                </div>

                {/* Reason & Evidence */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-5">
                    <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white">
                      <HelpCircle className="h-4 w-4 text-[#1c69d4]" /> REASONING GROUNDING
                    </span>
                    <p className="font-sans text-xs leading-relaxed text-[#e6e6e6]">
                      127 community members requested Docker after your React Authentication video.
                    </p>
                  </div>

                  <div className="space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-5">
                    <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white">
                      <BarChart3 className="h-4 w-4 text-[#0066b1]" /> EVIDENCE &amp; IMPACT
                    </span>
                    <div className="space-y-1 font-mono text-xs text-[#e6e6e6]">
                      <div>
                        EVIDENCE:{" "}
                        <span className="font-bold tracking-wider text-white">
                          MOST REQUESTED TOPIC
                        </span>
                      </div>
                      <div>
                        EXPECTED IMPACT:{" "}
                        <span className="font-bold tracking-wider text-white">HIGH RETENTION</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Executive Memory Moments */}
                <div className="space-y-2.5 font-mono text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#bbbbbb]">
                    {"///"} EXECUTIVE MEMORY MOMENTS
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1.5 font-bold uppercase tracking-wider text-white">
                      &ldquo;I remembered your publishing schedule.&rdquo;
                    </span>
                    <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1.5 font-bold uppercase tracking-wider text-white">
                      &ldquo;I noticed your audience changed.&rdquo;
                    </span>
                    <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1.5 font-bold uppercase tracking-wider text-white">
                      &ldquo;I prepared this while you were offline.&rdquo;
                    </span>
                  </div>
                </div>

                {/* Actions & Animation Sequence */}
                <div className="space-y-4 border-t border-[#3c3c3c] pt-5 font-mono text-xs">
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-3">
                      {approvalStep < 0 ? (
                        <>
                          <button
                            onClick={handleApprove}
                            className="flex items-center gap-2 border border-white bg-white px-6 py-3 font-extrabold uppercase tracking-widest text-black shadow-lg transition hover:bg-[#e6e6e6]"
                          >
                            <ThumbsUp className="h-4 w-4" /> APPROVE MISSION
                          </button>
                          <button className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] px-4 py-3 font-bold uppercase tracking-widest text-white transition hover:border-white">
                            <Edit3 className="h-3.5 w-3.5" /> MODIFY
                          </button>
                        </>
                      ) : (
                        <span className="flex items-center gap-2 border border-[#0066b1] bg-[#0066b1]/20 px-6 py-3 font-extrabold uppercase tracking-widest text-white">
                          <CheckCircle2 className="h-4 w-4 text-[#0066b1]" /> MISSION ACCEPTED
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setShowExplainability(true)}
                      className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] px-4 py-3 font-bold uppercase tracking-widest text-white transition hover:border-white"
                    >
                      <Brain className="h-4 w-4 text-[#1c69d4]" /> VIEW WHY
                    </button>
                  </div>

                  {/* After Approval Animation Sequence */}
                  {approvalStep >= 0 && (
                    <div className="animate-fade-in space-y-3 border border-[#3c3c3c] bg-[#0d0d0d] p-5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#bbbbbb]">
                        {"///"} WORKFLOW AUTOMATION PIPELINE
                      </span>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
                        {approvalSequence.map((seqStep, sIdx) => {
                          const isDone = sIdx <= approvalStep;
                          return (
                            <div
                              key={seqStep}
                              className={`border p-3 text-center font-bold uppercase tracking-wider transition-all duration-300 ${
                                isDone
                                  ? "border-white bg-[#1a1a1a] text-white"
                                  : "border-[#3c3c3c] bg-[#0d0d0d] text-[#7e7e7e]"
                              }`}
                            >
                              <div className="mb-0.5 text-[9px] text-[#7e7e7e]">
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
              <div className="animate-pulse space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-8">
                <div className="h-6 w-1/3 bg-[#262626]" />
                <div className="h-12 w-full bg-[#262626]" />
                <div className="h-20 w-full bg-[#262626]" />
              </div>
            )}

            {/* CONTENT REPURPOSING PIPELINE */}
            <div className="space-y-6 border border-[#3c3c3c] bg-[#1a1a1a] p-8">
              <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4">
                <h3 className="flex items-center gap-3 text-base font-extrabold uppercase tracking-wider text-white">
                  <Share2 className="h-5 w-5 text-[#1c69d4]" /> CONTENT REPURPOSING PIPELINE
                </h3>
                <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-white">
                  4 ASSETS READY
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 font-mono text-xs md:grid-cols-5">
                {repurposeSteps.map((step, idx) => (
                  <button
                    key={step.name}
                    onClick={() => setActiveRepurposeStep(idx)}
                    className={`flex flex-col justify-between space-y-2 border p-4 text-left transition ${
                      idx === activeRepurposeStep
                        ? "border-white bg-[#262626] text-white shadow-xl"
                        : "border-[#3c3c3c] bg-[#0d0d0d] text-[#bbbbbb] hover:border-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-[#7e7e7e]">STEP {idx + 1}</span>
                      <span className="text-[10px] font-bold uppercase text-white">
                        {step.status}
                      </span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {step.name}
                    </span>
                    <span className="text-[10px] text-[#bbbbbb]">QUALITY: {step.quality}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <div className="space-y-6">
            <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs">
              <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-white">
                <Brain className="h-4 w-4 text-[#1c69d4]" /> EXECUTIVE MEMORY HEALTH
              </h3>
              <div className="space-y-3 text-[#e6e6e6]">
                <div className="flex justify-between border-b border-[#3c3c3c] pb-2">
                  <span className="text-[#bbbbbb]">GROUNDED MEMORY ROWS</span>
                  <span className="font-bold text-white">4,281</span>
                </div>
                <div className="flex justify-between border-b border-[#3c3c3c] pb-2">
                  <span className="text-[#bbbbbb]">SESSION CONTINUITY</span>
                  <span className="font-bold text-white">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bbbbbb]">AUTONOMOUS FOLLOW-UPS</span>
                  <span className="font-bold text-white">9 COMPLETED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
