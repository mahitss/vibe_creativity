"use client";

import React from "react";
import { Activity, Bot, Database, MessageSquare, RefreshCw, Zap } from "lucide-react";

export interface AutonomousActivityItem {
  id: string;
  timestamp: string;
  sourceAgent: string;
  action: string;
  reason: string;
  type: "MEMORY" | "REFLECTION" | "COMMUNITY" | "SPONSOR" | "WORKFLOW";
}

export function AutonomousActivityFeed() {
  const activities: AutonomousActivityItem[] = [
    {
      id: "act-1",
      timestamp: "10 mins ago",
      sourceAgent: "Memory Consolidation Engine",
      action: "Consolidated 4 episodic memory rows & boosted confidence score (+0.05)",
      reason: "Repeated audience engagement signals across 3 consecutive video releases.",
      type: "MEMORY",
    },
    {
      id: "act-2",
      timestamp: "25 mins ago",
      sourceAgent: "Reflection Engine",
      action: "Extracted learning pattern: 'Docker tutorial requests increased by 45%'",
      reason: "Post-execution analysis of community comment sentiment.",
      type: "REFLECTION",
    },
    {
      id: "act-3",
      timestamp: "1 hour ago",
      sourceAgent: "Community Intelligence Agent",
      action: "Scanned 142 Discord & YouTube comments and identified top 3 content requests",
      reason: "Automated background community analysis task.",
      type: "COMMUNITY",
    },
    {
      id: "act-4",
      timestamp: "2 hours ago",
      sourceAgent: "Sponsor Management Agent",
      action: "Drafted follow-up proposal for Acme Corp sponsorship deal renewal",
      reason: "Automated deal pipeline monitoring rule.",
      type: "SPONSOR",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "MEMORY":
        return <Database className="h-4 w-4 text-cyan-400" />;
      case "REFLECTION":
        return <RefreshCw className="h-4 w-4 text-purple-400" />;
      case "COMMUNITY":
        return <MessageSquare className="h-4 w-4 text-emerald-400" />;
      case "SPONSOR":
        return <Zap className="h-4 w-4 text-amber-400" />;
      default:
        return <Bot className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
          <Activity className="h-5 w-5 text-emerald-400" /> Autonomous Agent Activity Stream
        </h3>
        <span className="font-mono text-xs text-slate-400">LIVE BACKSTAGE EXECUTION</span>
      </div>

      <div className="space-y-3">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-lg border border-slate-800/60 bg-slate-950/60 p-3.5 transition hover:border-slate-700"
          >
            <div className="mt-0.5 rounded-md border border-slate-800 bg-slate-900 p-2">
              {getIcon(item.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400">{item.sourceAgent}</span>
                <span className="font-mono text-[11px] text-slate-500">{item.timestamp}</span>
              </div>
              <p className="text-xs font-medium text-slate-200">{item.action}</p>
              <p className="text-[11px] text-slate-400">Reason: {item.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
