"use client";

import { useState } from "react";
import {
  Clock,
  Compass,
  Database,
  GitBranch,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { TimelineStream } from "./timeline-stream";
import { GraphCanvas } from "./graph-canvas";
import { PlaybackSlider } from "./playback-slider";

export function LivingMemoryTimeline() {
  const [activeTab, setActiveTab] = useState<"stream" | "graph" | "playback">("stream");

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 uppercase tracking-wider">
              Signature Feature
            </span>
            <span className="text-xs text-neutral-500 font-mono">Continuously Evolving Connected Graph</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100 flex items-center gap-2">
            The Living Memory Timeline
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            A connected narrative of every video, sponsor inquiry, audience request, milestone, and AI reflection across your creative career.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 p-1 rounded-xl shadow-sm">
          {[
            { id: "stream", label: "Timeline Stream", icon: Clock },
            { id: "graph", label: "Memory Graph Canvas", icon: GitBranch },
            { id: "playback", label: "Journey Playback", icon: Play },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition ${
                  isActive
                    ? "bg-neutral-800 text-neutral-100 border border-neutral-700 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main View Area */}
      {activeTab === "stream" && <TimelineStream />}
      {activeTab === "graph" && <GraphCanvas />}
      {activeTab === "playback" && <PlaybackSlider />}
    </div>
  );
}
