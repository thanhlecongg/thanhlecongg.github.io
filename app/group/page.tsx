import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { MemberGrid } from "@/components/group/member-grid";
import { RecruitmentNotice } from "@/components/group/recruitment-notice";
import { getTeamMembers, getPublications } from "@/lib/data-loaders";

export const metadata: Metadata = { title: "Research Group" };

export default function GroupPage() {
  const members = getTeamMembers();
  const publications = getPublications();

  const sutdMembers = members.filter((m) => m.category === "sutd-member");
  const hustMentees = members.filter((m) => m.category === "hust-mentee");
  const alumni = members.filter((m) => m.category === "alumni");

  return (
    <div>
      <SectionHeader
        title="Research Group"
        description="Students and mentees I work with"
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-3 border-b border-border pb-2">
            Group Members @ SUTD
          </h2>
          {sutdMembers.length > 0 ? (
            <MemberGrid members={sutdMembers} publications={publications} />
          ) : (
            <RecruitmentNotice />
          )}
        </section>

        {hustMentees.length > 0 && (
          <section>
            <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-3 border-b border-border pb-2">
              Research Mentees @ AI4Code Lab, HUST
            </h2>
            <MemberGrid members={hustMentees} publications={publications} />
          </section>
        )}

        {alumni.length > 0 && (
          <section>
            <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-3 border-b border-border pb-2">
              Alumni
            </h2>
            <MemberGrid members={alumni} publications={publications} />
          </section>
        )}
      </div>
    </div>
  );
}
