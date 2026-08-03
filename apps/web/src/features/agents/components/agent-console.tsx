"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Play,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  XCircle,
  Zap,
} from "lucide-react";

interface AgentDescriptor {
  agent_id: string;
  name: string;
  version: string;
  description: string;
  capabilities: string[];
  dependencies: string[];
  status: string;
  health: number;
  average_latency_ms: number;
  last_execution_at: string | null;
}

interface BusMetrics {
  submitted: number;
  succeeded: number;
  failed: number;
  retries: number;
  timed_out: number;
  cancelled: number;
  dead_lettered: number;
}

interface Finding {
  agent_id: string;
  topic: string;
  summary: string;
  confidence: number;
  proposed_action?: string;
  priority_hint: string;
}

interface CycleOutcome {
  creator_id: string;
  findings: Finding[];
  lifecycle: string[];
}

export function AgentConsole() {
  const [activeTab, setActiveTab] = useState<
    "topology" | "registry" | "bus" | "decisions" | "memory" | "logs"
  >("topology");
  const [cycleRunning, setCycleRunning] = useState(false);
  const [lastOutcome, setLastOutcome] = useState<CycleOutcome | null>(null);
  const [cycleFocus, setCycleFocus] = useState("Enterprise Multi-Agent Platform Launch");

  const [agents] = useState<AgentDescriptor[]>([
    {
      agent_id: "executive",
      name: "Executive Minds Agent",
      version: "1.0.0",
      description: "Executive coordinator for long-term planning, delegation, and conflict resolution.",
      capabilities: ["coordination", "conflict-resolution", "decision", "planning"],
      dependencies: ["memory", "task-bus"],
      status: "ACTIVE",
      health: 1.0,
      average_latency_ms: 45.2,
      last_execution_at: new Date().toISOString(),
    },
    {
      agent_id: "memory",
      name: "Memory Agent",
      version: "1.0.0",
      description: "Observes, triages, and consolidates the shared persistent memory substrate.",
      capabilities: ["memory", "triage", "consolidation", "embeddings"],
      dependencies: ["memory"],
      status: "ACTIVE",
      health: 1.0,
      average_latency_ms: 18.5,
      last_execution_at: new Date().toISOString(),
    },
    {
      agent_id: "content",
      name: "Content Agent",
      version: "1.0.0",
      description: "Manages content lifecycle, scripts, repurposing, and publishing pipelines.",
      capabilities: ["content", "recommendation", "repurposing", "scripts"],
      dependencies: ["memory"],
      status: "ACTIVE",
      health: 1.0,
      average_latency_ms: 24.1,
      last_execution_at: new Date().toISOString(),
    },
    {
      agent_id: "community",
      name: "Community Agent",
      version: "1.0.0",
      description: "Monitors community health, sentiment, VIP members, and repeat questions.",
      capabilities: ["community", "engagement", "relationship", "sentiment"],
      dependencies: ["memory"],
      status: "ACTIVE",
      health: 1.0,
      average_latency_ms: 22.8,
      last_execution_at: new Date().toISOString(),
    },
    {
      agent_id: "moderator",
      name: "Moderator Agent",
      version: "1.0.0",
      description: "Enforces community guidelines, risk monitoring, and safety policies.",
      capabilities: ["moderation", "safety", "risk"],
      dependencies: ["memory"],
      status: "ACTIVE",
      health: 1.0,
      average_latency_ms: 15.0,
      last_execution_at: new Date().toISOString(),
    },
    {
      agent_id: "business",
      name: "Business Agent",
      version: "1.0.0",
      description: "Analyzes revenue opportunities, campaign deals, invoices, and strategy.",
      capabilities: ["business", "opportunity", "pricing", "revenue"],
      dependencies: ["memory"],
      status: "ACTIVE",
      health: 1.0,
      average_latency_ms: 31.4,
      last_execution_at: new Date().toISOString(),
    },
    {
      agent_id: "sponsor",
      name: "Sponsor Agent",
      version: "1.0.0",
      description: "Tracks sponsor deal pipelines, deliverables, and partnership follow-ups.",
      capabilities: ["sponsorship", "partnership", "outreach"],
      dependencies: ["memory", "community"],
      status: "ACTIVE",
      health: 1.0,
      average_latency_ms: 26.7,
      last_execution_at: new Date().toISOString(),
    },
    {
      agent_id: "analytics",
      name: "Analytics Agent",
      version: "1.0.0",
      description: "Computes CTR, retention, watch time, and audience performance trends.",
      capabilities: ["analytics", "metrics", "reporting", "ctr"],
      dependencies: ["memory"],
      status: "ACTIVE",
      health: 1.0,
      average_latency_ms: 19.3,
      last_execution_at: new Date().toISOString(),
    },
    {
      agent_id: "planner",
      name: "Planner Agent",
      version: "1.0.0",
      description: "Converts memory into daily missions, weekly plans, and priority scores.",
      capabilities: ["planning", "mission", "scheduling", "scoring"],
      dependencies: ["memory"],
      status: "ACTIVE",
      health: 1.0,
      average_latency_ms: 28.0,
      last_execution_at: new Date().toISOString(),
    },
    {
      agent_id: "notification",
      name: "Notification Agent",
      version: "1.0.0",
      description: "Dispatches daily summaries, briefings, sponsor alerts, and milestone updates.",
      capabilities: ["notification", "briefing", "alerting"],
      dependencies: ["memory"],
      status: "ACTIVE",
      health: 1.0,
      average_latency_ms: 12.6,
      last_execution_at: new Date().toISOString(),
    },
  ]);

  const [busMetrics, setBusMetrics] = useState<BusMetrics>({
    submitted: 28,
    succeeded: 28,
    failed: 0,
    retries: 0,
    timed_out: 0,
    cancelled: 0,
    dead_lettered: 0,
  });

  const [decisions, setDecisions] = useState([
    {
      id: "dec-101",
      topic: "Enterprise Launch Timing & Campaign",
      summary: "Executive resolved schedule conflict: Publish launch on Friday peak retention window.",
      priority: "HIGH",
      status: "PENDING_APPROVAL",
      reasoning: ["analytics: Audience retention peaks on Friday", "planner: Mission goals ready for Q3 release"],
      created_at: new Date().toISOString(),
    },
    {
      id: "dec-102",
      topic: "Sponsor Deal Renewal Outreach",
      summary: "Prepare CloudCorp renewal proposal with upgraded tier placement.",
      priority: "HIGH",
      status: "APPROVED",
      reasoning: ["sponsor: Contract signals present; renewal conversation due", "business: Revenue opportunity high"],
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);

  async function triggerCycle() {
    setCycleRunning(true);
    await new Promise((res) => setTimeout(res, 1200));

    const simulatedOutcome: CycleOutcome = {
      creator_id: "demo-creator",
      findings: [
        {
          agent_id: "planner",
          topic: "mission-plan",
          summary: `A focused mission around '${cycleFocus}' is actionable now.`,
          confidence: 0.88,
          proposed_action: `Create mission for '${cycleFocus}'`,
          priority_hint: "HIGH",
        },
        {
          agent_id: "analytics",
          topic: "audience-timing",
          summary: "Audience engagement retention peaks Friday 2:00 PM UTC.",
          confidence: 0.92,
          proposed_action: "Schedule publishing during peak window",
          priority_hint: "HIGH",
        },
      ],
      lifecycle: [
        "observe",
        "delegate:9",
        "memory:ok",
        "content:ok",
        "community:ok",
        "moderator:ok",
        "business:ok",
        "sponsor:ok",
        "analytics:ok",
        "planner:ok",
        "notification:ok",
        "merge",
        "store-reflection",
        "done",
      ],
    };

    setLastOutcome(simulatedOutcome);
    setBusMetrics((prev) => ({
      ...prev,
      submitted: prev.submitted + 9,
      succeeded: prev.succeeded + 9,
    }));
    setCycleRunning(false);
  }

  function handleDecisionStatus(id: string, newStatus: string) {
    setDecisions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 font-sans p-6 md:p-8 rounded-2xl border border-slate-800">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Cpu className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              OMNIA Multi-Agent Intelligence Platform
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono">
                v1.0 Enterprise
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Executive Minds Agent &amp; Specialized Autonomous Bus Console
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <input
              type="text"
              value={cycleFocus}
              onChange={(e) => setCycleFocus(e.target.value)}
              className="bg-transparent text-xs text-slate-200 px-3 py-1.5 focus:outline-none w-48 font-mono"
              placeholder="Cycle focus area..."
            />
            <button
              onClick={triggerCycle}
              disabled={cycleRunning}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-md transition shadow-md shadow-cyan-500/20 disabled:opacity-50"
            >
              {cycleRunning ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Orchestrating...
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Run Cycle
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Top Metrics Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Installed Agents</p>
            <p className="text-2xl font-bold text-white mt-1 font-mono">{agents.length}</p>
          </div>
          <Bot className="h-6 w-6 text-blue-400" />
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Task Bus Throughput</p>
            <p className="text-2xl font-bold text-white mt-1 font-mono">{busMetrics.submitted}</p>
          </div>
          <Activity className="h-6 w-6 text-cyan-400" />
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Avg Latency</p>
            <p className="text-2xl font-bold text-white mt-1 font-mono">24.3ms</p>
          </div>
          <Clock className="h-6 w-6 text-emerald-400" />
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Dead Letter Queue</p>
            <p className="text-2xl font-bold text-white mt-1 font-mono">{busMetrics.dead_lettered}</p>
          </div>
          <Layers className="h-6 w-6 text-slate-400" />
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-8 overflow-x-auto">
        {[
          { id: "topology", label: "Execution Topology Graph", icon: GitBranch },
          { id: "registry", label: "Agent Registry (10)", icon: Bot },
          { id: "bus", label: "Task Bus Telemetry", icon: Activity },
          { id: "decisions", label: "Decision Approvals", icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "topology" | "registry" | "bus" | "decisions" | "memory" | "logs")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition whitespace-nowrap ${
                isActive
                  ? "bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        {activeTab === "registry" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((ag) => (
              <div key={ag.agent_id} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{ag.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                    {ag.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2">{ag.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs font-mono">
            Agent Console Active &amp; Connected to Task Bus.
          </div>
        )}
      </div>
    </div>
  );
}
