import { Badge } from "@/components/ui/badge";
import type { ResearchArea, Publication } from "@/lib/types";

interface AreaColors {
  border: string;
  bg: string;
  hover: string;
  badge: string;
}

interface Props {
  area: ResearchArea;
  colors: AreaColors;
  /** Lookup map of publication ID → Publication for resolving relatedPapers */
  pubMap: Map<string, Publication>;
}

/** Resolves the best external link from a publication's links object */
function resolvePaperLink(pub: Publication): string | undefined {
  return pub.links.projectPage ?? pub.links.arxiv ?? pub.links.pdf ?? pub.links.doi;
}

/** Card for a single research area — shows description, keywords, and linked papers */
export function ResearchAreaCard({ area, colors, pubMap }: Props) {
  const relatedPubs = (area.relatedPapers ?? [])
    .map((id) => pubMap.get(id))
    .filter((p): p is Publication => p !== undefined);

  return (
    <div
      className={`border border-border border-l-4 rounded-lg p-5
                  transition-all duration-200 shadow-sm
                  ${colors.border} ${colors.bg} ${colors.hover}`}
    >
      <h3 className="font-semibold text-foreground mb-1">{area.title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{area.description}</p>

      {area.keywords && area.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {area.keywords.map((kw) => (
            <Badge
              key={kw}
              variant="outline"
              className={`text-xs border ${colors.badge}`}
            >
              {kw}
            </Badge>
          ))}
        </div>
      )}

      {relatedPubs.length > 0 && (
        <div className="mt-2 space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
            Related Papers
          </p>
          <ul className="space-y-1">
            {relatedPubs.map((pub) => {
              const href = resolvePaperLink(pub);
              return (
                <li key={pub.id} className="text-xs text-foreground/80 leading-snug flex gap-1.5 items-start">
                  <span className="text-muted-foreground mt-0.5 flex-shrink-0">›</span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("/") ? undefined : "_blank"}
                      rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
                      className="hover:underline hover:text-foreground transition-colors"
                    >
                      {pub.title} <span className="text-muted-foreground">({pub.venue ?? ""} {pub.year})</span>
                    </a>
                  ) : (
                    <span>
                      {pub.title} <span className="text-muted-foreground">({pub.venue ?? ""} {pub.year})</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
