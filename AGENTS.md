# OMNIA V2 — THE PRODUCT CONSTITUTION & SUPREME MANIFESTO

This document is the supreme constitutional law of OMNIA. Every feature, component, API endpoint, and line of code must strictly obey this constitution.

---

## ARTICLE I — THE PRODUCT EXISTS TO SOLVE A PROBLEM

OMNIA exists to remove mental overhead from creators.

- It does not exist to demonstrate AI.
- It does not exist to show dashboards.
- It does not exist to expose technology.
- **Every feature must reduce work.**

---

## ARTICLE II — EVERY SCREEN HAS ONE PURPOSE

- **Home (`/`)**: _What deserves my attention?_
- **Mission (`/missions`)**: _What should I do?_
- **Content (`/content`)**: _What should I create?_
- **Community (`/community`)**: _What are people asking?_
- **Sponsors (`/sponsors`)**: _Which deal needs action?_
- **Memory (`/memory`)**: _What have we learned?_
- **Analytics (`/analytics`)**: _What changed?_

_If a screen answers multiple questions, split it._

---

## ARTICLE III — THE USER NEVER SEES THE ENGINE

- No internal agent names.
- No orchestration diagrams.
- No workflow internals.
- No vector database terminology or embedding jargon.
- **The user interacts with outcomes, not implementation.**

---

## ARTICLE IV — EVERY AI ACTION IS EXPLAINABLE

Every recommendation must explain:

1. **Reason**
2. **Evidence & Supporting Memories**
3. **Expected Impact**
4. **Confidence Score**
5. **Alternative Options**

_Never hide reasoning._

---

## ARTICLE V — PROGRESSIVE DISCLOSURE

The interface reveals complexity only when needed.

- Nothing overwhelming.
- Nothing hidden forever.

---

## ARTICLE VI — THE DASHBOARD IS NOT THE PRODUCT

The dashboard is an inbox. Real work happens inside dedicated workspaces.

---

## ARTICLE VII — EVERY FEATURE HAS AN OWNER

Each module (`Mission Engine`, `Content Studio`, `Memory`, `Community`, `Sponsors`, `Analytics`, `Publishing`) owns its own data, logic, tests, and documentation.

---

## ARTICLE VIII — EVERY FEATURE HAS STATES

Every feature must support intentionally designed states:

- `Loading`
- `Empty`
- `Ready`
- `Working`
- `Error`
- `Success`
- `Offline`

---

## ARTICLE IX — EVERY CLICK CREATES VALUE

- No decorative buttons.
- No dead buttons.
- No placeholder actions.
- No fake demos.

---

## ARTICLE X — THE DEMO RULE

If a feature does not improve the demo, it waits.

---

## ARTICLE XI — THE REMOVAL RULE

If deleting a feature makes the experience clearer, **delete it**.

---

## ARTICLE XII — THE QUALITY RULE

Nothing merges without:

- **Tests** (`pytest` 100% pass)
- **Accessibility** (WCAG AA contrast & focus rings)
- **Documentation**
- **Performance** (GPU-accelerated 300ms room transitions)
- **Security Review** (Tenant isolation via `X-Creator-Id`)

---

## ARTICLE XIII — THE NORTH STAR

When a creator opens OMNIA, they think:

> **"My AI already did the hard work."**

If any feature weakens that feeling, **remove it**.

---

## FINAL LAW

OMNIA is never allowed to become:

- _another dashboard_,
- _another CRM_,
- _another analytics tool_,
- _another ChatGPT wrapper_.

**It must always remain an AI Chief of Staff.**
