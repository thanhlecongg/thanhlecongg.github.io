import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PublicationList } from "@/components/publications/publication-list";
import { getPublications } from "@/lib/data-loaders";

export const metadata: Metadata = { title: "Publications" };

export default function PublicationsPage() {
  const publications = getPublications();
  return (
    <div>
      <SectionHeader
        title="Publications"
        description={`${publications.length} publications`}
      />
      <p className="text-xs text-muted-foreground mb-6">
        <strong className="font-semibold text-primary">Bold</strong> = me &nbsp;·&nbsp;{" "}
        <span className="underline underline-offset-2 decoration-muted-foreground/60">Underlined</span> = student / mentee
      </p>
      <PublicationList publications={publications} />
    </div>
  );
}
