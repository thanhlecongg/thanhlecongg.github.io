import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "@/components/about/social-links";
import { NewsList } from "@/components/about/news-list";
import { RecruitmentNotice } from "@/components/group/recruitment-notice";
import { getProfile } from "@/lib/data-loaders";
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

export default function HomePage() {
  const profile = getProfile();

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
    </div>
  );
}
