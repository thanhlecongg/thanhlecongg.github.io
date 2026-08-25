import type { Metadata } from "next";
import { ResearchAreaCard } from "@/components/research/research-area-card";
import { getResearchData, getPublications } from "@/lib/data-loaders";
import type { Publication } from "@/lib/types";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  const { statement, areas } = getResearchData();

  /** Build ID → Publication lookup for resolving relatedPapers in area cards */
  const pubMap = new Map<string, Publication>(
    getPublications().map((p) => [p.id, p])
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-[clamp(1.875rem,4.6vw,2.5rem)] font-bold tracking-tight text-foreground">
          Research
        </h1>
        <p className="max-w-[62ch] text-pretty text-[clamp(17px,2.1vw,20px)] leading-relaxed text-foreground/80">
          {statement}
        </p>
      </div>

      <section className="flex flex-col">
        {areas.map((area, idx) => (
          <ResearchAreaCard
            key={area.id}
            area={area}
            num={String(idx + 1).padStart(2, "0")}
            pubMap={pubMap}
          />
        ))}
      </section>
    </div>
  );
}
