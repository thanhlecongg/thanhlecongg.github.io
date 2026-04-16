"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Desktop: nav links + theme toggle */}
        <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
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

        {/* Mobile: theme toggle + hamburger button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            {menuOpen ? (
              /* X icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="sm:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-2 flex flex-col"
        >
          {navLinks.map(({ href, label }) => {
            const active = isActiveLink(href, pathname);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "py-2.5 text-sm font-medium transition-colors border-b border-border/50 last:border-0",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
