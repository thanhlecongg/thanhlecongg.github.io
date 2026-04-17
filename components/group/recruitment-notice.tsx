import { Mail } from "lucide-react";

export function RecruitmentNotice() {
  return (
    <section className="rounded-xl border border-blue-200/60 dark:border-blue-800/40
                        bg-gradient-to-br from-blue-50/60 via-violet-50/30 to-transparent
                        dark:from-blue-950/25 dark:via-violet-950/15 dark:to-transparent
                        px-6 py-5">
      <h2 className="text-xl font-semibold text-foreground mb-3
                     pl-3 border-l-4 border-indigo-400 dark:border-indigo-500">
        Join My Group at SUTD
      </h2>

      <p className="text-sm text-foreground/85 leading-relaxed mb-4">
        I am actively recruiting motivated <strong>PhD students</strong> and{" "}
        <strong>research assistants</strong>. Feel free to reach out if your
        interests overlap with my research areas.{" "}
        <a href="/join" className="text-primary hover:underline underline-offset-2 font-medium">
          Learn more →
        </a>
      </p>

      <a
        href="mailto:thanhlc@ieee.org?subject=[Prospective Student]"
        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full
                   bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Mail className="w-3.5 h-3.5" />
        thanhlc@ieee.org
      </a>
    </section>
  );
}
