"use client";

import { useState } from "react";
import { Clock, Compass, Database, GitBranch, Play, RotateCcw, Sparkles, Zap } from "lucide-react";
import { TimelineStream } from "./timeline-stream";
import { GraphCanvas } from "./graph-canvas";
import { PlaybackSlider } from "./playback-slider";

export function LivingMemoryTimeline() {
  const [activeTab, setActiveTab] = useState<"stream" | "graph" | "playback">("stream");

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Signature Feature
            </span>
            <span className="font-mono text-xs text-neutral-500">
              Continuously Evolving Connected Graph
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            The Living Memory Timeline
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-neutral-400">
            A connected narrative of every video, sponsor inquiry, audience request, milestone, and
            AI reflection across your creative career.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 p-1 shadow-sm">
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
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "border border-neutral-700 bg-neutral-800 text-neutral-100 shadow-sm"
                    : "hover:bg-neutral-850 text-neutral-400 hover:text-neutral-200"
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
