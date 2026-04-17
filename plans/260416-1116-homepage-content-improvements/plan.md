---
title: "Homepage Content Improvements"
description: "Fill content gaps across teaching, research, home, group, and paper pages"
status: pending
priority: P2
effort: 5h
branch: main
tags: [content, data, ui]
created: 2026-04-16
---

# Homepage Content Improvements

## Context

Academic homepage (Next.js 15 App Router, static export, Tailwind + shadcn/ui) has several content gaps where data exists but isn't rendered, or where data fields are missing.

## Architecture Constraints

- `output: 'export'` — no server APIs; all interactivity must be `"use client"`
- Data lives in `data/*.json`, loaded via `lib/data-loaders.ts`
- Types in `lib/types.ts`
- Component files must stay under 200 lines
- Kebab-case file naming

## Important Finding

**Gap 4 (Publications filtering) is already implemented.** `publication-list.tsx` has venue-type filter pills + stats row. Dropped from plan.

## Phases

| # | Phase | Gap(s) | Status | Effort | File |
|---|-------|--------|--------|--------|------|
| 1 | Teaching: Mentored students | 1 | Pending | 45m | [phase-01](phase-01-teaching-mentored-students.md) |
| 2 | Research: Linked pubs + projects | 2, 3 | Pending | 1h | [phase-02](phase-02-research-linked-publications.md) |
| 3 | Home: News links + contact | 5, 8 | Pending | 45m | [phase-03](phase-03-home-news-links-contact.md) |
| 4 | Group: Prospective students | 6 | Pending | 30m | [phase-04](phase-04-group-prospective-students.md) |
| 5 | Papers: BibTeX copy button | 7 | Pending | 30m | [phase-05](phase-05-papers-bibtex-copy.md) |

## Dependency Graph

All phases are independent — no blockers between them. Can be parallelized.

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Type changes break existing pages | Low | High | Add optional fields only; no required field changes |
| Static export breaks with `"use client"` | Low | Medium | BibTeX copy button is the only new client component; same pattern as existing `publication-list.tsx` |
| Data accuracy (wrong paper IDs in relatedPapers) | Medium | Low | Cross-reference `publications.json` IDs during implementation |

## Rollback

Each phase touches distinct files. Revert = `git revert` the phase's commit. No cascading dependencies.

## Test Matrix

| What | How |
|------|-----|
| Build succeeds | `npm run build` after each phase |
| Static export works | `npx next export` (or `output: 'export'` build) |
| New sections render | Manual browser check on `/teaching`, `/research`, `/`, `/group`, `/papers/patchguru` |
| BibTeX copy | Click copy button, paste elsewhere, verify match |
| News links | Click linked news items, verify navigation |

## Backwards Compatibility

- All new JSON fields are optional (`?` in TypeScript)
- No existing component signatures change
- No pages removed or renamed
- `NewsItem` component gains optional `href` prop — existing callers unaffected
