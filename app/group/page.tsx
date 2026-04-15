import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { MemberGrid } from "@/components/group/member-grid";
import { getTeamMembers } from "@/lib/data-loaders";

export const metadata: Metadata = { title: "Research Group" };

const ROLE_ORDER = [
  "postdoc",
  "phd",
  "masters",
  "undergrad",
  "collaborator",
  "alumni",
] as const;

const ROLE_LABELS: Record<string, string> = {
  postdoc: "Postdoctoral Researchers",
  phd: "PhD Students",
  masters: "Master Students",
  undergrad: "Undergraduate Students",
  collaborator: "Collaborators",
  alumni: "Alumni",
};

export default function GroupPage() {
  const members = getTeamMembers();

  /** Group members by role, preserving display order and skipping empty roles. */
  const grouped = ROLE_ORDER.reduce((acc, role) => {
    const list = members.filter((m) => m.role === role);
    if (list.length > 0) acc.set(role, list);
    return acc
  }, new Map<string, ReturnType<typeof getTeamMembers>>());

  return (
    <div>
      <SectionHeader
        title="Research Group"
        description="Current members and alumni"
      />

      {grouped.size > 0 ? (
        <div className="space-y-12">
          {Array.from(grouped.entries()).map(([role, list]) => (
            <section key={role}>
              <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-4 border-b border-border pb-2">
                {ROLE_LABELS[role]}
              </h2>
              <MemberGrid members={list} />
            </section>
          ))}
        </div>
      ) : (
        /* Prospective students notice — shown when no members listed yet */
        <div className="max-w-prose space-y-4">
          <p className="text-foreground/85 leading-relaxed">
            I am actively looking for motivated PhD students and research
            assistants to join my group at SUTD. If you are interested in
            working on trustworthy AI for software engineering, automated
            program repair, or software security, I would love to hear from
            you.
          </p>
          <p className="text-foreground/85 leading-relaxed">
            Please send me an email at{" "}
            <a
              href="mailto:thanhlc@ieee.org"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              thanhlc@ieee.org
            </a>{" "}
            with your CV and a brief description of your research interests.
          </p>
        </div>
      )}
    </div>
  );
}
