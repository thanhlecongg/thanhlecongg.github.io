import Image from "next/image";
import { SocialLinks } from "@/components/about/social-links";
import { NewsList } from "@/components/about/news-list";
import { RecruitmentNotice } from "@/components/about/recruitment-notice";
import { getProfile, getPublications } from "@/lib/data-loaders";

const FEATURED_METRICS = [
  { value: "24", label: "confirmed bugs" },
  { value: "12", label: "previously unknown" },
  { value: "8.9", label: "minutes per PR" },
  { value: "$0.07", label: "per PR" },
] as const;

const SWECC_METRICS = [
  { value: "823", label: "machine-checkable policies" },
  { value: "500", label: "tasks" },
  { value: "12", label: "open-source repositories" },
  { value: "43.1%", label: "policies violated" },
] as const;

const FEATURED_LIBRARIES = ["pandas", "SciPy", "marshmallow", "Keras"] as const;

export default function HomePage() {
  const profile = getProfile();
  const patchGuru = getPublications().find(
    (publication) => publication.id === "2026-patchguru-patch-oracle",
  );

  const sweCC = getPublications().find(
    (publication) => publication.id === "2026-swe-cc-policy-compliance",
  );

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-wrap gap-6 gap-x-12 items-start">
        <div className="flex-none w-full max-w-[220px] mx-auto sm:mx-0 sm:w-[180px] sm:max-w-none flex flex-col gap-4">
          <Image
            src="/images/profile.webp"
            alt={`Profile photo of ${profile.name}`}
            width={180}
            height={180}
            className="w-full aspect-square rounded-full border border-border object-cover"
            priority
          />
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-center h-[38px] rounded-lg bg-primary text-primary-foreground text-[13.5px] font-medium hover:bg-primary/90 transition-colors"
            >
            Email
            </a>
          </div>

          <SocialLinks links={profile.socialLinks} vertical className="pt-2 border-t border-border" />
        </div>

        <div className="flex-1 min-w-[320px] flex flex-col gap-4">
          <div className="eyebrow">
            {profile.department} · <span className="whitespace-nowrap">{profile.university}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[clamp(32px,5.4vw,46px)] font-bold tracking-tight leading-[1.02] text-foreground">
              {profile.name}
            </h1>
            <div className="text-[15px] font-medium text-primary">{profile.title}</div>
          </div>

          <p className="text-[17px] leading-[1.8] text-foreground/80">{profile.bio}</p>
        </div>
      </section>

      <RecruitmentNotice />

      {profile.news.length > 0 && <NewsList news={profile.news} />}

      {(patchGuru || sweCC) && (
        <section className="flex flex-col gap-4">
          <h2 className="eyebrow pb-3 border-b border-border">Featured work</h2>

          {patchGuru && (
          <article className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide">
              <span className="text-primary font-semibold border border-primary/25 bg-primary/[0.06] rounded-full px-2.5 py-0.5">
                Current work
              </span>
              <span className="text-muted-foreground font-medium">
                {patchGuru.venue} · {patchGuru.year}
              </span>
            </div>

            <h3 className="text-[clamp(21px,2.6vw,26px)] font-bold tracking-tight leading-tight text-foreground">
              {patchGuru.title}
            </h3>

            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/80">
              The paper introduces patch oracles: executable specifications derived from a
              patch&rsquo;s stated intent that specify how program behavior should differ before
              and after the change. It then realises this in PatchGuru, an LLM-based approach
              that automatically turns natural language artifacts of a pull request into patch
              oracles, providing a practical way to verify that code changes match developer
              intent.
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              <a
                href="/pdfs/2026-patchguru-patch-oracle.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] text-foreground/70 border border-border rounded-md px-2.5 py-1 hover:border-primary/50 hover:text-primary transition-colors"
              >
                arXiv
              </a>
              <a
                href="https://github.com/thanhlecongg/PatchGuru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] text-foreground/70 border border-border rounded-md px-2.5 py-1 hover:border-primary/50 hover:text-primary transition-colors"
              >
                Code
              </a>
            </div>

            <div className="border-t border-border mt-3 pt-5 flex flex-wrap items-start gap-5 gap-x-12">
              <div className="flex flex-wrap gap-8">
                {FEATURED_METRICS.map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-1">
                    <div className="text-[30px] font-bold tracking-tight leading-none text-primary"
                         style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
                      {metric.value}
                    </div>
                    <div className="text-[13.5px] leading-tight text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex-1 min-w-[250px] flex flex-col gap-2">
                <div className="eyebrow">Found in widely-used Python libraries</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {FEATURED_LIBRARIES.map((lib) => (
                    <span key={lib} className="font-mono text-[12.5px] text-foreground/80">
                      {lib}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
          )}
          {sweCC && patchGuru && <div className="border-t border-border my-4" />}

          {sweCC && (
          <article className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide">
              <span className="text-primary font-semibold border border-primary/25 bg-primary/[0.06] rounded-full px-2.5 py-0.5">
                Current work
              </span>
              <span className="text-muted-foreground font-medium">
                {sweCC.venue} · {sweCC.year}
              </span>
            </div>

            <h3 className="text-[clamp(21px,2.6vw,26px)] font-bold tracking-tight leading-tight text-foreground">
              {sweCC.title}
            </h3>

            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/80">
              Passing unit tests does not make an agent&rsquo;s patch acceptable for merging. SWE-CC
              converts developer documentation from open-source repositories into machine-checkable
              policies and audits both what coding agents do while working and what they finally
              deliver. Across four LLMs and two agent scaffolds, we found that functionally correct patches still
              violated 43.1% of applicable policies.
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              {sweCC.links.arxiv && (
                <a
                  href={sweCC.links.arxiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12.5px] text-foreground/70 border border-border rounded-md px-2.5 py-1 hover:border-primary/50 hover:text-primary transition-colors"
                >
                  arXiv
                </a>
              )}
              {sweCC.links.code && (
                <a
                  href={sweCC.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12.5px] text-foreground/70 border border-border rounded-md px-2.5 py-1 hover:border-primary/50 hover:text-primary transition-colors"
                >
                  Code
                </a>
              )}
            </div>

            <div className="border-t border-border mt-3 pt-5 flex flex-wrap gap-8">
              {SWECC_METRICS.map((metric) => (
                <div key={metric.label} className="flex flex-col gap-1">
                  <div className="text-[30px] font-bold tracking-tight leading-none text-primary"
                       style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
                    {metric.value}
                  </div>
                  <div className="text-[13.5px] leading-tight text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </article>
          )}

        </section>
      )}
    </div>
  );
}
