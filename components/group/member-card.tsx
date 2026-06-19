import type { TeamMember, Publication } from "@/lib/types";
import { ExternalLink } from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  phd: "PhD Student",
  postdoc: "Postdoc",
  masters: "Master's Student",
  undergrad: "Undergraduate",
  collaborator: "Collaborator",
  alumni: "Alumni",
};

/** Color scheme per category for card accent, badge, and border */
const CATEGORY_COLORS: Record<string, { border: string; bg: string; badge: string }> = {
  "sutd-member": {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  },
  "hust-mentee": {
    border: "border-l-sky-500",
    bg: "bg-sky-50/60 dark:bg-sky-950/20",
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300",
  },
  alumni: {
    border: "border-l-violet-500",
    bg: "bg-violet-50/60 dark:bg-violet-950/20",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
  },
};

const DEFAULT_COLORS = {
  border: "border-l-border",
  bg: "bg-card",
  badge: "bg-muted text-muted-foreground",
};

interface MemberCardProps {
  member: TeamMember;
  publications: Publication[];
}

export function MemberCard({ member, publications }: MemberCardProps) {
  const colors = CATEGORY_COLORS[member.category] ?? DEFAULT_COLORS;

  const memberPapers = member.papers
    ? publications.filter((p) => member.papers!.includes(p.id))
    : [];

  const inner = (
    <div className="flex flex-col gap-1.5 h-full">
      {/* Name + role */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {member.website ? (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-foreground leading-snug hover:text-primary transition-colors"
            >
              <span className="truncate">{member.name}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ) : (
            <span className="text-sm font-semibold text-foreground leading-snug">
              {member.name}
            </span>
          )}
        </div>
        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
          {ROLE_LABELS[member.role] ?? member.role}
        </span>
      </div>

      {/* Research topic */}
      {member.research && (
        <p className="text-xs text-muted-foreground leading-snug">{member.research}</p>
      )}

      {/* Current position (alumni) */}
      {member.currentPosition && (
        <p className="text-xs text-muted-foreground/70 italic">
          Now: {member.currentPosition}
        </p>
      )}

      {/* Co-authored papers */}
      {memberPapers.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1.5">
          {memberPapers.map((pub) => (
            <a
              key={pub.id}
              href={pub.links.pdf ?? pub.links.arxiv ?? pub.links.doi ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded
                         bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted
                         transition-colors border border-border/50"
              title={pub.title}
            >
              <span className="font-medium">{pub.venue}</span>
              <span className="opacity-60">{pub.year}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const cardClass = `rounded-lg border border-border border-l-4 ${colors.border} ${colors.bg} p-3 hover:brightness-95 dark:hover:brightness-110 transition-all`;
  return <article className={cardClass}>{inner}</article>;
}
