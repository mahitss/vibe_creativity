"use client";

import { useState } from "react";
import {
  Activity,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Database,
  FileText,
  Handshake,
  MessageSquare,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";

export function ActivityTimeline() {
  const [filter, setFilter] = useState("ALL");

  const timelineEvents = [
    {
      id: "ev-1",
      type: "AGENT_ACTION",
      title: "Content Agent drafted Docker Multi-Agent System script overview",
      description: "Transformed core system release architecture into 3 modular video scripts.",
      timestamp: "10:42 AM",
      icon: FileText,
      iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    },
    {
      id: "ev-2",
      type: "MEMORY_UPDATE",
      title: "Memory Agent stored REFLECTION: Q3 Release Planning Cycle",
      description: "Recorded Executive cycle outcome into persistent reflection memory substrate.",
      timestamp: "10:30 AM",
      icon: Database,
      iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    },
    {
      id: "ev-3",
      type: "CREATOR_ACTION",
      title: "Mahit updated Brand Identity preferences",
      description: "Adjusted preferred tone to 'authoritative, developer-friendly' in Identity Memory.",
      timestamp: "09:15 AM",
      icon: User,
      iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    },
    {
      id: "ev-4",
      type: "SPONSOR_UPDATE",
      title: "Sponsor Agent generated CloudCorp Renewal Proposal",
      rationale: "Contract expiration in 14 days triggered automated partnership renewal outreach.",
      timestamp: "08:50 AM",
      icon: Handshake,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      id: "ev-5",
      type: "ANALYTICS_EVENT",
      title: "Analytics Agent flagged retention trend (+18%)",
      description: "Audience retention on deep dive tutorials surpassed channel baseline.",
      timestamp: "08:10 AM",
      icon: TrendingUp,
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
  ];

  const filteredEvents = timelineEvents.filter((ev) => filter === "ALL" || ev.type === filter);

  return (
    <section className="border-t border-neutral-800 bg-neutral-950 p-4 font-sans text-xs shrink-0">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-neutral-400" />
          <h4 className="font-bold text-neutral-100">Chronological Activity Timeline</h4>
          <span className="text-[10px] font-mono text-neutral-500">Live Agent Feed</span>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 font-mono text-[10px]">
          {["ALL", "AGENT_ACTION", "MEMORY_UPDATE", "SPONSOR_UPDATE"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-md transition ${
                filter === f
                  ? "bg-neutral-800 text-neutral-100 font-bold border border-neutral-700"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline items horizontal/vertical list */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {filteredEvents.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between bg-neutral-900 border border-neutral-850 rounded-lg px-3 py-2 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-md border shrink-0 ${item.iconColor}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-medium text-neutral-100">{item.title}</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{item.description}</p>
                </div>
              </div>
              <span className="font-mono text-[10px] text-neutral-500 shrink-0 ml-4">{item.timestamp}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
