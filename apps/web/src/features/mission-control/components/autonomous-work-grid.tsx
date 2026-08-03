"use client";

import { useState } from "react";
import {
  Bot,
  Brain,
  CheckCircle2,
  Database,
  FileText,
  Handshake,
  HelpCircle,
  MessageSquare,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { WhyInspectionModal } from "../../reasoning/components/why-inspection-modal";

export function AutonomousWorkGrid() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedRationale, setSelectedRationale] = useState("");
  const workItems = [
    {
      id: "work-1",
      agent: "Community Agent",
      title: "Analyzed 420 Community Comments & Questions",
      rationale:
        "Detected strong audience appetite for multi-agent architecture and Docker deployment instructions.",
      time: "2 hours ago",
      icon: MessageSquare,
      category: "COMMUNITY",
      badgeColor: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
    },
    {
      id: "work-2",
      agent: "Sponsor Agent",
      title: "Generated CloudCorp Partnership Renewal Draft",
      rationale:
        "Contract signals in relationship memory triggered automated follow-up proposal with Q3 placement terms.",
      time: "3 hours ago",
      icon: Handshake,
      category: "SPONSOR",
      badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    },
    {
      id: "work-3",
      agent: "Memory Agent",
      title: "Organized & Consolidated 18 Stale Memory Items",
      rationale:
        "Triaged duplicate project entries and indexed 7 new entity relationships into the knowledge graph.",
      time: "4 hours ago",
      icon: Database,
      category: "MEMORY",
      badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    },
    {
      id: "work-4",
      agent: "Analytics Agent",
      title: "Detected 18% Retention Opportunity on Tech Deep Dives",
      rationale:
        "Performance memory benchmarking indicated educational video retention surpasses short form by 18%.",
      time: "5 hours ago",
      icon: TrendingUp,
      category: "ANALYTICS",
      badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    },
    {
      id: "work-5",
      agent: "Executive Minds Agent",
      title: "Synthesized Weekly Reflection & Strategy Memory",
      rationale:
        "Merged findings from 9 specialized agents and recorded reflection memory row for executive continuity.",
      time: "6 hours ago",
      icon: Brain,
      category: "EXECUTIVE",
      badgeColor: "bg-rose-500/10 border-rose-500/30 text-rose-400",
    },
    {
      id: "work-6",
      agent: "Content Agent",
      title: "Prepared 3 Content Scripts & Repurposing Candidates",
      rationale:
        "Transformed core system release architecture into 3 modular video scripts and tweet thread drafts.",
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
          <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-100">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Autonomous Work Completed (&quot;While You Were Away&quot;)
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400">
            Every item represents concrete reasoning performed autonomously by specialized agents.
          </p>
        </div>
        <span className="font-mono text-xs text-neutral-500">
          {workItems.length} Actions Completed
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900 p-4 shadow-sm transition hover:border-neutral-700 hover:shadow-md"
            >
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${item.badgeColor}`}
                  >
                    {item.agent}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">{item.time}</span>
                </div>

                <h4 className="text-xs font-bold leading-snug text-neutral-100">{item.title}</h4>

                <div className="border-neutral-850 mt-2.5 border-t pt-2.5">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                      Why OMNIA did this
                    </p>
                    <button
                      onClick={() => {
                        setSelectedTitle(item.title);
                        setSelectedRationale(item.rationale);
                        setModalOpen(true);
                      }}
                      className="flex items-center gap-1 rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400 transition hover:text-cyan-300"
                    >
                      <HelpCircle className="h-3 w-3" /> Why?
                    </button>
                  </div>
                  <p className="text-xs font-normal leading-relaxed text-neutral-300">
                    {item.rationale}
                  </p>
                </div>
              </div>

              <div className="border-neutral-850/50 mt-3 flex items-center justify-between border-t pt-2 font-mono text-[11px] text-neutral-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Auto-executed
                </span>
                <button
                  onClick={() => {
                    setSelectedTitle(item.title);
                    setSelectedRationale(item.rationale);
                    setModalOpen(true);
                  }}
                  className="flex items-center gap-1 font-mono text-[10px] transition hover:text-cyan-400"
                >
                  View Trace →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <WhyInspectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedTitle || "Executive Reasoning Trace"}
        observation={
          selectedRationale ||
          "Educational deep dive tutorials consistently outperform general tech commentary in watch time and subscriber conversion."
        }
      />
    </section>
  );
}
