# OMNIA

OMNIA is the foundation for an autonomous operating system for creators powered by a persistent Minds Agent.

It is not an AI chatbot. The architecture is organized around three product invariants:

- Persistent Memory
- Continuity Across Sessions
- Autonomous Actions

This repository contains the production foundation only. Business logic, placeholder CRUD pages, and fake AI behavior are intentionally absent.

## Architecture

```txt
apps/
  web/       Next.js 15 application shell and landing page
  server/    FastAPI service, domain module boundaries, Prisma schema
packages/
  ui/        Shared shadcn-style primitives
  config/    Runtime configuration and environment validation
  types/     Cross-system TypeScript contracts
  lib/       Shared utilities
  agents/    Minds Agent and provider contract space
  memory/    Persistent memory contract space
  planner/   Mission planning contract space
  analytics/ Analytics engine contract space
  community/ Community Brain and Sponsor Brain contract space
  notifications/ Notification contract space
  shared/    Carefully promoted shared domain contracts
```

The server follows clean architecture boundaries:

- `app/core`: runtime configuration and logging
- `app/api`: HTTP composition
- `app/shared`: aggregate and repository abstractions
- `app/modules`: feature modules and dependency-inversion ports
- `prisma`: durable data model for identity, workspace context, memory, missions, agent runs, and audit events

## Local Development

Requirements:

- Node.js 20+
- pnpm 9+
- Python 3.12+
- Docker

```bash
pnpm install
cp .env.example .env
docker compose up -d
pnpm dev
```

Run the web app at `http://localhost:3000`.

Run the API directly from `apps/server`:

```bash
python -m pip install -e ".[dev]"
python -m uvicorn app.main:app --reload
```

Health check:

```bash
curl http://localhost:8000/api/health
```

## Quality Gates

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

Pre-commit hooks run formatting and lint-staged checks. Commit messages use Conventional Commits.

## Deployment

- Web: Vercel, configured in `apps/web/vercel.json`
- API: Railway, configured in `apps/server/railway.toml`
- Database: PostgreSQL
- Cache: Redis
- Storage: Supabase Storage

## Product Boundary

The Minds Agent is the core product primitive. Future implementation should keep it behind explicit ports:

- Memory writes must be durable and auditable.
- Session continuity must survive browser, API, and provider restarts.
- Autonomous actions must be authorized, scheduled, logged, and reversible where possible.

Do not add product behavior until the domain language, tests, and integration contracts are ready.

