"use client";

import React, { useEffect, useState } from "react";
import {
  Bot,
  Brain,
  Compass,
  Database,
  FileText,
  Handshake,
  Lightbulb,
  Plus,
  Search,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commandItems = [
    {
      icon: Sparkles,
      title: "Generate Docker tutorial Part 1",
      category: "ACTION",
      href: "/missions",
    },
    {
      icon: Handshake,
      title: "Find sponsor conversations (CloudCorp $15k)",
      category: "SPONSOR",
      href: "/sponsors",
    },
    {
      icon: Database,
      title: "Search persistent memory substrate (#mem-yt-comment-42)",
      category: "MEMORY",
      href: "/memory",
    },
    {
      icon: Compass,
      title: "Create new mission directive",
      category: "MISSION",
      href: "/missions",
    },
    {
      icon: Bot,
      title: "Import YouTube comments (React Authentication)",
      category: "COMMUNITY",
      href: "/community",
    },
    {
      icon: Lightbulb,
      title: "Open Content Strategy Studio & Draft Editor",
      category: "CONTENT",
      href: "/content",
    },
  ];

  const filteredCommands = commandItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 pt-20 backdrop-blur-sm">
      <div className="w-full max-w-2xl border border-[#3c3c3c] bg-[#1a1a1a] p-4 shadow-2xl">
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-[#3c3c3c] pb-3">
          <Search className="h-4 w-4 text-[#1c69d4]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g. Generate Docker tutorial)..."
            className="flex-1 bg-transparent font-mono text-xs text-white outline-none placeholder:text-[#bbbbbb]"
            autoFocus
          />
          <button
            onClick={onClose}
            className="border border-[#3c3c3c] bg-[#0d0d0d] p-1 text-[#bbbbbb] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Command Items List */}
        <div className="mt-3 max-h-80 space-y-1.5 overflow-y-auto font-mono text-xs">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              return (
                <a
                  key={idx}
                  href={cmd.href}
                  onClick={onClose}
                  className="flex items-center justify-between border border-transparent p-3 transition hover:border-[#3c3c3c] hover:bg-[#0d0d0d]"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#0066b1]" />
                    <span className="font-sans text-xs font-bold text-white">{cmd.title}</span>
                  </div>
                  <span className="border border-[#3c3c3c] bg-[#1a1a1a] px-2 py-0.5 text-[10px] text-[#bbbbbb]">
                    {cmd.category}
                  </span>
                </a>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-[#bbbbbb]">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-[#3c3c3c] pt-3 font-mono text-[10px] text-[#bbbbbb]">
          <span>PRESS ESC TO CLOSE</span>
          <span>OMNIA COMMAND PALETTE (⌘K)</span>
        </div>
      </div>
    </div>
  );
}
