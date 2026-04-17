# Phase 04 — Group: Prospective Students Section

## Overview

- **Priority:** P3
- **Status:** Pending
- **Effort:** 30m
- **Description:** Replace the generic fallback paragraph on `/group` with a structured "Prospective Students" section that provides clear application guidance.

## Key Insights

- Current fallback text (lines 56-75 of `app/group/page.tsx`) is shown when no team members exist
- The section should always be visible (even when members are listed), as it's a permanent call-to-action
- No data file needed — this is static content specific to the page

## Requirements

**Functional:**
- "Prospective Students" section with:
  - Brief intro about group's research focus
  - What the PI looks for in applicants (research interests, skills)
  - How to apply (email, what to include)
  - Link to SUTD PhD admissions if available
- Section visible regardless of team member count (move outside the conditional)

**Non-functional:**
- Server component, no interactivity
- Clean, scannable layout with bullet points or cards

## Related Files

| Action | File |
|--------|------|
| Modify | `app/group/page.tsx` |

## Implementation Steps

1. Update `app/group/page.tsx`:
   - Move the prospective students content **outside** the `grouped.size > 0` conditional — it should always render, after the members grid
   - Replace the generic two-paragraph text with structured content:
     ```
     ## Join Our Group
     
     - Research areas: trustworthy AI for SE, automated debugging, software security
     - Looking for: PhD students, research assistants, visiting students
     
     ### What to Include in Your Application
     - CV / resume
     - Brief research statement (1 paragraph on your interests)
     - Representative publication or project (if any)
     - Transcripts (unofficial OK)
     
     ### How to Apply
     - Email: thanhlc@ieee.org
     - Subject line: "[Prospective Student] Your Name - Research Area"
     ```
   - Style with existing Tailwind patterns: use `border-l-4 border-primary/40` accent, `space-y-2`, `list-disc` for bullets
   - Remove the `else` branch entirely (no more empty-state-only display)
2. Run `npm run build`

## Todo

- [ ] Restructure `app/group/page.tsx` — move prospective section outside conditional
- [ ] Replace generic text with structured application guidance
- [ ] Verify build passes

## Success Criteria

- `/group` page always shows "Join Our Group" section
- Section contains clear application steps and contact info
- Members grid (when populated) renders above the prospective section
- `npm run build` succeeds

## Risk Assessment

- **Low risk:** Single file change, pure content update. No data model changes.
