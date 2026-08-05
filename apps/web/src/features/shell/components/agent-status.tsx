"use client";

import React from "react";
import { Cpu, CheckCircle2, RefreshCw, AlertTriangle } from "lucide-react";
import { useShell } from "../providers/shell-provider";

export function AgentStatus() {
  const { agentStatus } = useShell();

  const getStatusDetails = () => {
    switch (agentStatus) {
      case "PROCESSING":
        return {
          label: "Agent Active",
          color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
          icon: RefreshCw,
          spin: true,
        };
      case "SYNCING":
        return {
          label: "Memory Syncing",
          color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
          icon: RefreshCw,
          spin: true,
        };
      case "ERROR":
        return {
          label: "System Warning",
          color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
          icon: AlertTriangle,
          spin: false,
        };
      default:
        return {
          label: "Executive Ready",
          color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          icon: CheckCircle2,
          spin: false,
        };
    }
  };

  const details = getStatusDetails();
  const Icon = details.icon;

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium ${details.color}`}
    >
      <Icon className={`h-3 w-3 ${details.spin ? "animate-spin" : ""}`} />
      <span>{details.label}</span>
    </div>
  );
}
