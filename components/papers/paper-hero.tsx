import type { PaperDetail } from "@/lib/types";

const VENUE_BADGE: Record<string, string> = {
  conference: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  journal:    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  workshop:   "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  preprint:   "bg-muted text-muted-foreground border-border",
};

export function PaperHero({ paper }: { paper: PaperDetail }) {
  const badgeClass = VENUE_BADGE[paper.venueType] ?? VENUE_BADGE.preprint;

  return (
    <header className="space-y-4 border-b border-border pb-8">
      {/* Venue + year + status */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded border ${badgeClass}`}>
          {paper.venue}
        </span>
        <span className="text-xs text-muted-foreground font-mono">{paper.year}</span>
        {paper.status && paper.status !== paper.venue && (
          <span className="text-xs text-muted-foreground">· {paper.status}</span>
        )}
      </div>

      {/* Title */}
      <h1
        className="text-3xl font-bold tracking-tight text-foreground leading-tight"
        style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
      >
        {paper.title}
      </h1>

      {/* Authors */}
      <p className="text-base text-muted-foreground leading-relaxed">
        {paper.authors.map((author, i) => (
          <span key={i}>
            {author === "Thanh Le-Cong" ? (
              <strong className="font-semibold text-primary">{author}</strong>
            ) : (
              author
            )}
            {i < paper.authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    </header>
  );
}
