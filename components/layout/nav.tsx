"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import profile from "@/data/profile.json";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/publications", label: "Publications" },
  { href: "/research", label: "Research" },
  { href: "/experience", label: "Experience" },
  { href: "/group", label: "Group" },
  { href: "/teaching", label: "Teaching" },
];

/** Returns true when the current pathname matches the nav link's route or any sub-route. */
function isActiveLink(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Site name links back to homepage */}
        <Link
          href="/"
          className="font-semibold text-foreground hover:text-primary transition-colors truncate mr-4"
        >
          {profile.name}
        </Link>

        {/* Primary navigation + theme toggle */}
        <div className="flex items-center gap-1 flex-shrink-0">
        <nav aria-label="Main navigation" className="flex gap-1">
          {navLinks.map(({ href, label }) => {
            const active = isActiveLink(href, pathname);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium transition-colors relative",
                  /* Underline indicator — more editorial/academic than filled pill */
                  active
                    ? "text-primary after:absolute after:bottom-[-2px] after:left-2 after:right-2 after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
