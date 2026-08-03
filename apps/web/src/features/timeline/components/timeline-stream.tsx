"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Brain,
  CheckCircle2,
  Clock,
  Database,
  FileText,
  Filter,
  Handshake,
  Lightbulb,
  MessageSquare,
  Pin,
  Search,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";

interface TimelineEventData {
  id: string;
  timestamp: string;
  event_type: string;
  evolution_stage: string;
  title: string;
  description: string;
  source: string;
  importance: number;
  confidence: number;
  agent_responsible: string;
  reflection: {
    ai_reflection: string;
    creator_reflection?: string;
    lessons_learned: string[];
    future_recommendation?: string;
  };
  is_bookmarked: boolean;
  is_pinned: boolean;
}

export function TimelineStream() {
  const [selectedGroup, setSelectedGroup] = useState<"DAY" | "WEEK" | "MONTH" | "QUARTER" | "YEAR">("MONTH");
  const [selectedType, setSelectedType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [events, setEvents] = useState<TimelineEventData[]>([
    {
      id: "ev-101",
      timestamp: "August 1, 2026",
      event_type: "PROJECT",
      evolution_stage: "REPURPOSED",
      title: "Repurposed Video into VIP Masterclass Course ($25k Milestone)",
      description: "Expanded video code repository into full 4-module creator course with 500 VIP students.",
      source: "Executive Minds Agent",
      importance: 0.95,
      confidence: 0.98,
      agent_responsible: "executive",
      is_bookmarked: true,
      is_pinned: true,
      reflection: {
        ai_reflection: "Full evolution complete: Audience request -> Video -> Course -> Revenue Goal.",
        lessons_learned: ["Repurposing content directly drives course enrollment.", "VIP Discord community acts as prime conversion funnel."],
        future_recommendation: "Launch weekly newsletter summarizing student Q&A.",
      },
    },
    {
      id: "ev-102",
      timestamp: "July 25, 2026",
      event_type: "SPONSOR",
      evolution_stage: "PUBLISHED",
      title: "CloudCorp Sponsor Partnership Signed & Video Published",
      description: "Published Docker multi-agent deep dive with CloudCorp title sponsorship placement.",
      source: "Sponsor Agent",
      importance: 0.9,
      confidence: 0.92,
      agent_responsible: "sponsor",
      is_bookmarked: true,
      is_pinned: false,
      reflection: {
        ai_reflection: "Major milestone: Video reached 18,000 views in 48 hours (+18% retention).",
        lessons_learned: ["CloudCorp integration felt organic to technical audience."],
        future_recommendation: "Prepare Q4 renewal conversation with upgraded tier placement.",
      },
    },
    {
      id: "ev-103",
      timestamp: "July 20, 2026",
      event_type: "CONTENT",
      evolution_stage: "DRAFT",
      title: "Drafted Script: Building Multi-Agent Systems in Docker",
      description: "Content Agent generated 3-minute video hook and 12-minute technical breakdown.",
      source: "Content Agent",
      importance: 0.8,
      confidence: 0.88,
      agent_responsible: "content",
      is_bookmarked: false,
      is_pinned: false,
      reflection: {
        ai_reflection: "Script aligns with creator's authoritative technical persona.",
        lessons_learned: ["Focus on early code demonstrations to maximize retention."],
      },
    },
    {
      id: "ev-104",
      timestamp: "July 15, 2026",
      event_type: "COMMUNITY",
      evolution_stage: "IDEA",
      title: "Audience Requested Docker Multi-Agent Tutorial",
      description: "14 top comments in Discord Guild requested step-by-step Docker orchestration breakdown.",
      source: "Community Agent",
      importance: 0.85,
      confidence: 0.9,
      agent_responsible: "community",
      is_bookmarked: false,
      is_pinned: false,
      reflection: {
        ai_reflection: "High audience interest signal detected in community memory.",
        lessons_learned: ["Developers struggle with multi-container agent deployment."],
        future_recommendation: "Create multi-part series on containerized agent platforms.",
      },
    },
  ]);

  function toggleBookmark(id: string) {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, is_bookmarked: !e.is_bookmarked } : e))
    );
  }

  const filteredEvents = events.filter((e) => {
    const matchesType = selectedType === "ALL" || e.event_type === selectedType;
    const matchesQuery =
      !searchQuery ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Filter & Time Grouping Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-sm">
        {/* Search */}
        <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 w-full md:w-72">
          <Search className="h-3.5 w-3.5 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memory timeline..."
            className="bg-transparent focus:outline-none w-full text-xs text-neutral-100 placeholder-neutral-500 font-sans"
          />
        </div>

        {/* Grouping Filter */}
        <div className="flex items-center gap-1 font-mono text-xs">
          {(["DAY", "WEEK", "MONTH", "QUARTER", "YEAR"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedGroup === g
                  ? "bg-neutral-800 text-neutral-100 font-bold border border-neutral-700 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1 font-mono text-xs">
          {["ALL", "CONTENT", "COMMUNITY", "SPONSOR", "PROJECT"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-2.5 py-1 rounded-md transition ${
                selectedType === t
                  ? "bg-neutral-800 text-cyan-400 font-bold border border-neutral-700"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stream Cards */}
      <div className="space-y-6 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-neutral-850">
        {filteredEvents.map((ev) => (
          <div key={ev.id} className="relative pl-14 font-sans">
            {/* Timeline Node Icon */}
            <div className="absolute left-3.5 top-5 -translate-x-1/2 h-6 w-6 rounded-full bg-neutral-900 border-2 border-cyan-400 flex items-center justify-center shadow-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
            </div>

            {/* Event Card */}
            <div className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 space-y-4 transition shadow-md">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                      {ev.event_type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300">
                      STAGE: {ev.evolution_stage}
                    </span>
                    <span className="text-neutral-500">{ev.timestamp}</span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-100 leading-snug">{ev.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(ev.id)}
                    className={`p-1.5 rounded-lg border transition ${
                      ev.is_bookmarked
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        : "bg-neutral-950 border-neutral-800 text-neutral-500 hover:text-neutral-300"
                    }`}
                    title="Bookmark Event"
                  >
                    <Bookmark className="h-4 w-4 fill-current" />
                  </button>
                  {ev.is_pinned && (
                    <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400" title="Pinned Milestone">
                      <Pin className="h-4 w-4 fill-current" />
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-normal">{ev.description}</p>

              {/* Evolution Progression Bar */}
              <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-3">
                <p className="text-[10px] font-mono font-medium text-neutral-500 uppercase tracking-wider mb-2">
                  Memory Evolution Journey
                </p>
                <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 overflow-x-auto">
                  <span className={ev.evolution_stage === "IDEA" ? "text-cyan-400 font-bold" : ""}>Idea</span>
                  <span>→</span>
                  <span className={ev.evolution_stage === "DRAFT" ? "text-cyan-400 font-bold" : ""}>Draft</span>
                  <span>→</span>
                  <span className={ev.evolution_stage === "PUBLISHED" ? "text-cyan-400 font-bold" : ""}>Published</span>
                  <span>→</span>
                  <span className={ev.evolution_stage === "REPURPOSED" ? "text-cyan-400 font-bold" : ""}>Repurposed</span>
                </div>
              </div>

              {/* AI Reflection Card */}
              {ev.reflection && (
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-200">
                    <Brain className="h-4 w-4 text-emerald-400" />
                    <span>Autonomous AI Reflection</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal">{ev.reflection.ai_reflection}</p>

                  {ev.reflection.lessons_learned?.length > 0 && (
                    <div className="pt-2 border-t border-neutral-850">
                      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Lessons Learned:</p>
                      <ul className="mt-1 space-y-1">
                        {ev.reflection.lessons_learned.map((lesson, idx) => (
                          <li key={idx} className="text-xs text-neutral-300 flex items-center gap-2 font-mono">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ev.reflection.future_recommendation && (
                    <div className="pt-2 border-t border-neutral-850 text-xs text-cyan-300 font-mono">
                      <span className="font-bold">Next Recommendation:</span> {ev.reflection.future_recommendation}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
