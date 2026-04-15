import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { CourseList } from "@/components/teaching/course-list";
import { getCourses } from "@/lib/data-loaders";

export const metadata: Metadata = { title: "Teaching" };

export default function TeachingPage() {
  const courses = getCourses();
  return (
    <div>
      <SectionHeader
        title="Teaching"
        description="Courses taught at the university"
      />
      <CourseList courses={courses} />
    </div>
  );
}
