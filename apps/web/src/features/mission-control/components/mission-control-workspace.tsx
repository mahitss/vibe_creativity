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
import { CognitiveLoopVisualizer } from "../../cognition/components/cognitive-loop-visualizer";
import { YouTubeConnectorPage } from "../../youtube/components/youtube-connector-page";
import { SemanticSearchPage } from "../../search/components/semantic-search-page";
import { FollowUpCenter } from "../../followup/components/follow-up-center";

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
  const greetingText = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  if (isDemoActive) {
    return (
      <div className="relative">
        <div className="fixed right-4 top-4 z-50">
          <button
            onClick={() => setIsDemoActive(false)}
            className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 font-mono text-xs text-neutral-200 shadow-lg hover:bg-neutral-700"
          >
            Exit Demo Mode ✕
          </button>
        </div>
        <DemoPlayer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen select-none flex-col overflow-x-hidden bg-neutral-950 font-sans text-neutral-100">
      {/* Top Navigation */}
      <TopNav
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        userDisplayName={userDisplayName}
        onOpenDemo={() => setIsDemoActive(true)}
      />

      {/* Main Body (Left Sidebar + Central Workspace + Right Intelligence Panel) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* Central Workspace Content Area */}
        <main className="flex-1 space-y-8 overflow-y-auto bg-neutral-950/60 p-6 font-sans md:p-8">
          {activeSection === "mission-control" && (
            <>
              {/* Dynamic Welcome Header */}
              <div className="space-y-1.5">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-100 md:text-3xl">
                  {greetingText}, {userDisplayName}.
                </h1>
                <p className="text-sm font-medium text-neutral-400">
                  OMNIA has been running in the background. Here is your prioritized mission &amp;
                  autonomous summary.
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

          {activeSection === "cognition" && <CognitiveLoopVisualizer />}

          {activeSection === "youtube" && <YouTubeConnectorPage />}

          {(activeSection === "timeline" || activeSection === "knowledge-graph") && (
            <LivingMemoryTimeline />
          )}

          {activeSection === "agents" && <AgentConsole />}

          {activeSection === "memory" && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
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
                    lesson:
                      "Focus Q3 publishing schedule on multi-part architectural walkthroughs.",
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

          {activeSection === "followup" && <FollowUpCenter />}
          {activeSection === "search" && <SemanticSearchPage />}

          {activeSection !== "mission-control" &&
            activeSection !== "followup" &&
            activeSection !== "search" &&
            activeSection !== "timeline" &&
            activeSection !== "knowledge-graph" &&
            activeSection !== "agents" &&
            activeSection !== "memory" && (
              <div className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900 p-12 text-center font-sans">
                <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                  Autonomous Section Active
                </p>
                <h2 className="text-xl font-bold capitalize text-neutral-100">
                  {activeSection.replace("-", " ")} Workspace
                </h2>
                <p className="mx-auto max-w-md text-xs leading-relaxed text-neutral-400">
                  Every recommendation and view in {activeSection} is continuously populated by
                  Executive Agent and shared memory reasoning.
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
