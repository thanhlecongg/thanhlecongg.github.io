import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { ExperienceCard } from "@/components/experience/experience-card";
import { getResearchExperiences, getEducation } from "@/lib/data-loaders";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  const experiences = getResearchExperiences();
  const education = getEducation();

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Experience"
        description="Education, research, and industry positions"
      />

      {/* Education */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-5">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <article
              key={edu.id}
              className="border border-border border-l-4 border-l-amber-400 rounded-lg p-5 bg-card hover:shadow-sm transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{edu.institution}</h3>
                  <p className="text-sm text-primary font-medium">
                    {edu.degree} in {edu.field}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-mono text-muted-foreground">{edu.period}</span>
                  <p className="text-xs text-muted-foreground">{edu.location}</p>
                </div>
              </div>
              {edu.thesis && (
                <p className="text-xs text-muted-foreground mb-2">
                  <span className="font-medium">Thesis: </span>{edu.thesis}
                </p>
              )}
              {edu.advisors && edu.advisors.length > 0 && (
                <p className="text-xs text-muted-foreground mb-2">
                  <span className="font-medium">Advisors: </span>{edu.advisors.join(", ")}
                </p>
              )}
              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="space-y-1 mt-2">
                  {edu.highlights.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/85">
                      <span className="text-amber-500 mt-1 flex-shrink-0">◦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Research & Industry */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-5">Research & Industry</h2>
        <div className="space-y-5">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </section>
    </div>
  );
}
