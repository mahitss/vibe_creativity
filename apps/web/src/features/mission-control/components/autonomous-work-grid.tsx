"use client";

import {
  Bot,
  Brain,
  CheckCircle2,
  Database,
  FileText,
  Handshake,
  MessageSquare,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export function AutonomousWorkGrid() {
  const workItems = [
    {
      id: "work-1",
      agent: "Community Agent",
      title: "Analyzed 420 Community Comments & Questions",
      rationale: "Detected strong audience appetite for multi-agent architecture and Docker deployment instructions.",
      time: "2 hours ago",
      icon: MessageSquare,
      category: "COMMUNITY",
      badgeColor: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
    },
    {
      id: "work-2",
      agent: "Sponsor Agent",
      title: "Generated CloudCorp Partnership Renewal Draft",
      rationale: "Contract signals in relationship memory triggered automated follow-up proposal with Q3 placement terms.",
      time: "3 hours ago",
      icon: Handshake,
      category: "SPONSOR",
      badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    },
    {
      id: "work-3",
      agent: "Memory Agent",
      title: "Organized & Consolidated 18 Stale Memory Items",
      rationale: "Triaged duplicate project entries and indexed 7 new entity relationships into the knowledge graph.",
      time: "4 hours ago",
      icon: Database,
      category: "MEMORY",
      badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    },
    {
      id: "work-4",
      agent: "Analytics Agent",
      title: "Detected 18% Retention Opportunity on Tech Deep Dives",
      rationale: "Performance memory benchmarking indicated educational video retention surpasses short form by 18%.",
      time: "5 hours ago",
      icon: TrendingUp,
      category: "ANALYTICS",
      badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    },
    {
      id: "work-5",
      agent: "Executive Minds Agent",
      title: "Synthesized Weekly Reflection & Strategy Memory",
      rationale: "Merged findings from 9 specialized agents and recorded reflection memory row for executive continuity.",
      time: "6 hours ago",
      icon: Brain,
      category: "EXECUTIVE",
      badgeColor: "bg-rose-500/10 border-rose-500/30 text-rose-400",
    },
    {
      id: "work-6",
      agent: "Content Agent",
      title: "Prepared 3 Content Scripts & Repurposing Candidates",
      rationale: "Transformed core system release architecture into 3 modular video scripts and tweet thread drafts.",
      time: "7 hours ago",
      icon: FileText,
      category: "CONTENT",
      badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    },
  ];

  return (
    <section className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Autonomous Work Completed ("While You Were Away")
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Every item represents concrete reasoning performed autonomously by specialized agents.
          </p>
        </div>
        <span className="text-xs font-mono text-neutral-500">{workItems.length} Actions Completed</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 flex flex-col justify-between transition shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.agent}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">{item.time}</span>
                </div>

                <h4 className="text-xs font-bold text-neutral-100 leading-snug">{item.title}</h4>

                <div className="mt-2.5 pt-2.5 border-t border-neutral-850">
                  <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
                    Why OMNIA did this
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal">{item.rationale}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500 font-mono pt-2 border-t border-neutral-850/50">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Auto-executed
                </span>
                <span className="hover:text-neutral-300 cursor-pointer transition">View Details →</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
