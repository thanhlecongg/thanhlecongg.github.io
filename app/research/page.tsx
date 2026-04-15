import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { getResearchData } from "@/lib/data-loaders";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  const { statement, areas, projects } = getResearchData();

  return (
    <div>
      <SectionHeader title="Research" />

      {/* Research statement */}
      <p className="text-foreground/85 leading-relaxed mb-10 max-w-prose">
        {statement}
      </p>

      {/* Research areas grid */}
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Research Areas
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {areas.map((area) => (
          <div
            key={area.id}
            className="border border-border border-l-4 border-l-primary/25 rounded-lg p-5
                       hover:border-l-primary/60 hover:shadow-sm transition-all duration-200 bg-card"
          >
            <h3 className="font-semibold text-foreground mb-1">{area.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {area.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {area.keywords.map((kw) => (
                <Badge key={kw} variant="outline" className="text-xs">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
        ))}
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
                className="border-l-2 border-primary/30 pl-4"
              >
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-medium text-foreground">{proj.title}</h3>
                  {proj.status === "active" && (
                    <span className="text-xs bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 px-2 py-0.5 rounded-full">
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
                      className="text-primary hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {proj.links.paper && (
                    <a
                      href={proj.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
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
