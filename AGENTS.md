# OMNIA Permanent Engineering Constitution

This document is the permanent engineering constitution for the OMNIA codebase. Every implementation, feature, and code contribution must follow these rules. If any request conflicts with this constitution, the constitution wins.

---

## 1. Product Principles

OMNIA is not an AI chatbot. OMNIA is a **persistent autonomous operating system for creators**. Every feature must strengthen one or more of these core pillars:

1. **Persistent Memory**
2. **Continuity Across Sessions**
3. **Autonomous Follow-up**

*Rule: If a feature does not improve these pillars, reject or redesign it.*

---

## 2. Architectural Principles

- **Modular Architecture**: Feature isolation with clean boundaries.
- **Domain-Driven Design**: Dataclass domain models with explicit schemas.
- **Event-Driven Communication**: Decoupled messaging via the central Task Bus.
- **Strict Typing**: Full Python type hints (`mypy` compliant) and TypeScript interfaces (`tsc --noEmit` zero error requirement).
- **SOLID Principles & Dependency Inversion**: Service interfaces decoupled from persistence implementations.
- **Production-First Code**: No superficial symptom patches, swallow exceptions, or hardcoded magic values.

---

## 3. AI & Memory Rules

- **Zero Hallucination**: Never fake intelligence, fabricate memories, or hallucinate analytics.
- **Memory Grounding**: Every recommendation must reference persistent memory rows with explicit memory IDs.
- **Explainability**: Every autonomous action must explain itself (Observation, Supporting Evidence, Historical Comparison, Business Impact, Confidence Score, Rejected Alternatives).
- **Single Source of Truth**: Memory is the primary source of truth. Never duplicate memory rows — update existing memories with versioning, confidence scores, provenance, and timestamps.

---

## 4. Autonomy & Governance Rules

- **Risk Scoping**:
  - **Low-Risk Actions (Auto-Executed)**: Drafts, reminders, suggestions, internal planning.
  - **High-Risk Actions (Require User Approval)**: Publishing content, sending emails, deleting data, accepting sponsorship deals.
- **Multi-Agent Routing**: Specialist agents never communicate directly with each other. All requests pass through the **Executive Minds Agent** which owns delegation, conflict resolution, long-term planning, and decision approvals.

---

## 5. User Experience & Design System

- **Minimal & Intentional**: Inspired by Linear, Cursor, Raycast, Vercel, Apple.
- **Whitespace-First & Typography**: Beautiful typography, sleek dark mode, HSL tailored palettes, subtle micro-animations.
- **Why? Transparency**: Every AI card answers:
  - *Why now?*
  - *Why this?*
  - *Why not something else?*

---

## 6. Observability, Security & Testing

- **Observability**: Every agent action, task bus dispatch, and decision must be logged with audit trails.
- **Security**: Tenant isolation via `X-Creator-Id`, encrypted storage, secure secrets management.
- **Automated Testing Requirement**: Every feature requires automated Pytest unit/integration tests and web TypeScript compilation verification.
