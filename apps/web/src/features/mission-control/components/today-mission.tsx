"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  GitBranch,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";

interface TodayMissionProps {
  userDisplayName: string;
}

export function TodayMission({ userDisplayName }: TodayMissionProps) {
  const [missionStarted, setMissionStarted] = useState(false);

  const mission = {
    title: "Finalize & Launch Docker Multi-Agent System Architecture Deep Dive",
    reason:
      "Community memory shows 14 repeated requests for Docker tutorials, and audience retention peaks on Friday release windows.",
    expectedImpact:
      "+18% retention, ~12,000 developer watch hours, high potential for CloudCorp sponsor conversion.",
    estimatedTime: "45 minutes",
    priority: "CRITICAL",
    dependencies: ["OMNIA Agent Framework Q3 milestone", "CloudCorp Sponsor Agreement draft"],
    suggestedFirstStep:
      "Review Content Agent's generated 3-minute video hook & script breakdown in Content Pipeline.",
  };

  return (
    <section className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-6 font-sans shadow-lg">
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-start">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-rose-400">
              Today&apos;s Priority Mission
            </span>
            <span className="font-mono text-xs text-neutral-500">
              Synthesized by Executive Minds Agent
            </span>
          </div>

          <h2 className="max-w-2xl text-xl font-bold leading-snug tracking-tight text-neutral-100">
            {mission.title}
          </h2>
        </div>

        <button
          onClick={() => setMissionStarted(true)}
          disabled={missionStarted}
          className={`flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold shadow-sm transition ${
            missionStarted
              ? "cursor-default border border-neutral-700 bg-neutral-800 text-emerald-400"
              : "bg-neutral-100 text-neutral-950 shadow-neutral-100/10 hover:bg-white"
          }`}
        >
          {missionStarted ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Mission Active
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" />
              Start Mission
            </>
          )}
        </button>
      </div>

      {/* Grid Details */}
      <div className="grid grid-cols-1 gap-6 pt-5 text-xs text-neutral-300 md:grid-cols-2">
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
              Autonomous Rationale (Why)
            </p>
            <p className="mt-1 font-normal leading-relaxed text-neutral-200">{mission.reason}</p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
              Suggested First Step
            </p>
            <div className="mt-1.5 flex items-start gap-2 rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-neutral-200">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
              <span>{mission.suggestedFirstStep}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 font-mono text-[11px]">
          <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500">Expected Impact</p>
            <p className="mt-1 font-semibold text-emerald-400">{mission.expectedImpact}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
              <p className="text-[10px] uppercase tracking-wider text-neutral-500">Est. Time</p>
              <p className="mt-1 flex items-center gap-1.5 font-semibold text-neutral-200">
                <Clock className="h-3.5 w-3.5 text-neutral-400" />
                {mission.estimatedTime}
              </p>
            </div>

            <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
              <p className="text-[10px] uppercase tracking-wider text-neutral-500">Dependencies</p>
              <p className="mt-1 truncate font-sans text-neutral-300">{mission.dependencies[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
