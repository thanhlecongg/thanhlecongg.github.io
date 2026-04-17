# Phase 05 — Papers: BibTeX Copy Button

## Overview

- **Priority:** P3
- **Status:** Pending
- **Effort:** 30m
- **Description:** Add a "Copy" button to the BibTeX section on paper detail pages (`/papers/[slug]`).

## Key Insights

- BibTeX is rendered in `app/papers/[slug]/page.tsx` lines 107-117 as a `<pre>` block
- The page is a server component (`async function PaperPage`) — copy button needs `"use client"` directive
- Pattern: extract a small client component for the copy interaction, keep page as server component
- `navigator.clipboard.writeText()` for copy; show "Copied!" feedback briefly

## Requirements

**Functional:**
- "Copy" button in the BibTeX header bar (where "BibTeX" label is)
- Click copies the full BibTeX string to clipboard
- Visual feedback: button text changes to "Copied!" for 2 seconds, then reverts

**Non-functional:**
- `"use client"` component — minimal; just the copy button
- Graceful fallback if clipboard API unavailable (button hidden or disabled)

## Related Files

| Action | File |
|--------|------|
| Create | `components/papers/bibtex-copy-button.tsx` (client component) |
| Modify | `app/papers/[slug]/page.tsx` — use new component in BibTeX section |

## Implementation Steps

1. Create `components/papers/bibtex-copy-button.tsx`:
   ```tsx
   "use client";
   import { useState } from "react";
   import { Copy, Check } from "lucide-react";
   
   interface Props { bibtex: string; }
   
   export function BibtexCopyButton({ bibtex }: Props) {
     const [copied, setCopied] = useState(false);
     
     async function handleCopy() {
       await navigator.clipboard.writeText(bibtex);
       setCopied(true);
       setTimeout(() => setCopied(false), 2000);
     }
     
     return (
       <button onClick={handleCopy} className="..." aria-label="Copy BibTeX">
         {copied ? <><Check /> Copied!</> : <><Copy /> Copy</>}
       </button>
     );
   }
   ```
   - Style: ghost-like button, small text, muted colors matching the header bar
   - Icons: 14px lucide `Copy` / `Check`

2. Update `app/papers/[slug]/page.tsx`:
   - Import `BibtexCopyButton`
   - In the BibTeX header bar (line 110-112), add `<BibtexCopyButton bibtex={paper.bibtex} />` on the right side:
     ```tsx
     <div className="flex items-center justify-between ...">
       BibTeX
       <BibtexCopyButton bibtex={paper.bibtex} />
     </div>
     ```

3. Run `npm run build`

## Data Flow

```
app/papers/[slug]/page.tsx (server)
  -> passes paper.bibtex string as prop
  -> components/papers/bibtex-copy-button.tsx (client)
  -> navigator.clipboard.writeText() on click
```

## Todo

- [ ] Create `components/papers/bibtex-copy-button.tsx`
- [ ] Update `app/papers/[slug]/page.tsx` to use the button
- [ ] Verify build passes
- [ ] Manual test: click Copy, paste elsewhere, verify BibTeX matches

## Success Criteria

- Copy button visible in BibTeX header bar on `/papers/patchguru`
- Clicking copies full BibTeX to clipboard
- "Copied!" feedback appears for ~2 seconds
- `npm run build` succeeds

## Risk Assessment

| Risk | L | I | Mitigation |
|------|---|---|------------|
| Clipboard API blocked in some browsers | Low | Low | Wrap in try/catch; show error toast or silent fail |
| SSR mismatch with client component | Low | Medium | Component is purely interactive — no SSR content difference |
