---
phase: 03
title: Core Sections (About, Contact)
status: completed
priority: high
effort: 2h
dependsOn: [phase-02]
---

# Phase 03 — Core Sections (About / Bio)

## Overview

Implement the homepage (About/Bio) — the most visited page. Includes profile photo, bio, research interests chips, quick-links (CV, email, social), and a short news/updates feed.

## Data File (`data/profile.json`)

```json
{
  "name": "Your Name",
  "title": "Assistant Professor",
  "department": "Department of Computer Science",
  "university": "University Name",
  "email": "you@university.edu",
  "officeLocation": "Building X, Room 000",
  "bio": "I am an assistant professor at ... My research focuses on ...",
  "researchInterests": [
    "Distributed Systems",
    "Machine Learning",
    "Computer Networks"
  ],
  "socialLinks": {
    "googleScholar": "https://scholar.google.com/citations?user=XXXX",
    "dblp": "https://dblp.org/pid/xxx.html",
    "github": "https://github.com/yourusername",
    "twitter": "",
    "linkedin": "",
    "orcid": ""
  },
  "news": [
    { "date": "2026-03", "text": "Paper accepted at OSDI 2026." },
    { "date": "2026-01", "text": "Joined University X as Assistant Professor." }
  ]
}
```

## Implementation Steps

### 1. Data loader (`lib/data-loaders.ts`)

```typescript
import profileData from '@/data/profile.json'
import publicationsData from '@/data/publications.json'
import teamData from '@/data/team.json'
import coursesData from '@/data/courses.json'
import type { Profile, Publication, TeamMember, Course } from './types'

export function getProfile(): Profile {
  return profileData as Profile
}

export function getPublications(): Publication[] {
  return publicationsData as Publication[]
}

export function getTeamMembers(): TeamMember[] {
  return teamData as TeamMember[]
}

export function getCourses(): Course[] {
  return coursesData as Course[]
}
```

### 2. Homepage (`app/page.tsx`)

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SocialLinks } from '@/components/about/social-links'
import { NewsItem } from '@/components/about/news-item'
import { getProfile } from '@/lib/data-loaders'

export default function HomePage() {
  const profile = getProfile()

  return (
    <div className="space-y-12">
      {/* Hero: photo + intro */}
      <section className="flex flex-col sm:flex-row gap-8 items-start">
        <Image
          src="/images/profile.jpg"
          alt={profile.name}
          width={160}
          height={160}
          className="rounded-full border-4 border-slate-100 shadow-sm flex-shrink-0"
          priority
        />
        <div className="prose">
          <h1 className="text-3xl font-bold text-slate-900">{profile.name}</h1>
          <p className="text-slate-500 mt-1 mb-4">
            {profile.title} · {profile.department} · {profile.university}
          </p>
          <p className="text-slate-600 leading-relaxed">{profile.bio}</p>

          {/* Research interests */}
          <div className="flex flex-wrap gap-2 mt-4">
            {profile.researchInterests.map(interest => (
              <Badge key={interest} variant="secondary">{interest}</Badge>
            ))}
          </div>

          {/* Quick action buttons */}
          <div className="flex gap-3 mt-6 flex-wrap">
            <Button asChild size="sm">
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </Button>
          </div>

          {/* Social links */}
          <SocialLinks links={profile.socialLinks} className="mt-4" />
        </div>
      </section>

      {/* News feed */}
      {profile.news.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">News</h2>
          <ul className="space-y-2">
            {profile.news.map((item, i) => (
              <NewsItem key={i} date={item.date} text={item.text} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
```

### 3. Social Links component (`components/about/social-links.tsx`)

```tsx
import { cn } from '@/lib/utils'

const SOCIAL_LABELS: Record<string, string> = {
  googleScholar: 'Google Scholar',
  dblp: 'DBLP',
  github: 'GitHub',
  twitter: 'Twitter/X',
  linkedin: 'LinkedIn',
  orcid: 'ORCID',
}

interface SocialLinksProps {
  links: Record<string, string | undefined>
  className?: string
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  const active = Object.entries(links).filter(([, url]) => url)
  if (active.length === 0) return null

  return (
    <div className={cn('flex flex-wrap gap-3 text-sm', className)}>
      {active.map(([key, url]) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
        >
          {SOCIAL_LABELS[key] ?? key}
        </a>
      ))}
    </div>
  )
}
```

### 4. News Item component (`components/about/news-item.tsx`)

```tsx
interface NewsItemProps {
  date: string   // e.g. "2026-03"
  text: string
}

export function NewsItem({ date, text }: NewsItemProps) {
  const [year, month] = date.split('-')
  const label = new Date(Number(year), Number(month) - 1).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <li className="flex gap-4 text-sm">
      <span className="text-slate-400 font-mono w-20 flex-shrink-0">{label}</span>
      <span className="text-slate-700">{text}</span>
    </li>
  )
}
```

## Todo

- [ ] Create `data/profile.json` with placeholder content
- [ ] Write `lib/data-loaders.ts`
- [ ] Write `app/page.tsx` homepage
- [ ] Write `components/about/social-links.tsx`
- [ ] Write `components/about/news-item.tsx`
- [ ] Add profile photo placeholder at `public/images/profile.jpg`
- [ ] Add `public/cv.pdf` placeholder (empty or dummy)

## Success Criteria

- Homepage renders profile photo, bio, interests badges, CV button, social links
- News items display with formatted date
- Responsive layout on mobile (photo above text, stacked)
