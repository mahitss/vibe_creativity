"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  Database,
  FileText,
  Filter,
  Flame,
  GitBranch,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

interface RecommendationItemData {
  id: string;
  observation: string;
  supporting_memories: string[];
  historical_comparison: string;
  business_impact: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  confidence_score: number;
  recommended_action: string;
  linked_goal_id?: string;
  status: "PENDING" | "APPROVED" | "POSTPONED" | "DELEGATED" | "DISMISSED";
}

interface ExecutiveReflectionData {
  wins: string[];
  mistakes: string[];
  opportunities: string[];
  threats: string[];
  lessons_learned: string[];
}

export function ExecutiveReviewDashboard() {
  const [selectedType, setSelectedType] = useState<"DAILY" | "WEEKLY" | "MONTHLY" | "GOALS">("WEEKLY");

  const [recommendations, setRecommendations] = useState<RecommendationItemData[]>([
    {
      id: "rec-1",
      observation: "React & Docker architecture tutorials consistently outperform general tech news commentary.",
      supporting_memories: [
        "Analytics Agent Memory: Retention benchmark +18% over channel baseline",
        "Content Agent Memory: Masterclass course enrolled 500 VIP students ($25k milestone)",
        "Community Agent Memory: 14 repeated Discord comments requesting containerized agent walkthroughs",
      ],
      historical_comparison: "Technical deep dives yield 2.4x higher watch time compared to general industry news commentary.",
      business_impact: "HIGH",
      confidence_score: 0.96,
      recommended_action: "Increase React & Docker deep dive publishing frequency to twice per week.",
      linked_goal_id: "Q3 Revenue Goal ($25k)",
      status: "PENDING",
    },
    {
      id: "rec-2",
      observation: "CloudCorp title sponsorship deal signed; renewal opportunity ready for Q4 upgrade.",
      supporting_memories: [
        "Sponsor Agent Deal Memory: CloudCorp $12k deal closed successfully",
        "Business Agent Memory: Pricing model supports 15% tier upgrade",
        "Performance Memory: 0% audience drop-off during organic technical product demo",
      ],
      historical_comparison: "Existing sponsors renewing for Q4 convert at 85% rate when pitched 30 days prior.",
      business_impact: "CRITICAL",
      confidence_score: 0.92,
      recommended_action: "Schedule Q4 title sponsorship renewal review with CloudCorp account executive.",
      linked_goal_id: "Sponsor Revenue Pipeline",
      status: "PENDING",
    },
  ]);

  const reflections: ExecutiveReflectionData = {
    wins: [
      "Masterclass course launch hit 500 VIP students within 72 hours.",
      "Community sentiment positivity rose +22% following multi-agent system release.",
    ],
    mistakes: ["Initial video script hook lacked early code demonstration."],
    opportunities: ["Launch weekly newsletter summarizing VIP student Q&A."],
    threats: ["Burnout risk if video production cadence exceeds 3 releases per week."],
    lessons_learned: [
      "Direct community request response creates strongest audience loyalty.",
      "Repurposing video code repositories into masterclass courses yields highest revenue margin.",
    ],
  };

  const patterns = [
    { title: "Publishing Velocity", text: "2 technical deep dives per week achieves optimal audience engagement." },
    { title: "Sponsor Integration", text: "Organic technical product demos achieve 0% audience drop-off." },
    { title: "Productivity Cycle", text: "Peak creative writing occurs between 08:00 and 11:00 AM." },
  ];

  const goals = [
    { name: "Q3 Creator Revenue Milestone ($25k)", progress: 0.88, status: "ON_TRACK" },
    { name: "Community Discord Guild Growth (5k Members)", progress: 0.95, status: "NEAR_COMPLETION" },
    { name: "Multi-Agent System Masterclass Launch", progress: 1.0, status: "COMPLETED" },
  ];

  function updateRecStatus(id: string, newStatus: RecommendationItemData["status"]) {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec))
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Top COO Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase">
              Chief Operating Officer Mode
            </span>
            <span className="text-neutral-500">Grounded in Persistent Memory Substrate</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100 flex items-center gap-2">
            Executive Strategy &amp; COO Review Engine
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Autonomous COO reasoning comparing historical trends, memory evidence, pattern detection, and strategic recommendations.
          </p>
        </div>

        {/* Review Type Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 p-1 rounded-xl shadow-sm">
          {[
            { id: "DAILY", label: "Daily Brief" },
            { id: "WEEKLY", label: "Weekly Review" },
            { id: "MONTHLY", label: "Monthly Business" },
            { id: "GOALS", label: "Goal Tracker" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id as any)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition ${
                selectedType === tab.id
                  ? "bg-neutral-800 text-neutral-100 border border-neutral-700 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Review Body */}
      {selectedType !== "GOALS" && (
        <>
          {/* Grounded Recommendations Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-neutral-100 flex items-center gap-2">
                <Brain className="h-5 w-5 text-cyan-400" />
                Strategic Action Recommendations
              </h2>
              <span className="text-xs font-mono text-neutral-500">
                {recommendations.length} Recommendations Grounded
              </span>
            </div>

            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 space-y-4 transition shadow-md"
                >
                  {/* Rec Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold border ${
                            rec.business_impact === "CRITICAL"
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                              : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          }`}
                        >
                          IMPACT: {rec.business_impact}
                        </span>
                        <span className="text-cyan-400 font-bold">
                          CONFIDENCE: {Math.round(rec.confidence_score * 100)}%
                        </span>
                        {rec.linked_goal_id && (
                          <span className="text-neutral-500">Goal: {rec.linked_goal_id}</span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-neutral-100 leading-snug">{rec.observation}</h3>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-md border font-bold uppercase ${
                        rec.status === "APPROVED"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : rec.status === "POSTPONED"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          : "bg-neutral-950 border-neutral-800 text-neutral-400"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </div>

                  {/* Supporting Evidence Memory List */}
                  <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-2">
                    <p className="text-[10px] font-mono font-medium text-neutral-500 uppercase tracking-wider">
                      Supporting Memory Evidence
                    </p>
                    <ul className="space-y-1.5 text-xs text-neutral-300 font-mono">
                      {rec.supporting_memories.map((mem, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 shrink-0">↪</span>
                          <span>{mem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Historical Comparison */}
                  <div className="text-xs text-neutral-300 bg-neutral-950/60 border border-neutral-850 rounded-xl p-3.5">
                    <span className="font-bold text-neutral-200">Historical Comparison:</span> {rec.historical_comparison}
                  </div>

                  {/* Recommended Action & Convert Buttons */}
                  <div className="pt-3 border-t border-neutral-850 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-neutral-200 font-medium flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{rec.recommended_action}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateRecStatus(rec.id, "APPROVED")}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition shadow-sm"
                      >
                        Approve Mission
                      </button>
                      <button
                        onClick={() => updateRecStatus(rec.id, "POSTPONED")}
                        className="bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-xs px-3 py-1.5 rounded-lg border border-neutral-700 transition"
                      >
                        Postpone
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SWOT Analysis Matrix */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-neutral-100 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" />
              Strategic Reflections (SWOT)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-2">
                <h4 className="font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Wins &amp; Accomplishments
                </h4>
                <ul className="space-y-1.5 text-neutral-300">
                  {reflections.wins.map((w, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-2">
                <h4 className="font-bold text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Threats &amp; Risks
                </h4>
                <ul className="space-y-1.5 text-neutral-300">
                  {reflections.threats.map((t, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-2">
                <h4 className="font-bold text-cyan-400 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" /> Strategic Opportunities
                </h4>
                <ul className="space-y-1.5 text-neutral-300">
                  {reflections.opportunities.map((o, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-2">
                <h4 className="font-bold text-indigo-400 flex items-center gap-2">
                  <Brain className="h-4 w-4" /> Operational Lessons Learned
                </h4>
                <ul className="space-y-1.5 text-neutral-300">
                  {reflections.lessons_learned.map((l, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Operational Pattern Detection Grid */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-neutral-100 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              Detected Operational Patterns
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {patterns.map((pat, idx) => (
                <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{pat.title}</span>
                  <p className="text-xs text-neutral-200 leading-relaxed">{pat.text}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Goal Tracker Tab */}
      {selectedType === "GOALS" && (
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-400" />
                Creator Goal Progress &amp; Stagnation Monitor
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Every goal is connected to Executive COO reviews and automatically evaluated for progress velocity.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {goals.map((g, idx) => (
              <div key={idx} className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-100 text-sm font-sans">{g.name}</span>
                  <span className="text-emerald-400 font-bold">{Math.round(g.progress * 100)}%</span>
                </div>

                <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full" style={{ width: `${g.progress * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
