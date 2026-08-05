"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  Bot,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  Flame,
  Layers,
  Network,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { useShell } from "../../shell/providers/shell-provider";

interface AgentHealthStatus {
  heartbeat: string;
  latency_ms: number;
  error_rate: number;
  success_rate: number;
  queue_size: number;
  memory_usage_mb: number;
  cpu_usage_pct: number;
}

interface AgentToolSpec {
  name: string;
  description: string;
  permissions: string[];
  owner_agent_id: string;
}

interface AgentManifestData {
  id: string;
  name: string;
  version: string;
  description: string;
  owner: string;
  capabilities: string[];
  dependencies: string[];
  priority: number;
  supported_events: string[];
  supported_tools: AgentToolSpec[];
  supported_memory_types: string[];
  supported_workflows: string[];
  state: string;
  health: AgentHealthStatus | null;
}

interface CapabilityAgentInfo {
  id: string;
  name: string;
  version: string;
  priority: number;
}

export function AgentRegistryDashboard() {
  const { openRightPanel } = useShell();

  const [agents, setAgents] = useState<AgentManifestData[]>([]);
  const [capabilitiesMatrix, setCapabilitiesMatrix] = useState<
    Record<string, CapabilityAgentInfo[]>
  >({});
  const [tools, setTools] = useState<AgentToolSpec[]>([]);
  const [isReloading, setIsReloading] = useState<boolean>(false);

  const fetchRegistryData = () => {
    fetch("/api/runtime/agents")
      .then((res) => res.json())
      .then((data: AgentManifestData[]) => setAgents(data))
      .catch(() => {});

    fetch("/api/runtime/capabilities")
      .then((res) => res.json())
      .then((data) => setCapabilitiesMatrix(data))
      .catch(() => {});

    fetch("/api/runtime/tools")
      .then((res) => res.json())
      .then((data: AgentToolSpec[]) => setTools(data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchRegistryData();
  }, []);

  const handleReloadRegistry = async () => {
    setIsReloading(true);
    try {
      await fetch("/api/runtime/agents/reload", { method: "POST" });
      fetchRegistryData();
    } catch {
      // Ignore network errors
    } finally {
      setIsReloading(false);
    }
  };

  const handleInspectAgent = (agent: AgentManifestData) => {
    openRightPanel(
      `Agent Details: ${agent.name}`,
      <div className="space-y-4 font-sans text-xs">
        <div className="border-neutral-850 space-y-2 rounded-2xl border bg-neutral-950 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-100">{agent.name}</span>
            <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
              v{agent.version}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-neutral-400">{agent.description}</p>

          <div className="border-neutral-850 space-y-1 border-t pt-2 font-mono text-[10px] text-neutral-500">
            <p>Owner: {agent.owner}</p>
            <p>Priority: {agent.priority}</p>
            <p>State: {agent.state}</p>
          </div>
        </div>

        <div className="border-neutral-850 space-y-2 rounded-2xl border bg-neutral-950 p-4">
          <h4 className="text-xs font-bold text-neutral-300">
            Capabilities ({agent.capabilities.length})
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {agent.capabilities.map((c) => (
              <span
                key={c}
                className="rounded border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] text-indigo-400"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {agent.dependencies.length > 0 && (
          <div className="border-neutral-850 space-y-2 rounded-2xl border bg-neutral-950 p-4">
            <h4 className="text-xs font-bold text-neutral-300">
              Dependencies ({agent.dependencies.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {agent.dependencies.map((d) => (
                <span
                  key={d}
                  className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 font-mono text-[10px] text-neutral-400"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>,
    );
  };

  return (
    <div className="mx-auto max-w-7xl select-none space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="border-neutral-850 flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            <Bot className="h-6 w-6 text-indigo-400" /> Dynamic Agent & Capability Registry
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Central plug-in directory of all 12 intelligent capabilities exposing tools, resolving
            dependencies, and streaming health telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReloadRegistry}
            disabled={isReloading}
            className="hover:bg-neutral-850 inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-200 shadow-md transition disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isReloading ? "animate-spin" : ""}`} />
            <span>{isReloading ? "Reloading..." : "Reload Registry"}</span>
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2 md:grid-cols-4">
        <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-900 p-4">
          <span className="block text-[10px] font-semibold uppercase text-neutral-500">
            Registered Agents
          </span>
          <p className="font-mono text-lg font-bold text-indigo-400">{agents.length} Plug-ins</p>
          <span className="text-[10px] text-emerald-400">Zero Hardcoded Agents</span>
        </div>

        <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-900 p-4">
          <span className="block text-[10px] font-semibold uppercase text-neutral-500">
            Platform Capabilities
          </span>
          <p className="font-mono text-lg font-bold text-emerald-400">
            {Object.keys(capabilitiesMatrix).length} Capabilities
          </p>
          <span className="text-[10px] text-neutral-400">Dynamic Capability Lookup</span>
        </div>

        <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-900 p-4">
          <span className="block text-[10px] font-semibold uppercase text-neutral-500">
            Executable Tools
          </span>
          <p className="font-mono text-lg font-bold text-violet-400">{tools.length} Tools</p>
          <span className="text-[10px] text-neutral-400">Permission Scoped</span>
        </div>

        <div className="border-neutral-850 space-y-1 rounded-2xl border bg-neutral-900 p-4">
          <span className="block text-[10px] font-semibold uppercase text-neutral-500">
            Startup Resolution
          </span>
          <p className="font-mono text-lg font-bold text-cyan-400">Topological DAG</p>
          <span className="text-[10px] text-emerald-400">Automatic Dependency Order</span>
        </div>
      </section>

      {/* 12 Registered Agents Grid */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
          <Layers className="h-4 w-4 text-indigo-400" /> Registered Intelligent Agents (
          {agents.length})
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => handleInspectAgent(agent)}
              className="border-neutral-850 flex cursor-pointer flex-col justify-between space-y-3 rounded-2xl border bg-neutral-900 p-4 transition hover:border-indigo-500/40"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-100">{agent.name}</span>
                  <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                    {agent.state}
                  </span>
                </div>

                <p className="line-clamp-2 text-[11px] leading-relaxed text-neutral-400">
                  {agent.description}
                </p>
              </div>

              <div className="border-neutral-850 space-y-2 border-t pt-2 font-mono text-[10px]">
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.map((c) => (
                    <span
                      key={c}
                      className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[9px] text-indigo-400"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {agent.health && (
                  <div className="flex items-center justify-between pt-1 text-[9px] text-neutral-500">
                    <span>Latency: {agent.health.latency_ms}ms</span>
                    <span>CPU: {agent.health.cpu_usage_pct}%</span>
                    <span>RAM: {agent.health.memory_usage_mb}MB</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capability Matrix & Tool Directory */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Capability Matrix */}
        <div className="border-neutral-850 space-y-4 rounded-3xl border bg-neutral-900 p-5 shadow-xl">
          <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
            <Brain className="h-4 w-4 text-emerald-400" /> Capability Lookup Matrix
          </h2>

          <div className="space-y-3 text-xs">
            {Object.entries(capabilitiesMatrix).map(([cap, capAgents]) => (
              <div
                key={cap}
                className="border-neutral-850 space-y-1.5 rounded-2xl border bg-neutral-950 p-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] font-bold text-indigo-400">{cap}</span>
                  <span className="font-mono text-[10px] text-neutral-500">
                    {capAgents.length} Agents
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {capAgents.map((a) => (
                    <span
                      key={a.id}
                      className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executable Tool Directory */}
        <div className="border-neutral-850 space-y-4 rounded-3xl border bg-neutral-900 p-5 shadow-xl">
          <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
            <Wrench className="h-4 w-4 text-violet-400" /> Executable Tool Directory
          </h2>

          <div className="space-y-3 text-xs">
            {tools.map((t) => (
              <div
                key={t.name}
                className="border-neutral-850 space-y-1.5 rounded-2xl border bg-neutral-950 p-3.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-neutral-100">{t.name}</span>
                  <span className="rounded border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] text-violet-400">
                    {t.owner_agent_id}
                  </span>
                </div>

                <p className="font-sans text-[11px] text-neutral-400">{t.description}</p>

                <div className="flex items-center gap-2 pt-1 font-mono text-[9px] text-neutral-500">
                  <span>Permissions: {t.permissions.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
