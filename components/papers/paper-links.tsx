import { BookOpen, Code2, FileText, Link as LinkIcon, Presentation, Video } from "lucide-react";
import type { PaperDetail } from "@/lib/types";

const btnBase =
  "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors";
const primary = `${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`;
const outline = `${btnBase} border border-border text-foreground hover:bg-muted`;

export function PaperLinks({ links }: { links: PaperDetail["links"] }) {
  if (!Object.values(links).some(Boolean)) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {links.arxiv && (
        <a href={links.arxiv} target="_blank" rel="noopener noreferrer" className={primary}>
          <BookOpen className="w-4 h-4" /> arXiv Paper
        </a>
      )}
      {links.pdf && (
        <a href={links.pdf} target="_blank" rel="noopener noreferrer" className={primary}>
          <FileText className="w-4 h-4" /> PDF
        </a>
      )}
      {links.code && (
        <a href={links.code} target="_blank" rel="noopener noreferrer" className={outline}>
          <Code2 className="w-4 h-4" /> Code
        </a>
      )}
      {links.demo && (
        <a href={links.demo} target="_blank" rel="noopener noreferrer" className={outline}>
          <Video className="w-4 h-4" /> Demo
        </a>
      )}
      {links.slides && (
        <a href={links.slides} target="_blank" rel="noopener noreferrer" className={outline}>
          <Presentation className="w-4 h-4" /> Slides
        </a>
      )}
      {links.doi && (
        <a href={links.doi} target="_blank" rel="noopener noreferrer" className={outline}>
          <LinkIcon className="w-4 h-4" /> DOI
        </a>
      )}
    </div>
  );
}
