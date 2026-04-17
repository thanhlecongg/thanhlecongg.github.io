# Phase 02 — Research: Linked Publications + Active Projects

## Overview

- **Priority:** P2
- **Status:** Pending
- **Effort:** 1h
- **Description:** (A) Add `relatedPapers` field to research areas so users can discover which papers belong to each track. (B) Populate the empty `projects` array with real active projects.

## Key Insights

- `ResearchArea` type has no `relatedPapers` field — needs addition to `lib/types.ts`
- `data/research.json` has `"projects": []` — the projects section render logic already exists in `app/research/page.tsx` (lines 89-137), just needs data
- Publication IDs from `publications.json` can be referenced in `relatedPapers`
- Research page is a server component — no `"use client"` needed

## Requirements

**Functional:**
- Each research area card shows linked publication titles (clickable if paper has projectPage or arxiv)
- Projects section renders with real active projects (at least 2-3)

**Non-functional:**
- Optional field — areas without `relatedPapers` render unchanged
- Publication titles resolved at build time from `publications.json`

## Related Files

| Action | File |
|--------|------|
| Modify | `lib/types.ts` — add `relatedPapers?: string[]` to `ResearchArea` |
| Modify | `data/research.json` — add `relatedPapers` arrays + populate `projects` |
| Modify | `app/research/page.tsx` — render linked paper titles under each area card |
| Modify | `lib/data-loaders.ts` — no change needed (already returns full `ResearchData`) |

## Implementation Steps

### Part A: Linked Publications

1. Add `relatedPapers?: string[]` to `ResearchArea` interface in `lib/types.ts`
2. Update `data/research.json` — add `relatedPapers` to each area with publication IDs:
   - `trustworthy-llm-code`: IDs for membership inference, ChatGPT code quality, formal spec, backdoor detection papers
   - `automated-debugging`: IDs for program repair, patch correctness, PatchGuru papers
   - `software-security`: IDs for vulnerability papers (MiDas, Chronos, VulCurator, NVD mapping)
   - `se-for-ai`: IDs for GNN analysis, call graph pruning, fault localization papers
3. Update `app/research/page.tsx`:
   - Import `getPublications` from data-loaders
   - Build a `Map<string, Publication>` lookup from publications array
   - Inside each area card, after keywords, render a "Related Papers" list:
     - Show paper title as text
     - Link to `projectPage` if available, else `arxiv` or `pdf`
     - Style: small text, muted, with subtle link styling
   - Keep component under 200 lines — if needed, extract a `ResearchAreaCard` component

### Part B: Active Projects

4. Populate `data/research.json` `projects` array with real projects derived from publications:
   - FLAMES (Memory-Efficient LLM Repair) — active, has GitHub + arxiv
   - PatchGuru (Patch Oracle Inference) — active, has GitHub + project page
   - FormalBench (LLM Formal Specification) — active, has GitHub + pdf
   - AutoPruner (Call Graph Pruning) — completed, has GitHub + arxiv
5. No code changes needed for project rendering — template already exists

6. Run `npm run build`

## Data Flow

```
data/research.json (relatedPapers: string[])
  + data/publications.json (title, links lookup)
  -> app/research/page.tsx
  -> Render: area card with linked paper titles
  -> Render: projects section (already templated)
```

## Todo

- [ ] Add `relatedPapers?: string[]` to `ResearchArea` in `lib/types.ts`
- [ ] Add `relatedPapers` IDs to each area in `data/research.json`
- [ ] Populate `projects` array in `data/research.json`
- [ ] Update `app/research/page.tsx` to render linked paper titles
- [ ] Extract `ResearchAreaCard` component if page exceeds 200 lines
- [ ] Verify build passes

## Success Criteria

- Each research area card shows 2-5 linked paper titles
- Paper titles link to their arxiv/pdf/projectPage
- Projects section renders with at least 3 projects
- `npm run build` succeeds
- Existing area card styling preserved

## Risk Assessment

| Risk | L | I | Mitigation |
|------|---|---|------------|
| Wrong publication IDs in relatedPapers | M | L | Cross-reference IDs against `publications.json` during implementation |
| Research page exceeds 200 lines | M | L | Extract `ResearchAreaCard` component |
