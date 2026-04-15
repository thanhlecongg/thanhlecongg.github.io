import { cn } from "@/lib/utils";
import {
  GraduationCap,
  BookMarked,
  Code2,
  X,
  Briefcase,
  FlaskConical,
  ExternalLink,
} from "lucide-react";

const SOCIAL_LABELS: Record<string, string> = {
  googleScholar: "Google Scholar",
  dblp: "DBLP",
  github: "GitHub",
  twitter: "Twitter/X",
  linkedin: "LinkedIn",
  orcid: "ORCID",
};

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  googleScholar: <GraduationCap className="w-3.5 h-3.5" />,
  dblp: <BookMarked className="w-3.5 h-3.5" />,
  github: <Code2 className="w-3.5 h-3.5" />,
  twitter: <X className="w-3.5 h-3.5" />,
  linkedin: <Briefcase className="w-3.5 h-3.5" />,
  orcid: <FlaskConical className="w-3.5 h-3.5" />,
};

interface SocialLinksProps {
  links: Record<string, string | undefined>;
  className?: string;
}

/** Renders non-empty social/academic profile links as icon+label pill buttons. */
export function SocialLinks({ links, className }: SocialLinksProps) {
  const active = Object.entries(links).filter(([, url]) => url);
  if (active.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {active.map(([key, url]) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={SOCIAL_LABELS[key] ?? key}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border
                     text-sm text-muted-foreground hover:text-primary hover:border-primary/40
                     transition-colors cursor-pointer"
        >
          {SOCIAL_ICONS[key] ?? <ExternalLink className="w-3.5 h-3.5" />}
          {SOCIAL_LABELS[key] ?? key}
        </a>
      ))}
    </div>
  );
}
