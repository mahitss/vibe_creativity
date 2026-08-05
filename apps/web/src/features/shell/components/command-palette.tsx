"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Lightbulb,
  Users,
  Handshake,
  Workflow,
  Brain,
  Database,
  Globe,
  Clock,
  TrendingUp,
  BarChart3,
  Settings,
  X,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useShell } from "../providers/shell-provider";

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, theme, setTheme } = useShell();
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery("");
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const commands = [
    {
      id: "c1",
      category: "Navigation",
      title: "Go to Mission Control",
      icon: LayoutDashboard,
      action: () => router.push("/dashboard"),
    },
    {
      id: "c2",
      category: "Navigation",
      title: "Go to Content Strategy",
      icon: Lightbulb,
      action: () => router.push("/content"),
    },
    {
      id: "c3",
      category: "Navigation",
      title: "Go to Community Intelligence",
      icon: Users,
      action: () => router.push("/community"),
    },
    {
      id: "c4",
      category: "Navigation",
      title: "Go to Sponsor Deals",
      icon: Handshake,
      action: () => router.push("/sponsors"),
    },
    {
      id: "c5",
      category: "Navigation",
      title: "Go to Workflow Orchestrator",
      icon: Workflow,
      action: () => router.push("/workflows"),
    },
    {
      id: "c6",
      category: "Navigation",
      title: "Go to Executive Strategy Engine",
      icon: Brain,
      action: () => router.push("/executive"),
    },
    {
      id: "c7",
      category: "Navigation",
      title: "Go to Memory Studio",
      icon: Database,
      action: () => router.push("/memory"),
    },
    {
      id: "c8",
      category: "Navigation",
      title: "Go to Knowledge Universe",
      icon: Globe,
      action: () => router.push("/universe"),
    },
    {
      id: "c9",
      category: "Navigation",
      title: "Go to Living Timeline",
      icon: Clock,
      action: () => router.push("/timeline"),
    },
    {
      id: "c10",
      category: "Navigation",
      title: "Go to Self-Improvement Engine",
      icon: TrendingUp,
      action: () => router.push("/evaluation"),
    },
    {
      id: "c11",
      category: "Navigation",
      title: "Go to Analytics Insights",
      icon: BarChart3,
      action: () => router.push("/analytics"),
    },
    {
      id: "c12",
      category: "Navigation",
      title: "Go to Settings",
      icon: Settings,
      action: () => router.push("/settings"),
    },
    {
      id: "c13",
      category: "Actions",
      title: "Toggle Theme (Dark / Light)",
      icon: Zap,
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()),
  );

  const handleExecute = (action: () => void) => {
    action();
    setCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 font-sans text-xs">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setCommandPaletteOpen(false)}
      />

      <div className="relative z-50 flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl">
        {/* Search Header */}
        <div className="border-neutral-850 flex items-center gap-2.5 border-b p-3">
          <Search className="h-4 w-4 shrink-0 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            autoFocus
            className="flex-1 border-none bg-transparent text-xs font-medium text-neutral-100 placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="hover:bg-neutral-850 rounded-lg p-1 text-neutral-400 hover:text-neutral-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-80 space-y-1 overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => handleExecute(cmd.action)}
                  className="hover:bg-neutral-850 group flex w-full items-center justify-between rounded-xl p-2.5 text-left text-neutral-200 transition"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="h-4 w-4 text-neutral-400 transition group-hover:text-indigo-400" />
                    <span className="truncate font-semibold">{cmd.title}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-500">
                    <span>{cmd.category}</span>
                    <ArrowRight className="h-3 w-3 text-neutral-600 transition group-hover:text-neutral-300" />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center font-mono text-xs text-neutral-500">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-neutral-850 flex items-center justify-between border-t bg-neutral-950 p-2 px-4 font-mono text-[10px] text-neutral-500">
          <span>Use ▲ ▼ to navigate</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
