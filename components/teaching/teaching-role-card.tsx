import type { TeachingRole } from "@/lib/types";

export function TeachingRoleCard({ role }: { role: TeachingRole }) {
  return (
    <article className="border border-border border-l-4 border-l-primary/30 rounded-lg p-5 hover:border-l-primary/70 hover:shadow-sm transition-all duration-200 bg-card">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{role.institution}</h3>
          <p className="text-sm text-primary font-medium">{role.role}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-xs font-mono text-muted-foreground">{role.period}</span>
          {role.location && (
            <p className="text-xs text-muted-foreground">{role.location}</p>
          )}
        </div>
      </div>

      {role.courses && role.courses.length > 0 && (
        <div className="mb-3">
          {role.courses.map((course) => (
            <span
              key={course}
              className="inline-block text-xs font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded mr-2 mb-1"
            >
              {course}
            </span>
          ))}
        </div>
      )}

      <ul className="space-y-1">
        {role.highlights.map((point, i) => (
          <li key={i} className="flex gap-2 text-sm text-foreground/85">
            <span className="text-primary mt-1 flex-shrink-0">◦</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
