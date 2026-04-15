import Image from "next/image";
import type { TeamMember } from "@/lib/types";

export function MemberCard({ member }: { member: TeamMember }) {
  const content = (
    <>
      <div className="relative w-20 h-20 mb-3 flex-shrink-0">
        <Image
          src={member.photo || "/images/team/placeholder.jpg"}
          alt={member.name}
          fill
          className="rounded-full object-cover border-2 border-border"
        />
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
        {member.name}
      </span>
      {member.research && (
        <span className="text-xs text-muted-foreground mt-1 leading-snug">
          {member.research}
        </span>
      )}
      {member.role === "alumni" && member.graduated && (
        <span className="text-xs text-muted-foreground/80 mt-0.5">
          PhD {member.graduated}
        </span>
      )}
    </>
  );

  const cardClass =
    "group flex flex-col items-center text-center p-3 rounded-lg hover:bg-muted/50 transition-colors";

  if (member.website) {
    return (
      <a
        href={member.website}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClass}>{content}</div>;
}
