import type { Metadata } from "next";

export const metadata: Metadata = { title: "Openings" };

const EMAIL = "congthanh_le@sutd.edu.sg";

const OPENINGS = [
  {
    role: "PhD students",
    status: "Open",
    open: true,
    detail:
      "I am actively recruiting PhD students for the next intake (Spring 2027). I am looking for well-motivated students with strong foundations in software engineering, cybersecurity or artificial intelligence. All PhD positions are fully funded via scholarships, e.g, SUTD PhD Scholarship, AISG Fellowship, A*STAR's SINGA award, and Vingroup Scholarship. I am happy to discuss potential research directions and funding routes with interested applicants.",
    links: [
      { label: "SUTD PhD programme", href: "https://www.sutd.edu.sg/programme-listing/sutd-phd-programme/" },
      { label: "AISG PhD Fellowship", href: "https://aisingapore.org/research/phd-fellowship-programme/" },
      { label: "A*STAR scholarships", href: "https://www.a-star.edu.sg/scholarships/home/scholarships" },
      { label: "Vingroup Scholarship", href: "https://scholarships.vinuni.edu.vn/" },
    ],
    topics: [
    ],
  },
  {
    role: "Research assistants and interns",
    status: "Closed",
    open: false,
    detail:
      "I do not currently have openings for paid research assistant or intern positions though opportunities may arise in later this year.",
    links: [],
    topics: [] as string[],
  },
  {
    role: "SUTD undergraduates",
    status: "Closed",
    open: false,
    detail: "I am supervising IROP projects. Full details are in my proposals in the IROP system. Deadlines for the next intake are in the SUTD IROP system. Please contact me if you are interested in a project and I will let you know if it is still available.",
    links: [] as { label: string; href: string }[],
    topics: [],
  },
];

const APPLY_ITEMS = [
  "A CV/resume and academic transcripts",
  "A 150–250-word note identifying one research direction that interests you and explaining why",
  "Up to two examples of relevant work, e.g., papers, repositories, project reports",
  "For PhD applicants: your intended intake and scholarship route, if known",
];

const LOOK_FOR = [
  "Strong foundations in at least one of software engineering, AI, or cybersecurity",
  "Evidence that you can investigate or build something independently",
  "Curiosity, self-motivation, and a willingness to learn unfamiliar ideas",
  "Ability to read research literature critically and turn ideas into experiments",
  "Experience in program analysis, formal methods, or software testing is a plus",
];

export default function JoinPage() {
  const openCount = OPENINGS.filter((opening) => opening.open).length;

  return (
    <div className="flex flex-col gap-14">
      <section className="relative overflow-hidden rounded-2xl border border-primary/15 bg-card px-5 py-7 sm:px-8 sm:py-9">
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-primary" />
        <div className="max-w-[860px]">
          <div className="eyebrow mb-3 text-primary">Research opportunities at SUTD</div>
          <h1 className="text-[clamp(1.875rem,4.6vw,2.5rem)] font-bold tracking-tight text-foreground">
            Join my group
          </h1>
          <p className="mt-4 text-pretty text-[clamp(16px,2vw,19px)] leading-relaxed text-foreground/80">
            I&apos;m always looking for talented students and researchers to join my group. Please check the open positions below and email me if you are interested. I am happy to discuss potential research directions and funding routes with interested applicants.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#open-positions"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 text-[13.5px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View open positions
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-[13.5px] font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
            >
              Ask a question
            </a>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5 text-[12.5px] text-muted-foreground">
          <span className="inline-flex items-center gap-2 font-medium text-foreground/80">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_12%,transparent)]" />
            Recruiting for the next intake
          </span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-border sm:block" />
          <span>Deadline: September 30, 2026</span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-border sm:block" />
          <span>Updated August 2026.</span>
        </div>
      </section>

      <section id="open-positions" className="scroll-mt-24">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="eyebrow mb-1.5">Current opportunities</div>
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-bold tracking-tight text-foreground">
              Open positions
            </h2>
          </div>
          <span className="shrink-0 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-primary">
            {openCount} open
          </span>
        </div>
        <div className="flex flex-col gap-4">
          {OPENINGS.map((o) => (
            <article
              key={o.role}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/25 sm:p-6"
            >
              <div className="grid gap-5 lg:grid-cols-[190px_1fr] lg:gap-8">
                <div className="flex flex-col items-start gap-3">
                  <h3 className="text-[21px] font-semibold leading-snug tracking-tight text-foreground">
                    {o.role}
                  </h3>
                  <span
                    className={
                      o.open
                        ? "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.06] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary"
                        : "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                    }
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${o.open ? "bg-primary" : "bg-muted-foreground/50"}`} />
                    {o.status}
                  </span>
                </div>
                <div className="flex min-w-0 flex-col gap-5">
                  <p className="max-w-[72ch] text-pretty text-[15px] leading-relaxed text-foreground/80">
                    {o.detail}
                  </p>
                  {o.topics.length > 0 && (
                    <div className="flex flex-col gap-2.5">
                      <div className="eyebrow">Research directions</div>
                      <div className="flex flex-wrap gap-2">
                        {o.topics.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-primary/15 bg-primary/[0.04] px-3 py-1.5 text-[12.5px] leading-tight text-foreground/75"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {o.links.length > 0 && (
                    <div className="flex flex-col gap-2.5">
                      <div className="eyebrow">Programme and funding</div>
                      <div className="flex flex-wrap gap-2">
                        {o.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-[12.5px] text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
                          >
                            {l.label}<span aria-hidden="true" className="text-[10px] text-muted-foreground">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="eyebrow mb-1.5">Selection</div>
          <h2 className="text-[24px] font-bold tracking-tight text-foreground">What I look for</h2>
          <div className="mt-5 flex flex-col gap-3.5">
            {LOOK_FOR.map((item, index) => (
              <div key={item} className="grid grid-cols-[28px_1fr] gap-3 text-[14.5px] leading-relaxed text-foreground/80">
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.07] font-mono text-[10px] font-medium text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="eyebrow mb-1.5">Application</div>
          <h2 className="text-[24px] font-bold tracking-tight text-foreground">How to apply</h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/80">
            Email{" "}
            <a href={`mailto:${EMAIL}`} className="font-medium text-primary hover:underline underline-offset-2">
              {EMAIL}
            </a>{" "}
            with the position and your name in the subject line.
          </p>
          <div className="mt-5 flex flex-col gap-3.5">
            {APPLY_ITEMS.map((item, index) => (
              <div key={item} className="grid grid-cols-[28px_1fr] gap-3 text-[14.5px] leading-relaxed text-foreground/80">
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background font-mono text-[10px] font-medium text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-primary/10 bg-primary/[0.04] px-4 py-3.5 text-[13.5px] leading-relaxed text-foreground/75 lg:col-span-2">
          Due to the high volume of enquiries, I am so sorry that I may not be able to respond to all emails.
          I will contact promising applicants for a short discussion on your research interests and fit.
          If you do not hear back, please consider applying again in the next intake.
        </div>
      </section>
    </div>
  );
}
