---
phase: 04
title: Publications Section
status: completed
priority: high
effort: 3h
dependsOn: [phase-02]
---

# Phase 04 — Publications Section

## Overview

Filterable, sortable publications list. Each entry shows: title, authors, venue/year, abstract toggle, and links (PDF, DOI, arXiv, code, slides, BibTeX copy).

## Data File (`data/publications.json`)

```json
[
  {
    "id": "2025-example-paper",
    "title": "Example Paper Title",
    "authors": ["Your Name", "Co-Author One", "Co-Author Two"],
    "year": 2025,
    "venue": "OSDI",
    "venueType": "conference",
    "links": {
      "pdf": "/papers/2025-example.pdf",
      "doi": "https://doi.org/10.xxxx/xxxxx",
      "arxiv": "https://arxiv.org/abs/2501.xxxxx",
      "code": "https://github.com/you/project"
    },
    "abstract": "We present a system that ...",
    "tags": ["distributed systems", "storage"]
  }
]
```

> Store paper PDFs in `public/papers/` for self-hosting, or link directly to external URLs.

## Implementation Steps

### 1. Publications page (`app/publications/page.tsx`)

```tsx
import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/section-header'
import { PublicationList } from '@/components/publications/publication-list'
import { getPublications } from '@/lib/data-loaders'

export const metadata: Metadata = { title: 'Publications' }

export default function PublicationsPage() {
  const publications = getPublications()
  return (
    <div>
      <SectionHeader
        title="Publications"
        description={`${publications.length} publications`}
      />
      <PublicationList publications={publications} />
    </div>
  )
}
```

### 2. Publication list with year grouping (`components/publications/publication-list.tsx`)

```tsx
'use client'
import { useState, useMemo } from 'react'
import type { Publication } from '@/lib/types'
import { PublicationCard } from './publication-card'

interface PublicationListProps {
  publications: Publication[]
}

const VENUE_TYPES = ['all', 'conference', 'journal', 'workshop', 'preprint'] as const

export function PublicationList({ publications }: PublicationListProps) {
  const [filter, setFilter] = useState<string>('all')

  const filtered = useMemo(() =>
    filter === 'all'
      ? publications
      : publications.filter(p => p.venueType === filter),
    [publications, filter]
  )

  // Group by year descending
  const byYear = useMemo(() => {
    const map = new Map<number, Publication[]>()
    for (const pub of filtered) {
      const list = map.get(pub.year) ?? []
      list.push(pub)
      map.set(pub.year, list)
    }
    return Array.from(map.entries()).sort(([a], [b]) => b - a)
  }, [filtered])

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {VENUE_TYPES.map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === type
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Publications grouped by year */}
      <div className="space-y-10">
        {byYear.map(([year, pubs]) => (
          <section key={year}>
            <h2 className="text-lg font-semibold text-slate-400 mb-4 border-b pb-2">{year}</h2>
            <div className="space-y-4">
              {pubs.map(pub => (
                <PublicationCard key={pub.id} publication={pub} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
```

### 3. Publication card (`components/publications/publication-card.tsx`)

```tsx
'use client'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { BibTexDialog } from './bibtex-dialog'
import type { Publication } from '@/lib/types'

interface PublicationCardProps {
  publication: Publication
}

const VENUE_COLORS: Record<string, string> = {
  conference: 'bg-blue-50 text-blue-700',
  journal: 'bg-green-50 text-green-700',
  workshop: 'bg-orange-50 text-orange-700',
  preprint: 'bg-slate-50 text-slate-600',
}

export function PublicationCard({ publication: p }: PublicationCardProps) {
  const [showAbstract, setShowAbstract] = useState(false)

  return (
    <article className="group">
      <div className="flex items-start gap-2 flex-wrap mb-1">
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${VENUE_COLORS[p.venueType]}`}>
          {p.venue}
        </span>
      </div>

      <h3 className="font-medium text-slate-900 leading-snug mb-1">{p.title}</h3>

      <p className="text-sm text-slate-500 mb-2">
        {p.authors.join(', ')}
      </p>

      {/* Action links */}
      <div className="flex flex-wrap gap-3 text-xs font-medium">
        {p.links.pdf && (
          <a href={p.links.pdf} target="_blank" rel="noopener noreferrer"
             className="text-blue-600 hover:underline">[PDF]</a>
        )}
        {p.links.doi && (
          <a href={p.links.doi} target="_blank" rel="noopener noreferrer"
             className="text-blue-600 hover:underline">[DOI]</a>
        )}
        {p.links.arxiv && (
          <a href={p.links.arxiv} target="_blank" rel="noopener noreferrer"
             className="text-blue-600 hover:underline">[arXiv]</a>
        )}
        {p.links.code && (
          <a href={p.links.code} target="_blank" rel="noopener noreferrer"
             className="text-blue-600 hover:underline">[Code]</a>
        )}
        {p.links.slides && (
          <a href={p.links.slides} target="_blank" rel="noopener noreferrer"
             className="text-blue-600 hover:underline">[Slides]</a>
        )}
        {p.abstract && (
          <button onClick={() => setShowAbstract(v => !v)}
                  className="text-slate-500 hover:text-slate-800">
            [{showAbstract ? 'Hide abstract' : 'Abstract'}]
          </button>
        )}
        {p.bibtex && <BibTexDialog bibtex={p.bibtex} title={p.title} />}
      </div>

      {/* Collapsible abstract */}
      {showAbstract && p.abstract && (
        <p className="mt-3 text-sm text-slate-600 leading-relaxed bg-slate-50 rounded p-3 border-l-2 border-blue-200">
          {p.abstract}
        </p>
      )}
    </article>
  )
}
```

### 4. BibTeX dialog (`components/publications/bibtex-dialog.tsx`)

```tsx
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface BibTexDialogProps {
  bibtex: string
  title: string
}

export function BibTexDialog({ bibtex, title }: BibTexDialogProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(bibtex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className="relative group/bib">
      <button className="text-slate-500 hover:text-slate-800 text-xs font-medium">[BibTeX]</button>
      <div className="hidden group-hover/bib:block absolute left-0 top-5 z-20 w-80 bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <pre className="text-xs text-slate-700 overflow-x-auto whitespace-pre-wrap break-all max-h-48 overflow-y-auto">{bibtex}</pre>
        <button onClick={handleCopy}
                className="mt-2 text-xs text-blue-600 hover:underline">
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </button>
      </div>
    </span>
  )
}
```

## Todo

- [ ] Create `data/publications.json` with sample entries
- [ ] Write `app/publications/page.tsx`
- [ ] Write `components/publications/publication-list.tsx` (filter + year grouping)
- [ ] Write `components/publications/publication-card.tsx`
- [ ] Write `components/publications/bibtex-dialog.tsx`
- [ ] Test filter tabs (conference/journal/workshop/preprint)
- [ ] Test abstract expand/collapse
- [ ] Test BibTeX hover + copy

## Success Criteria

- Publications filter works client-side with no page reload
- Papers grouped by year descending
- Abstract toggle animates smoothly
- BibTeX copies to clipboard with confirmation
- Fully renders in static export (no server calls)
