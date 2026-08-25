import type { Metadata } from "next";
import { PublicationList } from "@/components/publications/publication-list";
import { getPublications } from "@/lib/data-loaders";
import profile from "@/data/profile.json";

export const metadata: Metadata = { title: "Publications" };

export default function PublicationsPage() {
  const publications = getPublications();
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 pb-4 mb-8 border-b border-border">
        <h1 className="text-[clamp(1.875rem,4.6vw,2.5rem)] font-bold tracking-tight text-foreground">
          Publications
        </h1>
        <div className="flex flex-wrap gap-2">
          <a
            href={profile.socialLinks.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13.5px] text-foreground/70 border border-border bg-card rounded-lg px-3.5 py-1.5 hover:border-primary/50 hover:text-primary transition-colors"
          >
            Google Scholar<span className="text-muted-foreground text-[11px]">↗</span>
          </a>
          <a
            href="https://dblp.org/search?q=Thanh+Le-Cong"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13.5px] text-foreground/70 border border-border bg-card rounded-lg px-3.5 py-1.5 hover:border-primary/50 hover:text-primary transition-colors"
          >
            DBLP<span className="text-muted-foreground text-[11px]">↗</span>
          </a>
        </div>
      </div>
      <PublicationList publications={publications} />
    </div>
  );
}
