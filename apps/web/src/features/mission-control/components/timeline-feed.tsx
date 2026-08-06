"use client";

import React from "react";
import { CheckCircle2, GitBranch, Layers, UserCheck } from "lucide-react";

export interface TimelineFeedItem {
  id: string;
  timestamp: string;
  category: "CREATOR" | "RUNTIME" | "AGENT" | "MEMORY" | "WORKFLOW";
  title: string;
  description: string;
}

export function TimelineFeed() {
  const feed: TimelineFeedItem[] = [
    {
      id: "feed-1",
      timestamp: "10:14 AM",
      category: "CREATOR",
      title: "Creator Approved Mission",
      description: "Approved 'Publish Pre-Sponsor Tutorial Video' execution plan.",
    },
    {
      id: "feed-2",
      timestamp: "09:45 AM",
      category: "AGENT",
      title: "Executive Mind Reasoned",
      description: "Resolved multi-agent conflict between Content Agent & Sponsor Agent.",
    },
    {
      id: "feed-3",
      timestamp: "08:30 AM",
      category: "MEMORY",
      title: "Memory Row Persisted",
      description: "Stored new Goal memory: 'Increase Engagement by 25%'.",
    },
    {
      id: "feed-4",
      timestamp: "07:15 AM",
      category: "RUNTIME",
      title: "Runtime Scheduler Executed",
      description: "Completed background job: 'Periodic Memory Consolidation'.",
    },
  ];

  const getIcon = (cat: string) => {
    switch (cat) {
      case "CREATOR":
        return <UserCheck className="h-3.5 w-3.5 text-emerald-400" />;
      case "MEMORY":
        return <Layers className="h-3.5 w-3.5 text-cyan-400" />;
      case "WORKFLOW":
        return <GitBranch className="h-3.5 w-3.5 text-indigo-400" />;
      default:
        return <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
          <GitBranch className="h-5 w-5 text-cyan-400" /> Chronological Timeline Feed
        </h3>
        <span className="font-mono text-xs text-slate-400">AUDIT EVENT STREAM</span>
      </div>

      <div className="relative space-y-4 pl-6 before:absolute before:bottom-2 before:left-2.5 before:top-2 before:w-0.5 before:bg-slate-800">
        {feed.map((item) => (
          <div key={item.id} className="relative flex items-start gap-3 font-mono text-xs">
            <div className="absolute -left-6 mt-0.5 rounded-full border border-slate-800 bg-slate-950 p-1">
              {getIcon(item.category)}
            </div>
            <div className="flex-1 space-y-1 rounded-lg border border-slate-800/60 bg-slate-950/60 p-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{item.title}</span>
                <span className="text-[10px] text-slate-500">{item.timestamp}</span>
              </div>
              <p className="font-sans text-slate-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
