---
phase: 02
title: Design System & Layout
status: completed
priority: high
effort: 2h
dependsOn: [phase-01]
---

# Phase 02 — Design System & Layout

## Overview

Establish the global design system: color palette, typography, navigation, footer, and root layout. Sets the visual foundation for all sections.

## Design Principles

- Clean, professional academic aesthetic — whitespace-heavy, legible
- Primary: blue/slate (`slate-900` text, `blue-600` links/accents)
- Responsive: mobile-first, single column on small screens
- Accessibility: semantic HTML, ARIA labels, sufficient contrast

## Implementation Steps

### 1. Global CSS (`app/globals.css`)

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* Keep shadcn/ui defaults, override accent to academic blue */
  --primary: oklch(0.546 0.245 262.881);   /* blue-600 */
  --primary-foreground: oklch(0.985 0 0);
}

@layer base {
  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "liga" 1, "kern" 1;
  }

  /* Academic typography */
  .prose h1 { @apply text-3xl font-bold tracking-tight mb-2; }
  .prose h2 { @apply text-xl font-semibold mt-10 mb-3 text-slate-800; }
  .prose h3 { @apply text-base font-semibold mt-6 mb-2 text-slate-700; }
  .prose p  { @apply text-base leading-7 text-slate-600 mb-4 max-w-prose; }
  .prose a  { @apply text-blue-600 underline underline-offset-2 hover:text-blue-800; }
}
```

### 2. Root Layout (`app/layout.tsx`)

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import profile from '@/data/profile.json'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: profile.name, template: `%s | ${profile.name}` },
  description: `Academic homepage of ${profile.name}, ${profile.title} at ${profile.university}`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Nav />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

### 3. Navigation (`components/layout/nav.tsx`)

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/',             label: 'About' },
  { href: '/publications', label: 'Publications' },
  { href: '/research',     label: 'Research' },
  { href: '/group',        label: 'Group' },
  { href: '/teaching',     label: 'Teaching' },
]

export default function Nav() {
  const pathname = usePathname()
  return (
    <header className="border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href="/" className="font-semibold text-slate-900 hover:text-blue-600 transition-colors">
          {/* Name populated from profile.json at build time */}
          Prof. Homepage
        </Link>
        <nav className="flex gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

### 4. Footer (`components/layout/footer.tsx`)

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-16 py-6 text-center text-sm text-slate-400">
      <p>© {new Date().getFullYear()} — Built with Next.js</p>
    </footer>
  )
}
```

### 5. Shared Section Header component (`components/ui/section-header.tsx`)

```tsx
interface SectionHeaderProps {
  title: string
  description?: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8 border-b border-slate-200 pb-4">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      {description && <p className="mt-2 text-slate-500">{description}</p>}
    </div>
  )
}
```

## Todo

- [ ] Write `app/globals.css` with academic typography tokens
- [ ] Write `app/layout.tsx` root layout
- [ ] Write `components/layout/nav.tsx` with active-link highlighting
- [ ] Write `components/layout/footer.tsx`
- [ ] Write `components/ui/section-header.tsx` shared header
- [ ] Verify nav links work in dev mode (`npm run dev`)

## Success Criteria

- Nav highlights active page on each route
- Layout is responsive (mobile hamburger not required — inline links collapse gracefully)
- Typography renders cleanly across About, Publications, Teaching pages
