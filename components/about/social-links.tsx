import { cn } from "@/lib/utils";

const SOCIAL_LABELS: Record<string, string> = {
  googleScholar: "Google Scholar",
  dblp: "DBLP",
  github: "GitHub",
  twitter: "Twitter/X",
  linkedin: "LinkedIn",
  orcid: "ORCID",
};

interface SocialLinksProps {
  links: Record<string, string | undefined>;
  className?: string;
  /** Stack links in a single column instead of a wrapping row */
  vertical?: boolean;
}

/** Renders non-empty social/academic profile links as plain underlined text links. */
export function SocialLinks({ links, className, vertical }: SocialLinksProps) {
  const active = Object.entries(links).filter(([, url]) => url);
  if (active.length === 0) return null;

  return (
    <div className={cn(vertical ? "flex flex-col gap-2" : "flex flex-wrap gap-5", className)}>
      {active.map(([key, url]) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            vertical
              ? "flex items-center justify-center h-[38px] rounded-lg border border-border bg-card text-[13.5px] text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors"
              : "text-[13.5px] text-foreground/70 border-b border-border pb-px hover:text-primary hover:border-primary transition-colors"
          }
        >
          {SOCIAL_LABELS[key] ?? key}
        </a>
      ))}
    </div>
  );
}
