import type { Course } from "@/lib/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="py-5 border-b border-border/70 last:border-0 flex flex-wrap gap-x-10 gap-y-3">
      <div className="flex-none w-[172px] flex flex-col items-start gap-2 pt-0.5">
        <span className="font-mono text-sm font-medium text-foreground">{course.code}</span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary border border-primary/25 bg-primary/[0.06] rounded-full px-2.5 py-0.5">
          {course.level}
        </span>
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground/80">{course.term}</span>
      </div>
      <div className="flex-1 min-w-[280px] flex flex-col gap-2">
        <h3 className="font-serif text-[19px] font-bold tracking-tight text-foreground leading-snug"
            style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
          {course.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">{course.description}</p>
        {course.role && (
          <div className="mt-0.5 pt-2.5 border-t border-border/50 text-[13.5px] leading-relaxed text-muted-foreground">
            {course.role}
          </div>
        )}
      </div>
    </article>
  );
}
