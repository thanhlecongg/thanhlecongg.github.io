"use client";
import { useState, useMemo } from "react";
import type { Publication } from "@/lib/types";
import { PublicationCard } from "./publication-card";

interface PublicationListProps {
  publications: Publication[];
}

const VENUE_TYPES = ["all", "conference", "journal", "workshop", "preprint"] as const;
type VenueFilter = (typeof VENUE_TYPES)[number];

/** Venue type label overrides for display */
const VENUE_LABELS: Record<string, string> = {
  all: "All",
  conference: "Conference",
  journal: "Journal",
  workshop: "Workshop",
  preprint: "Preprint",
};

export function PublicationList({ publications }: PublicationListProps) {
  const [filter, setFilter] = useState<VenueFilter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? publications : publications.filter((p) => p.venueType === filter)),
    [publications, filter]
  );

  /** Group filtered publications by year, sorted newest first */
  const byYear = useMemo(() => {
    const map = new Map<number, Publication[]>();
    for (const pub of filtered) {
      const list = map.get(pub.year) ?? [];
      list.push(pub);
      map.set(pub.year, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => b - a);
  }, [filtered]);

  /** Count per venue type for filter pill badges */
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: publications.length };
    for (const p of publications) {
      c[p.venueType] = (c[p.venueType] ?? 0) + 1;
    }
    return c;
  }, [publications]);

  return (
    <div>
      {/* Stats summary row */}
      <div className="flex flex-wrap gap-x-6 gap-y-1 mb-6 text-sm text-muted-foreground">
        <span>
          <span className="font-semibold text-foreground tabular-nums">{publications.length}</span>{" "}
          total publications
        </span>
        {(["conference", "journal", "workshop"] as const).map((type) =>
          counts[type] ? (
            <span key={type}>
              <span className="font-semibold text-foreground tabular-nums">{counts[type]}</span>{" "}
              {type}
              {counts[type] > 1 ? "s" : ""}
            </span>
          ) : null
        )}
      </div>

      {/* Venue-type filter pills */}
      <div className="flex gap-2 mb-8 flex-wrap" role="group" aria-label="Filter by publication type">
        {VENUE_TYPES.map((type) => {
          const active = filter === type;
          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              aria-pressed={active}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
            >
              {VENUE_LABELS[type]}
              {counts[type] ? (
                <span className={`ml-1.5 text-xs tabular-nums ${active ? "opacity-80" : "opacity-60"}`}>
                  {counts[type]}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Publications grouped by year */}
      <div className="space-y-12">
        {byYear.map(([year, pubs]) => (
          <section key={year}>
            {/* Year heading with paper count */}
            <div className="flex items-baseline gap-3 mb-5">
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
              >
                {year}
              </h2>
              <span className="text-sm text-muted-foreground">
                {pubs.length} {pubs.length === 1 ? "paper" : "papers"}
              </span>
              <div className="flex-1 border-t border-border mt-1" />
            </div>

            <div className="space-y-4">
              {pubs.map((pub) => (
                <PublicationCard key={pub.id} publication={pub} />
              ))}
            </div>
          </section>
        ))}

        {byYear.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No publications in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
