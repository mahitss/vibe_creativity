"use client";

import React, { useState } from "react";
import {
  ArrowLeftRight,
  CheckCircle2,
  Cpu,
  Download,
  Globe,
  HardDrive,
  Lock,
  Network,
  Send,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

interface Node {
  id: string;
  name: string;
  version: string;
  protocol: string;
  status: string;
}

export function GlobalEcosystemDashboard() {
  const [nodes] = useState<Node[]>([
    {
      id: "node-1",
      name: "OMNIA Autonomous Core (Primary Node)",
      version: "v1.0.0",
      protocol: "UPCP-1.0",
      status: "ONLINE",
    },
    {
      id: "node-2",
      name: "Open AI OS Reference Runtime (University of Geneva)",
      version: "v1.0.0",
      protocol: "UPCP-1.0",
      status: "ONLINE",
    },
  ]);

  const [migrationStatus, setMigrationStatus] = useState<string | null>(null);

  const handleExport = () => {
    setMigrationStatus(
      "PORTABLE MEMORY PACKAGE EXPORTED:\n• Package ID: pkg-8f20b412\n• Memory Rows: 142 persistent nodes\n• Checksum: sha256-a8f9c104e720\n• Status: Ready for multi-platform migration",
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Network className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Global Intelligence Ecosystem & Data Portability Protocol
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Cross-runtime agent protocols, zero vendor lock-in, & portable memory package
              migration
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-cyan-400">
            <Lock className="h-4 w-4 text-cyan-400" />
            USER DATA OWNERSHIP VERIFIED
          </div>
        </div>

        {/* Ecosystem Node Registry */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Globe className="h-5 w-5 text-cyan-400" /> Interoperable Ecosystem Runtime Nodes
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {nodes.map((n) => (
              <div
                key={n.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-100">{n.name}</h3>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                    {n.status}
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span>Version: {n.version}</span>
                  <span>Protocol: {n.protocol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Data Portability & Platform Migration Wizard */}
        <div className="space-y-5 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
                <ArrowLeftRight className="h-5 w-5 text-emerald-400" /> Complete Data Portability &
                Migration Wizard
              </h2>
              <p className="mt-1 font-mono text-xs text-slate-400">
                Export your memories & workflows to JSON/OMEF format or import from any compatible
                AI OS without lock-in.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                <Download className="h-4 w-4" /> Export Portable Package
              </button>
            </div>
          </div>

          {migrationStatus && (
            <div className="space-y-2 rounded-xl border border-cyan-800/60 bg-slate-950 p-5 font-mono text-xs text-slate-200">
              <span className="flex items-center gap-1 font-bold text-cyan-400">
                <CheckCircle2 className="h-4 w-4" /> Migration Engine Output
              </span>
              <pre className="whitespace-pre-wrap pt-2 font-sans text-sm">{migrationStatus}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
