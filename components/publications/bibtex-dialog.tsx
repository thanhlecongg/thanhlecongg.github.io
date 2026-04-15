"use client";
import { useState } from "react";
import { BookmarkCheck, Copy, Check, X } from "lucide-react";

interface BibTexDialogProps {
  bibtex: string;
}

/** Click-to-toggle BibTeX panel — chip trigger matches other action chips. */
export function BibTexDialog({ bibtex }: BibTexDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <span className="inline-block">
      {/* Trigger chip — consistent with PDF/Code/arXiv chips */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md font-medium
                   transition-colors cursor-pointer bg-muted text-muted-foreground
                   hover:text-foreground hover:bg-muted/70"
      >
        <BookmarkCheck className="w-3 h-3" />
        Cite
      </button>

      {/* Inline BibTeX panel */}
      {open && (
        <div className="mt-3 bg-muted/60 border border-border rounded-lg overflow-hidden">
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/40">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              BibTeX
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close BibTeX panel"
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* BibTeX content */}
          <pre className="text-xs text-foreground/95 overflow-x-auto whitespace-pre-wrap break-words
                          max-h-44 overflow-y-auto font-mono leading-relaxed px-4 py-3">
            {bibtex}
          </pre>

          {/* Copy action */}
          <div className="px-4 py-2 border-t border-border">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary
                         hover:text-primary/80 transition-colors cursor-pointer"
            >
              {copied
                ? <><Check className="w-3 h-3" /> Copied!</>
                : <><Copy className="w-3 h-3" /> Copy to clipboard</>}
            </button>
          </div>
        </div>
      )}
    </span>
  );
}
