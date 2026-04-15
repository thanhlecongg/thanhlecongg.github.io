import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="border border-border rounded-lg p-4 hover:border-border/60 transition-colors">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-mono text-sm font-semibold text-muted-foreground">
              {course.code}
            </span>
            <Badge
              variant={course.level === "graduate" ? "default" : "secondary"}
              className="text-xs"
            >
              {course.level === "graduate" ? "Graduate" : "Undergraduate"}
            </Badge>
          </div>
          <h3 className="font-medium text-foreground">{course.title}</h3>
          {course.description && (
            <p className="text-sm text-muted-foreground mt-1 max-w-prose">
              {course.description}
            </p>
          )}
        </div>
        {course.syllabusUrl && (
          <a
            href={course.syllabusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-primary hover:underline flex-shrink-0 mt-1"
          >
            Syllabus →
          </a>
        )}
      </div>
    </article>
  );
}
