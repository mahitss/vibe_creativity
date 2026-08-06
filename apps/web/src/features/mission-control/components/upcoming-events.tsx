"use client";

import React from "react";
import { Calendar, Clock, Flag, Video } from "lucide-react";

export function UpcomingEvents() {
  const events = [
    {
      id: "evt-1",
      title: "Scheduled Release: Docker Microservice Tutorial",
      type: "WORKFLOW",
      time: "Tomorrow at 15:00 UTC",
      detail: "Automated YouTube release workflow & Discord announcement",
    },
    {
      id: "evt-2",
      title: "Sponsor Contract Milestone: Acme Corp Review",
      type: "SPONSOR",
      time: "Friday, Aug 8",
      detail: "Deliver mid-roll draft for brand sign-off",
    },
    {
      id: "evt-3",
      title: "Executive Strategic Review Cycle",
      type: "EXECUTIVE",
      time: "Sunday, Aug 10",
      detail: "Weekly channel performance evaluation & mission refresh",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "WORKFLOW":
        return <Video className="h-4 w-4 text-cyan-400" />;
      case "SPONSOR":
        return <Flag className="h-4 w-4 text-amber-400" />;
      default:
        return <Clock className="h-4 w-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
          <Calendar className="h-5 w-5 text-indigo-400" /> Upcoming Scheduled Events & Milestones
        </h3>
        <span className="font-mono text-xs text-slate-400">AUTONOMOUS TIMELINE</span>
      </div>

      <div className="space-y-3">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="flex items-start gap-3 rounded-lg border border-slate-800/60 bg-slate-950/60 p-3.5"
          >
            <div className="mt-0.5 rounded-md border border-slate-800 bg-slate-900 p-2">
              {getIcon(evt.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-100">{evt.title}</h4>
                <span className="rounded border border-cyan-800/40 bg-cyan-950/40 px-2 py-0.5 font-mono text-[11px] text-cyan-400">
                  {evt.time}
                </span>
              </div>
              <p className="text-xs text-slate-400">{evt.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
