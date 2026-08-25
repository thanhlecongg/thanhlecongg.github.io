"use client";
import { useState } from "react";
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
        className="text-[12.5px] text-muted-foreground border-b border-border pb-px transition-colors cursor-pointer hover:text-primary hover:border-primary"
      >
        BibTeX
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
