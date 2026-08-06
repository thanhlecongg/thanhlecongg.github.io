import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { MemberGrid } from "@/components/group/member-grid";
import { RecruitmentNotice } from "@/components/group/recruitment-notice";
import { getTeamMembers, getPublications } from "@/lib/data-loaders";

export const metadata: Metadata = { title: "Research Group" };

const AI4CODE_LAB_URL = "https://ai4code-hust.github.io/";

export default function GroupPage() {
  const members = getTeamMembers();
  const publications = getPublications();

  const sutdMembers = members.filter((m) => m.category === "sutd-member");
  const hustMentees = members.filter((m) => m.category === "hust-mentee");
  const alumni = members.filter((m) => m.category === "alumni");
  const ai4codeCount = hustMentees.length + alumni.length;

  /** Notable alumni placements — e.g. "PhD Student, University of Melbourne" → dedup + count */
  const placementCounts = new Map<string, number>();
  for (const m of alumni) {
    if (!m.currentPosition) continue;
    placementCounts.set(m.currentPosition, (placementCounts.get(m.currentPosition) ?? 0) + 1);
  }
  const placements = Array.from(placementCounts.entries()).map(
    ([position, count]) => (count > 1 ? `${position} (×${count})` : position)
  );

  return (
    <div>
      <SectionHeader
        title="Research Group"
        description="Students and mentees I work with"
      />

      <div className="space-y-8">
        <RecruitmentNotice />

        <section>
          <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-3 border-b border-border pb-2">
            Group Members @ SUTD
          </h2>
          {sutdMembers.length > 0 ? (
            <MemberGrid members={sutdMembers} publications={publications} />
          ) : (
            <p className="text-sm text-muted-foreground">
              I'm actively looking for research students to join my group. If you're interested in working with me, please check out the recruitment notice above.
            </p>
          )}
        </section>

        {ai4codeCount > 0 && (
          <section>
            <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-3 border-b border-border pb-2">
              AI4Code Lab, HUST
            </h2>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-foreground/85 leading-relaxed">
                Besides SUTD, I have been co-supervising undergraduate researchers at the{" "}
                <strong>AI4Code Lab</strong> with Prof. Quyet Thang Huynh at Hanoi University of
                Science and Technology (HUST) since 2021. The lab currently has{" "}
                9 active mentee and 10 alumni. See the full list of members, past and present, on the
                lab&apos;s website.
              </p>

              {placements.length > 0 && (
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Alumni now pursue PhD at: {placements.join("; ")}.
                </p>
              )}

              <a
                href={AI4CODE_LAB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-2"
              >
                Visit AI4Code Lab
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
