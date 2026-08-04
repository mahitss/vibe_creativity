"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Database,
  FileText,
  Filter,
  Flame,
  GitBranch,
  Handshake,
  Layers,
  Lightbulb,
  Lock,
  MessageSquare,
  Plus,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

interface ExecutiveDecision {
  id: string;
  timestamp: string;
  objective: string;
  reason: string;
  evidence: string;
  supporting_memories: string[];
  business_impact: number;
  audience_impact: number;
  confidence: number;
  risk_level: string;
  expected_outcome: string;
  alternative_options: string[];
  status: string;
}

interface AgentConflict {
  conflict_id: string;
  subsystems_involved: string[];
  conflict_description: string;
  executive_resolution: string;
  rationale: string;
  supporting_memories: string[];
}

export function ExecutiveDashboard() {
  const [activeTab, setActiveTab] = useState<
    "TODAY" | "LOG font-sans" | "CONFLICTS" | "OPPORTUNITIES"
  >("TODAY");
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>("dec-101");
  const [isRunningCycle, setIsRunningCycle] = useState<boolean>(false);

  const [decisions, setDecisions] = useState<ExecutiveDecision[]>([
    {
      id: "dec-101",
      timestamp: "2026-08-04T21:00:00Z",
      objective: "Prioritize React Series Part 5 Recording & CloudCorp Media Kit",
      reason:
        "React Part 5 is 8 days overdue with 142 subscribers waiting; CloudCorp sponsorship deal ($15,000) requires media kit confirmation.",
      evidence: "Memory #mem-promise-react5 + CloudCorp deal terms in negotiation state.",
      supporting_memories: [
        "mem-promise-react5",
        "mem-cloudcorp-deal",
        "mem-community-react-requests",
      ],
      business_impact: 0.96,
      audience_impact: 0.98,
      confidence: 0.97,
      risk_level: "LOW",
      expected_outcome:
        "Publish React Part 5 by tomorrow 18:00 UTC and secure CloudCorp $15k title agreement.",
      alternative_options: [
        "Delay React Part 5 for Docker masterclass",
        "Send generic media kit without custom video slot",
      ],
      status: "APPROVED",
    },
    {
      id: "dec-102",
      timestamp: "2026-08-03T18:30:00Z",
      objective: "Resolve Content vs Sponsor Scheduling Conflict for Friday Release",
      reason:
        "Analytics Agent recommended immediate video publish, but Sponsor Agent requested holding release until CloudCorp integration read is finalized.",
      evidence: "CloudCorp contract exclusivity terms + YouTube audience retention peak data.",
      supporting_memories: ["mem-cloudcorp-deal", "rule-sponsor-exclusivity"],
      business_impact: 0.92,
      audience_impact: 0.9,
      confidence: 0.94,
      risk_level: "LOW",
      expected_outcome: "Hold publish by 24 hours to include $15,000 CloudCorp title read.",
      alternative_options: ["Publish without sponsor read", "Delay video by 1 week"],
      status: "EXECUTED",
    },
  ]);

  const [conflicts] = useState<AgentConflict[]>([
    {
      conflict_id: "cnf-101",
      subsystems_involved: ["Content Strategy", "Sponsor Intelligence", "Analytics"],
      conflict_description:
        "Analytics recommends publishing video immediately, but Sponsor Agent requires CloudCorp contract sign-off.",
      executive_resolution:
        "Hold release for 24 hours until CloudCorp integration read is approved.",
      rationale: "Protecting $15,000 sponsorship revenue outweighs 24-hour video delay impact.",
      supporting_memories: ["mem-cloudcorp-deal", "mem-analytics-retention"],
    },
  ]);

  const selectedDecision = decisions.find((d) => d.id === selectedDecisionId);

  const handleRunCycle = () => {
    setIsRunningCycle(true);
    setTimeout(() => {
      const newDec: ExecutiveDecision = {
        id: `dec-${Math.floor(Math.random() * 900 + 100)}`,
        timestamp: new Date().toISOString(),
        objective: "Autonomous Daily Executive Alignment Cycle Executed",
        reason:
          "Synthesized reports across Memory, Content, Community, Sponsor, and Personalization modules.",
        evidence: "100% memory grounding provenance across all 6 active subsystems.",
        supporting_memories: ["mem-promise-react5", "mem-cloudcorp-deal", "mem-alex-help"],
        business_impact: 0.95,
        audience_impact: 0.96,
        confidence: 0.98,
        risk_level: "LOW",
        expected_outcome: "Optimal creator workflow alignment for the next 24 hours.",
        alternative_options: ["Run passive monitoring without action queue"],
        status: "EXECUTED",
      };
      setDecisions((prev) => [newDec, ...prev]);
      setIsRunningCycle(false);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
              <Brain className="h-3 w-3" /> Highest-Level Strategy &amp; COO Engine
            </span>
            <span className="font-mono text-xs italic text-neutral-400">
              &quot;One clear strategy instead of dozens of disconnected AI suggestions.&quot;
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Executive Decision &amp; Strategy Engine
          </h1>
          <p className="mt-1 max-w-3xl text-xs text-neutral-400">
            Evaluates reports from Content, Community, Sponsor, Memory, and Analytics engines,
            resolves multi-agent conflicts, and maintains an immutable decision log.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunCycle}
            disabled={isRunningCycle}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRunningCycle ? "animate-spin" : ""}`} />
            {isRunningCycle ? "Running Executive Cycle..." : "Run Strategic Alignment Cycle"}
          </button>
        </div>
      </header>

      {/* Metrics Bar */}
      <section className="grid grid-cols-2 gap-4 font-sans text-xs md:grid-cols-4">
        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Executive Strategy Status
          </span>
          <p className="font-mono text-xl font-bold text-emerald-400">OPTIMAL</p>
          <span className="font-mono text-[10px] text-neutral-400">100% Subsystem Alignment</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Top Strategic Focus
          </span>
          <p className="font-mono text-xl font-bold text-indigo-400">React 5 &amp; CloudCorp</p>
          <span className="font-mono text-[10px] text-neutral-400">
            Overdue Episode &amp; $15k Deal
          </span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Resolved Agent Conflicts
          </span>
          <p className="font-mono text-xl font-bold text-cyan-400">1 Active Resolved</p>
          <span className="font-mono text-[10px] text-neutral-400">Content vs Sponsor Read</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Decision Audit Log
          </span>
          <p className="font-mono text-xl font-bold text-violet-400">
            {decisions.length} Decisions Logged
          </p>
          <span className="font-mono text-[10px] text-neutral-400">
            Immutable &amp; Explainable
          </span>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-neutral-850 flex items-center gap-2 border-b pb-2 font-sans text-xs">
        {(
          [
            { id: "TODAY", label: "Today's Strategy Focus", count: 1 },
            { id: "CONFLICTS", label: "Multi-Agent Conflicts", count: conflicts.length },
            { id: "OPPORTUNITIES", label: "Strategic Opportunities", count: 2 },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "TODAY" | "CONFLICTS" | "OPPORTUNITIES")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-medium transition ${
              activeTab === tab.id
                ? "border border-neutral-700 bg-neutral-800 font-semibold text-neutral-100 shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {tab.label}
            <span className="rounded-full border border-neutral-800 bg-neutral-950 px-2 py-0.5 font-mono text-[10px]">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Today's Strategy View */}
      {activeTab === "TODAY" && (
        <div className="grid grid-cols-1 gap-6 font-sans lg:grid-cols-3">
          {/* Today's Executive Strategy Card */}
          <div className="space-y-4 lg:col-span-2">
            <article className="space-y-4 rounded-2xl border border-indigo-500/40 bg-neutral-900 p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    Unified Executive Direction
                  </span>
                  <h2 className="text-lg font-bold text-neutral-100">
                    Focus 70% energy on React Part 5 Scripting &amp; 30% on CloudCorp Sponsor
                    Follow-up.
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold uppercase text-emerald-400">
                  Optimal
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Weekly Strategic Roadmap
                </h3>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
                    <span className="font-mono text-[10px] text-neutral-500">Target #1</span>
                    <p className="text-xs font-bold text-neutral-200">
                      Complete &amp; publish React Series Part 5
                    </p>
                  </div>
                  <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
                    <span className="font-mono text-[10px] text-neutral-500">Target #2</span>
                    <p className="text-xs font-bold text-neutral-200">
                      Finalize CloudCorp $15,000 Q3 title agreement
                    </p>
                  </div>
                  <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
                    <span className="font-mono text-[10px] text-neutral-500">Target #3</span>
                    <p className="text-xs font-bold text-neutral-200">
                      Outline Docker Multi-Agent Masterclass
                    </p>
                  </div>
                  <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
                    <span className="font-mono text-[10px] text-neutral-500">Target #4</span>
                    <p className="text-xs font-bold text-neutral-200">
                      Batch-create 3 YouTube Shorts from Docker Deep Dive
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Decision History List */}
            <div className="space-y-3 pt-2">
              <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
                <Lock className="h-3.5 w-3.5 text-indigo-400" /> Immutable Decision Audit History
              </h3>
              {decisions.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDecisionId(d.id)}
                  className={`cursor-pointer space-y-2.5 rounded-2xl border bg-neutral-900 p-4 transition ${
                    selectedDecisionId === d.id
                      ? "border-indigo-500 ring-2 ring-indigo-500/30"
                      : "hover:border-neutral-750 border-neutral-800"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-indigo-300">{d.objective}</span>
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase text-emerald-400">
                      {d.status}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-neutral-400">{d.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decision Inspector Sidebar */}
          <aside className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 font-sans text-xs">
            {selectedDecision ? (
              <>
                <div className="space-y-1 border-b border-neutral-800 pb-3">
                  <span className="font-mono text-[10px] font-bold uppercase text-indigo-400">
                    {selectedDecision.status} DECISION
                  </span>
                  <h3 className="text-base font-bold text-neutral-100">
                    {selectedDecision.objective}
                  </h3>
                  <span className="block font-mono text-[10px] text-neutral-500">
                    Confidence: {(selectedDecision.confidence * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Supporting Evidence &amp; Memories
                  </span>
                  <p className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5 text-[10px] leading-relaxed text-neutral-300">
                    {selectedDecision.evidence}
                  </p>
                  <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                    {selectedDecision.supporting_memories.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-cyan-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-neutral-850 space-y-2 border-t pt-2">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Expected Outcome
                  </span>
                  <p className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5 text-[10px] font-semibold text-emerald-300">
                    {selectedDecision.expected_outcome}
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-2 py-12 text-center font-mono text-xs text-neutral-500">
                <Brain className="mx-auto h-6 w-6 text-neutral-600" />
                <p>Select any decision card to inspect rationale &amp; memory citations.</p>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Multi-Agent Conflicts View */}
      {activeTab === "CONFLICTS" && (
        <div className="space-y-4 font-sans text-xs">
          <div className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Zap className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-bold text-neutral-100">
                Multi-Agent Conflict Resolution Log
              </h3>
            </div>

            <div className="space-y-3">
              {conflicts.map((c) => (
                <div
                  key={c.conflict_id}
                  className="space-y-2 rounded-xl border border-amber-500/30 bg-neutral-950 p-4"
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="font-bold uppercase text-amber-400">
                      Subsystems Involved: {c.subsystems_involved.join(" vs ")}
                    </span>
                    <span className="text-neutral-500">ID: {c.conflict_id}</span>
                  </div>
                  <h4 className="font-bold text-neutral-100">{c.conflict_description}</h4>
                  <p className="pt-1 font-semibold text-emerald-400">
                    Executive Resolution: {c.executive_resolution}
                  </p>
                  <p className="text-neutral-400">Rationale: {c.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
