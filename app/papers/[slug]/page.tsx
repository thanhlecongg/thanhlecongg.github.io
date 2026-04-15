import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPaperBySlug, getPaperSlugs } from "@/lib/data-loaders";
import { PaperHero } from "@/components/papers/paper-hero";
import { PaperLinks } from "@/components/papers/paper-links";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Generate one static page per paper in the registry */
export async function generateStaticParams() {
  return getPaperSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) return { title: "Paper Not Found" };
  return { title: paper.title };
}

export default async function PaperPage({ params }: Props) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) notFound();

  return (
    <article className="max-w-3xl space-y-10">
      {/* Back link */}
      <Link
        href="/publications"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Publications
      </Link>

      {/* Title, authors, venue */}
      <PaperHero paper={paper} />

      {/* Action links */}
      <PaperLinks links={paper.links} />

      {/* TL;DR */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">TL;DR</h2>
        <p className="text-base leading-relaxed text-foreground/90 border-l-4 border-primary/40 pl-4 italic">
          {paper.tldr}
        </p>
      </section>

      {/* Abstract */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">Abstract</h2>
        <p className="text-base leading-relaxed text-foreground/90">{paper.abstract}</p>
      </section>

      {/* Contributions */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">Contributions</h2>
        <ul className="space-y-2">
          {paper.contributions.map((c, i) => (
            <li key={i} className="flex gap-3 text-base text-foreground/90">
              <span className="text-primary font-bold mt-0.5 flex-shrink-0">{i + 1}.</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Key results */}
      {paper.results && paper.results.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Key Results</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {paper.results.map((r, i) => (
              <div key={i} className="border border-border rounded-lg p-4 bg-card text-sm text-foreground/90 leading-relaxed">
                {r}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BibTeX */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">Citation</h2>
        <div className="bg-muted/50 border border-border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border text-xs text-muted-foreground font-medium">
            BibTeX
          </div>
          <pre className="text-xs text-foreground/95 font-mono leading-relaxed p-4 overflow-x-auto whitespace-pre-wrap break-words">
            {paper.bibtex}
          </pre>
        </div>
      </section>

      {/* Tags */}
      {paper.tags.length > 0 && (
        <section className="flex flex-wrap gap-2">
          {paper.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </section>
      )}
    </article>
  );
}
