"use client";

import React, { useState } from "react";
import {
  Activity,
  Cpu,
  Download,
  HardDrive,
  Layers,
  Package,
  ShieldCheck,
  ToggleRight,
  Upload,
} from "lucide-react";

interface Plugin {
  id: string;
  version: string;
  author: string;
  status: string;
  description: string;
}

interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  rollout: number;
}

export function AdminConsoleDashboard() {
  const [plugins] = useState<Plugin[]>([
    {
      id: "plugin-youtube-connector",
      version: "1.0.0",
      author: "OMNIA Core",
      status: "ACTIVE",
      description: "YouTube Data API & Analytics Connector Plugin",
    },
    {
      id: "plugin-discord-bot-sdk",
      version: "1.2.0",
      author: "Dev Community",
      status: "ACTIVE",
      description: "Discord Community Event & Message Listener",
    },
  ]);

  const [flags, setFlags] = useState<FeatureFlag[]>([
    { id: "ff-realtime-voice", name: "Realtime Voice Mode", enabled: true, rollout: 100 },
    { id: "ff-mcp-connector", name: "MCP Server Connectors", enabled: true, rollout: 100 },
  ]);

  const [backupExported, setBackupExported] = useState<string | null>(null);

  const toggleFlag = (id: string) => {
    setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  const handleExportBackup = () => {
    setBackupExported(
      JSON.stringify(
        {
          backup_id: "bak-a9b8c7",
          workspace_id: "ws-101",
          memory_count: 142,
          knowledge_nodes: 68,
          checksum: "e3b0c44298fc1c14",
          created_at: new Date().toISOString(),
        },
        null,
        2,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Cpu className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                OMNIA Admin Console & Developer SDK
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Extensible platform management — Plugin SDK, Feature Flags, Workspace Telemetry, &
              Backup/Restore
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-emerald-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            PLATFORM HEALTH: 100% OPERATIONAL
          </div>
        </div>

        {/* Runtime Metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Installed Plugins</span>
            <p className="font-mono text-2xl font-bold text-slate-100">2 Active Plugins</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Memory Substrate Usage</span>
            <p className="font-mono text-2xl font-bold text-cyan-400">142.5 MB</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">System Uptime</span>
            <p className="font-mono text-2xl font-bold text-emerald-400">99.99% Uptime</p>
          </div>
        </div>

        {/* Plugins Directory */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Package className="h-5 w-5 text-cyan-400" /> Installed Plugin Extensions (Plugin SDK)
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {plugins.map((p) => (
              <div
                key={p.id}
                className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-100">{p.id}</h3>
                  <span className="rounded border border-emerald-800/40 bg-emerald-950/40 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400">
                    v{p.version} • {p.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{p.description}</p>
                <span className="font-mono text-[10px] text-slate-500">Author: {p.author}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Flags */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <ToggleRight className="h-5 w-5 text-purple-400" /> Feature Flags & Workspace Rollouts
          </h2>
          <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            {flags.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{f.name}</h4>
                  <span className="font-mono text-xs text-slate-400">
                    Flag ID: {f.id} • Rollout: {f.rollout}%
                  </span>
                </div>
                <button
                  onClick={() => toggleFlag(f.id)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition ${
                    f.enabled
                      ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                      : "border border-slate-700 bg-slate-800 text-slate-400"
                  }`}
                >
                  {f.enabled ? "ENABLED" : "DISABLED"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Backup & Restore */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
              <HardDrive className="h-5 w-5 text-amber-400" /> Workspace Backup & Point-In-Time
              Restore
            </h2>
            <button
              onClick={handleExportBackup}
              className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 font-mono text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              <Download className="h-4 w-4" /> Export Workspace JSON Backup
            </button>
          </div>

          {backupExported && (
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs">
              <span className="flex items-center gap-1 font-bold text-cyan-400">
                <HardDrive className="h-4 w-4" /> Exported Backup Snapshot JSON
              </span>
              <pre className="whitespace-pre-wrap pt-2 text-slate-200">{backupExported}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
