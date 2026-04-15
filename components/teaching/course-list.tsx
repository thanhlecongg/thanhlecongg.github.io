import type { Course } from "@/lib/types";
import { CourseCard } from "./course-card";

interface CourseListProps {
  courses: Course[];
}

const SEMESTER_ORDER: Record<string, number> = { Fall: 0, Spring: 1, Summer: 2 };

export function CourseList({ courses }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        Course information will be posted here once available.
      </p>
    );
  }

  /** Sort by year descending, then by semester within each year. */
  const sorted = [...courses].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (SEMESTER_ORDER[a.semester] ?? 3) - (SEMESTER_ORDER[b.semester] ?? 3);
  });

  /** Group into "Semester Year" buckets, preserving sort order. */
  const grouped = sorted.reduce((acc, course) => {
    const key = `${course.semester} ${course.year}`;
    const list = acc.get(key) ?? [];
    list.push(course);
    acc.set(key, list);
    return acc;
  }, new Map<string, Course[]>());

  return (
    <div className="space-y-10">
      {Array.from(grouped.entries()).map(([term, termCourses]) => (
        <section key={term}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            {term}
          </h2>
          <div className="space-y-3">
            {termCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
