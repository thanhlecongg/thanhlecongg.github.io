"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Wraps next-themes ThemeProvider — must be a client component. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
