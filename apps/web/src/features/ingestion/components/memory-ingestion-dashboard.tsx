"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Database,
  FileText,
  Filter,
  GitBranch,
  Layers,
  Play,
  Plus,
  Radio,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";

interface IngestionEvent {
  id: string;
  timestamp: string;
  event_type: string;
  source: string;
  title: string;
  description: string;
  status: string;
  importance: number;
  confidence: number;
  resulting_memory_id?: string;
}

interface ExtractedMemory {
  id: string;
  category: string;
  title: string;
  description: string;
  confidence: number;
  created_at: string;
}

export function MemoryIngestionDashboard() {
  const [events, setEvents] = useState<IngestionEvent[]>([
    {
      id: "ev-ingest-1",
      timestamp: "10:42 AM",
      event_type: "COMMUNITY_INSIGHT",
      source: "DISCORD",
      title: "Discord Community Signal: Docker Tutorial Demand",
      description: "14 top comments in Discord Guild requested step-by-step Docker orchestration breakdown.",
      status: "INGESTED",
      importance: 0.88,
      confidence: 0.94,
      resulting_memory_id: "mem-comm-204",
    },
    {
      id: "ev-ingest-2",
      timestamp: "10:30 AM",
      event_type: "SPONSOR_CONTACT",
      source: "AGENT_ACTION",
      title: "CloudCorp Sponsor Agreement Renewal Proposal Drafted",
      description: "Sponsor Agent generated $12k renewal proposal with upgraded Q4 tier placement.",
      status: "INGESTED",
      importance: 0.95,
      confidence: 0.92,
      resulting_memory_id: "mem-rel-301",
    },
    {
      id: "ev-ingest-3",
      timestamp: "09:15 AM",
      event_type: "CONTENT_PUBLISHED",
      source: "YOUTUBE",
      title: "Published Docker Multi-Agent System Deep Dive",
      description: "Published video reached 18,000 views in 48 hours (+18% retention window).",
      status: "INGESTED",
      importance: 0.92,
      confidence: 0.95,
      resulting_memory_id: "mem-perf-101",
    },
  ]);

  const [memories] = useState<ExtractedMemory[]>([
    {
      id: "mem-comm-204",
      category: "COMMUNITY",
      title: "Audience Demand: Docker Multi-Agent Tutorial",
      description: "Recorded high audience signal for containerized agent platforms.",
      confidence: 0.94,
      created_at: "10:42 AM",
    },
    {
      id: "mem-rel-301",
      category: "RELATIONSHIP",
      title: "CloudCorp Sponsorship Partnership Deal",
      description: "Stored partnership contract metrics & Q4 renewal readiness.",
      confidence: 0.92,
      created_at: "10:30 AM",
    },
    {
      id: "mem-perf-101",
      category: "PERFORMANCE",
      title: "Docker Deep Dive Video Retention Peak",
      description: "Recorded +18% retention benchmark over baseline.",
      confidence: 0.95,
      created_at: "09:15 AM",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSimulateEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newEv: IngestionEvent = {
        id: `ev-sim-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        event_type: "USER_ACTION",
        source: "USER_ACTION",
        title: newTitle,
        description: newDescription || "Simulated interaction event entering ingestion queue.",
        status: "INGESTED",
        importance: 0.85,
        confidence: 0.9,
        resulting_memory_id: `mem-sim-${Date.now().toString().slice(-4)}`,
      };

      setEvents((prev) => [newEv, ...prev]);
      setNewTitle("");
      setNewDescription("");
      setIsSubmitting(false);
    }, 600);
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold uppercase">
              Admin Ingestion Pipeline
            </span>
            <span className="text-neutral-500">Continuous Cognitive Storage Substrate</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100 flex items-center gap-2">
            Memory Ingestion Pipeline &amp; Queue Telemetry
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Continuously transforms raw creator interactions, agent actions, and external signals (YouTube, Discord, GitHub, Twitter) into structured long-term memory.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-emerald-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <span>Worker Active (42.5 ev/s)</span>
          </div>
        </div>
      </div>

      {/* Queue Health Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Queue Depth</p>
          <p className="text-2xl font-bold text-neutral-100">0</p>
          <p className="text-[10px] text-emerald-400">All events processed</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Ingested Events</p>
          <p className="text-2xl font-bold text-cyan-400">{events.length + 42}</p>
          <p className="text-[10px] text-neutral-400">100% deduplicated</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Processing Latency</p>
          <p className="text-2xl font-bold text-emerald-400">14.2ms</p>
          <p className="text-[10px] text-neutral-400">Async Redis Worker</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Dead-Letter Queue (DLQ)</p>
          <p className="text-2xl font-bold text-neutral-100">0</p>
          <p className="text-[10px] text-emerald-400">0 Failures detected</p>
        </div>
      </section>

      {/* Event Ingestion Simulator Form */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
            <Plus className="h-4 w-4 text-cyan-400" />
            Simulate Incoming Event Stream
          </h3>
          <span className="text-xs font-mono text-neutral-500">Live Ingestion Test</span>
        </div>

        <form onSubmit={handleSimulateEvent} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Event Title (e.g. Creator Connected GitHub Repo)"
            className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-cyan-400 font-mono"
            required
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Event Description Context"
            className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-cyan-400 font-mono"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <Zap className="h-3.5 w-3.5 fill-current" />
                Ingest Event Now
              </>
            )}
          </button>
        </form>
      </section>

      {/* Main Grid (Raw Ingested Events Stream vs Extracted Memories) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Raw Ingested Events Stream */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              Incoming Ingested Events Stream
            </h3>
            <span className="text-xs font-mono text-neutral-500">{events.length} Ingested</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 font-sans">
            {events.map((ev) => (
              <div key={ev.id} className="bg-neutral-950 border border-neutral-850 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold uppercase">
                    {ev.source} • {ev.event_type}
                  </span>
                  <span className="text-neutral-500">{ev.timestamp}</span>
                </div>
                <h4 className="font-bold text-neutral-100">{ev.title}</h4>
                <p className="text-neutral-400 text-[11px] leading-relaxed">{ev.description}</p>
                <div className="pt-2 border-t border-neutral-850 flex items-center justify-between font-mono text-[10px] text-neutral-500">
                  <span>Score: {ev.importance}</span>
                  <span className="text-emerald-400 font-bold">Memory ID: {ev.resulting_memory_id}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real-time Extracted Memories Feed */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-400" />
              Transformed Shared Memories
            </h3>
            <span className="text-xs font-mono text-neutral-500">{memories.length} Extracted</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 font-sans">
            {memories.map((mem) => (
              <div key={mem.id} className="bg-neutral-950 border border-neutral-850 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase">
                    {mem.category} MEMORY
                  </span>
                  <span className="text-neutral-500">{mem.created_at}</span>
                </div>
                <h4 className="font-bold text-neutral-100">{mem.title}</h4>
                <p className="text-neutral-400 text-[11px] leading-relaxed">{mem.description}</p>
                <div className="pt-2 border-t border-neutral-850 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-neutral-500">Confidence: {Math.round(mem.confidence * 100)}%</span>
                  <span className="text-cyan-400 font-bold">ID: {mem.id}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
