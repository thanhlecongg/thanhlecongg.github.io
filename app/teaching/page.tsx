import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { CourseList } from "@/components/teaching/course-list";
import { TeachingRoleCard } from "@/components/teaching/teaching-role-card";
import { getCourses, getTeachingRoles } from "@/lib/data-loaders";

export const metadata: Metadata = { title: "Teaching" };

/** Students mentored during PhD — derived from CV mentoring section */
const MENTORED_STUDENTS = [
  { name: "Anh Ho", affiliation: "PhD, University of Melbourne", topic: "Automated regression bug repair", papers: ["TOSEM [O3]"] },
  { name: "Eric Lang", affiliation: "Undergraduate, University of Melbourne", topic: "Code generation in functional programming", papers: ["ACL 2026 [O6]"] },
  { name: "Nguyet-Anh H. Lang", affiliation: "Undergraduate, HUST", topic: "Code generation in functional programming", papers: ["ACL 2026 [O7]"] },
  { name: "Huu Hung Nguyen", affiliation: "PhD, Singapore Management University", topic: "Vulnerability analysis", papers: ["TOSEM [O5]", "ICSE [O2]"] },
  { name: "Yen-Trang Dang", affiliation: "PhD, University of Sydney (prev. Undergraduate, HUST)", topic: "GitHub topic recommendation", papers: ["EASE [C6]"] },
  { name: "Duc-Manh Tran", affiliation: "PhD, University of Sydney (prev. Undergraduate, HUST)", topic: "Vulnerability repair", papers: ["ICSME [S4]"] },
  { name: "Duong Nguyen", affiliation: "Undergraduate, HUST", topic: "Just-in-time vulnerability prediction", papers: ["ICSME [S4, C7]"] },
  { name: "Hung Le", affiliation: "PhD, NC State University", topic: "Backdoor detection", papers: ["FSE [O1]"] },
  { name: "Duc-Minh Luong", affiliation: "Undergraduate, HUST", topic: "Program repair", papers: ["TSE [J3]"] },
];

export default function TeachingPage() {
  const roles = getTeachingRoles();
  const courses = getCourses();

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Teaching"
        description="Teaching roles, courses, and student mentoring"
      />

      {/* Teaching positions */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-5">Teaching Positions</h2>
        <div className="space-y-4">
          {roles.map((role) => (
            <TeachingRoleCard key={role.id} role={role} />
          ))}
        </div>
      </section>

      {/* Courses */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-5">Courses</h2>
        <CourseList courses={courses} />
      </section>

    </div>
  );
}
