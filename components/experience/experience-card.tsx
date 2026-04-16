import type { ResearchExperience } from "@/lib/types";

const TYPE_BADGE: Record<ResearchExperience["type"], string> = {
  "full-time": "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  "part-time": "bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
  visiting:    "bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
};

const TYPE_LABEL: Record<ResearchExperience["type"], string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  visiting:    "Visiting",
};

const ACCENT: Record<ResearchExperience["type"], string> = {
  "full-time": "border-l-emerald-400",
  "part-time": "border-l-orange-400",
  visiting:    "border-l-violet-400",
};

export function ExperienceCard({ exp }: { exp: ResearchExperience }) {
  return (
    <article
      className={`border border-border border-l-4 ${ACCENT[exp.type]} rounded-lg p-5 hover:shadow-sm transition-all duration-200 bg-card`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h3 className="font-semibold text-foreground">{exp.organization}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_BADGE[exp.type]}`}>
              {TYPE_LABEL[exp.type]}
            </span>
          </div>
          <p className="text-sm text-primary font-medium">{exp.role}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
          <p className="text-xs text-muted-foreground">{exp.location}</p>
        </div>
      </div>

      {exp.supervisors && exp.supervisors.length > 0 && (
        <p className="text-xs text-muted-foreground mb-3">
          <span className="font-medium">Supervisors: </span>
          {exp.supervisors.join(", ")}
        </p>
      )}

      <ul className="space-y-1">
        {exp.highlights.map((point, i) => (
          <li key={i} className="flex gap-2 text-sm text-foreground/85">
            <span className="text-primary mt-1 flex-shrink-0">◦</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
