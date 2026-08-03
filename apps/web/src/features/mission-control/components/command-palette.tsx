"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Brain,
  Calendar,
  Clock,
  Database,
  FileText,
  GitBranch,
  Layers,
  PlusCircle,
  Search,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string) => void;
}

interface CommandGroup {
  category: string;
  items: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    shortcut?: string;
  }[];
}

export function CommandPalette({ isOpen, onClose, onSelectAction }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const groups: CommandGroup[] = [
    {
      category: "Quick Actions",
      items: [
        {
          id: "create-mission",
          title: "Create Mission",
          description: "Initialize a new autonomous task for Executive Agent",
          icon: PlusCircle,
          shortcut: "⌘ M",
        },
        {
          id: "ask-executive",
          title: "Ask Executive Agent",
          description: "Query Minds Agent with long-term reasoning context",
          icon: Brain,
          shortcut: "⌘ E",
        },
        {
          id: "create-content",
          title: "Create Content Idea",
          description: "Draft a new script or repurposing candidate",
          icon: FileText,
          shortcut: "⌘ C",
        },
        {
          id: "record-memory",
          title: "Record Memory",
          description: "Manually inject an identity, project, or relationship memory",
          icon: Database,
          shortcut: "⌘ R",
        },
      ],
    },
    {
      category: "Navigation",
      items: [
        {
          id: "open-timeline",
          title: "Open Living Memory Timeline",
          description: "View full chronological feed & historical replay",
          icon: Clock,
          shortcut: "G T",
        },
        {
          id: "open-graph",
          title: "Open Interactive Memory Graph",
          description: "Explore entity connections & story paths",
          icon: GitBranch,
          shortcut: "G K",
        },
        {
          id: "open-memory",
          title: "Open Memory Studio",
          description: "Inspect 7 shared memory categories & reflections",
          icon: Database,
          shortcut: "G M",
        },
        {
          id: "open-agents",
          title: "Open Multi-Agent Console",
          description: "View 10 agent registry, latency, and bus telemetry",
          icon: Bot,
          shortcut: "G A",
        },
      ],
    },
  ];

  const allItems = groups
    .flatMap((g) => g.items)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (allItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + allItems.length) % (allItems.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (allItems[selectedIndex]) {
          onSelectAction(allItems[selectedIndex].id);
          onClose();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, allItems, selectedIndex, onClose, onSelectAction]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-neutral-950/60 pt-24 backdrop-blur-sm transition-opacity">
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 font-sans text-neutral-100 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-neutral-800 bg-neutral-900/90 px-4">
          <Search className="mr-3 h-4 w-4 shrink-0 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search memories, projects, agents..."
            className="w-full bg-transparent py-3.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="rounded-md p-1 text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {allItems.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-neutral-500">
              No matching commands or memories found.
            </div>
          ) : (
            groups.map((group) => {
              const groupItems = group.items.filter(
                (item) =>
                  item.title.toLowerCase().includes(query.toLowerCase()) ||
                  item.description.toLowerCase().includes(query.toLowerCase()),
              );
              if (groupItems.length === 0) return null;

              return (
                <div key={group.category} className="mb-3 last:mb-0">
                  <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    {group.category}
                  </p>
                  <div className="mt-1 space-y-1">
                    {groupItems.map((item) => {
                      const globalIndex = allItems.findIndex((i) => i.id === item.id);
                      const isSelected = globalIndex === selectedIndex;
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelectAction(item.id);
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition ${
                            isSelected
                              ? "border border-neutral-700/80 bg-neutral-800 text-neutral-100 shadow-sm"
                              : "hover:bg-neutral-850 text-neutral-300 hover:text-neutral-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`rounded-md p-1.5 ${
                                isSelected
                                  ? "bg-neutral-700 text-neutral-100"
                                  : "bg-neutral-800 text-neutral-400"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="mt-0.5 text-[11px] text-neutral-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          {item.shortcut && (
                            <span className="rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 font-mono text-[10px] text-neutral-400">
                              {item.shortcut}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="flex items-center justify-between border-t border-neutral-800 bg-neutral-950 px-4 py-2.5 font-mono text-[11px] text-neutral-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="flex items-center gap-1 text-neutral-400">
            <Sparkles className="h-3 w-3" /> Autonomous System Active
          </span>
        </div>
      </div>
    </div>
  );
}
