"use client";

import {
  Activity,
  Bot,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

export function RightIntelligencePanel() {
  const memoryHealth = [
    { type: "IDENTITY", count: 12, health: 1.0 },
    { type: "RELATIONSHIP", count: 18, health: 0.95 },
    { type: "PROJECT", count: 24, health: 1.0 },
    { type: "PERFORMANCE", count: 15, health: 0.9 },
    { type: "COMMUNITY", count: 32, health: 0.98 },
    { type: "REFLECTION", count: 8, health: 1.0 },
    { type: "EPISODE", count: 45, health: 1.0 },
  ];

  const recentReasoning = [
    {
      agent: "Executive Minds",
      thought: "Synthesized Docker tutorial community demand against CloudCorp sponsor milestone.",
      time: "10m ago",
    },
    {
      agent: "Planner Agent",
      thought: "Priority score for Docker Deep Dive video set to 0.92 (HIGH).",
      time: "25m ago",
    },
    {
      agent: "Analytics Agent",
      thought: "Correlated +18% retention window with Friday 2:00 PM UTC upload cadence.",
      time: "40m ago",
    },
    {
      agent: "Memory Agent",
      thought: "Consolidated 3 duplicate episode rows into unified Q3 launch timeline.",
      time: "1h ago",
    },
  ];

  return (
    <aside className="w-80 border-l border-neutral-800 bg-neutral-950 p-4 space-y-6 shrink-0 font-sans text-xs">
      {/* Executive Agent Status */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-100 flex items-center justify-center">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-100">Executive Minds Agent</h4>
              <p className="text-[10px] font-mono text-neutral-400">Autonomous Orchestrator</p>
            </div>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
        </div>

        <div className="pt-2 border-t border-neutral-800 font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Current Focus:</span>
            <span className="text-neutral-200 font-sans font-medium">Q3 Enterprise Release</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Confidence:</span>
            <span className="text-emerald-400">94.8%</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Planning Progress:</span>
            <span className="text-cyan-400">Cycle 4 / Completed</span>
          </div>
        </div>
      </div>

      {/* Memory Health Breakdown */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-neutral-100 flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-400" />
            Shared Memory Substrate
          </h4>
          <span className="text-[10px] font-mono text-emerald-400">100% Grounded</span>
        </div>

        <div className="space-y-2 pt-1 font-mono text-[11px]">
          {memoryHealth.map((mem) => (
            <div key={mem.type} className="flex items-center justify-between">
              <span className="text-neutral-400 text-[10px]">{mem.type}</span>
              <div className="flex items-center gap-2">
                <span className="text-neutral-200 font-bold">{mem.count}</span>
                <div className="w-12 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${mem.health * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reasoning Log Stream */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-neutral-100 flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            Live Reasoning Stream
          </h4>
          <span className="text-[10px] font-mono text-neutral-500">Task Bus Log</span>
        </div>

        <div className="space-y-3 pt-1">
          {recentReasoning.map((item, idx) => (
            <div key={idx} className="bg-neutral-955 border border-neutral-850 rounded-lg p-2.5 space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-cyan-400 font-medium">{item.agent}</span>
                <span className="text-neutral-500">{item.time}</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed font-normal">{item.thought}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
