"use client";

import React from "react";
import { ExecutiveBrief } from "./executive-brief";
import { TodayMission } from "./today-mission";
import { AutonomousActivityFeed } from "./autonomous-activity-feed";
import { StrategicInsights } from "./strategic-insights";
import { UpcomingEvents } from "./upcoming-events";
import { TimelineFeed } from "./timeline-feed";
import { RuntimeHealthPanel } from "./runtime-health-panel";

export function MissionControlCockpit() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
              OMNIA Mission Control Operating Center
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Autonomous Operating System for Creators — Live Runtime, Executive Reasoning, &
              Grounded Memory
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs text-slate-400">
            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
            OPERATING STATE: AUTONOMOUS ACTIVE
          </div>
        </div>

        {/* Top Section: Executive Brief */}
        <ExecutiveBrief />

        {/* Main Grid: Left Column (Missions & Insights), Right Column (Health & Timeline) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left 2 Columns */}
          <div className="space-y-6 lg:col-span-2">
            <TodayMission userDisplayName="Creator" />
            <StrategicInsights />
            <AutonomousActivityFeed />
            <UpcomingEvents />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <RuntimeHealthPanel />
            <TimelineFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
