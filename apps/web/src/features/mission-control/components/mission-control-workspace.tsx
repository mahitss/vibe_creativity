"use client";

import { useState } from "react";
import { TopNav } from "./top-nav";
import { LeftSidebar } from "./left-sidebar";
import { TodayMission } from "./today-mission";
import { AutonomousWorkGrid } from "./autonomous-work-grid";
import { IntelligenceInsights } from "./intelligence-insights";
import { RightIntelligencePanel } from "./right-intelligence-panel";
import { ActivityTimeline } from "./activity-timeline";
import { CommandPalette } from "./command-palette";
import { AgentConsole } from "../../agents/components/agent-console";
import { MemoryStudio } from "../../memory/components/memory-studio";
import { LivingMemoryTimeline } from "../../timeline/components/living-memory-timeline";
import { ExecutiveReviewDashboard } from "../../reviews/components/executive-review-dashboard";
import { DemoPlayer } from "../../demo/components/demo-player";
import { MemoryIngestionDashboard } from "../../ingestion/components/memory-ingestion-dashboard";

interface MissionControlWorkspaceProps {
  userDisplayName?: string;
}

export function MissionControlWorkspace({
  userDisplayName = "Mahit",
}: MissionControlWorkspaceProps) {
  const [activeSection, setActiveSection] = useState("mission-control");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(false);

  function handleSelectAction(actionId: string) {
    if (actionId === "open-timeline") setActiveSection("timeline");
    else if (actionId === "open-graph") setActiveSection("knowledge-graph");
    else if (actionId === "open-memory") setActiveSection("memory");
    else if (actionId === "open-agents") setActiveSection("agents");
    else if (actionId === "create-mission") setActiveSection("mission-control");
  }

  // Dynamic greeting based on current time
  const hour = new Date().getHours();
  const greetingText =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  if (isDemoActive) {
    return (
      <div className="relative">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsDemoActive(false)}
            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs px-3 py-1.5 rounded-lg border border-neutral-700 font-mono shadow-lg"
          >
            Exit Demo Mode ✕
          </button>
        </div>
        <DemoPlayer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Navigation */}
      <TopNav
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        userDisplayName={userDisplayName}
        onOpenDemo={() => setIsDemoActive(true)}
      />

      {/* Main Body (Left Sidebar + Central Workspace + Right Intelligence Panel) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* Central Workspace Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-neutral-950/60 font-sans">
          {activeSection === "mission-control" && (
            <>
              {/* Dynamic Welcome Header */}
              <div className="space-y-1.5">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-100">
                  {greetingText}, {userDisplayName}.
                </h1>
                <p className="text-sm text-neutral-400 font-medium">
                  OMNIA has been running in the background. Here is your prioritized mission &amp; autonomous summary.
                </p>
              </div>

              {/* Today's Priority Mission */}
              <TodayMission userDisplayName={userDisplayName} />

              {/* Autonomous Work Completed ("While You Were Away") */}
              <AutonomousWorkGrid />

              {/* Real Intelligence Insights */}
              <IntelligenceInsights />
            </>
          )}

          {activeSection === "reviews" && <ExecutiveReviewDashboard />}

          {activeSection === "ingestion" && <MemoryIngestionDashboard />}

          {(activeSection === "timeline" || activeSection === "knowledge-graph") && (
            <LivingMemoryTimeline />
          )}

          {activeSection === "agents" && <AgentConsole />}

          {activeSection === "memory" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <MemoryStudio
                creatorName={userDisplayName}
                namespace="omnia.mahit.mind"
                memories={[
                  {
                    id: "1",
                    title: "Core Brand Identity",
                    description: "AI Engineer & Educator voice",
                    memoryType: "IDENTITY",
                    importance: 0.9,
                    tags: ["identity", "brand"],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  },
                  {
                    id: "2",
                    title: "OMNIA Multi-Agent Platform",
                    description: "Q3 enterprise architecture milestone",
                    memoryType: "PROJECT",
                    importance: 0.95,
                    tags: ["project", "release"],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  },
                ]}
                reflections={[
                  {
                    title: "Weekly Planning Reflection",
                    category: "EXECUTIVE",
                    confidence: 0.92,
                    lesson: "Focus Q3 publishing schedule on multi-part architectural walkthroughs.",
                    createdAt: new Date().toISOString(),
                  },
                ]}
                relationships={[
                  {
                    subject: "Mahit",
                    object: "CloudCorp",
                    relationship: "Tech Sponsor",
                    strength: 0.85,
                    trustScore: 0.9,
                  },
                ]}
              />
            </div>
          )}

          {activeSection !== "mission-control" &&
            activeSection !== "timeline" &&
            activeSection !== "knowledge-graph" &&
            activeSection !== "agents" &&
            activeSection !== "memory" && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center space-y-3 font-sans">
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Autonomous Section Active
                </p>
                <h2 className="text-xl font-bold text-neutral-100 capitalize">
                  {activeSection.replace("-", " ")} Workspace
                </h2>
                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Every recommendation and view in {activeSection} is continuously populated by Executive Agent and shared memory reasoning.
                </p>
              </div>
            )}
        </main>

        {/* Right Intelligence Panel */}
        {activeSection === "mission-control" && <RightIntelligencePanel />}
      </div>

      {/* Bottom Chronological Activity Timeline */}
      <ActivityTimeline />

      {/* Raycast/Linear Command Palette Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectAction={handleSelectAction}
      />
    </div>
  );
}
