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
      <PublicationList publications={publications} />
    </div>
  );
}
