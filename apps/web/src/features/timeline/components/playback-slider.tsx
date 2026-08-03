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
    let interval: any = null;
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
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 font-sans shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan-400" />
            Creator Journey Playback Engine
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Replay the chronological evolution of ideas, content releases, sponsor deals, and revenue milestones.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
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
            className="p-2 text-neutral-400 hover:text-neutral-200 bg-neutral-950 border border-neutral-800 rounded-lg hover:bg-neutral-850 transition"
            title="Reset to Start"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Playback Timeline Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-cyan-400 font-bold">
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
          className="w-full h-2 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
          <span>Jul 15 (Idea)</span>
          <span>Jul 20 (Draft)</span>
          <span>Jul 25 (Published)</span>
          <span>Aug 01 (Course)</span>
        </div>
      </div>

      {/* Current Step State Card */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold uppercase">
              {activeSnapshot.evolution_stage} STAGE
            </span>
            <span className="text-xs font-mono text-neutral-500">{activeSnapshot.timestamp}</span>
          </div>

          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> Synchronized
          </span>
        </div>

        <h4 className="text-sm font-bold text-neutral-100">{activeSnapshot.title}</h4>

        <div>
          <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider mb-2">
            Active Graph Entities ({activeSnapshot.active_nodes.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {activeSnapshot.active_nodes.map((node) => (
              <span
                key={node.id}
                className="text-xs font-mono px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-lg flex items-center gap-1.5"
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
