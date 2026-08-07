"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Database,
  FileText,
  Filter,
  Flame,
  GitBranch,
  Layers,
  Lightbulb,
  ListOrdered,
  Plus,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  content_type: string;
  platform: string;
  series_id?: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  target_audience: string;
  status:
    | "IDEA"
    | "RESEARCH"
    | "OUTLINE"
    | "SCRIPT"
    | "RECORDING"
    | "EDITING"
    | "THUMBNAIL"
    | "SCHEDULED"
    | "PUBLISHED"
    | "REPURPOSED"
    | "ARCHIVED";
  difficulty: string;
  estimated_time_hours: number;
  business_impact: number;
  audience_impact: number;
  deadline?: string;
  memory_links: string[];
  score: number;
}

interface SeriesTracker {
  series_id: string;
  title: string;
  total_episodes: number;
  published_episodes: number;
  overdue_episode?: string;
  audience_waiting_count: number;
  next_episode_title: string;
}

export function ContentStrategyWorkspace() {
  const [activeTab, setActiveTab] = useState<"ROADMAP" | "INBOX font-sans" | "SERIES" | "GAPS">(
    "ROADMAP",
  );
  const [items, setItems] = useState<ContentItem[]>([
    {
      id: "cnt-101",
      title: "React Series Part 5: Production Deployment & Docker",
      description:
        "Final episode of React series covering Docker containerization, CI/CD, and Vercel deployment.",
      content_type: "SERIES_EPISODE",
      platform: "YouTube",
      series_id: "srs-react-101",
      priority: "CRITICAL",
      target_audience: "React Developers",
      status: "SCRIPT",
      difficulty: "MODERATE",
      estimated_time_hours: 6.0,
      business_impact: 0.92,
      audience_impact: 0.96,
      deadline: "2026-08-05T18:00:00Z",
      memory_links: ["mem-promise-react5", "mem-community-react-requests"],
      score: 0.96,
    },
    {
      id: "cnt-102",
      title: "Docker Multi-Agent Systems Complete Guide",
      description:
        "Step-by-step masterclass tutorial on containerizing Python & Node.js AI agent clusters.",
      content_type: "YOUTUBE_VIDEO",
      platform: "YouTube",
      series_id: undefined,
      priority: "HIGH",
      target_audience: "AI & DevOps Engineers",
      status: "RESEARCH",
      difficulty: "HARD",
      estimated_time_hours: 12.0,
      business_impact: 0.95,
      audience_impact: 0.92,
      deadline: "2026-08-08T00:00:00Z",
      memory_links: ["mem-101", "mem-104", "ent-docker-idea"],
      score: 0.93,
    },
    {
      id: "cnt-103",
      title: "CloudCorp Enterprise Developer Platform Integration",
      description: "Dedicated 60-second integrated sponsor read & workflow demo for CloudCorp.",
      content_type: "SPONSOR_INTEGRATION",
      platform: "YouTube",
      series_id: undefined,
      priority: "HIGH",
      target_audience: "Enterprise Developers",
      status: "OUTLINE",
      difficulty: "EASY",
      estimated_time_hours: 3.0,
      business_impact: 0.98,
      audience_impact: 0.85,
      deadline: "2026-08-07T00:00:00Z",
      memory_links: ["mem-cloudcorp-deal"],
      score: 0.91,
    },
    {
      id: "cnt-104",
      title: "Repurpose Docker Architecture into 3 YouTube Shorts",
      description:
        "Extract 60-second micro-tips on Docker container isolation and environment vars.",
      content_type: "SHORTS",
      platform: "YouTube Shorts & TikTok",
      series_id: undefined,
      priority: "MEDIUM",
      target_audience: "Short-Form Viewers",
      status: "IDEA",
      difficulty: "EASY",
      estimated_time_hours: 2.0,
      business_impact: 0.75,
      audience_impact: 0.88,
      deadline: "2026-08-11T00:00:00Z",
      memory_links: ["mem-repurpose-opportunity"],
      score: 0.82,
    },
  ]);

  const [series] = useState<SeriesTracker[]>([
    {
      series_id: "srs-react-101",
      title: "Full-Stack React & Next.js Masterclass",
      total_episodes: 5,
      published_episodes: 4,
      overdue_episode: "React Series Part 5 (8 Days Overdue)",
      audience_waiting_count: 142,
      next_episode_title: "Part 5: Production Deployment & Docker",
    },
    {
      series_id: "srs-docker-202",
      title: "Autonomous Multi-Agent Architecture",
      total_episodes: 4,
      published_episodes: 1,
      overdue_episode: undefined,
      audience_waiting_count: 60,
      next_episode_title: "Part 2: Multi-Container Orchestration",
    },
  ]);

  const handleStatusChange = (id: string, newStatus: ContentItem["status"]) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)),
    );
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case "CRITICAL":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "HIGH":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex items-center gap-1 border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
              <Lightbulb className="h-3 w-3" /> Content Drafts
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100">Publishing Drafts</h1>
          <p className="mt-1 text-xs text-neutral-400">Which draft should you publish next?</p>
        </div>
      </header>

      {/* Drafts List */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="border border-[#3c3c3c] bg-[#1a1a1a] p-8 text-center text-xs text-[#bbbbbb]">
            No content recommendations generated. Click &apos;Add Content Idea&apos; to create one.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="space-y-3 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-xl transition hover:border-white"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">
                      {item.platform.toUpperCase()}
                    </span>
                    <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-2 py-0.5 font-mono text-[10px] uppercase text-[#bbbbbb]">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-sans text-xl font-bold text-white">{item.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <button className="border border-[#3c3c3c] bg-[#0d0d0d] px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:border-white">
                    Preview
                  </button>
                  <button className="border border-[#3c3c3c] bg-[#0d0d0d] px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:border-white">
                    Edit
                  </button>
                  <button
                    onClick={() => handleStatusChange(item.id, "PUBLISHED")}
                    className="border border-white bg-white px-5 py-2 font-mono text-xs font-extrabold uppercase text-black hover:bg-[#e6e6e6]"
                  >
                    Publish →
                  </button>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[#e6e6e6]">{item.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Roadmap View */}
      {false && (
        <div className="grid grid-cols-1 gap-6 font-sans md:grid-cols-3">
          {/* Today's Focus */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 font-mono text-xs text-rose-400">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Flame className="h-3.5 w-3.5" /> Today&apos;s Focus
              </span>
              <span className="rounded border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px]">
                Immediate
              </span>
            </div>

            {items
              .filter((i) => i.priority === "CRITICAL" || i.status === "SCRIPT")
              .map((item) => (
                <article
                  key={item.id}
                  className="space-y-3 rounded-2xl border border-rose-500/30 bg-neutral-900 p-4 shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${getPriorityColor(item.priority)}`}
                    >
                      {item.priority}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      Score: {(item.score * 100).toFixed(0)}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-neutral-100">{item.title}</h3>
                  <p className="text-[11px] leading-relaxed text-neutral-400">{item.description}</p>

                  <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
                    {item.memory_links.map((m, idx) => (
                      <span
                        key={idx}
                        className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-cyan-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="border-neutral-850 flex items-center justify-between border-t pt-2 text-xs">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as ContentItem["status"])
                      }
                      className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 font-mono text-[10px] text-neutral-300 focus:outline-none"
                    >
                      {[
                        "IDEA",
                        "RESEARCH",
                        "OUTLINE",
                        "SCRIPT",
                        "RECORDING",
                        "EDITING",
                        "THUMBNAIL",
                        "SCHEDULED",
                        "PUBLISHED",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <button className="rounded border border-cyan-500/40 bg-cyan-600/20 px-2.5 py-1 font-mono text-[10px] font-semibold text-cyan-300 transition hover:bg-cyan-600/30">
                      Mission
                    </button>
                  </div>
                </article>
              ))}
          </div>

          {/* This Week */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 font-mono text-xs text-amber-400">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Clock className="h-3.5 w-3.5" /> This Week
              </span>
              <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px]">
                High Priority
              </span>
            </div>

            {items
              .filter((i) => i.priority === "HIGH" && i.status !== "SCRIPT")
              .map((item) => (
                <article
                  key={item.id}
                  className="space-y-3 rounded-2xl border border-amber-500/30 bg-neutral-900 p-4 shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${getPriorityColor(item.priority)}`}
                    >
                      {item.priority}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      Score: {(item.score * 100).toFixed(0)}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-neutral-100">{item.title}</h3>
                  <p className="text-[11px] leading-relaxed text-neutral-400">{item.description}</p>

                  <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
                    {item.memory_links.map((m, idx) => (
                      <span
                        key={idx}
                        className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-cyan-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="border-neutral-850 flex items-center justify-between border-t pt-2 text-xs">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as ContentItem["status"])
                      }
                      className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 font-mono text-[10px] text-neutral-300 focus:outline-none"
                    >
                      {[
                        "IDEA",
                        "RESEARCH",
                        "OUTLINE",
                        "SCRIPT",
                        "RECORDING",
                        "EDITING",
                        "THUMBNAIL",
                        "SCHEDULED",
                        "PUBLISHED",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <button className="rounded border border-cyan-500/40 bg-cyan-600/20 px-2.5 py-1 font-mono text-[10px] font-semibold text-cyan-300 transition hover:bg-cyan-600/30">
                      Mission
                    </button>
                  </div>
                </article>
              ))}
          </div>

          {/* Monthly & Quarter Strategy */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 font-mono text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Target className="h-3.5 w-3.5" /> Month &amp; Quarter
              </span>
              <span className="rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px]">
                Strategic
              </span>
            </div>

            {items
              .filter((i) => i.priority === "MEDIUM" || i.priority === "LOW")
              .map((item) => (
                <article
                  key={item.id}
                  className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${getPriorityColor(item.priority)}`}
                    >
                      {item.priority}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      Score: {(item.score * 100).toFixed(0)}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-neutral-100">{item.title}</h3>
                  <p className="text-[11px] leading-relaxed text-neutral-400">{item.description}</p>

                  <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
                    {item.memory_links.map((m, idx) => (
                      <span
                        key={idx}
                        className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-cyan-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="border-neutral-850 flex items-center justify-between border-t pt-2 text-xs">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as ContentItem["status"])
                      }
                      className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 font-mono text-[10px] text-neutral-300 focus:outline-none"
                    >
                      {[
                        "IDEA",
                        "RESEARCH",
                        "OUTLINE",
                        "SCRIPT",
                        "RECORDING",
                        "EDITING",
                        "THUMBNAIL",
                        "SCHEDULED",
                        "PUBLISHED",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <button className="rounded border border-cyan-500/40 bg-cyan-600/20 px-2.5 py-1 font-mono text-[10px] font-semibold text-cyan-300 transition hover:bg-cyan-600/30">
                      Mission
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </div>
      )}

      {/* Series Tracker View */}
      {activeTab === "SERIES" && (
        <div className="grid grid-cols-1 gap-6 font-sans md:grid-cols-2">
          {series.map((s) => (
            <div
              key={s.series_id}
              className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl"
            >
              <div className="flex items-start justify-between gap-2 border-b border-neutral-800 pb-3">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                    Series Progress Tracker
                  </span>
                  <h3 className="text-base font-bold text-neutral-100">{s.title}</h3>
                </div>
                <span className="border-neutral-850 rounded border bg-neutral-950 px-2.5 py-1 font-mono text-xs font-bold">
                  {s.published_episodes} / {s.total_episodes} Episodes
                </span>
              </div>

              {s.overdue_episode && (
                <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 font-mono text-xs text-rose-300">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 animate-pulse text-rose-400" />
                    {s.overdue_episode}
                  </span>
                  <span className="font-bold text-rose-400">
                    {s.audience_waiting_count} Subs Waiting
                  </span>
                </div>
              )}

              <div className="space-y-1 font-mono text-xs">
                <span className="block text-[11px] text-neutral-400">
                  Next Recommended Episode:
                </span>
                <p className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5 font-bold text-cyan-300">
                  {s.next_episode_title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gap Analysis View */}
      {activeTab === "GAPS" && (
        <div className="space-y-4 font-sans text-xs">
          <div className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-neutral-100">
                AI Content Gap Analysis &amp; Opportunities
              </h3>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5 rounded-xl border border-rose-500/30 bg-neutral-950 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase text-rose-400">
                    Overdue Series Episode
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">Impact: 96%</span>
                </div>
                <h4 className="font-bold text-neutral-100">
                  React Part 5 is 8 days overdue. 142 subscribers waiting.
                </h4>
                <p className="text-neutral-400">
                  Evidence: Comment thread pinned on video #4 + Discord inquiry cluster.
                </p>
                <p className="pt-1 font-semibold text-emerald-400">
                  Suggested Action: Prioritize Scripting &amp; Recording for React Part 5 today.
                </p>
              </div>

              <div className="space-y-1.5 rounded-xl border border-amber-500/30 bg-neutral-950 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase text-amber-400">
                    High-Demand Topic Cluster
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">Impact: 93%</span>
                </div>
                <h4 className="font-bold text-neutral-100">
                  60 distinct users requested a Docker Multi-Agent guide.
                </h4>
                <p className="text-neutral-400">
                  Evidence: 42 Discord upvotes + 18 YouTube comment requests.
                </p>
                <p className="pt-1 font-semibold text-emerald-400">
                  Suggested Action: Promote Docker Multi-Agent Guide from Research to Outline.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
