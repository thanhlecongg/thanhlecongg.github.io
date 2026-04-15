"use client";
import { useState } from "react";
import {
  FileText,
  Link as LinkIcon,
  BookOpen,
  Code2,
  Presentation,
  ChevronDown,
  ChevronUp,
  Quote,
} from "lucide-react";
import { BibTexDialog } from "./bibtex-dialog";
import type { Publication } from "@/lib/types";

interface PublicationCardProps {
  publication: Publication;
}

/** Venue badge color map — semantic colors per publication type */
const VENUE_COLORS: Record<string, string> = {
  conference: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  journal:    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  workshop:   "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  preprint:   "bg-muted text-muted-foreground border-border",
};

/** Left-border accent color per venue type */
const CARD_ACCENT: Record<string, string> = {
  conference: "border-l-blue-400",
  journal:    "border-l-emerald-400",
  workshop:   "border-l-amber-400",
  preprint:   "border-l-muted-foreground/30",
};

/** Author list — site owner rendered in primary color + semibold */
function AuthorList({ authors }: { authors: string[] }) {
  return (
    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
      {authors.map((author, i) => (
        <span key={i}>
          {author === "Thanh Le-Cong" ? (
            <strong className="font-semibold text-primary">{author}</strong>
          ) : (
            author
          )}
          {i < authors.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

/** Shared chip style for all action links */
const chipBase =
  "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer";
const primaryChip = `${chipBase} bg-primary/8 text-primary hover:bg-primary/15`;
const mutedChip   = `${chipBase} bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/70`;

export function PublicationCard({ publication: p }: PublicationCardProps) {
  const [showAbstract, setShowAbstract] = useState(false);

  const accentClass = CARD_ACCENT[p.venueType] ?? CARD_ACCENT.preprint;

  return (
    <article
      className={`bg-card border border-border border-l-4 ${accentClass}
                  rounded-lg p-5 transition-shadow duration-200 hover:shadow-sm`}
    >
      {/* Top row: venue badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded border
                      ${VENUE_COLORS[p.venueType] ?? VENUE_COLORS.preprint}`}
        >
          {p.venue}
        </span>
      </div>

      {/* Title — serif font for scholarly weight */}
      <h3 className="text-[1.05rem] font-semibold text-foreground leading-snug mb-1.5"
          style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
        {p.title}
      </h3>

      {/* Authors — own name in primary blue */}
      <AuthorList authors={p.authors} />

      {/* Action chips row */}
      <div className="flex flex-wrap gap-1.5">
        {p.links.pdf && (
          <a href={p.links.pdf} target="_blank" rel="noopener noreferrer" className={primaryChip}>
            <FileText className="w-3 h-3" /> PDF
          </a>
        )}
        {p.links.doi && (
          <a href={p.links.doi} target="_blank" rel="noopener noreferrer" className={primaryChip}>
            <LinkIcon className="w-3 h-3" /> DOI
          </a>
        )}
        {p.links.arxiv && (
          <a href={p.links.arxiv} target="_blank" rel="noopener noreferrer" className={primaryChip}>
            <BookOpen className="w-3 h-3" /> arXiv
          </a>
        )}
        {p.links.code && (
          <a href={p.links.code} target="_blank" rel="noopener noreferrer" className={primaryChip}>
            <Code2 className="w-3 h-3" /> Code
          </a>
        )}
        {p.links.slides && (
          <a href={p.links.slides} target="_blank" rel="noopener noreferrer" className={primaryChip}>
            <Presentation className="w-3 h-3" /> Slides
          </a>
        )}
        {p.abstract && (
          <button onClick={() => setShowAbstract((v) => !v)} className={mutedChip}>
            {showAbstract
              ? <><ChevronUp className="w-3 h-3" /> Hide</>
              : <><ChevronDown className="w-3 h-3" /> Abstract</>}
          </button>
        )}
        {p.bibtex && <BibTexDialog bibtex={p.bibtex} />}
      </div>

      {/* Collapsible abstract with subtle inset panel */}
      {showAbstract && p.abstract && (
        <div className="mt-4 bg-muted/40 border border-border rounded-md p-4">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Quote className="w-3 h-3" /> Abstract
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {p.abstract}
          </p>
        </div>
      )}
    </article>
  );
}
