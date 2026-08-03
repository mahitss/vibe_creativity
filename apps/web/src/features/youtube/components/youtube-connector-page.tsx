"use client";

import { useState } from "react";
import { MessageSquare, RefreshCw, Sparkles, ThumbsUp, Video, Zap } from "lucide-react";

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
    <div className="select-none space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2 font-mono text-xs">
            <span className="flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 font-bold uppercase text-rose-400">
              <Video className="h-3 w-3" /> YouTube Intelligence Integration
            </span>
            <span className="text-neutral-500">Continuous Memory &amp; Graph Sync</span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Mahit Tech &amp; Code{" "}
            <span className="font-mono text-xs font-normal text-neutral-400">
              (124,000 Subscribers)
            </span>
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-neutral-400">
            Automatically synchronizes videos, comments, and analytics into OMNIA&apos;s persistent
            memory and knowledge graph to trigger autonomous recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right font-mono text-[11px] sm:block">
            <span className="block text-neutral-500">Cursor: {cursor}</span>
            <span className="font-bold text-emerald-400">Synced: {lastSync}</span>
          </div>

          <button
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-rose-500/20 transition hover:from-rose-500 hover:to-red-500 disabled:opacity-50"
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
      <section className="grid grid-cols-2 gap-4 font-mono text-xs md:grid-cols-4">
        <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">Total Views (28d)</p>
          <p className="text-xl font-bold text-neutral-100">1,420,000</p>
          <p className="text-[10px] text-emerald-400">+14% vs channel average</p>
        </div>

        <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">Watch Time</p>
          <p className="text-xl font-bold text-cyan-400">48,200 hrs</p>
          <p className="text-[10px] text-neutral-400">28-day window</p>
        </div>

        <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">
            Click-Through Rate (CTR)
          </p>
          <p className="text-xl font-bold text-rose-400">8.4%</p>
          <p className="text-[10px] text-emerald-400">+1.2% thumbnail boost</p>
        </div>

        <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">Average Retention</p>
          <p className="text-xl font-bold text-emerald-400">58.2%</p>
          <p className="text-[10px] text-neutral-400">Top 5% tech creator tier</p>
        </div>
      </section>

      {/* Synchronized Video Grid & Comment Feed */}
      <div className="grid grid-cols-1 gap-6 font-sans md:grid-cols-3">
        {/* Videos Grid */}
        <section className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:col-span-2">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-100">
              <Video className="h-4 w-4 text-rose-400" />
              Synchronized Videos &amp; Shorts ({videos.length})
            </h3>
            <span className="font-mono text-xs text-neutral-500">Auto-Transformed to Memory</span>
          </div>

          <div className="space-y-3">
            {videos.map((vid) => (
              <div
                key={vid.video_id}
                className="border-neutral-850 flex flex-col justify-between space-y-3 rounded-xl border bg-neutral-950 p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    {vid.playlist_name && (
                      <span className="rounded border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 font-bold text-rose-400">
                        {vid.playlist_name}
                      </span>
                    )}
                    <span className="text-neutral-500">ID: {vid.video_id}</span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug text-neutral-100">{vid.title}</h4>
                </div>

                <div className="border-neutral-850 grid grid-cols-4 gap-2 border-t pt-2 font-mono text-[11px] text-neutral-400">
                  <div>
                    <span className="block text-[10px] text-neutral-500">Views</span>
                    <span className="font-bold text-neutral-200">{vid.views.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500">Watch Time</span>
                    <span className="font-bold text-cyan-400">{vid.watch_time_hours}h</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500">CTR</span>
                    <span className="font-bold text-rose-400">{vid.ctr_percent}%</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500">Retention</span>
                    <span className="font-bold text-emerald-400">{vid.retention_percent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Comment Triage Feed */}
        <section className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-100">
              <MessageSquare className="h-4 w-4 text-cyan-400" />
              Community Requests &amp; VIP Feed
            </h3>
            <span className="font-mono text-xs text-neutral-500">{comments.length} Triaged</span>
          </div>

          <div className="space-y-3">
            {comments.map((cmt) => (
              <div
                key={cmt.comment_id}
                className="border-neutral-850 space-y-2 rounded-xl border bg-neutral-950 p-3.5 text-xs"
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="flex items-center gap-1 font-bold text-neutral-200">
                    {cmt.author_name}
                    {cmt.is_vip && (
                      <span className="py-0.2 rounded border border-amber-500/30 bg-amber-500/10 px-1.5 font-bold text-amber-400">
                        VIP
                      </span>
                    )}
                  </span>
                  <span className="flex items-center gap-1 text-neutral-500">
                    <ThumbsUp className="h-3 w-3" /> {cmt.like_count}
                  </span>
                </div>

                <p className="text-[11px] font-normal leading-relaxed text-neutral-300">
                  {cmt.text}
                </p>

                {cmt.is_audience_request && (
                  <div className="border-neutral-850 flex items-center gap-1 border-t pt-2 font-mono text-[10px] font-bold text-cyan-400">
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
