interface ExperienceCardProps {
  dates: string;
  place: string;
  kind?: string;
  org: string;
  role: string;
  meta?: string[];
  bullets: string[];
}

export function ExperienceCard({ dates, place, kind, org, role, meta, bullets }: ExperienceCardProps) {
  return (
    <article className="bg-card border border-border rounded-[10px] px-6 py-5 flex flex-wrap gap-x-10 gap-y-3">
      <div className="flex-none w-[172px] flex flex-col gap-1.5 pt-0.5">
        <span className="font-mono text-[11px] leading-normal text-foreground/85">{dates}</span>
        <span className="font-mono text-[11px] leading-normal text-muted-foreground">{place}</span>
        {kind && (
          <span className="self-start mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground border border-border bg-muted/40 rounded-full px-2.5 py-0.5">
            {kind}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-[280px] flex flex-col gap-2">
        <h3 className="text-[19px] font-bold tracking-tight leading-snug"
            style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
          {org}
        </h3>
        <div className="text-[15px] font-medium text-primary">{role}</div>
        {meta?.map((m, i) => (
          <div key={i} className="text-[12.5px] leading-relaxed text-muted-foreground">{m}</div>
        ))}
        <div className="flex flex-col gap-1.5 mt-1">
          {bullets.map((b, i) => (
            <div key={i} className="grid grid-cols-[5px_1fr] gap-3 text-[15px] leading-relaxed text-foreground/85">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40 mt-[9px]" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
