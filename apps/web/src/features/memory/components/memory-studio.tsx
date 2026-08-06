"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Circle, Clock, Filter, Network, Pin, Search, Sparkles } from "lucide-react";
import * as React from "react";

type MemoryType =
  | "IDENTITY"
  | "PREFERENCE"
  | "RELATIONSHIP"
  | "PROJECT"
  | "COMMUNITY"
  | "PERFORMANCE"
  | "REFLECTION"
  | "EPISODE";

interface MemoryRecord {
  createdAt: string;
  description: string;
  id: string;
  importance: number;
  memoryType: MemoryType;
  tags: string[];
  title: string;
  updatedAt: string;
}

interface ReflectionRecord {
  category: string;
  confidence: number;
  createdAt: string;
  lesson: string;
  title: string;
}

interface RelationshipRecord {
  object: string;
  relationship: string;
  strength: number;
  subject: string;
  trustScore: number;
}

interface MemoryStudioProps {
  creatorName?: string;
  memories?: MemoryRecord[];
  namespace?: string;
  reflections?: ReflectionRecord[];
  relationships?: RelationshipRecord[];
}

const memoryTypes: Array<MemoryType | "ALL"> = [
  "ALL",
  "IDENTITY",
  "PREFERENCE",
  "RELATIONSHIP",
  "PROJECT",
  "COMMUNITY",
  "PERFORMANCE",
  "REFLECTION",
  "EPISODE",
];

export function MemoryStudio({
  creatorName = "Mahit",
  memories = [
    {
      id: "mem-yt-comment-42",
      title: "127 Audience Requests for Docker",
      description:
        "127 community members requested Docker orchestration after React Auth tutorial.",
      memoryType: "COMMUNITY",
      importance: 0.95,
      createdAt: "2026-08-06",
      updatedAt: "2026-08-06",
      tags: ["docker", "requests"],
    },
    {
      id: "mem-cloudcorp-deal",
      title: "Acme CloudCorp Sponsorship",
      description:
        "Signed $15,000 sponsorship contract with CloudCorp for 3 video integration slots.",
      memoryType: "PERFORMANCE",
      importance: 0.9,
      createdAt: "2026-08-05",
      updatedAt: "2026-08-05",
      tags: ["sponsorship", "revenue"],
    },
  ],
  namespace = "omnia.creator.studio",
  reflections = [
    {
      title: "Deep Technical Tutorials Outperform Commentary",
      category: "Content Strategy",
      confidence: 0.96,
      lesson: "Hands-on code walkthroughs yield 2.4x higher watch time retention.",
      createdAt: "2026-08-06",
    },
  ],
  relationships = [
    {
      subject: "React Auth",
      relationship: "LEADS_TO",
      object: "Docker Multi-Agent",
      strength: 0.94,
      trustScore: 0.98,
    },
  ],
}: MemoryStudioProps = {}) {
  const [activeType, setActiveType] = React.useState<MemoryType | "ALL">("ALL");
  const [query, setQuery] = React.useState("");

  const filteredMemories = React.useMemo(() => {
    return memories.filter((memory) => {
      const matchesType = activeType === "ALL" || memory.memoryType === activeType;
      const searchable =
        `${memory.title} ${memory.description} ${memory.tags.join(" ")}`.toLowerCase();
      return matchesType && searchable.includes(query.toLowerCase());
    });
  }, [activeType, memories, query]);

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-8 text-neutral-950">
      <section className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold tracking-wide">OMNIA MEMORY</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              {creatorName}&apos;s persistent memory.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-neutral-600">
              Namespace <span className="font-medium text-neutral-950">{namespace}</span> stores the
              identity, preferences, relationships, projects, community signals, performance,
              reflections, and episodes that power the Minds Agent.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 text-sm shadow-sm">
            <p className="text-neutral-500">Stored memories</p>
            <p className="mt-1 text-3xl font-semibold">{memories.length}</p>
          </div>
        </header>

        <section className="mt-10 grid gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto]">
          <label className="flex h-11 items-center gap-3 rounded-md border border-neutral-200 px-3">
            <Search className="h-4 w-4 text-neutral-400" />
            <input
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search memories, promises, sponsors, Docker videos, unfinished goals..."
              value={query}
            />
          </label>
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="h-4 w-4 shrink-0 text-neutral-400" />
            {memoryTypes.map((type) => (
              <button
                className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium transition ${
                  activeType === type
                    ? "bg-neutral-950 text-white"
                    : "bg-neutral-100 text-neutral-600"
                }`}
                key={type}
                onClick={() => setActiveType(type)}
                type="button"
              >
                {type.replace("_", " ")}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <section>
            <div className="grid gap-3 md:grid-cols-2">
              <AnimatePresence>
                {filteredMemories.map((memory) => (
                  <motion.article
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
                    exit={{ opacity: 0, y: -8 }}
                    initial={{ opacity: 0, y: 8 }}
                    key={memory.id}
                    layout
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                          {memory.memoryType.replace("_", " ")}
                        </p>
                        <h2 className="mt-3 text-lg font-semibold">{memory.title}</h2>
                      </div>
                      <Pin className="h-4 w-4 text-neutral-400" />
                    </div>
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-600">
                      {memory.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {memory.tags.map((tag) => (
                        <span
                          className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-500">
                      <span>Importance {Math.round(memory.importance * 100)}%</span>
                      <span>{new Date(memory.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {!filteredMemories.length ? (
              <EmptyState
                icon={Sparkles}
                title="No matching memories yet."
                description="When OMNIA stores identity, preferences, goals, projects, relationships, and episodes, they will appear here without losing session continuity."
              />
            ) : null}
          </section>

          <aside className="grid gap-4">
            <Panel icon={Clock} title="Timeline">
              {memories.slice(0, 6).map((memory) => (
                <div className="border-l border-neutral-200 pb-5 pl-4" key={memory.id}>
                  <p className="text-sm font-medium">{memory.title}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {new Date(memory.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {!memories.length ? <SmallEmpty label="No memory events recorded yet." /> : null}
            </Panel>

            <Panel icon={Network} title="Knowledge Graph">
              <div className="relative min-h-52 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
                {memories.slice(0, 8).map((memory, index) => (
                  <div
                    className="absolute flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs shadow-sm"
                    key={memory.id}
                    style={{
                      left: `${12 + (index % 3) * 30}%`,
                      top: `${14 + Math.floor(index / 3) * 28}%`,
                    }}
                  >
                    <Circle className="h-2 w-2 fill-neutral-950 text-neutral-950" />
                    {memory.title.slice(0, 24)}
                  </div>
                ))}
              </div>
            </Panel>

            <Panel icon={Bookmark} title="Reflections">
              {reflections.map((reflection) => (
                <div
                  className="rounded-md bg-neutral-50 p-3"
                  key={`${reflection.title}-${reflection.createdAt}`}
                >
                  <p className="text-sm font-medium">{reflection.title}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{reflection.lesson}</p>
                </div>
              ))}
              {!reflections.length ? (
                <SmallEmpty label="Daily reflections will accumulate here." />
              ) : null}
            </Panel>

            <Panel icon={Network} title="Relationships">
              {relationships.map((relationship) => (
                <div
                  className="rounded-md bg-neutral-50 p-3"
                  key={`${relationship.subject}-${relationship.object}`}
                >
                  <p className="text-sm font-medium">
                    {relationship.subject} &rarr; {relationship.object}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {relationship.relationship} · trust {Math.round(relationship.trustScore * 100)}%
                  </p>
                </div>
              ))}
              {!relationships.length ? (
                <SmallEmpty label="Sponsors, collaborators, VIPs, and audience ties will appear here." />
              ) : null}
            </Panel>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Panel({
  children,
  icon: Icon,
  title,
}: Readonly<{
  children: React.ReactNode;
  icon: React.ElementType;
  title: string;
}>) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Icon className="h-4 w-4 text-neutral-950" />
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

function EmptyState({
  description,
  icon: Icon,
  title,
}: Readonly<{ description: string; icon: React.ElementType; title: string }>) {
  return (
    <section className="mt-4 rounded-lg border border-dashed border-neutral-300 bg-white p-10 text-center">
      <Icon className="mx-auto h-5 w-5 text-neutral-400" />
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600">{description}</p>
    </section>
  );
}

function SmallEmpty({ label }: Readonly<{ label: string }>) {
  return <p className="rounded-md bg-neutral-50 p-3 text-sm text-neutral-500">{label}</p>;
}
