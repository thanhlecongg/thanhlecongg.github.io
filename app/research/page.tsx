import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { getResearchData } from "@/lib/data-loaders";

export const metadata: Metadata = { title: "Research" };

/** Per-area color palette — cycles if more than 4 areas are added */
const AREA_COLORS = [
  {
    border: "border-l-blue-400 dark:border-l-blue-500",
    bg: "bg-blue-50/60 dark:bg-blue-950/20",
    hover: "hover:border-l-blue-500 dark:hover:border-l-blue-400",
    badge: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800",
  },
  {
    border: "border-l-emerald-400 dark:border-l-emerald-500",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
    hover: "hover:border-l-emerald-500 dark:hover:border-l-emerald-400",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800",
  },
  {
    border: "border-l-rose-400 dark:border-l-rose-500",
    bg: "bg-rose-50/60 dark:bg-rose-950/20",
    hover: "hover:border-l-rose-500 dark:hover:border-l-rose-400",
    badge: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800",
  },
  {
    border: "border-l-violet-400 dark:border-l-violet-500",
    bg: "bg-violet-50/60 dark:bg-violet-950/20",
    hover: "hover:border-l-violet-500 dark:hover:border-l-violet-400",
    badge: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-800",
  },
] as const;

export default function ResearchPage() {
  const { statement, areas, projects } = getResearchData();

  return (
    <div>
      <SectionHeader title="Research" />

      {/* Research statement — subtle gradient banner */}
      <div className="mb-10 rounded-lg bg-gradient-to-r from-blue-50 via-violet-50 to-emerald-50
                      dark:from-blue-950/30 dark:via-violet-950/20 dark:to-emerald-950/30
                      border border-border px-5 py-4">
        <p className="text-foreground/85 leading-relaxed max-w-prose">
          {statement}
        </p>
      </div>

      {/* Research areas grid */}
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Research Areas
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {areas.map((area, idx) => {
          const colors = AREA_COLORS[idx % AREA_COLORS.length];
          return (
            <div
              key={area.id}
              className={`border border-border border-l-4 rounded-lg p-5
                          transition-all duration-200 shadow-sm
                          ${colors.border} ${colors.bg} ${colors.hover}`}
            >
              <h3 className="font-semibold text-foreground mb-1">{area.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {area.description}
              </p>
              {area.keywords && area.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1">
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
            </div>
          );
        })}
      </div>

      {/* Active projects — only rendered when data exists */}
      {projects.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="border-l-2 border-emerald-400 dark:border-emerald-600 pl-4"
              >
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-medium text-foreground">{proj.title}</h3>
                  {proj.status === "active" && (
                    <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full font-medium">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {proj.description}
                </p>
                <div className="flex gap-3 text-xs font-medium">
                  {proj.links.github && (
                    <a
                      href={proj.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {proj.links.paper && (
                    <a
                      href={proj.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-600 dark:text-violet-400 hover:underline"
                    >
                      Paper
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
