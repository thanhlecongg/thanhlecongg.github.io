"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/** Sun/Moon toggle button — mounted client-side only to avoid hydration mismatch. */
export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme ?? theme;

  if (!currentTheme) {
    // Render same-size placeholder to prevent layout shift
    return <div className="w-8 h-8" />;
  }

  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-8 h-8 flex items-center justify-center rounded-md
                 text-muted-foreground hover:text-foreground hover:bg-muted
                 transition-colors cursor-pointer"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
