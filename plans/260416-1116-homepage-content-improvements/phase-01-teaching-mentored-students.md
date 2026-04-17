# Phase 01 — Teaching: Mentored Students

## Overview

- **Priority:** P2
- **Status:** Pending
- **Effort:** 45m
- **Description:** Extract hardcoded `MENTORED_STUDENTS` from `app/teaching/page.tsx` into a JSON data file and render a "Student Mentoring" section on the teaching page.

## Key Insights

- 9 mentored students are defined as a `const` array in `app/teaching/page.tsx` (lines 10-20) but never rendered in JSX
- `MentoredStudent` type already exists in `lib/types.ts` (lines 138-143) — no type changes needed
- Data loader pattern: JSON import + typed getter function in `lib/data-loaders.ts`

## Requirements

**Functional:**
- Students displayed in a table or card grid with: name, affiliation, topic, papers
- Section appears after "Courses" on `/teaching`

**Non-functional:**
- Server component (no interactivity needed)
- File stays under 200 lines

## Related Files

| Action | File |
|--------|------|
| Create | `data/mentored-students.json` |
| Modify | `lib/data-loaders.ts` — add `getMentoredStudents()` |
| Modify | `app/teaching/page.tsx` — remove const, add section |
| Create | `components/teaching/mentored-student-list.tsx` |

## Implementation Steps

1. Create `data/mentored-students.json` — move the 9 student objects from the const, matching `MentoredStudent` type shape
2. Add `import mentoredStudentsData from "@/data/mentored-students.json"` and `getMentoredStudents()` to `lib/data-loaders.ts`
3. Create `components/teaching/mentored-student-list.tsx`:
   - Server component (no `"use client"`)
   - Props: `{ students: MentoredStudent[] }`
   - Render a responsive table: columns = Name, Affiliation, Research Topic, Publications
   - On mobile, consider stacked card layout via Tailwind responsive classes
4. Update `app/teaching/page.tsx`:
   - Remove the `MENTORED_STUDENTS` const
   - Import `getMentoredStudents` from data-loaders
   - Import `MentoredStudentList` component
   - Add a "Student Mentoring" `<section>` after the Courses section
5. Run `npm run build` to verify static export succeeds

## Data Flow

```
data/mentored-students.json
  -> lib/data-loaders.ts (getMentoredStudents)
  -> app/teaching/page.tsx (server render)
  -> components/teaching/mentored-student-list.tsx (display)
```

## Todo

- [ ] Create `data/mentored-students.json` with 9 student entries
- [ ] Add `getMentoredStudents()` to `lib/data-loaders.ts`
- [ ] Create `components/teaching/mentored-student-list.tsx`
- [ ] Update `app/teaching/page.tsx` — remove const, render section
- [ ] Verify build passes

## Success Criteria

- `/teaching` page shows "Student Mentoring" section with all 9 students
- Each student shows name, affiliation, topic, and paper references
- `MENTORED_STUDENTS` const removed from page component
- `npm run build` succeeds

## Risk Assessment

- **Low risk:** Pure additive change. Type already exists. No existing behavior changes.
