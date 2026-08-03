"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Award,
  Bot,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Database,
  Eye,
  FastForward,
  GitBranch,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { PresenterOverlay } from "./presenter-overlay";
import { LivingMemoryTimeline } from "../../timeline/components/living-memory-timeline";
import { ExecutiveReviewDashboard } from "../../reviews/components/executive-review-dashboard";
import { GraphCanvas } from "../../timeline/components/graph-canvas";
import { MissionControlWorkspace } from "../../mission-control/components/mission-control-workspace";

interface SceneData {
  sceneNumber: number;
  title: string;
  subtitle: string;
  durationSeconds: number;
  talkingPoints: string[];
  memoryReferences: string[];
  targetView: "MISSION_CONTROL" | "TIMELINE" | "REVIEWS" | "GRAPH" | "SUMMARY";
}

export function DemoPlayer() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [presenterMode, setPresenterMode] = useState(true);

  const scenes: SceneData[] = [
    {
      sceneNumber: 1,
      title: "Scene 1: Welcome Back",
      subtitle: "Autonomous Work Completed ('While You Were Away')",
      durationSeconds: 15,
      targetView: "MISSION_CONTROL",
      talkingPoints: [
        "Notice OMNIA doesn't wait for user prompts — it operates continuously in the background.",
        "While the creator was away, 9 specialized agents executed 28 tasks automatically.",
        "Community Agent triaged 420 comments; Sponsor Agent drafted CloudCorp renewal terms.",
      ],
      memoryReferences: [
        "Episode Memory: 420 Discord comments triaged",
        "Relationship Memory: CloudCorp $12k renewal draft prepared",
      ],
    },
    {
      sceneNumber: 2,
      title: "Scene 2: Today's Priority Mission",
      subtitle: "Autonomous Reasoning & Grounded First Step",
      durationSeconds: 20,
      targetView: "MISSION_CONTROL",
      talkingPoints: [
        "Executive Minds Agent prioritized the Docker Multi-Agent Deep Dive video.",
        "Rationale is grounded in 14 audience comments and 90-day retention data.",
        "OMNIA provides a concrete first step: Review Content Agent's 3-minute script hook.",
      ],
      memoryReferences: [
        "Community Memory: 14 audience requests for Docker orchestration",
        "Performance Memory: Deep dive videos yield +18% retention window",
      ],
    },
    {
      sceneNumber: 3,
      title: "Scene 3: Living Memory Timeline",
      subtitle: "Cause-and-Effect Journey Replay",
      durationSeconds: 20,
      targetView: "TIMELINE",
      talkingPoints: [
        "This is OMNIA's signature feature: The Living Memory Timeline.",
        "Every event connects to past decisions: Audience Request → Script → Published Video → Sponsor Deal → Masterclass Course.",
        "Memory evolves cleanly (Idea → Draft → Published → Repurposed) without duplication.",
      ],
      memoryReferences: [
        "Event #101: Discord request (Jul 15)",
        "Event #102: Script draft (Jul 20)",
        "Event #103: CloudCorp video release (Jul 25)",
        "Event #104: VIP course conversion ($25k goal hit, Aug 01)",
      ],
    },
    {
      sceneNumber: 4,
      title: "Scene 4: Executive Review (COO Engine)",
      subtitle: "Strategic Recommendations Grounded in Memory",
      durationSeconds: 20,
      targetView: "REVIEWS",
      talkingPoints: [
        "OMNIA behaves like a Chief Operating Officer (COO), never simply summarizing data.",
        "Recommendation 1: Increase React/Docker content frequency to 2x per week (96% confidence).",
        "Recommendation 2: Initiate Q4 title sponsorship renewal with CloudCorp (92% confidence).",
      ],
      memoryReferences: [
        "Analytics Memory: Technical deep dives yield 2.4x higher watch time",
        "Business Memory: Q4 renewal converts at 85% rate 30 days prior",
      ],
    },
    {
      sceneNumber: 5,
      title: "Scene 5: Autonomous Follow-Up Triggers",
      subtitle: "Multi-Agent Follow-Up & Proactive Reminders",
      durationSeconds: 15,
      targetView: "MISSION_CONTROL",
      talkingPoints: [
        "Sponsor Reminder: CloudCorp agreement expiration is 14 days away.",
        "Audience Promise: Docker code repository release promised to Discord VIPs.",
        "Content Recommendation: Repurpose Docker tutorial into weekly newsletter.",
      ],
      memoryReferences: [
        "Sponsor Contract Memory: Expiration Aug 15, 2026",
        "Community Promise Memory: GitHub code link promised in Discord",
      ],
    },
    {
      sceneNumber: 6,
      title: "Scene 6: Interactive Memory Graph",
      subtitle: "Connected Entity Topology (Content, Sponsor, Goal, Mission)",
      durationSeconds: 15,
      targetView: "GRAPH",
      talkingPoints: [
        "Every entity exists as a node in OMNIA's connected memory graph.",
        "Relationships (INSPIRED, CREATED, SPONSORED_BY, REPURPOSED) show true cause-and-effect.",
        "Presenters can zoom, drag nodes, and highlight story paths.",
      ],
      memoryReferences: [
        "Node: Docker Multi-Agent System (VIDEO)",
        "Node: CloudCorp Enterprise (SPONSOR)",
        "Node: Q3 Revenue $25k (GOAL)",
      ],
    },
    {
      sceneNumber: 7,
      title: "Scene 7: Final Executive Summary",
      subtitle: "OMNIA remembers. OMNIA plans. OMNIA acts.",
      durationSeconds: 15,
      targetView: "SUMMARY",
      talkingPoints: [
        "OMNIA remembers: 18 months of creator history, audience signals, and sponsor deals.",
        "OMNIA plans: Executive COO strategy and daily priority missions.",
        "OMNIA acts: 9 specialized agents collaborating on tasks 24/7.",
        "Next 30-Day Strategy: Scale Masterclass course to 1,000 VIP students & close Q4 CloudCorp tier.",
      ],
      memoryReferences: [
        "Executive Summary: 30-Day Roadmap synthesized",
        "Final Statement: OMNIA is the persistent autonomous operating system for creators.",
      ],
    },
  ];

  const activeScene: SceneData = scenes[currentSceneIndex] ?? scenes[0]!;

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSceneIndex((prev) => {
          if (prev >= scenes.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, activeScene.durationSeconds * 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentSceneIndex, activeScene.durationSeconds, scenes.length]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans select-none">
      {/* Top Demo Player Control Bar */}
      <header className="h-16 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between font-sans">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-white font-mono shadow-md">
            DEMO
          </div>
          <div>
            <h2 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              OMNIA Product Demonstration
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                2-Min Executive Pitch
              </span>
            </h2>
            <p className="text-[11px] text-neutral-400 font-mono">
              Scene {currentSceneIndex + 1} of 7: {activeScene.title}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSceneIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentSceneIndex === 0}
            className="p-2 text-neutral-400 hover:text-neutral-200 bg-neutral-950 border border-neutral-800 rounded-lg hover:bg-neutral-850 disabled:opacity-40 transition"
            title="Previous Scene"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-md shadow-cyan-500/20"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 fill-current" />
                Pause Demo
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" />
                Play Demo
              </>
            )}
          </button>

          <button
            onClick={() => setCurrentSceneIndex((prev) => Math.min(prev + 1, scenes.length - 1))}
            disabled={currentSceneIndex === scenes.length - 1}
            className="p-2 text-neutral-400 hover:text-neutral-200 bg-neutral-950 border border-neutral-800 rounded-lg hover:bg-neutral-850 disabled:opacity-40 transition"
            title="Next Scene"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentSceneIndex(0);
            }}
            className="p-2 text-neutral-400 hover:text-neutral-200 bg-neutral-950 border border-neutral-800 rounded-lg hover:bg-neutral-850 transition"
            title="Restart Demo"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <div className="h-5 w-[1px] bg-neutral-800 mx-1" />

          <button
            onClick={() => setPresenterMode(!presenterMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
              presenterMode
                ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400 font-bold"
                : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Presenter Mode</span>
          </button>
        </div>
      </header>

      {/* 7-Scene Stepper Bar */}
      <div className="bg-neutral-900/60 border-b border-neutral-800 px-6 py-2.5 flex items-center justify-between overflow-x-auto gap-2 font-mono text-xs">
        {scenes.map((s, idx) => {
          const isActive = idx === currentSceneIndex;
          const isPassed = idx < currentSceneIndex;

          return (
            <button
              key={s.sceneNumber}
              onClick={() => {
                setIsPlaying(false);
                setCurrentSceneIndex(idx);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                isActive
                  ? "bg-neutral-800 text-cyan-400 font-bold border border-cyan-500/30 shadow-sm"
                  : isPassed
                  ? "text-neutral-300 hover:text-neutral-100"
                  : "text-neutral-500 hover:text-neutral-400"
              }`}
            >
              <span
                className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
                  isActive
                    ? "bg-cyan-400 text-neutral-950 font-bold"
                    : isPassed
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-neutral-800 text-neutral-500"
                }`}
              >
                {s.sceneNumber}
              </span>
              <span>{s.title.replace(`Scene ${s.sceneNumber}: `, "")}</span>
            </button>
          );
        })}
      </div>

      {/* Scene View Display */}
      <main className="flex-1 relative bg-neutral-950 overflow-hidden">
        {activeScene.targetView === "MISSION_CONTROL" && (
          <MissionControlWorkspace userDisplayName="Mahit" />
        )}

        {activeScene.targetView === "TIMELINE" && (
          <div className="p-8 max-w-6xl mx-auto">
            <LivingMemoryTimeline />
          </div>
        )}

        {activeScene.targetView === "REVIEWS" && (
          <div className="p-8 max-w-6xl mx-auto">
            <ExecutiveReviewDashboard />
          </div>
        )}

        {activeScene.targetView === "GRAPH" && (
          <div className="p-8 max-w-6xl mx-auto">
            <GraphCanvas />
          </div>
        )}

        {activeScene.targetView === "SUMMARY" && (
          <div className="p-12 max-w-4xl mx-auto space-y-8 font-sans">
            {/* OMNIA Core Pillar Statements */}
            <div className="text-center space-y-4 py-8 border-b border-neutral-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase">
                Final Product Demonstration Summary
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white space-y-1">
                <div>OMNIA Remembers.</div>
                <div className="text-cyan-400">OMNIA Plans.</div>
                <div className="text-emerald-400">OMNIA Acts.</div>
              </h1>
              <p className="text-sm text-neutral-400 max-w-lg mx-auto">
                Proven across 18 months of creator history, 9 specialized agents, persistent memory, and COO strategic review.
              </p>
            </div>

            {/* Next 30-Day Strategy Roadmap */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">
              <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-400" />
                Synthesized 30-Day Creator Strategy Roadmap
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-2">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase">Phase 1 (Days 1–10)</span>
                  <h4 className="font-bold text-neutral-100">Publish Docker Architecture Deep Dive</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    Launch video during Friday peak window; anchor CloudCorp sponsorship renewal proposal.
                  </p>
                </div>

                <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-2">
                  <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">Phase 2 (Days 11–20)</span>
                  <h4 className="font-bold text-neutral-100">Scale Masterclass Course to 1,000 VIP Students</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    Expand code repository into module 5 &amp; launch weekly VIP Q&amp;A newsletter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Presenter Mode Overlay */}
        <PresenterOverlay
          sceneNumber={activeScene.sceneNumber}
          title={activeScene.title}
          subtitle={activeScene.subtitle}
          durationSeconds={activeScene.durationSeconds}
          talkingPoints={activeScene.talkingPoints}
          memoryReferences={activeScene.memoryReferences}
          isVisible={presenterMode}
          onClose={() => setPresenterMode(false)}
        />
      </main>
    </div>
  );
}
