interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-2">
      <h1 className="text-[clamp(1.875rem,4.6vw,2.5rem)] font-bold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
