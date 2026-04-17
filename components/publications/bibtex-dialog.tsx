"use client";
import { useState } from "react";
import { BookmarkCheck } from "lucide-react";
import { BibtexBlock } from "./bibtex-block";

interface BibTexDialogProps {
  bibtex: string;
}

/** Click-to-toggle BibTeX panel — chip trigger matches other action chips. */
export function BibTexDialog({ bibtex }: BibTexDialogProps) {
  const [open, setOpen] = useState(false);

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
        <div className="mt-3">
          <BibtexBlock bibtex={bibtex} />
        </div>
      )}
    </span>
  );
}
