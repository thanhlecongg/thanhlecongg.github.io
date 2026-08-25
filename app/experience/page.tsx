import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { ExperienceCard } from "@/components/experience/experience-card";
import { CourseCard } from "@/components/teaching/course-card";
import {
  getResearchExperiences,
  getEducation,
  getSutdCourses,
  getPreSutdCourses,
  getAwards,
  getService,
} from "@/lib/data-loaders";

export const metadata: Metadata = { title: "Academic Experience" };

const TYPE_LABEL: Record<string, string> = {
  "full-time": "Full-time",
  visiting: "Visiting",
  internship: "Industry internship",
};

export default function ExperiencePage() {
  const experiences = getResearchExperiences();
  const education = getEducation();
  const sutdCourses = getSutdCourses();
  const preSutdCourses = getPreSutdCourses();
  const awards = getAwards();
  const service = getService();

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Academic Experience"
        description="Education, professional experience, teaching, service, and selected honours"
      />

      <section id="education" className="scroll-mt-24">
        <h2 className="pb-4 mb-3 border-b border-border text-[18px] font-semibold tracking-tight text-foreground">
          Education
        </h2>
        <div className="flex flex-col gap-3">
          {education.map((edu) => (
            <ExperienceCard
              key={edu.id}
              dates={edu.period}
              place={edu.location}
              org={edu.institution}
              role={`${edu.degree} in ${edu.field}`}
              meta={[
                ...(edu.thesis ? [`Thesis: ${edu.thesis}`] : []),
                ...(edu.advisors?.length ? [`Advisors: ${edu.advisors.join(", ")}`] : []),
              ]}
              bullets={[]}
            />
          ))}
        </div>
      </section>

      <section id="professional-experience" className="scroll-mt-24">
        <h2 className="pb-4 mb-3 border-b border-border text-[18px] font-semibold tracking-tight text-foreground">
          Professional experience
        </h2>
        <div className="flex flex-col gap-3">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              dates={experience.period}
              place={experience.location}
              kind={TYPE_LABEL[experience.type]}
              org={experience.organization}
              role={experience.role}
              meta={[
                ...(experience.hosts?.length ? [`Hosts: ${experience.hosts.join(", ")}`] : []),
                ...(experience.supervisors?.length
                  ? [`Supervisors: ${experience.supervisors.join(", ")}`]
                  : []),
              ]}
              bullets={experience.highlights ?? []}
            />
          ))}
        </div>
      </section>

      <section id="teaching" className="scroll-mt-24">
        <h2 className="pb-4 mb-2 border-b border-border text-[18px] font-semibold tracking-tight text-foreground">
          Teaching
        </h2>
        <div className="flex flex-col gap-7">
          <div>
            <h3 className="font-mono text-[12.5px] font-medium uppercase tracking-wider text-foreground/70">
              SUTD
            </h3>
            <div className="flex flex-col">
              {sutdCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[12.5px] font-medium uppercase tracking-wider text-foreground/70">
              Previous teaching
            </h3>
            <div className="flex flex-col">
              {preSutdCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="service" className="scroll-mt-24">
        <h2 className="pb-2 mb-1 border-b border-border text-[18px] font-semibold tracking-tight text-foreground">
          Academic service
        </h2>
        <div className="flex flex-col">
          {service.map((item, i) => (
            <div key={i} className="flex flex-wrap gap-1 gap-x-4 py-3 border-b border-border/60 last:border-0">
              <div className="flex-none w-20 whitespace-nowrap font-mono text-[12.5px] text-muted-foreground pt-0.5">
                {item.year}
              </div>
              <div className="flex-1 min-w-[280px] flex flex-col gap-1">
                <div className="text-[15px] font-semibold text-foreground leading-snug">
                  {item.role}
                </div>
                {item.venue && (
                  <div className="text-[13.5px] text-muted-foreground leading-snug">
                    {item.venue}
                  </div>
                )}
                {item.venues && item.venues.length > 0 && (
                  <ul
                    className={`mt-1 grid list-disc gap-x-6 gap-y-1 pl-5 text-[13.5px] leading-snug text-muted-foreground ${
                      item.role === "Program Committee Member" ? "sm:grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {item.venues.map((venue) => (
                      <li key={venue}>{venue}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="honours" className="scroll-mt-24">
        <h2 className="pb-2 mb-1 border-b border-border text-[18px] font-semibold tracking-tight text-foreground">
          Selected awards and honours
        </h2>
        <div className="flex flex-col">
          {awards.map((aw, i) => (
            <div key={i} className="flex flex-wrap gap-1 gap-x-4 py-3 border-b border-border/60 last:border-0">
              <div className="flex-none w-16 font-mono text-[12.5px] text-muted-foreground pt-0.5">{aw.year}</div>
              <div className="flex-1 min-w-[280px] flex flex-col gap-1">
                <div className="text-[15px] font-semibold text-foreground leading-snug">{aw.title}</div>
                <div className="text-[13.5px] text-muted-foreground leading-snug">{aw.org}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
