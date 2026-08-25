interface NewsItemProps {
  /** Format: "YYYY-MM" */
  date: string;
  text: string;
}

/** Renders a single news entry with a mono date and body text. */
export function NewsItem({ date, text }: NewsItemProps) {
  const [year, month] = date.split("-");
  const label = new Date(Number(year), Number(month) - 1).toLocaleString(
    "en-US",
    { month: "short", year: "numeric" }
  );

  return (
    <li className="flex flex-wrap gap-1 gap-x-4 py-2.5 border-b border-border/60 last:border-0">
      <span className="flex-none w-[84px] font-mono text-[11px] text-muted-foreground pt-0.5 whitespace-nowrap">
        {label}
      </span>
      <span className="flex-1 min-w-[240px] text-[15px] leading-relaxed text-foreground/80">{text}</span>
    </li>
  );
}
