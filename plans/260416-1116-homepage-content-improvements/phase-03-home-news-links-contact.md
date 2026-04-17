# Phase 03 — Home: News Links + Contact Details

## Overview

- **Priority:** P2
- **Status:** Pending
- **Effort:** 45m
- **Description:** (A) Add optional `href` to news items so entries like "Paper accepted at ICSE 2026" link to the actual paper. (B) Populate and display office location.

## Key Insights

- `NewsItem` type in `lib/types.ts` (line 74-78) has `{ date, text }` — needs `href?: string`
- `NewsItem` component in `components/about/news-item.tsx` renders plain text — needs conditional `<a>` wrapping
- `profile.json` has `"officeLocation": ""` — just needs data populated
- Home page (`app/page.tsx`) already renders `profile.email` — office location can go nearby

## Requirements

**Functional:**
- News items with `href` render as clickable links (open in new tab)
- News items without `href` render as plain text (no behavior change)
- Office location displayed in hero section near email

**Non-functional:**
- Backwards compatible — `href` is optional
- No `"use client"` needed (home page is server component)

## Related Files

| Action | File |
|--------|------|
| Modify | `lib/types.ts` — add `href?: string` to `NewsItem` |
| Modify | `data/profile.json` — add `href` to relevant news items + populate `officeLocation` |
| Modify | `components/about/news-item.tsx` — conditional link rendering |
| Modify | `app/page.tsx` — display `officeLocation` in hero |

## Implementation Steps

### Part A: News Links

1. Add `href?: string` to `NewsItem` interface in `lib/types.ts`
2. Update `components/about/news-item.tsx`:
   - Add `href?: string` to `NewsItemProps`
   - Wrap the text `<span>` in an `<a>` tag when `href` is present:
     - `target="_blank"`, `rel="noopener noreferrer"`
     - Add subtle link styling: `text-primary hover:underline`
     - Append a small external link icon (lucide `ExternalLink`, 12px) after text
   - When `href` is absent, render text as-is (current behavior)
3. Update `app/page.tsx` line 113:
   - Pass `href={item.href}` to `<NewsItem>`
4. Update `data/profile.json` news items — add `href` where applicable:
   - "Paper accepted at ICSE 2026 on membership inference..." → link to arxiv `https://arxiv.org/pdf/2512.15468`
   - Other items: leave without `href` (talks/service don't have URLs)

### Part B: Office Location

5. Update `data/profile.json`: set `"officeLocation"` to the actual office (user must provide; use placeholder like "TBD — SUTD Campus" if unknown)
6. Update `app/page.tsx` hero section:
   - After the email button (line ~92), add a line displaying office location if non-empty:
     ```
     {profile.officeLocation && (
       <p className="text-sm text-muted-foreground mt-2">
         <MapPin className="inline w-3.5 h-3.5 mr-1" />
         {profile.officeLocation}
       </p>
     )}
     ```
   - Import `MapPin` from lucide-react

7. Run `npm run build`

## Data Flow

```
data/profile.json (news[].href, officeLocation)
  -> lib/data-loaders.ts (getProfile)
  -> app/page.tsx
     -> components/about/news-item.tsx (renders link or text)
     -> hero section (renders office location)
```

## Todo

- [ ] Add `href?: string` to `NewsItem` in `lib/types.ts`
- [ ] Update `components/about/news-item.tsx` with conditional link
- [ ] Update `app/page.tsx` to pass `href` prop + render office location
- [ ] Update `data/profile.json` with `href` values + `officeLocation`
- [ ] Verify build passes

## Success Criteria

- ICSE 2026 news item links to arxiv page
- Non-linked news items render unchanged
- Office location visible in hero section (or hidden if empty)
- `npm run build` succeeds

## Risk Assessment

- **Low risk:** All changes are additive optional fields. Existing rendering unchanged for items without `href`.
