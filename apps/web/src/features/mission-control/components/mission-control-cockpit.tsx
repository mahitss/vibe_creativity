"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  Command,
  FileText,
  Handshake,
  Inbox,
  Lightbulb,
  Plus,
  RefreshCw,
  Share2,
  Sparkles,
  Sun,
  ThumbsUp,
  Zap,
} from "lucide-react";

interface MissionInboxItem {
  id: string;
  title: string;
  category: "COMMUNITY" | "SPONSORSHIP" | "CONTENT";
  priority: "P1" | "P2" | "P3";
  source: string;
  status: "PENDING" | "APPROVED" | "WAITING";
  reason: string;
  impact: string;
  timestamp: string;
}

export function MissionControlCockpit() {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "WAITING">(
    "ALL",
  );

  const inboxItems: MissionInboxItem[] = [
    {
      id: "mission-1",
      title: "Create Docker Containerization Tutorial Part 1",
      category: "COMMUNITY",
      priority: "P1",
      source: "YOUTUBE DATA API",
      status: "PENDING",
      reason: "127 viewers requested Docker orchestration after React Authentication video.",
      impact: "+18% Watch Time Retention",
      timestamp: "10m ago",
    },
    {
      id: "mission-2",
      title: "CloudCorp Sponsorship Proposal Review",
      category: "SPONSORSHIP",
      priority: "P1",
      source: "SPONSOR CRM",
      status: "APPROVED",
      reason: "CloudCorp replied with a $15,000 contract offer for Q3 sponsorship.",
      impact: "$15,000 Q3 Contract Revenue",
      timestamp: "1h ago",
    },
    {
      id: "mission-3",
      title: "Containerizing Multi-Agent Systems LinkedIn Post",
      category: "CONTENT",
      priority: "P2",
      source: "CONTENT PIPELINE",
      status: "WAITING",
      reason: "Technical architecture post ready for review & publishing.",
      impact: "2.4x Executive Conversion",
      timestamp: "2h ago",
    },
    {
      id: "mission-4",
      title: "React Authentication Series Part 5 Script",
      category: "COMMUNITY",
      priority: "P2",
      source: "YOUTUBE COMMENTS",
      status: "PENDING",
      reason: "Audience requesting OAuth2 refresh token handling deep-dive.",
      impact: "+12% Subscriber Conversion",
      timestamp: "4h ago",
    },
    {
      id: "mission-5",
      title: "VIP Developer Digest #42 Newsletter Draft",
      category: "CONTENT",
      priority: "P3",
      source: "NEWSLETTER SUBSTRATE",
      status: "WAITING",
      reason: "Weekly newsletter draft ready for distribution.",
      impact: "94% VIP Open Rate",
      timestamp: "5h ago",
    },
  ];

  const filteredItems = inboxItems.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.status === activeFilter;
  });

  const pendingCount = inboxItems.filter((i) => i.status === "PENDING").length;
  const approvedCount = inboxItems.filter((i) => i.status === "APPROVED").length;
  const waitingCount = inboxItems.filter((i) => i.status === "WAITING").length;

  return (
    <div className="relative min-h-screen bg-[#000000] p-6 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-8">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      <div className="mx-auto max-w-6xl space-y-6 pt-2">
        {/* Desktop Hub Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
                {"///"} OMNIA CREATOR DESKTOP HUB
              </h1>
            </div>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-[#bbbbbb]">
              DESKTOP MISSION CONTROL • OPERATING SYSTEM ONLINE
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-3.5 py-1.5 font-bold uppercase tracking-widest text-white shadow-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {"///"} M EXECUTIVE MIND: ONLINE
            </div>
          </div>
        </div>

        {/* HIERARCHY LEVEL 1: TODAY'S FOCUS HERO DIRECTIVE (50% VISUAL WEIGHT) */}
        <div className="relative space-y-6 border border-[#1c69d4]/60 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] p-8 shadow-2xl transition-all duration-200 hover:border-[#1c69d4]">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4 font-mono text-xs">
            <div className="flex items-center gap-2 font-extrabold uppercase tracking-widest text-white">
              <Sun className="h-4 w-4 text-[#1c69d4]" /> {"///"} TODAY&apos;S FOCUS (PRIMARY
              DIRECTIVE)
            </div>
            <div className="flex items-center gap-3">
              <span className="border border-[#e22718]/40 bg-[#e22718]/10 px-2.5 py-0.5 font-bold text-white">
                P1 HIGH PRIORITY
              </span>
              <span className="border border-[#0066b1]/40 bg-[#0066b1]/10 px-2.5 py-0.5 font-bold text-white">
                STEP 2 OF 4: OUTLINE SYNTHESIZED
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-sans text-3xl font-extrabold uppercase tracking-wider text-white md:text-4xl">
              Create Docker Containerization Tutorial Part 1
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#e6e6e6]">
              127 viewers requested Docker container orchestration after your React Authentication
              video. High retention impact expected (
              <strong className="border-b border-[#1c69d4] font-mono text-white">
                +18% watch time retention baseline
              </strong>
              ).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-xs text-[#bbbbbb]">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Grounded with 127 community memory rows &amp; retention baselines</span>
            </div>

            <a
              href="/missions"
              className="flex items-center gap-2 border border-white bg-white px-8 py-3.5 font-extrabold uppercase tracking-widest text-black shadow-lg transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#e6e6e6] active:scale-[0.98]"
            >
              <Compass className="h-4 w-4" /> Open Mission Workspace →
            </a>
          </div>
        </div>

        {/* HIERARCHY LEVEL 2 & 3: MISSION INBOX & QUICK ACTIONS */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column: Mission Inbox (2/3 width) */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl lg:col-span-2">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
              <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
                <Inbox className="h-4 w-4 text-[#0066b1]" /> {"///"} MISSION INBOX
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveFilter("ALL")}
                  className={`px-2.5 py-1 font-bold uppercase transition ${
                    activeFilter === "ALL"
                      ? "border border-white bg-white text-black"
                      : "border border-[#3c3c3c] bg-[#0d0d0d] text-[#bbbbbb] hover:text-white"
                  }`}
                >
                  All ({inboxItems.length})
                </button>
                <button
                  onClick={() => setActiveFilter("PENDING")}
                  className={`px-2.5 py-1 font-bold uppercase transition ${
                    activeFilter === "PENDING"
                      ? "border border-[#e22718] bg-[#e22718]/20 text-white"
                      : "border border-[#3c3c3c] bg-[#0d0d0d] text-[#bbbbbb] hover:text-white"
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setActiveFilter("APPROVED")}
                  className={`px-2.5 py-1 font-bold uppercase transition ${
                    activeFilter === "APPROVED"
                      ? "border border-[#0066b1] bg-[#0066b1]/20 text-white"
                      : "border border-[#3c3c3c] bg-[#0d0d0d] text-[#bbbbbb] hover:text-white"
                  }`}
                >
                  Approved ({approvedCount})
                </button>
                <button
                  onClick={() => setActiveFilter("WAITING")}
                  className={`px-2.5 py-1 font-bold uppercase transition ${
                    activeFilter === "WAITING"
                      ? "border border-[#1c69d4] bg-[#1c69d4]/20 text-white"
                      : "border border-[#3c3c3c] bg-[#0d0d0d] text-[#bbbbbb] hover:text-white"
                  }`}
                >
                  Waiting ({waitingCount})
                </button>
              </div>
            </div>

            {/* Rich Mission Inbox Cards */}
            <div className="space-y-3 font-mono text-xs">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group space-y-3 border border-[#3c3c3c] bg-[#0d0d0d] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-white/80 hover:shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3c3c3c]/60 pb-2.5">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span
                        className={`border px-2 py-0.5 font-bold ${
                          item.priority === "P1"
                            ? "border-[#e22718]/60 bg-[#e22718]/20 text-white"
                            : "border-[#1c69d4]/60 bg-[#1c69d4]/20 text-white"
                        }`}
                      >
                        {item.priority}
                      </span>
                      <span className="font-bold text-[#bbbbbb]">{item.source}</span>
                      <span
                        className={`border px-2 py-0.5 font-bold ${
                          item.status === "PENDING"
                            ? "border-[#e22718]/40 bg-[#e22718]/10 text-white"
                            : item.status === "APPROVED"
                              ? "border-[#0066b1]/40 bg-[#0066b1]/10 text-white"
                              : "border-[#1c69d4]/40 bg-[#1c69d4]/10 text-white"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <span className="text-[10px] text-[#7e7e7e]">{item.timestamp}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-sans text-base font-extrabold text-white">{item.title}</h4>
                    <p className="font-sans text-xs text-[#bbbbbb]">{item.reason}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#3c3c3c]/60 pt-2.5">
                    <span className="text-[10px] font-bold text-[#1c69d4]">
                      EXPECTED IMPACT: {item.impact}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href="/missions"
                        className="inline-flex items-center gap-1 border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1.5 text-[10px] font-bold uppercase text-white transition hover:border-white"
                      >
                        Approve
                      </a>
                      <a
                        href="/missions"
                        className="inline-flex items-center gap-1.5 border border-white bg-white px-3.5 py-1.5 text-[10px] font-extrabold uppercase text-black transition hover:bg-[#e6e6e6]"
                      >
                        Inspect →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Actions & Live AI Stream (1/3 width) */}
          <div className="space-y-6">
            {/* QUICK ACTIONS COMMAND BUTTONS WITH SHORTCUT KEYCAPS */}
            <div className="space-y-3 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-xl">
              <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
                <span className="font-bold uppercase tracking-widest text-white">
                  {"///"} QUICK COMMANDS
                </span>
                <span className="text-[10px] text-[#bbbbbb]">KEYBOARD SHORTCUTS</span>
              </div>

              <div className="space-y-2">
                <a
                  href="/content"
                  className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-white"
                >
                  <span className="flex items-center gap-2.5 font-bold text-white">
                    <Plus className="h-4 w-4 text-[#0066b1]" /> Generate Content
                  </span>
                  <span className="rounded border border-[#3c3c3c] bg-[#1a1a1a] px-2 py-0.5 text-[10px] text-[#bbbbbb]">
                    ⌘G
                  </span>
                </a>

                <a
                  href="/community"
                  className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-white"
                >
                  <span className="flex items-center gap-2.5 font-bold text-white">
                    <Bot className="h-4 w-4 text-[#1c69d4]" /> Import Comments
                  </span>
                  <span className="rounded border border-[#3c3c3c] bg-[#1a1a1a] px-2 py-0.5 text-[10px] text-[#bbbbbb]">
                    ⌘I
                  </span>
                </a>

                <a
                  href="/settings"
                  className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-white"
                >
                  <span className="flex items-center gap-2.5 font-bold text-white">
                    <Zap className="h-4 w-4 text-emerald-400" /> Connect Channel
                  </span>
                  <span className="rounded border border-[#3c3c3c] bg-[#1a1a1a] px-2 py-0.5 text-[10px] text-[#bbbbbb]">
                    ⌘K
                  </span>
                </a>

                <a
                  href="/content"
                  className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-white"
                >
                  <span className="flex items-center gap-2.5 font-bold text-white">
                    <Share2 className="h-4 w-4 text-[#e22718]" /> Publish Draft
                  </span>
                  <span className="rounded border border-[#3c3c3c] bg-[#1a1a1a] px-2 py-0.5 text-[10px] text-[#bbbbbb]">
                    ⌘P
                  </span>
                </a>
              </div>
            </div>

            {/* LIVE BACKGROUND AI WORK INDICATORS */}
            <div className="space-y-3 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-xl">
              <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
                <span className="font-bold uppercase tracking-widest text-white">
                  {"///"} LIVE AI WORK LOG
                </span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              </div>

              <div className="space-y-3 text-[#e6e6e6]">
                <div className="flex items-start gap-2.5 text-[11px]">
                  <span className="mt-1 h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                  <span>● 523 YouTube comments imported from React Auth</span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px]">
                  <span className="mt-1 h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#1c69d4]" />
                  <span>● Docker Masterclass script outline generating...</span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px]">
                  <span className="mt-1 h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#0066b1]" />
                  <span>● CloudCorp $15,000 proposal ready for review</span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  <span>● Persistent memory updated (#mem-yt-comment-42)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
