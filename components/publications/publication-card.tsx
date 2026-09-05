import { BibTexDialog } from "./bibtex-dialog";
import { getBibtex } from "@/lib/bibtex-utils";
import type { Publication } from "@/lib/types";

interface PublicationCardProps {
  publication: Publication;
  /** Show the year next to the venue — used in grouped buckets like "Before 2023" */
  showYear?: boolean;
}

/** Author list — site owner emphasized, with optional co-first authorship markers */
function AuthorList({
  authors,
  coFirstAuthors = [],
}: {
  authors: string[];
  coFirstAuthors?: string[];
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[13.5px] text-muted-foreground leading-relaxed">
        {authors.map((author, i) => (
          <span key={i}>
            {author === "Thanh Le-Cong" ? (
              <strong className="font-semibold text-foreground">{author}</strong>
            ) : (
              author
            )}
            {coFirstAuthors.includes(author) && (
              <sup className="ml-0.5 font-medium text-primary" aria-label="co-first author">†</sup>
            )}
            {i < authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      {coFirstAuthors.length > 0 && (
        <span className="text-[11px] text-muted-foreground">† Co-first authors</span>
      )}
    </div>
  );
}

/** Shared chip style for all action links */
const chipBase = "text-[12.5px] border-b pb-px transition-colors cursor-pointer";

/** Neutral chip style — used for links that appear on nearly every card (PDF, Code) */
const chipNeutral = "text-muted-foreground border-border hover:text-foreground hover:border-foreground/50";

/** Per-link-type color, reserved for the less common link types so it signals "extra resource" */
const linkColors = {
  doi: "text-violet-600/80 dark:text-violet-400/80 border-violet-600/30 dark:border-violet-400/30 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-600 dark:hover:border-violet-400",
  arxiv: "text-orange-600/80 dark:text-orange-400/80 border-orange-600/30 dark:border-orange-400/30 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-600 dark:hover:border-orange-400",
  slides: "text-teal-600/80 dark:text-teal-400/80 border-teal-600/30 dark:border-teal-400/30 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-600 dark:hover:border-teal-400",
} as const;

export function PublicationCard({ publication: p, showYear }: PublicationCardProps) {
  return (
    <article className="flex flex-wrap gap-x-6 gap-y-2 py-3.5 px-4 -mx-4 rounded-[10px] border-b border-border/70 hover:bg-card transition-colors">
      <div className="flex-none w-[100px] flex flex-col items-start gap-1.5 pt-0.5">
        <span className="font-mono text-[11px] font-medium uppercase tracking-wide text-foreground/85 underline decoration-primary/30 decoration-2 underline-offset-4">
          {p.venue}
        </span>
        {p.track && (
          <span className="font-mono text-[11px] text-muted-foreground">{p.track}</span>
        )}
        {showYear && (
          <span className="font-mono text-[11px] text-muted-foreground">{p.year}</span>
        )}
        {p.award && (
          <span className="text-[11px] leading-snug text-amber-700 dark:text-amber-400">★ {p.award}</span>
        )}
      </div>

      <div className="flex-1 min-w-[280px] flex flex-col gap-1.5">
        <h3 className="text-[19px] font-semibold text-foreground leading-snug"
            style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
          {p.title}
        </h3>

        <AuthorList authors={p.authors} coFirstAuthors={p.coFirstAuthors} />

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 items-center">
          {p.links.pdf && (
            <a href={p.links.pdf} target="_blank" rel="noopener noreferrer" className={`${chipBase} ${chipNeutral}`}>PDF</a>
          )}
          {p.links.doi && (
            <a href={p.links.doi} target="_blank" rel="noopener noreferrer" className={`${chipBase} ${linkColors.doi}`}>DOI</a>
          )}
          {p.links.arxiv && (
            <a href={p.links.arxiv} target="_blank" rel="noopener noreferrer" className={`${chipBase} ${linkColors.arxiv}`}>arXiv</a>
          )}
          {p.links.code && (
            <a href={p.links.code} target="_blank" rel="noopener noreferrer" className={`${chipBase} ${chipNeutral}`}>Code</a>
          )}
          {p.links.slides && (
            <a href={p.links.slides} target="_blank" rel="noopener noreferrer" className={`${chipBase} ${linkColors.slides}`}>Slides</a>
          )}
          <BibTexDialog bibtex={getBibtex(p)} />
        </div>
      </div>
    </article>
  );
}
