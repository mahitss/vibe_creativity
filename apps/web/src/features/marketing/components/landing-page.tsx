"use client";

import { motion } from "framer-motion";
import { ArrowRight, Circle, Clock3, Database, Route, ShieldCheck } from "lucide-react";
import { Button } from "@omnia/ui";

const principles = [
  {
    description: "A durable context layer designed to preserve decisions, creator state, preferences, and operating history.",
    icon: Database,
    title: "Persistent Memory",
  },
  {
    description: "Session boundaries are treated as implementation details. Work should resume with context intact.",
    icon: Clock3,
    title: "Continuity",
  },
  {
    description: "The Minds Agent is built to propose, schedule, and execute authorized work through explicit ports.",
    icon: Route,
    title: "Autonomous Actions",
  },
] as const;

export function LandingPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 bg-white">
            <Circle className="h-3 w-3 fill-neutral-950 text-neutral-950" />
          </div>
          <span className="text-sm font-semibold tracking-wide">OMNIA</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-neutral-500 md:flex">
          <a className="transition hover:text-neutral-950" href="#principles">
            Principles
          </a>
          <a className="transition hover:text-neutral-950" href="#foundation">
            Foundation
          </a>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pt-28">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Autonomous operating system for creators
          </p>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
            OMNIA remembers. OMNIA plans. OMNIA acts.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
            A persistent Minds Agent with durable memory, continuity across sessions, and
            authorized autonomous execution at the center of the platform.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button>
              Enter foundation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary">View architecture</Button>
          </div>
        </motion.div>

        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
        >
          <div className="border-b border-neutral-200 px-2 pb-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
              Minds Agent State
            </p>
          </div>
          <div className="divide-y divide-neutral-200">
            {[
              ["Memory", "Active context preserved"],
              ["Continuity", "Session graph ready"],
              ["Action", "Awaiting authorized ports"],
            ].map(([label, value]) => (
              <div className="grid grid-cols-[120px_1fr] gap-4 px-2 py-5" key={label}>
                <span className="text-sm text-neutral-500">{label}</span>
                <span className="text-sm font-medium text-neutral-950">{value}</span>
              </div>
            ))}
          </div>
        </motion.aside>
      </section>

      <section id="principles" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-px px-6 py-16 md:grid-cols-3">
          {principles.map((principle) => (
            <article className="bg-white py-4 md:px-6" key={principle.title}>
              <principle.icon className="h-5 w-5 text-neutral-950" />
              <h2 className="mt-6 text-lg font-semibold">{principle.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="foundation" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[0.75fr_1fr]">
          <div>
            <ShieldCheck className="h-5 w-5 text-neutral-950" />
            <h2 className="mt-5 text-2xl font-semibold">Built for compounding context.</h2>
          </div>
          <p className="text-base leading-8 text-neutral-600">
            OMNIA starts as a system architecture before it becomes a product surface. The
            foundation separates domains, provider integrations, infrastructure, and presentation
            so memory can endure, sessions can resume, and actions can be governed.
          </p>
        </div>
      </section>
    </main>
  );
}

