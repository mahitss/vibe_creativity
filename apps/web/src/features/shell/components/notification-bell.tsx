"use client";

import React, { useState } from "react";
import { Bell, Check, Sparkles } from "lucide-react";
import { useShell } from "../providers/shell-provider";

export function NotificationBell() {
  const { openRightPanel } = useShell();
  const [hasUnread, setHasUnread] = useState(true);

  const notifications = [
    {
      id: "n1",
      title: "React Part 5 Draft Complete",
      time: "10m ago",
      desc: "Content Strategy Agent generated full script & code repository.",
    },
    {
      id: "n2",
      title: "CloudCorp Sponsorship Agreed",
      time: "1h ago",
      desc: "Sponsor Intelligence Agent secured $15,000 title sponsorship read.",
    },
  ];

  const handleOpenNotifications = () => {
    setHasUnread(false);
    openRightPanel(
      "Notifications Audit Trail",
      <div className="space-y-3 font-sans text-xs">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3"
          >
            <div className="flex items-center justify-between font-bold text-neutral-200">
              <span>{n.title}</span>
              <span className="font-mono text-[10px] text-neutral-500">{n.time}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-400">{n.desc}</p>
          </div>
        ))}
      </div>,
    );
  };

  return (
    <button
      onClick={handleOpenNotifications}
      className="hover:bg-neutral-850 relative rounded-lg border border-neutral-800 bg-neutral-900 p-1.5 text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-200"
      title="Notifications"
    >
      <Bell className="h-4 w-4" />
      {hasUnread && (
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-neutral-950" />
      )}
    </button>
  );
}
