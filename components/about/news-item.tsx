/** Cycling dot colors — matches the BADGE_PALETTE hues in page.tsx */
const DOT_COLORS = [
  "bg-blue-400",
  "bg-violet-400",
  "bg-teal-400",
  "bg-amber-400",
  "bg-emerald-400",
  "bg-rose-400",
];

interface NewsItemProps {
  /** Format: "YYYY-MM" */
  date: string;
  text: string;
  /** List index — used to cycle dot color through the palette */
  index?: number;
}

/** Renders a single news entry with a colored timeline dot and formatted date. */
export function NewsItem({ date, text, index = 0 }: NewsItemProps) {
  const [year, month] = date.split("-");
  const label = new Date(Number(year), Number(month) - 1).toLocaleString(
    "en-US",
    { month: "short", year: "numeric" }
  );

  const dotColor = DOT_COLORS[index % DOT_COLORS.length];

  return (
    <li className="flex gap-3 text-sm">
      {/* Colored timeline dot — cycles through palette */}
      <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
      </div>

      <div className="flex gap-3 flex-1">
        <span className="text-muted-foreground font-mono w-20 flex-shrink-0">
          {label}
        </span>
        <span className="text-foreground/90">{text}</span>
      </div>
    </li>
  );
}
