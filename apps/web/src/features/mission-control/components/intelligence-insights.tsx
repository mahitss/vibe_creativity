"use client";

import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export function IntelligenceInsights() {
  const insights = [
    {
      id: "ins-1",
      type: "RETENTION_GAIN",
      title: "Educational deep dives gained +18% retention over short clips.",
      recommendation: "Focus Q3 publishing schedule on multi-part architectural walkthroughs.",
      severity: "POSITIVE",
      icon: TrendingUp,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      id: "ins-2",
      type: "COMMUNITY_DEMAND",
      title: "Audience repeatedly requested Docker & Kubernetes tutorials (14 mentions).",
      recommendation: "Prioritize Docker deployment tutorial in Today's Mission.",
      severity: "OPPORTUNITY",
      icon: Lightbulb,
      iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    },
    {
      id: "ins-3",
      type: "CADENCE_WARNING",
      title: "Publishing gap detected: You haven't uploaded in six days.",
      recommendation: "Schedule announcement or short update to preserve channel velocity.",
      severity: "WARNING",
      icon: Clock,
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      id: "ins-4",
      type: "SPONSOR_OVERDUE",
      title: "CloudCorp sponsor response is 3 days overdue.",
      recommendation: "Review Sponsor Agent's prepared renewal email draft and send today.",
      severity: "URGENT",
      icon: AlertCircle,
      iconColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    },
    {
      id: "ins-5",
      type: "SENTIMENT_BOOST",
      title: "Community sentiment positivity increased +22% this week.",
      recommendation: "Host a Discord AMA or live stream to capitalizes on guild momentum.",
      severity: "POSITIVE",
      icon: MessageSquare,
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    },
  ];

  return (
    <section className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
            <Brain className="h-4 w-4 text-emerald-400" />
            Autonomous Intelligence Insights
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Derived directly from performance memory, relationship history, and community signals. Not static charts.
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {insights.map((ins) => {
          const Icon = ins.icon;
          return (
            <div
              key={ins.id}
              className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 flex items-start justify-between gap-4 transition shadow-sm"
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-lg border shrink-0 ${ins.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-100 leading-snug">{ins.title}</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    <span className="font-medium text-neutral-300">Suggested Action:</span> {ins.recommendation}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-neutral-200 shrink-0 transition pt-1">
                <span>Act</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
