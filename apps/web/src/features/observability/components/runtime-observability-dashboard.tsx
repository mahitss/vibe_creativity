"use client";

import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Download,
  Layers,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

interface SubsystemHealth {
  component_name: string;
  status: "HEALTHY" | "DEGRADED" | "UNHEALTHY" | "OFFLINE";
  health_score: number;
  latency_ms: number;
  error_rate: number;
  active_alerts: number;
}

interface Span {
  span_id: string;
  name: string;
  span_type: string;
  duration_ms: number;
  status: string;
}

interface Trace {
  trace_id: string;
  workflow_id: string;
  duration_ms: number;
  status: string;
  spans: Span[];
}

export function RuntimeObservabilityDashboard() {
  const [subsystems] = useState<SubsystemHealth[]>([
    {
      component_name: "Runtime State Machine",
      status: "HEALTHY",
      health_score: 98.5,
      latency_ms: 42.0,
      error_rate: 0.0,
      active_alerts: 0,
    },
    {
      component_name: "Executive & Specialist Agents",
      status: "HEALTHY",
      health_score: 96.0,
      latency_ms: 65.0,
      error_rate: 0.01,
      active_alerts: 0,
    },
    {
      component_name: "Vector & Episodic Memory",
      status: "DEGRADED",
      health_score: 82.5,
      latency_ms: 120.0,
      error_rate: 0.02,
      active_alerts: 1,
    },
    {
      component_name: "Workflow Execution Engine",
      status: "HEALTHY",
      health_score: 99.0,
      latency_ms: 55.0,
      error_rate: 0.0,
      active_alerts: 0,
    },
    {
      component_name: "Runtime Scheduler",
      status: "HEALTHY",
      health_score: 99.5,
      latency_ms: 35.0,
      error_rate: 0.0,
      active_alerts: 0,
    },
    {
      component_name: "Tool Execution Sandbox",
      status: "HEALTHY",
      health_score: 95.0,
      latency_ms: 85.0,
      error_rate: 0.0,
      active_alerts: 0,
    },
    {
      component_name: "Knowledge Graph Universe",
      status: "HEALTHY",
      health_score: 97.0,
      latency_ms: 95.0,
      error_rate: 0.0,
      active_alerts: 0,
    },
    {
      component_name: "Platform Integrations",
      status: "HEALTHY",
      health_score: 94.5,
      latency_ms: 110.0,
      error_rate: 0.0,
      active_alerts: 0,
    },
  ]);

  const [traces] = useState<Trace[]>([
    {
      trace_id: "trace-content-exec-101",
      workflow_id: "wf-content-production-101",
      duration_ms: 2000,
      status: "OK",
      spans: [
        {
          span_id: "span-root-1",
          name: "Runtime State Machine Cycle",
          span_type: "RUNTIME",
          duration_ms: 2000,
          status: "OK",
        },
        {
          span_id: "span-agent-2",
          name: "Executive Agent Decision Cycle",
          span_type: "AGENT",
          duration_ms: 500,
          status: "OK",
        },
        {
          span_id: "span-tool-3",
          name: "Tool Execution: tool-notify",
          span_type: "TOOL",
          duration_ms: 100,
          status: "OK",
        },
      ],
    },
  ]);

  const [logs] = useState([
    {
      level: "INFO",
      component: "Executive Agent",
      message: "Delegated content production workflow to Content Agent",
      timestamp: "23:54:02",
    },
    {
      level: "INFO",
      component: "Tool Execution Engine",
      message: "Executed sandboxed tool-notify successfully",
      timestamp: "23:54:03",
    },
    {
      level: "WARN",
      component: "Memory Engine",
      message: "HNSW search latency exceeded 250ms threshold",
      timestamp: "23:45:10",
    },
  ]);

  const handleExportOTel = (traceId: string) => {
    alert(`Exported OpenTelemetry trace JSON for ${traceId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Runtime Observability Platform
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Production-grade tracing, telemetry, subsystem health, and OpenTelemetry diagnostics
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-cyan-400">
            <Zap className="h-4 w-4 animate-pulse text-emerald-400" />
            LIVE TELEMETRY STREAM
          </div>
        </div>

        {/* Subsystem Health Grid */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <ShieldCheck className="h-5 w-5 text-cyan-400" /> Subsystem Health Scores
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {subsystems.map((sub, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur transition hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <span className="truncate text-xs font-medium text-slate-400">
                    {sub.component_name}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      sub.status === "HEALTHY"
                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-2xl font-bold text-slate-100">
                    {sub.health_score}%
                  </span>
                  <span className="font-mono text-xs text-slate-400">{sub.latency_ms}ms avg</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      sub.health_score >= 90 ? "bg-cyan-400" : "bg-amber-400"
                    }`}
                    style={{ width: `${sub.health_score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distributed Trace Explorer */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Layers className="h-5 w-5 text-purple-400" /> Distributed Traces & Span Hierarchy
          </h2>
          <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            {traces.map((trace) => (
              <div key={trace.trace_id} className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-sm font-bold text-cyan-400">
                      {trace.trace_id}
                    </span>
                    <span className="ml-3 text-xs text-slate-400">
                      Workflow: {trace.workflow_id}
                    </span>
                  </div>
                  <button
                    onClick={() => handleExportOTel(trace.trace_id)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-slate-700"
                  >
                    <Download className="h-3.5 w-3.5 text-cyan-400" /> Export OpenTelemetry JSON
                  </button>
                </div>
                <div className="space-y-2 pl-2">
                  {trace.spans.map((span) => (
                    <div
                      key={span.span_id}
                      className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-950/60 p-3 font-mono text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span className="font-medium text-slate-300">{span.name}</span>
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                          {span.span_type}
                        </span>
                      </div>
                      <span className="text-slate-400">{span.duration_ms}ms</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Structured Logs */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Terminal className="h-5 w-5 text-emerald-400" /> Live Structured Logs
          </h2>
          <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
            {logs.map((log, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b border-slate-900 py-1 last:border-0"
              >
                <span className="text-slate-500">{log.timestamp}</span>
                <span
                  className={`font-bold ${log.level === "WARN" ? "text-amber-400" : "text-cyan-400"}`}
                >
                  [{log.level}]
                </span>
                <span className="text-purple-400">[{log.component}]</span>
                <span className="flex-1 text-slate-300">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
