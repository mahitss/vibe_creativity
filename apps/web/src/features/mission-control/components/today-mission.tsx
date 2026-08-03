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
    reason: "Community memory shows 14 repeated requests for Docker tutorials, and audience retention peaks on Friday release windows.",
    expectedImpact: "+18% retention, ~12,000 developer watch hours, high potential for CloudCorp sponsor conversion.",
    estimatedTime: "45 minutes",
    priority: "CRITICAL",
    dependencies: ["OMNIA Agent Framework Q3 milestone", "CloudCorp Sponsor Agreement draft"],
    suggestedFirstStep: "Review Content Agent's generated 3-minute video hook & script breakdown in Content Pipeline.",
  };

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden shadow-lg font-sans">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 uppercase tracking-wider">
              Today's Priority Mission
            </span>
            <span className="text-xs text-neutral-500 font-mono">Synthesized by Executive Minds Agent</span>
          </div>

          <h2 className="text-xl font-bold text-neutral-100 tracking-tight leading-snug max-w-2xl">
            {mission.title}
          </h2>
        </div>

        <button
          onClick={() => setMissionStarted(true)}
          disabled={missionStarted}
          className={`flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-lg transition shadow-sm shrink-0 ${
            missionStarted
              ? "bg-neutral-800 text-emerald-400 border border-neutral-700 cursor-default"
              : "bg-neutral-100 hover:bg-white text-neutral-950 shadow-neutral-100/10"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 text-xs text-neutral-300">
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Autonomous Rationale (Why)</p>
            <p className="mt-1 text-neutral-200 leading-relaxed font-normal">{mission.reason}</p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Suggested First Step</p>
            <div className="mt-1.5 flex items-start gap-2 bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-200">
              <ArrowRight className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{mission.suggestedFirstStep}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 font-mono text-[11px]">
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3">
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Expected Impact</p>
            <p className="mt-1 font-semibold text-emerald-400">{mission.expectedImpact}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3">
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Est. Time</p>
              <p className="mt-1 font-semibold text-neutral-200 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-neutral-400" />
                {mission.estimatedTime}
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3">
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Dependencies</p>
              <p className="mt-1 text-neutral-300 font-sans truncate">{mission.dependencies[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
