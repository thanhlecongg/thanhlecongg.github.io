---
phase: 07
title: GitHub Pages Deployment
status: pending
priority: critical
effort: 1h
dependsOn: [phase-01]
---

# Phase 07 — GitHub Pages Deployment

## Overview

Configure GitHub Actions CI/CD to build Next.js static export and deploy to GitHub Pages automatically on every push to `main`.

## Two Deployment Scenarios

| Scenario | URL | `basePath` setting |
|----------|-----|--------------------|
| User/org site (`username.github.io`) | `https://username.github.io` | `''` (empty) |
| Project site (`username.github.io/repo`) | `https://username.github.io/repo-name` | `'/repo-name'` |

Choose one before implementing — affects all internal links and asset paths.

## Implementation Steps

### 1. Update `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  // For project site: basePath: '/your-repo-name'
  // For user site:    basePath: ''
  basePath: isProd ? '/your-repo-name' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Required for GitHub Pages to resolve routes correctly
}

export default nextConfig
```

> **Note:** `trailingSlash: true` ensures `out/publications/index.html` is generated instead of `out/publications.html`, which GitHub Pages serves correctly.

### 2. Add `.nojekyll` to `public/`

```bash
touch public/.nojekyll
```

This file tells GitHub Pages to skip Jekyll processing. Without it, directories starting with `_` (like `_next/`) are ignored, breaking the site.

### 3. GitHub Actions workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:  # Allow manual triggers

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. Enable GitHub Pages in repository settings

1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Save — first deploy triggers automatically on next push

### 5. Verify `out/` directory locally

```bash
npm run build
ls out/
# Should see: index.html, publications/, research/, group/, teaching/, _next/
```

### 6. Custom domain (optional)

Add a `CNAME` file to `public/`:
```
yourdomain.com
```

Then configure DNS:
- A records → GitHub Pages IPs
- Or CNAME → `username.github.io`

## Todo

- [ ] Decide deployment scenario (user site vs project site) and set `basePath`
- [ ] Update `next.config.ts` with correct `basePath` and `trailingSlash: true`
- [ ] Confirm `public/.nojekyll` exists
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Enable GitHub Pages in repository settings (source: GitHub Actions)
- [ ] Push to `main` and verify Actions workflow passes
- [ ] Visit deployed URL and test all navigation links

## Success Criteria

- GitHub Actions workflow completes without errors
- All 5 pages accessible at deployed URL: `/`, `/publications`, `/research`, `/group`, `/teaching`
- Static assets (images, CSS) load correctly
- No 404 errors on direct URL navigation (trailingSlash handles this)
