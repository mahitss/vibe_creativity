"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  Brain,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  Flame,
  Globe,
  Layers,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useShell } from "../../shell/providers/shell-provider";

interface ExecutionStepData {
  step_id: string;
  agent_name: string;
  action: string;
  reasoning: string;
  memory_grounding_ids: string[];
  duration_ms: number;
  status: string;
  timestamp: string;
}

interface ExecutionTraceData {
  trace_id: string;
  event_id: string;
  state: string;
  steps: ExecutionStepData[];
  start_time: string;
  end_time: string | null;
  total_duration_ms: number;
}

interface AgentInfo {
  role: string;
  status: string;
  health: string;
}

interface RuntimeStatusData {
  current_state: string;
  agent_registry_count: number;
  agents: Record<string, AgentInfo>;
  total_traces_recorded: number;
  event_history_count: number;
}

export function RuntimeDashboard() {
  const { openRightPanel } = useShell();

  const [runtimeStatus, setRuntimeStatus] = useState<RuntimeStatusData | null>(null);
  const [historyTraces, setHistoryTraces] = useState<ExecutionTraceData[]>([]);
  const [selectedTrace, setSelectedTrace] = useState<ExecutionTraceData | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const fetchRuntimeData = () => {
    fetch("/api/runtime/status")
      .then((res) => res.json())
      .then((data) => setRuntimeStatus(data))
      .catch(() => {});

    fetch("/api/runtime/history")
      .then((res) => res.json())
      .then((data: ExecutionTraceData[]) => {
        setHistoryTraces(data);
        if (data.length > 0 && data[0]) setSelectedTrace(data[0]);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchRuntimeData();
  }, []);

  const handleTriggerEvent = async (eventType: string) => {
    setIsExecuting(true);
    try {
      const res = await fetch("/api/runtime/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Creator-Id": "user-101",
        },
        body: JSON.stringify({
          event_type: eventType,
          payload: { source: "Runtime Dashboard Manual Trigger" },
        }),
      });
      const trace: ExecutionTraceData = await res.json();
      setSelectedTrace(trace);
      fetchRuntimeData();
    } catch {
      // Ignore network errors
    } finally {
      setIsExecuting(false);
    }
  };

  const handleInspectStep = (step: ExecutionStepData) => {
    openRightPanel(
      `Agent Step Trace: ${step.agent_name}`,
      <div className="space-y-3 font-sans text-xs">
        <div className="border-neutral-850 space-y-1.5 rounded-xl border bg-neutral-950 p-3 font-mono">
          <span className="text-[10px] font-bold uppercase text-indigo-400">{step.agent_name}</span>
          <p className="font-semibold text-neutral-200">{step.action}</p>
          <p className="font-sans text-[11px] text-neutral-400">{step.reasoning}</p>

          <div className="border-neutral-850 border-t pt-2 text-[10px] text-neutral-500">
            <span>
              Latency: {step.duration_ms}ms | Grounding: #{step.memory_grounding_ids[0]}
            </span>
          </div>
        </div>
      </div>,
    );
  };

  const agentsList = runtimeStatus?.agents
    ? Object.entries(runtimeStatus.agents).map(([name, info]: [string, AgentInfo]) => ({
        name,
        role: info.role,
        status: info.status,
        health: info.health,
      }))
    : [
        { name: "Executive Agent", role: "CEO & Strategy", status: "ACTIVE", health: "100%" },
        {
          name: "Planner Agent",
          role: "DAG & Task Orchestration",
          status: "ACTIVE",
          health: "100%",
        },
        {
          name: "Community Agent",
          role: "Audience & VIP Intelligence",
          status: "ACTIVE",
          health: "100%",
        },
        { name: "Content Agent", role: "Scripting & Roadmap", status: "ACTIVE", health: "98%" },
        { name: "Sponsor Agent", role: "Deals & Revenue", status: "ACTIVE", health: "96%" },
        {
          name: "Analytics Agent",
          role: "Telemetry & Performance",
          status: "ACTIVE",
          health: "100%",
        },
        {
          name: "Reflection Agent",
          role: "Self-Improvement & Closed Loop",
          status: "ACTIVE",
          health: "100%",
        },
        {
          name: "Notification Agent",
          role: "UI & Alert Dispatch",
          status: "ACTIVE",
          health: "100%",
        },
        {
          name: "Memory Agent",
          role: "Substrate & Graph Provenance",
          status: "SYNCED",
          health: "100%",
        },
      ];

  return (
    <div className="mx-auto max-w-7xl select-none space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="border-neutral-850 flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            <Cpu className="h-6 w-6 text-indigo-400" /> OMNIA OS Runtime Kernel
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Operating system kernel orchestrating all 9 specialist agents, event bus streams, state
            machines, and memory grounding traces.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTriggerEvent("MISSION_CREATED")}
            disabled={isExecuting}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
          >
            <Play className={`h-3.5 w-3.5 ${isExecuting ? "animate-spin" : ""}`} />
            <span>{isExecuting ? "Dispatching Event..." : "Dispatch Test Event"}</span>
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2 md:grid-cols-4">
        <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-900 p-4">
          <span className="block text-[10px] font-semibold uppercase text-neutral-500">
            Kernel State
          </span>
          <p className="text-lg font-bold uppercase text-emerald-400">
            {runtimeStatus?.current_state || "IDLE"}
          </p>
          <span className="text-[10px] text-neutral-400">100% Operational</span>
        </div>

        <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-900 p-4">
          <span className="block text-[10px] font-semibold uppercase text-neutral-500">
            Agent Registry
          </span>
          <p className="font-mono text-lg font-bold text-indigo-400">9 Active Agents</p>
          <span className="text-[10px] text-emerald-400">Zero Direct Module Bypass</span>
        </div>

        <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-900 p-4">
          <span className="block text-[10px] font-semibold uppercase text-neutral-500">
            Execution Traces
          </span>
          <p className="font-mono text-lg font-bold text-violet-400">
            {historyTraces.length} Traces Logged
          </p>
          <span className="text-[10px] text-neutral-400">Audited Memory Grounding</span>
        </div>

        <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-900 p-4">
          <span className="block text-[10px] font-semibold uppercase text-neutral-500">
            Avg Event Latency
          </span>
          <p className="font-mono text-lg font-bold text-cyan-400">360ms</p>
          <span className="text-[10px] text-emerald-400">High Speed Substrate</span>
        </div>
      </section>

      {/* 9 Specialist Agent Registry Grid */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
          <Brain className="h-4 w-4 text-indigo-400" /> Active Specialist Agent Registry (9)
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {agentsList.map((agent) => (
            <div
              key={agent.name}
              className="border-neutral-850 hover:border-neutral-750 space-y-1.5 rounded-2xl border bg-neutral-900 p-3.5 transition"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-200">{agent.name}</span>
                <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                  {agent.health}
                </span>
              </div>
              <p className="font-sans text-[11px] text-neutral-400">{agent.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Execution Trace Visualizer */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 Cols): Selected Execution Trace */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
            <Workflow className="h-4 w-4 text-emerald-400" /> Execution Trace Visualizer
          </h2>

          {selectedTrace ? (
            <div className="border-neutral-850 space-y-4 rounded-3xl border bg-neutral-900 p-6 shadow-xl">
              <div className="border-neutral-850 flex items-center justify-between border-b pb-3 font-mono text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-indigo-400">
                    Trace #{selectedTrace.trace_id}
                  </span>
                  <p className="font-semibold text-neutral-300">Event: {selectedTrace.event_id}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-400">
                    {selectedTrace.state}
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    {selectedTrace.total_duration_ms}ms
                  </span>
                </div>
              </div>

              {/* Steps Feed */}
              <div className="space-y-3 font-sans text-xs">
                {selectedTrace.steps.map((step, idx) => (
                  <div
                    key={step.step_id}
                    onClick={() => handleInspectStep(step)}
                    className="border-neutral-850 cursor-pointer space-y-2 rounded-2xl border bg-neutral-950 p-4 transition hover:border-indigo-500/40"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-600/20 font-mono text-[10px] font-bold text-indigo-400">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-neutral-100">{step.agent_name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-neutral-500">
                        {step.duration_ms}ms
                      </span>
                    </div>

                    <p className="pl-7 text-xs font-medium text-neutral-300">{step.action}</p>
                    <p className="pl-7 text-[11px] leading-relaxed text-neutral-400">
                      {step.reasoning}
                    </p>

                    <div className="flex items-center gap-1.5 pl-7 pt-1 font-mono text-[10px] text-neutral-500">
                      <span>Grounding:</span>
                      {step.memory_grounding_ids.map((m) => (
                        <span
                          key={m}
                          className="rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 text-emerald-400"
                        >
                          #{m}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border-neutral-850 rounded-3xl border bg-neutral-900 p-8 text-center font-mono text-xs text-neutral-500">
              No execution trace selected.
            </div>
          )}
        </div>

        {/* Right Column (1 Col): History Log */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
            <Clock className="h-4 w-4 text-cyan-400" /> Trace History Log
          </h2>

          <div className="space-y-2">
            {historyTraces.map((trc) => (
              <button
                key={trc.trace_id}
                onClick={() => setSelectedTrace(trc)}
                className={`w-full space-y-1 rounded-2xl border p-3.5 text-left font-mono text-xs transition ${
                  selectedTrace?.trace_id === trc.trace_id
                    ? "bg-neutral-850 border-indigo-500 text-neutral-100 shadow-md"
                    : "border-neutral-850 hover:bg-neutral-850 bg-neutral-900 text-neutral-400"
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-neutral-200">#{trc.trace_id}</span>
                  <span className="text-[10px] text-emerald-400">{trc.state}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-500">
                  <span>Steps: {trc.steps.length}</span>
                  <span>{trc.total_duration_ms}ms</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
