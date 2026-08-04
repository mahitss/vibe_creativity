"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
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
  Heart,
  HelpCircle,
  Layers,
  Lightbulb,
  MessageSquare,
  Plus,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

interface Member {
  id: string;
  platform: string;
  username: string;
  display_name: string;
  profile_url: string;
  join_date: string;
  follower_status: boolean;
  vip_status:
    | "NONE"
    | "TOP_SUPPORTER"
    | "HELPFUL_MEMBER"
    | "POTENTIAL_MODERATOR"
    | "COMMUNITY_LEADER"
    | "COURSE_CUSTOMER";
  creator_relationship_score: number;
  trust_score: number;
  sentiment_history: number[];
  interaction_count: number;
  last_interaction: string;
  favorite_topics: string[];
  repeated_questions: string[];
  moderation_history: string[];
  achievements: string[];
  memory_references: string[];
}

interface BehaviorAlert {
  id: string;
  member_id: string;
  username: string;
  event_type: string;
  description: string;
  evidence: string;
  suggested_action: string;
}

export function CommunityWorkspace() {
  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "MEMBERS font-sans" | "VIPS" | "MODERATION" | "HEALTH"
  >("OVERVIEW");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>("mbr-alex-101");
  const [showReplyModal, setShowReplyModal] = useState<boolean>(false);

  const [members] = useState<Member[]>([
    {
      id: "mbr-alex-101",
      platform: "YouTube",
      username: "alex_dev",
      display_name: "Alex Chen",
      profile_url: "https://youtube.com/@alex_dev",
      join_date: "2025-12-10T00:00:00Z",
      follower_status: true,
      vip_status: "COMMUNITY_LEADER",
      creator_relationship_score: 0.98,
      trust_score: 0.99,
      sentiment_history: [0.95, 0.98, 0.96, 0.99],
      interaction_count: 84,
      last_interaction: "2026-08-04T19:00:00Z",
      favorite_topics: ["React", "Next.js", "Docker", "TypeScript"],
      repeated_questions: ["When is React Part 5 coming out?"],
      moderation_history: [],
      achievements: ["Top Commenter Q1", "Community Helper", "Course Graduate"],
      memory_references: ["mem-alex-help", "mem-promise-react5"],
    },
    {
      id: "mbr-sarah-102",
      platform: "Discord",
      username: "dev_sarah",
      display_name: "Sarah Miller",
      profile_url: "https://discord.com/users/dev_sarah",
      join_date: "2026-04-05T00:00:00Z",
      follower_status: true,
      vip_status: "POTENTIAL_MODERATOR",
      creator_relationship_score: 0.92,
      trust_score: 0.94,
      sentiment_history: [0.9, 0.92, 0.94],
      interaction_count: 42,
      last_interaction: "2026-08-02T14:30:00Z",
      favorite_topics: ["Python", "FastAPI", "Multi-Agent Systems"],
      repeated_questions: [],
      moderation_history: [],
      achievements: ["Discord Active Contributor"],
      memory_references: ["mem-sarah-discord"],
    },
    {
      id: "mbr-troll-103",
      platform: "YouTube",
      username: "tech_troll99",
      display_name: "Anon Tech",
      profile_url: "https://youtube.com/@tech_troll99",
      join_date: "2026-07-30T00:00:00Z",
      follower_status: false,
      vip_status: "NONE",
      creator_relationship_score: 0.15,
      trust_score: 0.2,
      sentiment_history: [-0.85, -0.9],
      interaction_count: 3,
      last_interaction: "2026-08-04T22:30:00Z",
      favorite_topics: [],
      repeated_questions: [],
      moderation_history: ["Flagged for repeated scam links on Video #4"],
      achievements: [],
      memory_references: ["mem-troll-warning"],
    },
  ]);

  const [alerts] = useState<BehaviorAlert[]>([
    {
      id: "alt-101",
      member_id: "mbr-sarah-102",
      username: "dev_sarah",
      event_type: "INACTIVE_MEMBER_RETURNED",
      description: "Sarah Miller returned after 14 days of inactivity.",
      evidence: "Posted 3 helpful answers in Discord #questions today.",
      suggested_action: "Send a personalized welcome back reply.",
    },
    {
      id: "alt-102",
      member_id: "mbr-troll-103",
      username: "tech_troll99",
      event_type: "SUDDEN_SPAM_BEHAVIOR",
      description: "Posted 3 identical telegram crypto scam links in 10 minutes.",
      evidence: "Matches known crypto scam link pattern on Video #4.",
      suggested_action: "Suggest comment deletion & shadowban approval.",
    },
  ]);

  const selectedMember = members.find((m) => m.id === selectedMemberId);

  const getVipBadgeColor = (v: string) => {
    switch (v) {
      case "COMMUNITY_LEADER":
        return "bg-violet-500/10 text-violet-400 border-violet-500/30";
      case "POTENTIAL_MODERATOR":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "TOP_SUPPORTER":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-neutral-800 text-neutral-400 border-neutral-700";
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              <Users className="h-3 w-3" /> Relationship-First Memory System
            </span>
            <span className="font-mono text-xs italic text-neutral-400">
              &quot;OMNIA understands people, not just comments.&quot;
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Community Intelligence Engine
          </h1>
          <p className="mt-1 max-w-3xl text-xs text-neutral-400">
            Remembers long-term member history, detects behavior changes, identifies VIP leaders,
            and provides explainable, context-aware moderation suggestions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:from-emerald-500 hover:to-cyan-500">
            <UserCheck className="h-3.5 w-3.5" /> Recognize VIP Member
          </button>
        </div>
      </header>

      {/* Metrics Bar */}
      <section className="grid grid-cols-2 gap-4 font-sans text-xs md:grid-cols-4">
        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Total Community Members
          </span>
          <p className="font-mono text-xl font-bold text-emerald-400">12,450 Members</p>
          <span className="font-mono text-[10px] text-neutral-400">+340 New This Month</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            VIP Leaders &amp; Helpers
          </span>
          <p className="font-mono text-xl font-bold text-violet-400">48 Recognized</p>
          <span className="font-mono text-[10px] text-neutral-400">12 Potential Moderators</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Community Health Score
          </span>
          <p className="font-mono text-xl font-bold text-cyan-400">94 / 100</p>
          <span className="font-mono text-[10px] text-neutral-400">92% Positivity Rate</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Behavior Change Alerts
          </span>
          <p className="font-mono text-xl font-bold text-amber-400">2 Active Alerts</p>
          <span className="font-mono text-[10px] text-neutral-400">
            1 Returning VIP, 1 Spam Risk
          </span>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-neutral-850 flex items-center gap-2 border-b pb-2 font-sans text-xs">
        {(
          [
            { id: "OVERVIEW", label: "Community Overview", count: members.length },
            { id: "VIPS", label: "VIP Leaderboard", count: 2 },
            { id: "MODERATION", label: "Behavior Alerts & Moderation", count: alerts.length },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "OVERVIEW" | "VIPS" | "MODERATION")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-medium transition ${
              activeTab === tab.id
                ? "border border-neutral-700 bg-neutral-800 font-semibold text-neutral-100 shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {tab.label}
            <span className="rounded-full border border-neutral-800 bg-neutral-950 px-2 py-0.5 font-mono text-[10px]">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Overview & Member Cards */}
      {activeTab === "OVERVIEW" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Member List Cards */}
          <div className="space-y-4 font-sans lg:col-span-2">
            {members.map((m) => (
              <article
                key={m.id}
                onClick={() => setSelectedMemberId(m.id)}
                className={`cursor-pointer space-y-4 rounded-2xl border bg-neutral-900 p-5 transition ${
                  selectedMemberId === m.id
                    ? "border-emerald-500 shadow-xl ring-2 ring-emerald-500/30"
                    : "hover:border-neutral-750 border-neutral-800"
                }`}
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 font-bold text-neutral-200">
                      {m.display_name.charAt(0)}
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${getVipBadgeColor(m.vip_status)}`}
                        >
                          {m.vip_status.replace("_", " ")}
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">{m.platform}</span>
                      </div>
                      <h3 className="text-base font-bold text-neutral-100">{m.display_name}</h3>
                      <p className="text-xs text-neutral-400">
                        @{m.username} • {m.interaction_count} interactions
                      </p>
                    </div>
                  </div>

                  <div className="border-neutral-850 flex shrink-0 items-center gap-2 rounded-xl border bg-neutral-950 px-3 py-1.5 font-mono text-xs">
                    <span className="text-[10px] text-neutral-500">Relationship</span>
                    <span className="font-bold text-emerald-400">
                      {(m.creator_relationship_score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="border-neutral-850 space-y-2 rounded-xl border bg-neutral-950 p-3 text-xs">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Favorite Topics &amp; Repeated Questions
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {m.favorite_topics.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-cyan-300"
                      >
                        #{t}
                      </span>
                    ))}
                    {m.repeated_questions.map((q, qIdx) => (
                      <span
                        key={qIdx}
                        className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-amber-300"
                      >
                        {q}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-neutral-850 flex items-center justify-between border-t pt-2 font-sans text-xs">
                  <span className="font-mono text-[11px] text-neutral-400">
                    Trust Score: {(m.trust_score * 100).toFixed(0)}% | Sentiment: Positive
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowReplyModal(true);
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> Draft Personalized Reply
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Member Profile Inspector Sidebar */}
          <aside className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 font-sans text-xs">
            {selectedMember ? (
              <>
                <div className="space-y-1 border-b border-neutral-800 pb-3">
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${getVipBadgeColor(selectedMember.vip_status)}`}
                  >
                    {selectedMember.vip_status.replace("_", " ")}
                  </span>
                  <h3 className="text-base font-bold text-neutral-100">
                    {selectedMember.display_name}
                  </h3>
                  <p className="text-neutral-400">
                    @{selectedMember.username} ({selectedMember.platform})
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Recognized Achievements
                  </span>
                  <div className="space-y-1.5">
                    {selectedMember.achievements.map((ach, aIdx) => (
                      <div
                        key={aIdx}
                        className="border-neutral-850 flex items-center gap-2 rounded-lg border bg-neutral-950 p-2.5 font-mono text-[11px] text-neutral-300"
                      >
                        <Award className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                        {ach}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-neutral-850 space-y-2 border-t pt-2">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Grounding Memories
                  </span>
                  <div className="space-y-1 font-mono text-[10px]">
                    {selectedMember.memory_references.map((mem, mIdx) => (
                      <span
                        key={mIdx}
                        className="block rounded border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-cyan-300"
                      >
                        {mem}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2 py-12 text-center font-mono text-xs text-neutral-500">
                <Users className="mx-auto h-6 w-6 text-neutral-600" />
                <p>Select any community member card to inspect relationship profile.</p>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Moderation & Behavior Alerts View */}
      {activeTab === "MODERATION" && (
        <div className="space-y-4 font-sans text-xs">
          <div className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Shield className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-bold text-neutral-100">
                Behavior Change Alerts &amp; Explainable Moderation
              </h3>
            </div>

            <div className="space-y-3">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className="space-y-2 rounded-xl border border-amber-500/30 bg-neutral-950 p-4"
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="font-bold uppercase text-amber-400">{a.event_type}</span>
                    <span className="text-neutral-500">@{a.username}</span>
                  </div>
                  <h4 className="font-bold text-neutral-100">{a.description}</h4>
                  <p className="text-neutral-400">Evidence: {a.evidence}</p>
                  <p className="pt-1 font-semibold text-emerald-400">
                    Suggested Action: {a.suggested_action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reply Draft Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-100">
                <MessageSquare className="h-4 w-4 text-emerald-400" /> Memory-Grounded Community
                Reply Draft
              </h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-neutral-500 hover:text-neutral-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div>
                <span className="block text-neutral-500">Recipient:</span>
                <span className="text-neutral-200">Alex Chen (@alex_dev)</span>
              </div>
              <div>
                <span className="block text-neutral-500">Draft Reply Body:</span>
                <p className="border-neutral-850 mt-1 rounded-lg border bg-neutral-950 p-3 font-sans text-xs leading-relaxed text-neutral-300">
                  Hey Alex! Really appreciate your helpful answers in the React thread. Part 5
                  (Production Deployment &amp; Docker) is currently in Scripting stage and scheduled
                  for release tomorrow!
                </p>
              </div>
            </div>

            <div className="border-neutral-850 flex items-center justify-end gap-2 border-t pt-2">
              <button
                onClick={() => setShowReplyModal(false)}
                className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 font-medium text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowReplyModal(false)}
                className="rounded-lg bg-emerald-600 px-4 py-1.5 font-semibold text-white shadow-sm hover:bg-emerald-500"
              >
                Approve &amp; Post Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
