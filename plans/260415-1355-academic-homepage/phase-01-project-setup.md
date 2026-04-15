---
phase: 01
title: Project Setup & Config
status: pending
priority: critical
effort: 1h
---

# Phase 01 — Project Setup & Config

## Overview

Bootstrap Next.js 15 with App Router, Tailwind CSS, shadcn/ui, and configure static export for GitHub Pages.

## Implementation Steps

### 1. Init Next.js project

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

### 2. Install shadcn/ui

```bash
npx shadcn@latest init
# Choose: Default style, Zinc color, CSS variables
```

Install needed components:
```bash
npx shadcn@latest add button badge card separator navigation-menu
```

### 3. Configure static export (`next.config.ts`)

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // Set to your GitHub repo name if deploying to username.github.io/repo-name
  // Leave empty if deploying to username.github.io (root domain)
  basePath: '',
  images: {
    unoptimized: true, // required for static export
  },
}

export default nextConfig
```

### 4. Add `.nojekyll` file

```bash
touch public/.nojekyll
```

Prevents GitHub Pages from running Jekyll, which breaks Next.js static output.

### 5. Create project structure

```
app/
├── layout.tsx           # Root layout with nav + footer
├── page.tsx             # Home (About/Bio)
├── publications/
│   └── page.tsx
├── research/
│   └── page.tsx
├── group/
│   └── page.tsx
├── teaching/
│   └── page.tsx
components/
├── layout/
│   ├── nav.tsx
│   └── footer.tsx
├── publications/
│   ├── publication-list.tsx
│   └── publication-card.tsx
├── group/
│   ├── member-card.tsx
│   └── member-grid.tsx
data/
├── publications.json
├── team.json
├── courses.json
└── profile.json
public/
├── .nojekyll
├── cv.pdf               # Upload your CV here
└── images/
    └── profile.jpg
lib/
├── types.ts             # TypeScript interfaces
└── data-loaders.ts      # JSON loading utilities
```

### 6. Define TypeScript types (`lib/types.ts`)

```typescript
export interface Publication {
  id: string
  title: string
  authors: string[]
  year: number
  venue: string
  venueType: 'conference' | 'journal' | 'workshop' | 'preprint'
  links: {
    pdf?: string
    doi?: string
    arxiv?: string
    code?: string
    slides?: string
  }
  abstract?: string
  bibtex?: string
  tags?: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: 'phd' | 'postdoc' | 'masters' | 'undergrad' | 'alumni' | 'collaborator'
  photo?: string
  website?: string
  email?: string
  joined?: number  // year
  graduated?: number  // year (alumni only)
  research?: string  // short description
}

export interface Course {
  id: string
  code: string
  title: string
  semester: string
  year: number
  level: 'undergraduate' | 'graduate'
  description?: string
  syllabusUrl?: string
}

export interface Profile {
  name: string
  title: string
  department: string
  university: string
  email: string
  officeLocation?: string
  bio: string
  researchInterests: string[]
  socialLinks: {
    googleScholar?: string
    dblp?: string
    github?: string
    twitter?: string
    linkedin?: string
    orcid?: string
  }
}
```

### 7. Update `package.json` scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Todo

- [ ] Init Next.js project
- [ ] Install shadcn/ui, add components
- [ ] Configure `next.config.ts` for static export
- [ ] Add `public/.nojekyll`
- [ ] Create directory structure
- [ ] Define TypeScript interfaces in `lib/types.ts`
- [ ] Create empty placeholder JSON files in `data/`

## Success Criteria

- `npm run build` produces an `out/` directory with no errors
- All TypeScript types compile cleanly
- shadcn/ui components import successfully
