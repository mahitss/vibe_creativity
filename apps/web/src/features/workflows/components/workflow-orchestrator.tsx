"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  Bot,
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
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  Workflow,
  X,
  Zap,
} from "lucide-react";

interface DAGTask {
  task_id: string;
  workflow_id: string;
  name: string;
  assigned_agent: string;
  dependencies: string[];
  priority: number;
  status: "PENDING" | "RUNNING" | "WAITING_APPROVAL" | "COMPLETED" | "FAILED";
  estimated_time_mins: number;
  requires_approval: boolean;
  expected_output: string;
  actual_output?: string;
}

interface WorkflowInstance {
  workflow_id: string;
  name: string;
  workflow_type: string;
  status: "ACTIVE" | "PAUSED" | "COMPLETED" | "FAILED";
  current_step: number;
  tasks: DAGTask[];
  created_at: string;
}

interface WorkflowTemplate {
  template_id: string;
  name: string;
  description: string;
  workflow_type: string;
  default_tasks: { name: string; assigned_agent: string }[];
}

export function WorkflowOrchestrator() {
  const [activeTab, setActiveTab] = useState<"DAG" | "TEMPLATES" | "BUILDER">("DAG");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("wf-101");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [workflows, setWorkflows] = useState<WorkflowInstance[]>([
    {
      workflow_id: "wf-101",
      name: "React Series Part 5 End-to-End Release",
      workflow_type: "SERIES_PUBLISHING",
      status: "ACTIVE",
      current_step: 3,
      tasks: [
        {
          task_id: "tsk-1",
          workflow_id: "wf-101",
          name: "Community Demand Detection",
          assigned_agent: "Community Agent",
          dependencies: [],
          priority: 1,
          status: "COMPLETED",
          estimated_time_mins: 5,
          requires_approval: false,
          expected_output: "142 subscribers waiting for React Part 5.",
          actual_output: "Demand verified with 98% confidence score.",
        },
        {
          task_id: "tsk-2",
          workflow_id: "wf-101",
          name: "Memory Prior Art Retrieval",
          assigned_agent: "Memory Agent",
          dependencies: ["tsk-1"],
          priority: 2,
          status: "COMPLETED",
          estimated_time_mins: 10,
          requires_approval: false,
          expected_output: "Retrieve React Part 4 script & code samples.",
          actual_output: "Retrieved memory #mem-promise-react5.",
        },
        {
          task_id: "tsk-3",
          workflow_id: "wf-101",
          name: "Content Roadmap & Script Drafting",
          assigned_agent: "Content Agent",
          dependencies: ["tsk-2"],
          priority: 3,
          status: "WAITING_APPROVAL",
          estimated_time_mins: 30,
          requires_approval: true,
          expected_output: "Complete 15-min video script & code repository.",
          actual_output: "Draft script generated and queued for creator review.",
        },
        {
          task_id: "tsk-4",
          workflow_id: "wf-101",
          name: "Executive Mission Finalization",
          assigned_agent: "Executive Agent",
          dependencies: ["tsk-3"],
          priority: 4,
          status: "PENDING",
          estimated_time_mins: 15,
          requires_approval: true,
          expected_output: "Publish video & notify Discord community.",
        },
      ],
      created_at: "2026-08-04T20:00:00Z",
    },
  ]);

  const [templates] = useState<WorkflowTemplate[]>([
    {
      template_id: "tmpl-series-launch",
      name: "Launch YouTube Series Episode",
      description:
        "Coordinates Community demand detection, Memory retrieval, Content drafting, Analytics estimation, and Executive briefing.",
      workflow_type: "SERIES_PUBLISHING",
      default_tasks: [
        { name: "Community Demand Detection", assigned_agent: "Community Agent" },
        { name: "Memory Prior Art Retrieval", assigned_agent: "Memory Agent" },
        { name: "Content Roadmap & Script Drafting", assigned_agent: "Content Agent" },
        { name: "Executive Mission Finalization", assigned_agent: "Executive Agent" },
      ],
    },
    {
      template_id: "tmpl-sponsor-campaign",
      name: "Run Sponsor Campaign Workflow",
      description:
        "Coordinates Sponsor contract retrieval, Planner calendar blocking, Content deliverable drafting, and Follow-up monitoring.",
      workflow_type: "SPONSOR_CAMPAIGN",
      default_tasks: [
        { name: "Sponsor Contract Retrieval", assigned_agent: "Sponsor Agent" },
        { name: "Planner Calendar Blocking", assigned_agent: "Planner Agent" },
        { name: "Content Integration Read Drafting", assigned_agent: "Content Agent" },
        { name: "Executive Campaign Prioritization", assigned_agent: "Executive Agent" },
      ],
    },
  ]);

  const selectedWorkflow =
    workflows.find((w) => w.workflow_id === selectedWorkflowId) || workflows[0];

  const handleRunStep = () => {
    setIsRunning(true);
    setTimeout(() => {
      setWorkflows((prev) =>
        prev.map((w) => {
          if (w.workflow_id === selectedWorkflowId) {
            const updatedTasks = w.tasks.map((t) => {
              if (t.status === "WAITING_APPROVAL") {
                return {
                  ...t,
                  status: "COMPLETED" as const,
                  actual_output: "Approved by creator and completed successfully.",
                };
              }
              if (t.status === "PENDING") {
                return {
                  ...t,
                  status: "RUNNING" as const,
                  actual_output: "Task executing across specialist agent in parallel.",
                };
              }
              return t;
            });
            return { ...w, tasks: updatedTasks };
          }
          return w;
        }),
      );
      setIsRunning(false);
    }, 800);
  };

  const getAgentColor = (agent: string) => {
    if (agent.includes("Community")) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    if (agent.includes("Memory")) return "bg-violet-500/10 text-violet-400 border-violet-500/30";
    if (agent.includes("Content")) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "WAITING_APPROVAL":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse";
      case "RUNNING":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      default:
        return "bg-neutral-800 text-neutral-400 border-neutral-700";
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
              <GitBranch className="h-3 w-3" /> Multi-Agent Workflow Orchestration Engine
            </span>
            <span className="font-mono text-xs italic text-neutral-400">
              &quot;One goal. Many agents. One coordinated workflow.&quot;
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Workflow Automation &amp; Agent Orchestrator
          </h1>
          <p className="mt-1 max-w-3xl text-xs text-neutral-400">
            Transforms isolated AI recommendations into complete multi-agent Directed Acyclic Graph
            (DAG) task workflows coordinated by the Executive Agent.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunStep}
            disabled={isRunning}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            {isRunning ? "Advancing DAG Workflow..." : "Advance Active Workflow Step"}
          </button>
        </div>
      </header>

      {/* Metrics Bar */}
      <section className="grid grid-cols-2 gap-4 font-sans text-xs md:grid-cols-4">
        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Active Workflows
          </span>
          <p className="font-mono text-xl font-bold text-indigo-400">3 Active DAGs</p>
          <span className="font-mono text-[10px] text-neutral-400">100% Dependency Resolved</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Managed Tasks
          </span>
          <p className="font-mono text-xl font-bold text-violet-400">18 Tasks Total</p>
          <span className="font-mono text-[10px] text-neutral-400">Sequential &amp; Parallel</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Task Completion Rate
          </span>
          <p className="font-mono text-xl font-bold text-emerald-400">94% Completed</p>
          <span className="font-mono text-[10px] text-neutral-400">High Execution Velocity</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Agent Parallel Capacity
          </span>
          <p className="font-mono text-xl font-bold text-cyan-400">88% Utilization</p>
          <span className="font-mono text-[10px] text-neutral-400">6 Specialized Agents</span>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-neutral-850 flex items-center gap-2 border-b pb-2 font-sans text-xs">
        {(
          [
            { id: "DAG", label: "Active Workflows DAG", count: workflows.length },
            { id: "TEMPLATES", label: "Workflow Templates Library", count: templates.length },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "DAG" | "TEMPLATES" | "BUILDER")}
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

      {/* DAG Workflow Visualizer View */}
      {activeTab === "DAG" && selectedWorkflow && (
        <div className="space-y-6 font-sans">
          {/* Active Workflow Card */}
          <div className="space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl">
            <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-4 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase text-indigo-400">
                  {selectedWorkflow.workflow_type}
                </span>
                <h2 className="text-lg font-bold text-neutral-100">{selectedWorkflow.name}</h2>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold uppercase text-emerald-400">
                {selectedWorkflow.status}
              </span>
            </div>

            {/* DAG Task Graph Nodes */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
                <Workflow className="h-3.5 w-3.5 text-indigo-400" /> Task Graph Directed Acyclic
                Graph (DAG)
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {selectedWorkflow.tasks.map((task, idx) => (
                  <div key={task.task_id} className="group relative">
                    <div className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 shadow-md transition hover:border-neutral-700">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-neutral-500">
                          Step #{idx + 1}
                        </span>
                        <span
                          className={`rounded border px-2 py-0.5 font-mono text-[9px] uppercase ${getStatusBadge(task.status)}`}
                        >
                          {task.status.replace("_", " ")}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold leading-snug text-neutral-100">
                        {task.name}
                      </h4>

                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span
                          className={`rounded border px-2 py-0.5 font-semibold ${getAgentColor(task.assigned_agent)}`}
                        >
                          {task.assigned_agent}
                        </span>
                        <span className="text-neutral-500">{task.estimated_time_mins}m</span>
                      </div>

                      {task.actual_output && (
                        <p className="border-neutral-850 rounded border bg-neutral-900 p-2 font-mono text-[10px] leading-relaxed text-neutral-300">
                          {task.actual_output}
                        </p>
                      )}

                      {task.requires_approval && task.status === "WAITING_APPROVAL" && (
                        <div className="flex items-center gap-1.5 rounded border border-amber-500/30 bg-amber-500/10 p-2 font-mono text-[10px] font-semibold text-amber-300">
                          <Lock className="h-3 w-3 shrink-0 text-amber-400" />
                          <span>Approval Gate: Requires Creator Review</span>
                        </div>
                      )}
                    </div>

                    {idx < selectedWorkflow.tasks.length - 1 && (
                      <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-neutral-600 md:block">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates View */}
      {activeTab === "TEMPLATES" && (
        <div className="grid grid-cols-1 gap-6 font-sans md:grid-cols-2">
          {templates.map((tmpl) => (
            <div
              key={tmpl.template_id}
              className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl"
            >
              <div>
                <span className="font-mono text-[10px] font-bold uppercase text-indigo-400">
                  {tmpl.workflow_type}
                </span>
                <h3 className="text-base font-bold text-neutral-100">{tmpl.name}</h3>
                <p className="mt-1 text-xs text-neutral-400">{tmpl.description}</p>
              </div>

              <div className="space-y-2">
                <span className="block font-mono text-[10px] uppercase text-neutral-500">
                  Default DAG Tasks
                </span>
                {tmpl.default_tasks.map((dt, idx) => (
                  <div
                    key={idx}
                    className="border-neutral-850 flex items-center justify-between rounded-lg border bg-neutral-950 p-2.5 font-mono text-xs"
                  >
                    <span className="text-neutral-200">{dt.name}</span>
                    <span className="text-[10px] text-indigo-400">{dt.assigned_agent}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
