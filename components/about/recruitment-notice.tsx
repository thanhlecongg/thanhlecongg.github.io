export function RecruitmentNotice() {
  return (
    <section className="bg-primary/[0.035] border border-primary/15 rounded-[10px] px-7 py-6 flex flex-wrap gap-3 gap-x-10">
      <h2 className="flex-none w-[200px] text-[22px] font-bold tracking-tight leading-snug"
          style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
        Join my group at SUTD
      </h2>
      <p className="flex-1 min-w-[280px] text-[15px] leading-relaxed text-foreground/80">
        I am actively recruiting <strong className="font-semibold text-foreground">fully-funded PhD students</strong>,
        to work on trustworthy AI for software engineering. See details in the {" "}
        {" "}
        <a href="/join" className="text-primary hover:underline underline-offset-2">
        Openings
        </a>. Please feel free to reach out to me via email if you are interested in joining my group.
      </p>
    </section>
  );
}
