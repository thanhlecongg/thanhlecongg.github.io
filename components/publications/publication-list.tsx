"use client";
import { useMemo, useState } from "react";
import type { Publication } from "@/lib/types";
import { PublicationCard } from "./publication-card";

interface PublicationListProps {
  publications: Publication[];
}

const TYPE_FILTERS = ["All", "Conference", "Journal", "Preprint"] as const;
type TypeFilter = (typeof TYPE_FILTERS)[number];

/** Publication.venueType is lowercase; the mockup's filter labels are Title Case */
const TYPE_MAP: Record<Exclude<TypeFilter, "All">, Publication["venueType"]> = {
  Conference: "conference",
  Journal: "journal",
  Preprint: "preprint",
};

function chipClass(active: boolean) {
  return active
    ? "bg-primary text-primary-foreground border-primary"
    : "bg-card text-foreground/70 border-border hover:border-primary/50 hover:text-foreground";
}

export function PublicationList({ publications }: PublicationListProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("All");
  const [year, setYear] = useState<string>("All");

  const counts = useMemo(() => {
    const c: Record<TypeFilter, number> = { All: publications.length, Conference: 0, Journal: 0, Preprint: 0 };
    for (const p of publications) {
      if (p.venueType === "conference") c.Conference++;
      else if (p.venueType === "journal") c.Journal++;
      else if (p.venueType === "preprint") c.Preprint++;
    }
    return c;
  }, [publications]);

  const years = useMemo(() => {
    const set = new Set<string>();
    for (const p of publications) if (p.year >= 2023) set.add(String(p.year));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [publications]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((p) => {
      if (type !== "All" && p.venueType !== TYPE_MAP[type]) return false;
      if (year !== "All" && String(p.year) !== year) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.authors.join(" ")} ${p.venue}`.toLowerCase();
      return hay.includes(q);
    });
  }, [publications, query, type, year]);

  /** Group: each year >= 2023 individually (preprints included in their own year), then "Before 2023" */
  const groups = useMemo(() => {
    const byYear = new Map<number, Publication[]>();
    const before2023: Publication[] = [];

    for (const p of filtered) {
      if (p.year < 2023) before2023.push(p);
      else {
        const list = byYear.get(p.year) ?? [];
        list.push(p);
        byYear.set(p.year, list);
      }
    }

    // Within each group, accepted papers (conference/journal/workshop) sort above arXiv preprints.
    const byAcceptance = (list: Publication[]) =>
      [...list].sort((a, b) => Number(a.venueType === "preprint") - Number(b.venueType === "preprint"));

    const result: { key: string; heading: string; papers: Publication[]; showYear?: boolean }[] = [];
    Array.from(byYear.entries())
      .sort(([a], [b]) => b - a)
      .forEach(([y, papers]) => result.push({ key: String(y), heading: String(y), papers: byAcceptance(papers) }));
    if (before2023.length) {
      result.push({ key: "before2023", heading: "Before 2023", papers: byAcceptance(before2023), showYear: true });
    }
    return result;
  }, [filtered]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-1 gap-x-4 text-[13.5px] text-muted-foreground">
        {filtered.length === publications.length ? (
          <>
            <span><span className="font-semibold text-foreground tabular-nums">{publications.length}</span> publications</span>
            <span><span className="font-semibold text-foreground tabular-nums">{counts.Conference}</span> conference</span>
            <span><span className="font-semibold text-foreground tabular-nums">{counts.Journal}</span> journal</span>
            <span><span className="font-semibold text-foreground tabular-nums">{counts.Preprint}</span> preprints</span>
          </>
        ) : (
          <span>{filtered.length} of {publications.length} publications shown</span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="search"
          placeholder="Search title, author, or venue"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search publications"
          className="w-full h-[38px] rounded-lg border border-border bg-card px-3.5 text-[15px] text-foreground outline-none focus:border-primary transition-colors"
        />

        <div className="flex flex-wrap gap-2 items-center" role="group" aria-label="Filter by publication type">
          <span className="eyebrow mr-1">Type</span>
          {TYPE_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`flex items-baseline gap-2 text-[13.5px] rounded-full px-3.5 py-1.5 border transition-colors ${chipClass(type === t)}`}
            >
              {t}
              <span className="font-mono text-[11px] opacity-70">{counts[t]}</span>
            </button>
          ))}
        </div>

        {years.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center" role="group" aria-label="Filter by year">
            <span className="eyebrow mr-1">Year</span>
            <button
              onClick={() => setYear("All")}
              aria-pressed={year === "All"}
              className={`font-mono text-[12.5px] rounded-full px-3 py-1.5 border transition-colors ${chipClass(year === "All")}`}
            >
              All years
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                aria-pressed={year === y}
                className={`font-mono text-[12.5px] rounded-full px-3 py-1.5 border transition-colors ${chipClass(year === y)}`}
              >
                {y}
              </button>
            ))}
          </div>
        )}
      </div>

      {groups.length === 0 && (
        <div className="border border-dashed border-border rounded-[10px] py-11 px-6 text-center text-[15px] text-muted-foreground">
          No publications match those filters.
        </div>
      )}

      <div className="flex flex-col">
        {groups.map((group) => (
          <section key={group.key} className="flex flex-wrap gap-x-8 gap-y-1.5 pt-4 border-t border-border">
            <div className="flex-none w-[92px] flex flex-col gap-0.5 pt-3">
              <h2 className="text-[30px] font-bold tracking-tight leading-tight text-foreground/85"
                  style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
                {group.heading}
              </h2>
              <span className="font-mono text-[11px] text-muted-foreground">
                {group.papers.length} {group.papers.length === 1 ? "paper" : "papers"}
              </span>
            </div>
            <div className="flex-1 min-w-[280px] flex flex-col">
              {group.papers.map((pub) => (
                <PublicationCard key={pub.id} publication={pub} showYear={group.showYear} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
