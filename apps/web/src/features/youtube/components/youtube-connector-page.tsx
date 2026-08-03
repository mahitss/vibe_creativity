"use client";

import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Compass,
  Database,
  Eye,
  FileText,
  Filter,
  Flame,
  GitBranch,
  Globe,
  Heart,
  HelpCircle,
  Layers,
  MessageSquare,
  Play,
  RefreshCw,
  Share2,
  Sparkles,
  Star,
  ThumbsUp,
  TrendingUp,
  Tv,
  Users,
  Video,
  Zap,
} from "lucide-react";

interface SyncedVideo {
  video_id: string;
  title: string;
  views: number;
  watch_time_hours: number;
  ctr_percent: number;
  retention_percent: number;
  playlist_name?: string;
}

interface SyncedComment {
  comment_id: string;
  author_name: string;
  text: string;
  like_count: number;
  is_audience_request: boolean;
  is_vip: boolean;
}

export function YouTubeConnectorPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("Just now");
  const [cursor, setCursor] = useState("cursor-yt-20260803");

  const [videos, setVideos] = useState<SyncedVideo[]>([
    {
      video_id: "yt-vid-101",
      title: "Docker Multi-Agent System Deep Dive",
      views: 18400,
      watch_time_hours: 1420.5,
      ctr_percent: 9.2,
      retention_percent: 64.5,
      playlist_name: "Autonomous Systems Series",
    },
    {
      video_id: "yt-vid-102",
      title: "Building an AI Operating System from Scratch",
      views: 34200,
      watch_time_hours: 2850.0,
      ctr_percent: 8.8,
      retention_percent: 59.1,
      playlist_name: "Autonomous Systems Series",
    },
  ]);

  const [comments] = useState<SyncedComment[]>([
    {
      comment_id: "yt-cmt-201",
      author_name: "DevMaster99",
      text: "Can you please publish a step-by-step GitHub code repository for the Docker orchestration setup?",
      like_count: 42,
      is_audience_request: true,
      is_vip: true,
    },
    {
      comment_id: "yt-cmt-202",
      author_name: "CloudArchitect",
      text: "CloudCorp sponsorship integration in this video was super clean!",
      like_count: 18,
      is_audience_request: false,
      is_vip: false,
    },
  ]);

  function handleSyncNow() {
    setIsSyncing(true);
    setTimeout(() => {
      const newVid: SyncedVideo = {
        video_id: `yt-vid-sync-${Date.now()}`,
        title: "OMNIA Living Memory Timeline Architecture",
        views: 4500,
        watch_time_hours: 380.0,
        ctr_percent: 10.1,
        retention_percent: 68.0,
        playlist_name: "Architecture Deep Dives",
      };

      setVideos((prev) => [newVid, ...prev]);
      setLastSync(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setCursor(`cursor-yt-${Date.now().toString().slice(-6)}`);
      setIsSyncing(false);
    }, 800);
  }

  return (
    <div className="space-y-8 font-sans select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold uppercase flex items-center gap-1">
              <Video className="h-3 w-3" /> YouTube Intelligence Integration
            </span>
            <span className="text-neutral-500">Continuous Memory &amp; Graph Sync</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100 flex items-center gap-2">
            Mahit Tech &amp; Code <span className="text-xs font-mono text-neutral-400 font-normal">(124,000 Subscribers)</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Automatically synchronizes videos, comments, and analytics into OMNIA's persistent memory and knowledge graph to trigger autonomous recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono text-[11px] hidden sm:block">
            <span className="text-neutral-500 block">Cursor: {cursor}</span>
            <span className="text-emerald-400 font-bold">Synced: {lastSync}</span>
          </div>

          <button
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-md shadow-rose-500/20 flex items-center gap-2 disabled:opacity-50 shrink-0"
          >
            {isSyncing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4 fill-current" />
            )}
            <span>Sync YouTube Channel</span>
          </button>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Total Views (28d)</p>
          <p className="text-xl font-bold text-neutral-100">1,420,000</p>
          <p className="text-[10px] text-emerald-400">+14% vs channel average</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Watch Time</p>
          <p className="text-xl font-bold text-cyan-400">48,200 hrs</p>
          <p className="text-[10px] text-neutral-400">28-day window</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Click-Through Rate (CTR)</p>
          <p className="text-xl font-bold text-rose-400">8.4%</p>
          <p className="text-[10px] text-emerald-400">+1.2% thumbnail boost</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-1">
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Average Retention</p>
          <p className="text-xl font-bold text-emerald-400">58.2%</p>
          <p className="text-[10px] text-neutral-400">Top 5% tech creator tier</p>
        </div>
      </section>

      {/* Synchronized Video Grid & Comment Feed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {/* Videos Grid */}
        <section className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <Video className="h-4 w-4 text-rose-400" />
              Synchronized Videos &amp; Shorts ({videos.length})
            </h3>
            <span className="text-xs font-mono text-neutral-500">Auto-Transformed to Memory</span>
          </div>

          <div className="space-y-3">
            {videos.map((vid) => (
              <div
                key={vid.video_id}
                className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    {vid.playlist_name && (
                      <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold">
                        {vid.playlist_name}
                      </span>
                    )}
                    <span className="text-neutral-500">ID: {vid.video_id}</span>
                  </div>
                  <h4 className="font-bold text-neutral-100 text-xs leading-snug">{vid.title}</h4>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-neutral-850 font-mono text-[11px] text-neutral-400">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Views</span>
                    <span className="text-neutral-200 font-bold">{vid.views.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Watch Time</span>
                    <span className="text-cyan-400 font-bold">{vid.watch_time_hours}h</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">CTR</span>
                    <span className="text-rose-400 font-bold">{vid.ctr_percent}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Retention</span>
                    <span className="text-emerald-400 font-bold">{vid.retention_percent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Comment Triage Feed */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-cyan-400" />
              Community Requests &amp; VIP Feed
            </h3>
            <span className="text-xs font-mono text-neutral-500">{comments.length} Triaged</span>
          </div>

          <div className="space-y-3">
            {comments.map((cmt) => (
              <div
                key={cmt.comment_id}
                className="bg-neutral-950 border border-neutral-850 rounded-xl p-3.5 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-neutral-200 flex items-center gap-1">
                    {cmt.author_name}
                    {cmt.is_vip && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
                        VIP
                      </span>
                    )}
                  </span>
                  <span className="text-neutral-500 flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" /> {cmt.like_count}
                  </span>
                </div>

                <p className="text-neutral-300 text-[11px] leading-relaxed font-normal">{cmt.text}</p>

                {cmt.is_audience_request && (
                  <div className="pt-2 border-t border-neutral-850 text-[10px] font-mono text-cyan-400 flex items-center gap-1 font-bold">
                    <Sparkles className="h-3 w-3" /> Audience Content Request Detected
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
