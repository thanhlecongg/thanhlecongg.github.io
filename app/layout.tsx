import type { Metadata } from "next";
import { Public_Sans, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Analytics } from "@/components/layout/analytics";
import { ThemeProvider } from "@/components/layout/theme-provider";
import profile from "@/data/profile.json";

const publicSans = Public_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/** Mono for eyebrow labels, dates, venue tags */
const plexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/** Scholarly serif for headings — conveys academic authority */
const sourceSerif = Source_Serif_4({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: profile.name, template: `%s | ${profile.name}` },
  description: `${profile.name} is a tenure-track ${profile.title} at ${profile.university}, working at the intersection of software engineering, artificial intelligence, and cybersecurity.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${publicSans.variable} ${plexMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Skip link — lets keyboard users bypass the nav on every page */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 focus:rounded-md focus:text-sm focus:shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Nav />
          <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:px-6">
            {children}
          </main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
