"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  Database,
  FileText,
  Flame,
  Globe,
  Layers,
  Lightbulb,
  Play,
  RefreshCw,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import { ExplainabilityDrawer } from "../../reasoning/components/explainability-drawer";

interface MissionControlWorkspaceProps {
  userDisplayName?: string;
}

export function MissionControlWorkspace({ userDisplayName }: MissionControlWorkspaceProps = {}) {
  const [showExplainability, setShowExplainability] = useState<boolean>(false);
  const [missionStatus, setMissionStatus] = useState<"READY" | "APPROVED" | "POSTPONED">("READY");
  const [activeTaskTab, setActiveTaskTab] = useState<"TIMELINE" | "TASKS" | "ASSETS">("TIMELINE");

  return (
    <div className="min-h-screen bg-[#000000] p-6 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-10">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      <ExplainabilityDrawer
        isOpen={showExplainability}
        onClose={() => setShowExplainability(false)}
        missionTitle="Create Docker Containerization Tutorial Part 1"
      />

      <div className="mx-auto max-w-7xl space-y-8 pt-2">
        {/* WORKSPACE HEADER: VS CODE FOR CREATOR MISSIONS */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
                {"///"} MISSION WORKSPACE (VS CODE FOR MISSIONS)
              </h1>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[#bbbbbb]">
              END-TO-END DIRECTIVE SYNTHESIS, EVIDENCE GROUNDING &amp; EXECUTION PIPELINE
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-3 py-1.5 font-bold uppercase text-white">
              P1 HIGH PRIORITY
            </span>
            <span className="border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1.5 font-bold text-white">
              STATUS: {missionStatus}
            </span>
          </div>
        </div>

        {/* SPLIT-VIEW PANE (LEFT: OVERVIEW & TIMELINE | RIGHT: AI REASONING & EVIDENCE) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT 2/3: MISSION OVERVIEW & TIMELINE */}
          <div className="space-y-6 lg:col-span-2">
            {/* HERO MISSION CARD */}
            <div className="space-y-6 border border-[#1c69d4]/60 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
                <span className="flex items-center gap-2 font-extrabold uppercase tracking-widest text-white">
                  <Compass className="h-4 w-4 text-[#1c69d4]" /> DIRECTIVE ID: #mission-docker-01
                </span>
                <span className="text-[11px] text-[#bbbbbb]">
                  UPDATED 10m AGO BY EXECUTIVE MIND
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="font-sans text-3xl font-extrabold uppercase tracking-wide text-white">
                  Create Docker Containerization Tutorial Part 1
                </h2>
                <p className="font-sans text-base leading-relaxed text-[#e6e6e6]">
                  <strong>Why:</strong> 127 viewers explicitly requested Docker container
                  orchestration after your React Authentication video (
                  <strong className="border-b border-[#1c69d4] font-mono text-white">
                    +18% retention baseline expected
                  </strong>
                  ).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#bbbbbb]">
                <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1.5">
                  ESTIMATED EFFORT: <strong className="text-white">45 MINUTES</strong>
                </span>
                <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1.5">
                  EXPECTED IMPACT:{" "}
                  <strong className="text-white">HIGH RETENTION &amp; $15K SPONSOR</strong>
                </span>
                <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1.5">
                  CONFIDENCE: <strong className="text-white">97% HIGH</strong>
                </span>
              </div>
            </div>

            {/* TABBED EXECUTION PIPELINE */}
            <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveTaskTab("TIMELINE")}
                    className={`font-bold uppercase tracking-wider ${
                      activeTaskTab === "TIMELINE"
                        ? "border-b-2 border-white text-white"
                        : "text-[#7e7e7e]"
                    }`}
                  >
                    Execution Timeline
                  </button>
                  <button
                    onClick={() => setActiveTaskTab("TASKS")}
                    className={`font-bold uppercase tracking-wider ${
                      activeTaskTab === "TASKS"
                        ? "border-b-2 border-white text-white"
                        : "text-[#7e7e7e]"
                    }`}
                  >
                    Task Breakdown (3)
                  </button>
                  <button
                    onClick={() => setActiveTaskTab("ASSETS")}
                    className={`font-bold uppercase tracking-wider ${
                      activeTaskTab === "ASSETS"
                        ? "border-b-2 border-white text-white"
                        : "text-[#7e7e7e]"
                    }`}
                  >
                    Generated Assets (4)
                  </button>
                </div>
              </div>

              {activeTaskTab === "TIMELINE" && (
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-start gap-4 border-l-2 border-[#1c69d4] pl-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <div>
                      <p className="font-sans font-bold text-white">
                        09:00 AM — Synthesized 523 Community Comments
                      </p>
                      <p className="text-[11px] text-[#bbbbbb]">
                        Extracted 127 Docker Compose container requests from YouTube API.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-l-2 border-[#1c69d4] pl-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <div>
                      <p className="font-sans font-bold text-white">
                        09:15 AM — Drafted 10-Minute Video Script &amp; Code Snippets
                      </p>
                      <p className="text-[11px] text-[#bbbbbb]">
                        Generated production Docker Compose orchestrator configuration.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-l-2 border-dashed border-[#3c3c3c] pl-4">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#1c69d4]" />
                    <div>
                      <p className="font-sans font-bold text-white">
                        READY FOR APPROVAL — Awaiting Creator Confirmation
                      </p>
                      <p className="text-[11px] text-[#bbbbbb]">
                        Upon approval, multi-platform posts will be generated automatically.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTaskTab === "TASKS" && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                    <span className="text-white">
                      1. Record Docker Masterclass Screencast (Code Snippets Ready)
                    </span>
                    <span className="border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-emerald-400">
                      READY
                    </span>
                  </div>
                  <div className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                    <span className="text-white">
                      2. Render 4K Multi-Agent Architecture Diagram Thumbnail
                    </span>
                    <span className="border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-emerald-400">
                      READY
                    </span>
                  </div>
                  <div className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                    <span className="text-white">
                      3. Dispatch LinkedIn Thought Leadership &amp; X Thread
                    </span>
                    <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-2 py-0.5 text-[#1c69d4]">
                      WAITING
                    </span>
                  </div>
                </div>
              )}

              {activeTaskTab === "ASSETS" && (
                <div className="grid grid-cols-1 gap-3 font-mono text-xs md:grid-cols-2">
                  <div className="space-y-1 border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                    <span className="text-[10px] font-bold text-[#1c69d4]">YOUTUBE SCRIPT</span>
                    <p className="font-sans font-bold text-white">Docker Masterclass Full Script</p>
                    <a href="/content" className="text-[10px] text-[#1c69d4] hover:underline">
                      Open in Content Studio →
                    </a>
                  </div>
                  <div className="space-y-1 border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                    <span className="text-[10px] font-bold text-[#1c69d4]">LINKEDIN POST</span>
                    <p className="font-sans font-bold text-white">
                      Containerizing Multi-Agent Systems
                    </p>
                    <a href="/content" className="text-[10px] text-[#1c69d4] hover:underline">
                      Open in Content Studio →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 1/3: AI REASONING TREE & EVIDENCE GROUNDING */}
          <div className="space-y-6">
            <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
                <span className="font-bold uppercase tracking-widest text-white">
                  {"///"} AI REASONING &amp; GROUNDING
                </span>
                <Brain className="h-4 w-4 text-[#1c69d4]" />
              </div>

              <div className="space-y-3 text-[#e6e6e6]">
                <div className="space-y-1 border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                  <span className="text-[10px] font-bold text-emerald-400">
                    GROUNDING SUBSTRATE
                  </span>
                  <p className="font-sans font-bold text-white">
                    Persistent Memory Row #mem-yt-comment-42
                  </p>
                  <p className="text-[11px] text-[#bbbbbb]">
                    Explicitly references 127 viewer comments requesting Docker orchestration.
                  </p>
                </div>

                <div className="space-y-1 border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                  <span className="text-[10px] font-bold text-[#1c69d4]">SPONSOR ALIGNMENT</span>
                  <p className="font-sans font-bold text-white">
                    CloudCorp $15,000 Title Agreement
                  </p>
                  <p className="text-[11px] text-[#bbbbbb]">
                    Matches Q3 cloud infrastructure campaign terms.
                  </p>
                </div>

                <button
                  onClick={() => setShowExplainability(true)}
                  className="w-full border border-[#3c3c3c] bg-[#0d0d0d] py-3 font-bold uppercase text-white hover:border-white"
                >
                  Inspect Complete Audit Tree
                </button>
              </div>
            </div>

            {/* ACTION TOOLBAR */}
            <div className="space-y-3 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-2xl">
              <span className="font-bold uppercase tracking-widest text-white">
                {"///"} WORKSPACE ACTIONS
              </span>

              <button
                onClick={() => setMissionStatus("APPROVED")}
                className="w-full border border-white bg-white py-3.5 font-extrabold uppercase tracking-widest text-black shadow-lg hover:bg-[#e6e6e6]"
              >
                Approve Mission →
              </button>

              <button
                onClick={() => setMissionStatus("POSTPONED")}
                className="w-full border border-[#3c3c3c] bg-[#0d0d0d] py-3 font-bold uppercase text-white hover:border-white"
              >
                Modify Directive
              </button>

              <a
                href="/content"
                className="flex items-center justify-center gap-2 border border-[#1c69d4] bg-[#1c69d4]/10 py-3 font-bold uppercase text-[#1c69d4] hover:bg-[#1c69d4]/20"
              >
                Generate &amp; Publish Assets →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
