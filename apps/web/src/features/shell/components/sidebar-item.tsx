"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { useShell } from "../providers/shell-provider";

interface SidebarItemProps {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

export function SidebarItem({ id, label, href, icon: Icon, badge }: SidebarItemProps) {
  const pathname = usePathname();
  const { sidebarCollapsed } = useShell();

  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium transition ${
        isActive
          ? "bg-neutral-850 border-neutral-750 border font-semibold text-neutral-100 shadow-sm"
          : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
      } ${sidebarCollapsed ? "justify-center px-2" : ""}`}
      title={sidebarCollapsed ? label : undefined}
    >
      <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-indigo-400" : "text-neutral-400"}`} />
      {!sidebarCollapsed && <span className="flex-1 truncate">{label}</span>}
      {!sidebarCollapsed && badge !== undefined && (
        <span className="rounded border border-neutral-800 bg-neutral-950 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
          {badge}
        </span>
      )}
    </Link>
  );
}
