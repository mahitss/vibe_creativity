"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  FastForward,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";

interface PlaybackSnapshot {
  step: number;
  timestamp: string;
  title: string;
  evolution_stage: string;
  active_nodes: { id: string; name: string; node_type: string }[];
}

export function PlaybackSlider() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const snapshots: PlaybackSnapshot[] = [
    {
      step: 1,
      timestamp: "2026-07-15",
      title: "Community Signal: Audience Requested Docker Tutorial",
      evolution_stage: "IDEA",
      active_nodes: [{ id: "1", name: "Docker Idea", node_type: "IDEA" }],
    },
    {
      step: 2,
      timestamp: "2026-07-20",
      title: "Content Agent Generated Script & 3-Min Video Hook",
      evolution_stage: "DRAFT",
      active_nodes: [
        { id: "1", name: "Docker Idea", node_type: "IDEA" },
        { id: "2", name: "Video Script", node_type: "DRAFT" },
      ],
    },
    {
      step: 3,
      timestamp: "2026-07-25",
      title: "Published Docker Deep Dive with CloudCorp Title Sponsor",
      evolution_stage: "PUBLISHED",
      active_nodes: [
        { id: "1", name: "Docker Idea", node_type: "IDEA" },
        { id: "2", name: "Video Script", node_type: "DRAFT" },
        { id: "3", name: "Published Video", node_type: "VIDEO" },
        { id: "4", name: "CloudCorp Sponsor", node_type: "SPONSOR" },
      ],
    },
    {
      step: 4,
      timestamp: "2026-08-01",
      title: "Repurposed Video into VIP Masterclass & Hit $25k Goal",
      evolution_stage: "REPURPOSED",
      active_nodes: [
        { id: "1", name: "Docker Idea", node_type: "IDEA" },
        { id: "2", name: "Video Script", node_type: "DRAFT" },
        { id: "3", name: "Published Video", node_type: "VIDEO" },
        { id: "4", name: "CloudCorp Sponsor", node_type: "SPONSOR" },
        { id: "5", name: "Masterclass Course", node_type: "COURSE" },
        { id: "6", name: "Q3 Revenue Goal", node_type: "GOAL" },
      ],
    },
  ];

  const fallbackSnapshot: PlaybackSnapshot = {
    step: 1,
    timestamp: "2026-07-15",
    title: "Community Signal: Audience Requested Docker Tutorial",
    evolution_stage: "IDEA",
    active_nodes: [{ id: "1", name: "Docker Idea", node_type: "IDEA" }],
  };
  const activeSnapshot: PlaybackSnapshot = snapshots[currentStep] ?? fallbackSnapshot;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= snapshots.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, snapshots.length]);

  return (
    <div className="space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 font-sans shadow-xl">
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-4 md:flex-row md:items-center">
        <div>
          <h3 className="flex items-center gap-2 text-base font-bold text-neutral-100">
            <Clock className="h-5 w-5 text-cyan-400" />
            Creator Journey Playback Engine
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400">
            Replay the chronological evolution of ideas, content releases, sponsor deals, and
            revenue milestones.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:from-cyan-400 hover:to-blue-500"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 fill-current" />
                Pause Replay
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" />
                Replay Journey
              </>
            )}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(0);
            }}
            className="hover:bg-neutral-850 rounded-lg border border-neutral-800 bg-neutral-950 p-2 text-neutral-400 transition hover:text-neutral-200"
            title="Reset to Start"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Playback Timeline Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-cyan-400">
            Step {currentStep + 1} of {snapshots.length}
          </span>
          <span className="text-neutral-400">{activeSnapshot.timestamp}</span>
        </div>

        <input
          type="range"
          min="0"
          max={snapshots.length - 1}
          value={currentStep}
          onChange={(e) => {
            setIsPlaying(false);
            setCurrentStep(parseInt(e.target.value, 10));
          }}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-950 accent-cyan-400"
        />

        <div className="flex justify-between pt-1 font-mono text-[10px] text-neutral-500">
          <span>Jul 15 (Idea)</span>
          <span>Jul 20 (Draft)</span>
          <span>Jul 25 (Published)</span>
          <span>Aug 01 (Course)</span>
        </div>
      </div>

      {/* Current Step State Card */}
      <div className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-950 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-cyan-400">
              {activeSnapshot.evolution_stage} STAGE
            </span>
            <span className="font-mono text-xs text-neutral-500">{activeSnapshot.timestamp}</span>
          </div>

          <span className="flex items-center gap-1 font-mono text-xs text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> Synchronized
          </span>
        </div>

        <h4 className="text-sm font-bold text-neutral-100">{activeSnapshot.title}</h4>

        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-neutral-500">
            Active Graph Entities ({activeSnapshot.active_nodes.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {activeSnapshot.active_nodes.map((node) => (
              <span
                key={node.id}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-xs text-neutral-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {node.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
