---
phase: 05
title: Research & Group Section
status: completed
priority: high
effort: 3h
dependsOn: [phase-02]
---

# Phase 05 — Research & Group Section

## Overview

Two sub-sections:
1. **Research** — research statement, active projects, and research areas
2. **Group** — team member cards for PhD students, postdocs, masters, undergrads, alumni, and collaborators

## Data Files

### `data/research.json`

```json
{
  "statement": "Our research focuses on building reliable and efficient systems ...",
  "areas": [
    {
      "id": "distributed-systems",
      "title": "Distributed Systems",
      "description": "We design fault-tolerant protocols and consensus mechanisms for large-scale systems.",
      "keywords": ["consensus", "replication", "fault tolerance"]
    },
    {
      "id": "ml-systems",
      "title": "ML Systems",
      "description": "We build systems that make machine learning training and inference faster and cheaper.",
      "keywords": ["distributed training", "inference optimization"]
    }
  ],
  "projects": [
    {
      "id": "project-alpha",
      "title": "Project Alpha",
      "description": "A fault-tolerant distributed key-value store with ...",
      "status": "active",
      "links": { "github": "", "paper": "" }
    }
  ]
}
```

### `data/team.json`

```json
[
  {
    "id": "student-1",
    "name": "Jane Doe",
    "role": "phd",
    "photo": "/images/team/jane-doe.jpg",
    "website": "https://janedoe.com",
    "email": "jane@university.edu",
    "joined": 2023,
    "research": "Distributed consensus protocols"
  },
  {
    "id": "alumni-1",
    "name": "John Smith",
    "role": "alumni",
    "photo": "/images/team/john-smith.jpg",
    "website": "https://johnsmith.com",
    "joined": 2019,
    "graduated": 2024,
    "research": "ML systems — now at Google"
  }
]
```

## Implementation Steps

### 1. Research page (`app/research/page.tsx`)

```tsx
import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/section-header'
import researchData from '@/data/research.json'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = { title: 'Research' }

export default function ResearchPage() {
  const { statement, areas, projects } = researchData

  return (
    <div className="prose">
      <SectionHeader title="Research" />

      {/* Research statement */}
      <p className="text-slate-600 leading-relaxed mb-10">{statement}</p>

      {/* Research areas */}
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Research Areas</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12 not-prose">
        {areas.map(area => (
          <div key={area.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
            <h3 className="font-semibold text-slate-900 mb-1">{area.title}</h3>
            <p className="text-sm text-slate-600 mb-3">{area.description}</p>
            <div className="flex flex-wrap gap-1">
              {area.keywords.map(kw => (
                <Badge key={kw} variant="outline" className="text-xs">{kw}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Active projects */}
      {projects.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Projects</h2>
          <div className="space-y-4 not-prose">
            {projects.map(proj => (
              <div key={proj.id} className="border-l-2 border-blue-200 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-slate-900">{proj.title}</h3>
                  {proj.status === 'active' && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-2">{proj.description}</p>
                <div className="flex gap-3 text-xs font-medium">
                  {proj.links.github && (
                    <a href={proj.links.github} target="_blank" rel="noopener noreferrer"
                       className="text-blue-600 hover:underline">GitHub</a>
                  )}
                  {proj.links.paper && (
                    <a href={proj.links.paper} target="_blank" rel="noopener noreferrer"
                       className="text-blue-600 hover:underline">Paper</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
```

### 2. Group page (`app/group/page.tsx`)

```tsx
import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/section-header'
import { MemberGrid } from '@/components/group/member-grid'
import { getTeamMembers } from '@/lib/data-loaders'

export const metadata: Metadata = { title: 'Research Group' }

const ROLE_ORDER = ['postdoc', 'phd', 'masters', 'undergrad', 'collaborator', 'alumni'] as const
const ROLE_LABELS: Record<string, string> = {
  postdoc: 'Postdoctoral Researchers',
  phd: 'PhD Students',
  masters: 'Master Students',
  undergrad: 'Undergraduate Students',
  collaborator: 'Collaborators',
  alumni: 'Alumni',
}

export default function GroupPage() {
  const members = getTeamMembers()

  // Group by role, maintaining display order
  const grouped = ROLE_ORDER.reduce((acc, role) => {
    const list = members.filter(m => m.role === role)
    if (list.length > 0) acc.set(role, list)
    return acc
  }, new Map())

  return (
    <div>
      <SectionHeader
        title="Research Group"
        description="Current members and alumni"
      />
      <div className="space-y-12">
        {Array.from(grouped.entries()).map(([role, list]) => (
          <section key={role}>
            <h2 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">
              {ROLE_LABELS[role]}
            </h2>
            <MemberGrid members={list} />
          </section>
        ))}
      </div>
    </div>
  )
}
```

### 3. Member grid (`components/group/member-grid.tsx`)

```tsx
import { MemberCard } from './member-card'
import type { TeamMember } from '@/lib/types'

export function MemberGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {members.map(member => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  )
}
```

### 4. Member card (`components/group/member-card.tsx`)

```tsx
import Image from 'next/image'
import type { TeamMember } from '@/lib/types'

export function MemberCard({ member }: { member: TeamMember }) {
  const Wrapper = member.website ? 'a' : 'div'
  const wrapperProps = member.website
    ? { href: member.website, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col items-center text-center p-3 rounded-lg hover:bg-slate-50 transition-colors"
    >
      <div className="relative w-20 h-20 mb-3">
        <Image
          src={member.photo ?? '/images/team/placeholder.jpg'}
          alt={member.name}
          fill
          className="rounded-full object-cover border-2 border-slate-100"
        />
      </div>
      <span className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
        {member.name}
      </span>
      {member.research && (
        <span className="text-xs text-slate-500 mt-1 leading-snug">{member.research}</span>
      )}
      {member.role === 'alumni' && member.graduated && (
        <span className="text-xs text-slate-400 mt-0.5">PhD {member.graduated}</span>
      )}
    </Wrapper>
  )
}
```

## Todo

- [ ] Create `data/research.json` with placeholder content
- [ ] Create `data/team.json` with sample members
- [ ] Write `app/research/page.tsx`
- [ ] Write `app/group/page.tsx`
- [ ] Write `components/group/member-grid.tsx`
- [ ] Write `components/group/member-card.tsx`
- [ ] Add `public/images/team/placeholder.jpg` (generic avatar)
- [ ] Verify alumni section only appears if alumni exist

## Success Criteria

- Research areas render in 2-col grid, projects with active badge
- Group members correctly categorized by role in display order
- Member cards link to personal websites (when present)
- Alumni section shows graduation year
- Placeholder photo used when member photo missing
