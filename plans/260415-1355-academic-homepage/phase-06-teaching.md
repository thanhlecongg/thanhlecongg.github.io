---
phase: 06
title: Teaching Section
status: completed
priority: medium
effort: 1.5h
dependsOn: [phase-02]
---

# Phase 06 — Teaching Section

## Overview

List courses taught grouped by semester/year, with syllabus links and course descriptions.

## Data File (`data/courses.json`)

```json
[
  {
    "id": "cs501-fall-2025",
    "code": "CS 501",
    "title": "Advanced Distributed Systems",
    "semester": "Fall",
    "year": 2025,
    "level": "graduate",
    "description": "Graduate seminar covering consensus, replication, and modern distributed databases.",
    "syllabusUrl": "/syllabi/cs501-fall2025.pdf"
  },
  {
    "id": "cs301-spring-2025",
    "code": "CS 301",
    "title": "Operating Systems",
    "semester": "Spring",
    "year": 2025,
    "level": "undergraduate",
    "description": "Core undergraduate course covering processes, memory management, and file systems.",
    "syllabusUrl": ""
  }
]
```

## Implementation Steps

### 1. Teaching page (`app/teaching/page.tsx`)

```tsx
import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/section-header'
import { CourseList } from '@/components/teaching/course-list'
import { getCourses } from '@/lib/data-loaders'

export const metadata: Metadata = { title: 'Teaching' }

export default function TeachingPage() {
  const courses = getCourses()
  return (
    <div>
      <SectionHeader
        title="Teaching"
        description="Courses taught at the university"
      />
      <CourseList courses={courses} />
    </div>
  )
}
```

### 2. Course list (`components/teaching/course-list.tsx`)

```tsx
import type { Course } from '@/lib/types'
import { CourseCard } from './course-card'

interface CourseListProps {
  courses: Course[]
}

const SEMESTER_ORDER = { Fall: 0, Spring: 1, Summer: 2 }

export function CourseList({ courses }: CourseListProps) {
  // Group by year desc, then semester order within year
  const sorted = [...courses].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year
    return (SEMESTER_ORDER[a.semester as keyof typeof SEMESTER_ORDER] ?? 3)
         - (SEMESTER_ORDER[b.semester as keyof typeof SEMESTER_ORDER] ?? 3)
  })

  // Group by "Semester Year" label
  const grouped = sorted.reduce((acc, course) => {
    const key = `${course.semester} ${course.year}`
    const list = acc.get(key) ?? []
    list.push(course)
    acc.set(key, list)
    return acc
  }, new Map<string, Course[]>())

  return (
    <div className="space-y-10">
      {Array.from(grouped.entries()).map(([term, termCourses]) => (
        <section key={term}>
          <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wide mb-4">
            {term}
          </h2>
          <div className="space-y-3">
            {termCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
```

### 3. Course card (`components/teaching/course-card.tsx`)

```tsx
import { Badge } from '@/components/ui/badge'
import type { Course } from '@/lib/types'

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-sm font-semibold text-slate-500">{course.code}</span>
            <Badge variant={course.level === 'graduate' ? 'default' : 'secondary'} className="text-xs">
              {course.level === 'graduate' ? 'Graduate' : 'Undergraduate'}
            </Badge>
          </div>
          <h3 className="font-medium text-slate-900">{course.title}</h3>
          {course.description && (
            <p className="text-sm text-slate-600 mt-1 max-w-prose">{course.description}</p>
          )}
        </div>
        {course.syllabusUrl && (
          <a
            href={course.syllabusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-blue-600 hover:underline flex-shrink-0 mt-1"
          >
            Syllabus →
          </a>
        )}
      </div>
    </article>
  )
}
```

## Todo

- [ ] Create `data/courses.json` with sample courses
- [ ] Write `app/teaching/page.tsx`
- [ ] Write `components/teaching/course-list.tsx` (grouped by term)
- [ ] Write `components/teaching/course-card.tsx`
- [ ] Add syllabus PDFs to `public/syllabi/` (optional, can be external links)

## Success Criteria

- Courses render grouped by term (Fall 2025, Spring 2025, etc.) descending
- Graduate/Undergraduate badge appears correctly
- Syllabus link only renders when URL is non-empty
- Card layout responsive on mobile
