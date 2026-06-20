import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "@/components/about/social-links";
import { NewsList } from "@/components/about/news-list";
import { RecruitmentNotice } from "@/components/group/recruitment-notice";
import { getPaperBySlug, getProfile } from "@/lib/data-loaders";
import { Download, Mail } from "lucide-react";

/**
 * Curated academic badge palette — pastel tints with accessible contrast.
 * All pairs pass WCAG AA (4.5:1). Cycles through research interests.
 */
const BADGE_PALETTE = [
  "bg-blue-50   text-blue-700   border border-blue-200   dark:bg-blue-950   dark:text-blue-300   dark:border-blue-800",
  "bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
  "bg-teal-50   text-teal-700   border border-teal-200   dark:bg-teal-950   dark:text-teal-300   dark:border-teal-800",
  "bg-amber-50  text-amber-700  border border-amber-200  dark:bg-amber-950  dark:text-amber-300  dark:border-amber-800",
  "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  "bg-rose-50   text-rose-700   border border-rose-200   dark:bg-rose-950   dark:text-rose-300   dark:border-rose-800",
];

const FEATURED_METRICS = [
  { value: "24", label: "confirmed bugs", accent: "text-emerald-700 dark:text-emerald-300" },
  { value: "12", label: "unknown bugs", accent: "text-blue-700 dark:text-blue-300" },
  { value: "0.62", label: "precision", accent: "text-violet-700 dark:text-violet-300" },
  { value: "8.9", label: "minutes per PR", accent: "text-amber-700 dark:text-amber-300" },
  { value: "$0.07", label: "per PR", accent: "text-rose-700 dark:text-rose-300" },
] as const;

const FEATURED_LIBRARIES = [
  {
    name: "pandas",
    kind: "image",
    src: "https://avatars.githubusercontent.com/u/21206976?s=200&v=4",
    alt: "pandas logo",
    chipClass: "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200",
    logoClass: "h-4 w-4 rounded-sm",
  },
  {
    name: "SciPy",
    kind: "image",
    src: "https://scipy.org/images/logo.svg",
    alt: "SciPy logo",
    chipClass: "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200",
    logoClass: "h-4 w-auto",
  },
  {
    name: "marshmallow",
    kind: "image",
    src: "https://avatars.githubusercontent.com/u/10334301?s=48&v=4",
    alt: "marshmallow logo",
    chipClass: "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200",
    logoClass: "h-4 w-4 rounded-sm",
  },
  {
    name: "Keras",
    kind: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg",
    alt: "Keras logo",
    chipClass: "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200",
    logoClass: "h-4 w-auto",
  },
] as const;

export default function HomePage() {
  const profile = getProfile();
  const patchGuru = getPaperBySlug("patchguru");

  return (
    <div className="space-y-10">
      {/* Hero: subtle blue→violet gradient bg — adds warmth without shouting */}
      <section className="grid gap-8 md:grid-cols-[240px_minmax(0,1fr)] md:items-start pt-6 pb-10 border-b border-border
                          animate-in fade-in slide-in-from-bottom-4 duration-500
                          relative overflow-hidden rounded-xl
                          bg-gradient-to-br from-blue-50/70 via-violet-50/40 to-transparent
                          dark:from-blue-950/30 dark:via-violet-950/20 dark:to-transparent
                          -mx-4 px-4 sm:-mx-6 sm:px-6">
        {/* Decorative blurred blob — top-right corner */}
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full
                        bg-gradient-to-br from-blue-200/30 to-violet-200/20
                        dark:from-blue-800/20 dark:to-violet-800/15
                        blur-3xl pointer-events-none" />

        <div className="relative flex w-full flex-col items-center gap-4 md:items-start">
          <Image
            src="/images/profile.webp"
            alt={`Profile photo of ${profile.name}`}
            width={220}
            height={220}
            className="h-[220px] w-[220px] rounded-full border-4 border-white object-cover shadow-lg flex-shrink-0
                       ring-2 ring-blue-200/60 dark:ring-blue-700/40
                       dark:border-slate-800"
            priority
          />

          <div className="w-[220px] rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Contact
            </p>

            <div className="mt-3 flex flex-col gap-3">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  size: "sm",
                  className: "w-full justify-center gap-2",
                })}
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href={`mailto:${profile.email}`}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "w-full justify-center gap-2",
                })}
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            </div>

            <SocialLinks links={profile.socialLinks} className="mt-4" />
          </div>
        </div>

        <div className="relative">
          {/* Affiliation — scholarly context */}
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 font-medium">
            {profile.department} &middot; {profile.university}
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {profile.name}
          </h1>

          {/* Title in primary blue */}
          <p className="text-lg text-primary mt-1 mb-4 font-medium">
            {profile.title}
          </p>

          <p className="text-foreground/85 leading-relaxed max-w-prose text-justify hyphens-auto">
            {profile.bio}
          </p>

          {/* Research interest badges — each gets its own color from the palette */}
          <div className="flex flex-wrap gap-2 mt-4">
            {profile.researchInterests.map((interest, i) => (
              <span
                key={interest}
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full
                            ${BADGE_PALETTE[i % BADGE_PALETTE.length]}`}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment notice */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
        <RecruitmentNotice />
      </section>

      {/* News feed */}
      {profile.news.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          {/* Colored section accent — left border in indigo */}
          <h2 className="text-xl font-semibold text-foreground mb-4
                         pl-3 border-l-4 border-indigo-400 dark:border-indigo-500">
            News
          </h2>
          <NewsList news={profile.news} />
        </section>
      )}

      {patchGuru && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-450">
          <h2 className="text-xl font-semibold text-foreground mb-4
                         pl-3 border-l-4 border-emerald-400 dark:border-emerald-500">
            Featured Research
          </h2>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Current work
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {patchGuru.venue} · {patchGuru.year}
              </span>
            </div>

            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
              {patchGuru.title}
            </h3>

            <div className="mt-4 space-y-4">
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                The paper introduces patch oracles: executable assertions derived from a patch’s
                stated intent that specify how program behavior should differ before and after
                the change. It then realises this in PatchGuru, an LLM-based approach that automatically turns
                natural language artifacts of a pull request into patch oracles, providing a practical way to verify that
                code changes match developer intent.
              </p>

              {patchGuru.results && patchGuru.results.length > 0 && (
                <div className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Key results
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="border-l-4 border-emerald-400 pl-3 text-sm font-semibold text-emerald-700 dark:border-emerald-500 dark:text-emerald-300">
                      Detected in widely-used Python libraries
                    </p>
                    {FEATURED_LIBRARIES.map((library) => (
                      <span
                        key={library.name}
                        className={`inline-flex items-center rounded-full border border-border/70 px-2 py-1 text-xs font-medium ${library.chipClass}`}
                      >
                        {library.kind === "image" ? (
                          <img
                            src={library.src}
                            alt={library.alt}
                            className={library.logoClass}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span className="font-semibold tracking-tight">{library.name}</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-6">
                    {FEATURED_METRICS.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex-1 border-t border-border/70 pt-3 md:border-t-0 md:border-l md:pt-0 md:pl-4 first:md:border-l-0 first:md:pl-0"
                      >
                        <div className={`text-3xl font-bold tabular-nums tracking-tight leading-none ${metric.accent}`}>
                          {metric.value}
                        </div>
                        <div className="mt-1 text-sm font-medium leading-5 text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
