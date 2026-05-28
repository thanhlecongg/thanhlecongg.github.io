import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { CheckCircle2, Mail } from "lucide-react";

export const metadata: Metadata = { title: "Join Us" };

const RESEARCH_AREAS = [
  {
    title: "Trustworthy AI for Software Engineering",
    description:
      "Building reliable, explainable, and safe AI/LLM-powered tools for software development — including code generation, program repair, and vulnerability detection.",
  },
  {
    title: "Automated Software Debugging",
    description:
      "Developing techniques that automatically locate and fix bugs in software, spanning classical patch-generation methods to neural and LLM-based approaches.",
  },
  {
    title: "Software & System Security",
    description:
      "Analyzing and hardening software against vulnerabilities, malicious code, and adversarial attacks — from traditional software systems to AI/ML pipelines.",
  },
  {
    title: "Physical AI & Cyber-Physical Systems",
    description:
      "Extending security and trustworthiness research to embodied and physical AI systems — robots, autonomous vehicles, and other cyber-physical platforms where software flaws can have real-world consequences.",
  },
];

const QUALITIES = [
  "Strong foundation in machine learning and/or software engineering",
  "Curiosity-driven, self-motivated, and passionate about research",
  "Proficiency in programming (e.g., Python, Java, or C/C++)",
  "Ability to read, comprehend, and build upon research literature",
  "Strong written and verbal communication skills in English",
  "Practical, hands-on experience in program analysis, automated reasoning, software testing, or cyber-security is a plus",
];

const WHAT_TO_SEND = [
  "Your CV / resume",
  "Unofficial transcripts",
  "A brief paragraph on your research interests and why you want to join",
  "Any relevant work — papers, code, projects",
];

export default function JoinPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Join Us"
        description="Prospective students and research assistants"
      />

      {/* Opening */}
      <section className="rounded-xl border border-emerald-300 dark:border-emerald-700
                          bg-gradient-to-br from-emerald-50 via-teal-50/40 to-transparent
                          dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-transparent
                          px-6 py-6">
        <p className="text-foreground/85 leading-relaxed">
          I am actively looking for motivated <strong>PhD students</strong> and{" "}
          <strong>research assistants</strong> to join my group at{" "}
          <strong>Singapore University of Technology and Design (SUTD)</strong>.
          I welcome applicants from diverse backgrounds — if your interests intersect
          with any of the research areas below, please reach out.
        </p>
      </section>

      {/* Research areas */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4 pl-3 border-l-4 border-emerald-500">
          Research Areas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RESEARCH_AREAS.map((area) => (
            <div
              key={area.title}
              className="rounded-lg border border-border bg-muted/30 px-4 py-3 space-y-1"
            >
              <p className="text-sm font-semibold text-foreground">{area.title}</p>
              <p className="text-xs text-muted-foreground leading-snug">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What I look for */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4 pl-3 border-l-4 border-sky-500">
          What I Look For
        </h2>
        <ul className="space-y-2">
          {QUALITIES.map((q) => (
            <li key={q} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              {q}
            </li>
          ))}
        </ul>
      </section>

      {/* How to apply */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4 pl-3 border-l-4 border-violet-500">
          How to Apply
        </h2>
        <p className="text-sm text-foreground/85 leading-relaxed mb-4">
          Send an email to{" "}
          <a
            href="mailto:thanhlc@ieee.org"
            className="text-emerald-600 dark:text-emerald-400 font-medium underline underline-offset-2 hover:text-emerald-700"
          >
            thanhlc@ieee.org
          </a>{" "}
          with the subject line <strong>[Prospective Student] Your Name</strong>. Please include:
        </p>
        <ul className="space-y-2 mb-5">
          {WHAT_TO_SEND.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <CheckCircle2 className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <a
          href="mailto:thanhlc@ieee.org?subject=[Prospective Student]"
          className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full
                     bg-emerald-600 text-white hover:bg-emerald-700
                     dark:bg-emerald-500 dark:hover:bg-emerald-400 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Send Application Email
        </a>
      </section>
    </div>
  );
}
