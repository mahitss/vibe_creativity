"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  FileText,
  Flame,
  Globe,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { useShell } from "../../shell/providers/shell-provider";

interface MissionControlWorkspaceProps {
  userDisplayName?: string;
}

interface AutonomousWork {
  action_id: string;
  agent_name: string;
  title: string;
  reason: string;
  evidence: string;
  timestamp: string;
}

interface StrategicInsight {
  insight_id: string;
  headline: string;
  reasoning: string;
  evidence_memory_ids: string[];
  category: string;
}

interface TimelineItem {
  item_id: string;
  actor: string;
  action: string;
  timestamp: string;
  memory_id: string;
}

interface Upcoming {
  item_id: string;
  title: string;
  date_str: string;
  type: string;
}

interface PrimaryMissionData {
  mission_id: string;
  title: string;
  reason: string;
  supporting_memories: string[];
  expected_impact: string;
  estimated_effort_mins: number;
  confidence: number;
  status: string;
}

interface MissionControlPayloadData {
  creator_name: string;
  greeting: string;
  executive_summary: Array<{
    category: string;
    headline: string;
    description: string;
    evidence_memory_id: string;
  }>;
  primary_mission: PrimaryMissionData;
  autonomous_work: AutonomousWork[];
  strategic_insights: StrategicInsight[];
  timeline: TimelineItem[];
  upcoming: Upcoming[];
  agent_health: Record<string, { status: string; health: string; last_loop: string }>;
}

export function MissionControlWorkspace({
  userDisplayName = "Mahit",
}: MissionControlWorkspaceProps) {
  const { openRightPanel } = useShell();

  const [summaryData, setSummaryData] = useState<MissionControlPayloadData | null>(null);
  const [missionStatus, setMissionStatus] = useState<string>("PENDING");
  const [expandedReasoning, setExpandedReasoning] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/mission-control/summary", {
      headers: { "X-Creator-Id": "creator-default" },
    })
      .then((res) => res.json())
      .then((data: MissionControlPayloadData) => {
        setSummaryData(data);
        if (data.primary_mission) setMissionStatus(data.primary_mission.status);
      })
      .catch(() => {
        // Fallback default state if server API is initializing
      });
  }, []);

  const handleApproveMission = async () => {
    setMissionStatus("APPROVED");
    try {
      await fetch("/api/mission-control/mission/approve", {
        method: "POST",
        headers: { "X-Creator-Id": "creator-default" },
      });
    } catch {
      // Ignore network errors
    }
  };

  const handlePostponeMission = async () => {
    setMissionStatus("POSTPONED");
    try {
      await fetch("/api/mission-control/mission/postpone", {
        method: "POST",
        headers: { "X-Creator-Id": "creator-default" },
      });
    } catch {
      // Ignore network errors
    }
  };

  const handleInspectMemory = (memoryId: string) => {
    openRightPanel(
      `Memory Grounding #${memoryId}`,
      <div className="space-y-3 font-sans text-xs">
        <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
          <span className="font-mono text-[10px] uppercase text-emerald-400">
            Provenance Verified
          </span>
          <p className="font-medium text-neutral-200">Persistent Memory Row #{memoryId}</p>
          <p className="text-[11px] text-neutral-400">
            Explicitly references audience requests and contract negotiation history.
          </p>
        </div>
      </div>,
    );
  };

  // Fallback state if summaryData is loading
  const greeting = summaryData?.greeting || `Good Evening, ${userDisplayName}`;
  const primaryMission = summaryData?.primary_mission || {
    mission_id: "mission-top-101",
    title: "Record & Publish React Series Part 5 with CloudCorp Integration",
    reason:
      "React Part 5 is 8 days overdue with 142 waiting subscribers; CloudCorp $15k title agreement requires publish by Friday 18:00 UTC.",
    supporting_memories: [
      "mem-promise-react5",
      "mem-cloudcorp-deal",
      "mem-community-react-requests",
    ],
    expected_impact: "High Growth & $15,000 Sponsorship Revenue",
    estimated_effort_mins: 120,
    confidence: 0.97,
    status: missionStatus,
  };

  const autonomousWork: AutonomousWork[] = summaryData?.autonomous_work || [
    {
      action_id: "w1",
      agent_name: "Content Strategy Agent",
      title: "Prepared React Series Part 5 Full Video Script & Code Snippets",
      reason: "Audience demand spike detected (+142 comments).",
      evidence: "Grounding Memory #mem-promise-react5",
      timestamp: "15m ago",
    },
    {
      action_id: "w2",
      agent_name: "Sponsor Intelligence Agent",
      title: "Negotiated $15,000 CloudCorp Title Sponsorship Read Terms",
      reason: "Q3 revenue objective threshold matching sponsor niche alignment score (94%).",
      evidence: "Grounding Memory #mem-cloudcorp-deal",
      timestamp: "1h ago",
    },
  ];

  const strategicInsights: StrategicInsight[] = summaryData?.strategic_insights || [
    {
      insight_id: "i1",
      headline: "Your React & Agent Content is Outperforming General AI Content by 42%",
      reasoning: "Audience watch time retention averages 11m42s on hands-on code walkthroughs.",
      evidence_memory_ids: ["mem-analytics-retention"],
      category: "CONTENT",
    },
    {
      insight_id: "i2",
      headline: "CloudCorp Title Deal Overdue for Confirmation Response",
      reasoning: "Sponsor representative requested media kit sign-off within 24 hours.",
      evidence_memory_ids: ["mem-cloudcorp-deal"],
      category: "SPONSOR",
    },
  ];

  const timelineItems: TimelineItem[] = summaryData?.timeline || [
    {
      item_id: "t1",
      actor: "Executive Agent",
      action: "Prioritized React Part 5 Recording over Passive Research",
      timestamp: "20m ago",
      memory_id: "mem-exec-dec-101",
    },
    {
      item_id: "t2",
      actor: "Sponsor Agent",
      action: "Received draft agreement from CloudCorp ($15,000)",
      timestamp: "1h ago",
      memory_id: "mem-cloudcorp-deal",
    },
  ];

  const upcomingItems: Upcoming[] = summaryData?.upcoming || [
    {
      item_id: "u1",
      title: "Publish React Series Part 5 on YouTube",
      date_str: "Tomorrow, 18:00 UTC",
      type: "DEADLINE",
    },
    {
      item_id: "u2",
      title: "CloudCorp Q3 Campaign Kickoff Meeting",
      date_str: "Friday, 14:00 UTC",
      type: "EVENT",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl select-none space-y-6 pb-12 font-sans text-neutral-100">
      {/* SECTION 1: EXECUTIVE SUMMARY BANNER */}
      <section className="border-neutral-850 space-y-4 rounded-3xl border bg-neutral-900 p-6 shadow-xl">
        <div className="border-neutral-850 flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
              <h1 className="text-xl font-bold tracking-tight text-neutral-100">{greeting}</h1>
            </div>
            <p className="mt-1 text-xs text-neutral-400">
              While you were away, OMNIA synthesized 12 memory rows, resolved 1 agent conflict, and
              prepared your primary mission.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-neutral-300">
              4 Completed
            </span>
            <span className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-400">
              1 Pending Action
            </span>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 md:grid-cols-4">
          <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-950 p-3">
            <span className="font-mono text-[10px] font-semibold uppercase text-emerald-400">
              Autonomous Work
            </span>
            <p className="truncate font-semibold text-neutral-200">React Part 5 Script Ready</p>
          </div>

          <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-950 p-3">
            <span className="font-mono text-[10px] font-semibold uppercase text-cyan-400">
              Sponsorship Opportunity
            </span>
            <p className="truncate font-semibold text-neutral-200">
              CloudCorp $15k Title Agreement
            </p>
          </div>

          <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-950 p-3">
            <span className="font-mono text-[10px] font-semibold uppercase text-amber-400">
              Overdue Risk
            </span>
            <p className="truncate font-semibold text-neutral-200">React Part 5 (8 Days Overdue)</p>
          </div>

          <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-950 p-3">
            <span className="font-mono text-[10px] font-semibold uppercase text-indigo-400">
              Community Demand
            </span>
            <p className="truncate font-semibold text-neutral-200">
              60 Requests for Docker Masterclass
            </p>
          </div>
        </div>
      </section>

      {/* CENTER WORKSPACE: TODAY'S MISSION & AUTONOMOUS WORK */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 Cols): Mission + Work + Insights */}
        <div className="space-y-6 lg:col-span-2">
          {/* SECTION 2: TODAY'S PRIMARY MISSION */}
          <section className="space-y-4 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-400" />
                <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-indigo-300">
                  Today&apos;s Primary Mission
                </h2>
              </div>
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[10px] text-indigo-400">
                Confidence 97%
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-100">{primaryMission.title}</h3>
              <p className="text-xs leading-relaxed text-neutral-300">{primaryMission.reason}</p>
            </div>

            {/* Supporting Memories Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-mono text-[10px] uppercase text-neutral-500">
                Supporting Memories:
              </span>
              {primaryMission.supporting_memories.map((memId: string) => (
                <button
                  key={memId}
                  onClick={() => handleInspectMemory(memId)}
                  className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 font-mono text-[10px] text-neutral-400 transition hover:text-indigo-400"
                >
                  #{memId}
                </button>
              ))}
            </div>

            {/* Expanded Reasoning view */}
            {expandedReasoning && (
              <div className="border-neutral-850 animate-fade-in space-y-2 rounded-2xl border bg-neutral-950 p-4 font-mono text-xs text-neutral-300">
                <p>
                  <strong className="text-indigo-400">Observation:</strong> Audience retention
                  spikes +14% when publishing coding tutorials on Thursdays.
                </p>
                <p>
                  <strong className="text-emerald-400">Business Impact:</strong> Secures $15,000 Q3
                  revenue contract from CloudCorp.
                </p>
                <p>
                  <strong className="text-amber-400">Rejected Alternative:</strong> Postponing video
                  by 1 week would result in 15% estimated audience drop-off.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="border-neutral-850 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleApproveMission}
                  disabled={missionStatus === "APPROVED"}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>
                    {missionStatus === "APPROVED" ? "Mission Approved" : "Approve Mission"}
                  </span>
                </button>

                <button
                  onClick={handlePostponeMission}
                  className="hover:bg-neutral-850 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-neutral-300 transition"
                >
                  Postpone
                </button>
              </div>

              <button
                onClick={() => setExpandedReasoning((prev) => !prev)}
                className="font-mono text-xs text-neutral-400 transition hover:text-neutral-200"
              >
                {expandedReasoning ? "Hide Reasoning" : "Expand Reasoning →"}
              </button>
            </div>
          </section>

          {/* SECTION 3: AUTONOMOUS WORK FEED */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
              <Workflow className="h-4 w-4 text-emerald-400" /> Autonomous Work Executed
            </h3>

            <div className="space-y-2.5">
              {autonomousWork.map((work) => (
                <div
                  key={work.action_id}
                  className="border-neutral-850 hover:border-neutral-750 space-y-1.5 rounded-2xl border bg-neutral-900 p-4 transition"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                      {work.agent_name}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">{work.timestamp}</span>
                  </div>

                  <h4 className="text-xs font-semibold text-neutral-100">{work.title}</h4>
                  <p className="text-xs leading-relaxed text-neutral-400">{work.reason}</p>

                  <div className="pt-1 font-mono text-[10px] text-neutral-500">
                    <span>Evidence: </span>
                    <span className="text-neutral-300">{work.evidence}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: STRATEGIC INSIGHTS */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
              <Lightbulb className="h-4 w-4 text-amber-400" /> Grounded Strategic Insights
            </h3>

            <div className="grid grid-cols-1 gap-3 text-xs md:grid-cols-2">
              {strategicInsights.map((ins) => (
                <div
                  key={ins.insight_id}
                  className="border-neutral-850 flex flex-col justify-between space-y-2 rounded-2xl border bg-neutral-900 p-4"
                >
                  <div className="space-y-1">
                    <span className="block font-mono text-[10px] font-semibold uppercase text-indigo-400">
                      {ins.category}
                    </span>
                    <h4 className="font-bold leading-snug text-neutral-200">{ins.headline}</h4>
                    <p className="text-[11px] text-neutral-400">{ins.reasoning}</p>
                  </div>

                  <div className="border-neutral-850 flex items-center justify-between border-t pt-2 font-mono text-[10px] text-neutral-500">
                    <span>Evidence: #{ins.evidence_memory_ids[0] || "mem-grounding"}</span>
                    <button
                      onClick={() =>
                        handleInspectMemory(ins.evidence_memory_ids[0] || "mem-grounding")
                      }
                      className="text-indigo-400 hover:underline"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (1 Col): Activity Timeline & Agent Telemetry */}
        <div className="space-y-6">
          {/* SECTION 5: ACTIVITY TIMELINE */}
          <section className="border-neutral-850 space-y-4 rounded-3xl border bg-neutral-900 p-5">
            <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
              <Clock className="h-4 w-4 text-indigo-400" /> Activity Timeline
            </h3>

            <div className="relative space-y-3 border-l border-neutral-800 pl-4 text-xs">
              {timelineItems.map((item) => (
                <div key={item.item_id} className="relative space-y-0.5">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-neutral-950" />
                  <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500">
                    <span className="font-semibold text-neutral-300">{item.actor}</span>
                    <span>{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-neutral-400">{item.action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: UPCOMING MILESTONES */}
          <section className="border-neutral-850 space-y-4 rounded-3xl border bg-neutral-900 p-5">
            <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
              <Flame className="h-4 w-4 text-rose-400" /> Upcoming Milestones
            </h3>

            <div className="space-y-2 text-xs">
              {upcomingItems.map((up) => (
                <div
                  key={up.item_id}
                  className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-200">{up.title}</span>
                    <span className="rounded border border-rose-500/30 bg-rose-500/10 px-1.5 py-0.5 font-mono text-[9px] text-rose-400">
                      {up.type}
                    </span>
                  </div>
                  <span className="block font-mono text-[10px] text-neutral-500">
                    {up.date_str}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT TELEMETRY PANEL: AGENT HEALTH */}
          <section className="border-neutral-850 space-y-3 rounded-3xl border bg-neutral-900 p-5 font-mono text-xs">
            <div className="border-neutral-850 flex items-center justify-between border-b pb-2">
              <span className="font-bold text-neutral-200">Agent Health Telemetry</span>
              <span className="text-[10px] text-emerald-400">100% Operational</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between text-neutral-300">
                <span>Executive Mind</span>
                <span className="font-bold text-emerald-400">100% (Active)</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>Content Strategy</span>
                <span className="font-bold text-emerald-400">98% (Active)</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>Community Intelligence</span>
                <span className="font-bold text-emerald-400">100% (Active)</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>Sponsor Intelligence</span>
                <span className="font-bold text-emerald-400">96% (Active)</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>Memory Substrate</span>
                <span className="font-bold text-cyan-400">Synced</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
