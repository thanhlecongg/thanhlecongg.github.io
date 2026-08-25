import type { ResearchArea, Publication } from "@/lib/types";

interface Props {
  area: ResearchArea;
  /** e.g. "01" */
  num: string;
  /** Lookup map of publication ID → Publication for resolving relatedPapers */
  pubMap: Map<string, Publication>;
}

/** Resolves the best external link from a publication's links object */
function resolvePaperLink(pub: Publication): string | undefined {
  return pub.links.arxiv ?? pub.links.pdf ?? pub.links.doi;
}

/** Numbered row for a research area — description alongside its representative papers */
export function ResearchAreaCard({ area, num, pubMap }: Props) {
  const relatedPubs = (area.relatedPapers ?? [])
    .map((id) => pubMap.get(id))
    .filter((p): p is Publication => p !== undefined);

  return (
    <div className="flex flex-col gap-4 py-7 border-t border-border first:border-t-0">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[12.5px] font-medium tracking-widest text-primary">{num}</span>
        <h3 className="text-[clamp(1.375rem,2.8vw,1.6875rem)] font-bold tracking-tight leading-snug text-foreground"
            style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
          {area.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-x-12 gap-y-4 items-start">
        <p className="flex-1 min-w-[280px] text-pretty text-[15px] leading-relaxed text-muted-foreground">
          {area.description}
        </p>
        {relatedPubs.length > 0 && (
          <div className="flex-1 min-w-[320px] flex flex-col gap-1.5">
            <p className="eyebrow">Representative papers</p>
            {relatedPubs.map((pub) => {
              const href = resolvePaperLink(pub);
              return (
                <a
                  key={pub.id}
                  href={href ?? "#"}
                  target={href && !href.startsWith("/") ? "_blank" : undefined}
                  rel={href && !href.startsWith("/") ? "noopener noreferrer" : undefined}
                  className="flex flex-col gap-0.5 py-1.5 border-b border-border/70 text-foreground/85 hover:text-primary transition-colors"
                >
                  <span className="text-[13.5px] font-medium leading-snug">{pub.title}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{pub.venue} · {pub.year}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
