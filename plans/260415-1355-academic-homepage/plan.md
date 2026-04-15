---
title: Personal Academic Webpage
status: in_progress
created: 2026-04-15
blockedBy: []
blocks: []
---

# Personal Academic Webpage

## Overview

Build a professional personal academic webpage for an assistant professor using Next.js (App Router) + Tailwind CSS + shadcn/ui, deployed to GitHub Pages via static export.

**Stack:** Next.js 15 (App Router, `output: 'export'`) · Tailwind CSS · shadcn/ui · TypeScript  
**Hosting:** GitHub Pages (via GitHub Actions CI/CD)  
**Content:** JSON files for structured data (publications, team, courses) · MDX for rich pages (bio, research)

## Sections

| Section | Description |
|---------|-------------|
| About / Bio | Profile photo, bio, CV download, contact info |
| Publications | Filterable list with PDF/DOI/BibTeX per paper |
| Research | Research interests + active projects |
| Research Group | Team cards: PhD students, postdocs, collaborators |
| Teaching | Courses taught, syllabi links, office hours |

## Phases

| Phase | Title | Status | Priority |
|-------|-------|--------|----------|
| [01](phase-01-project-setup.md) | Project Setup & Config | pending | critical |
| [02](phase-02-design-system.md) | Design System & Layout | pending | high |
| [03](phase-03-core-sections.md) | Core Sections (About, Contact) | pending | high |
| [04](phase-04-publications.md) | Publications Section | pending | high |
| [05](phase-05-research-group.md) | Research & Group Section | pending | high |
| [06](phase-06-teaching.md) | Teaching Section | pending | medium |
| [07](phase-07-deployment.md) | GitHub Pages Deployment | pending | critical |

## Key Dependencies

- Node.js 20+
- GitHub repo with Pages enabled
- Profile photo asset
- Publications data (JSON)
- Team member data (JSON)
