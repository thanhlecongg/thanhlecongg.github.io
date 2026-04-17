import { MemberCard } from "./member-card";
import type { TeamMember, Publication } from "@/lib/types";

interface MemberGridProps {
  members: TeamMember[];
  publications: Publication[];
}

export function MemberGrid({ members, publications }: MemberGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} publications={publications} />
      ))}
    </div>
  );
}
