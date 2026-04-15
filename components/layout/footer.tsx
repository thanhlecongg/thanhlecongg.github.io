import Link from "next/link";
import profile from "@/data/profile.json";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-16 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row
                      justify-between items-center gap-4 text-sm text-muted-foreground">
        <span>© {year} {profile.name}</span>

        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          <Link href="/publications" className="hover:text-foreground transition-colors">Publications</Link>
          <Link href="/research" className="hover:text-foreground transition-colors">Research</Link>
          <Link href="/experience" className="hover:text-foreground transition-colors">Experience</Link>
          <Link href="/group" className="hover:text-foreground transition-colors">Group</Link>
          <Link href="/teaching" className="hover:text-foreground transition-colors">Teaching</Link>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Experiment note — secondary line, intentionally low contrast */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-3 text-center text-xs text-muted-foreground/65">
        Built with{" "}
        <a
          href="https://claude.ai/code"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-muted-foreground transition-colors underline underline-offset-2"
        >
          Claude Code
        </a>
        {" "}— an experiment in AI-assisted development.
      </div>
    </footer>
  );
}
