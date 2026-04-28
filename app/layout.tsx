import type { Metadata } from "next";
import { Geist, Geist_Mono, Crimson_Pro } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import profile from "@/data/profile.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Scholarly serif for headings — conveys academic authority */
const crimsonPro = Crimson_Pro({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: profile.name, template: `%s | ${profile.name}` },
  description: `Academic homepage of ${profile.name}, ${profile.title} at ${profile.university}`,
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
      className={`${geistSans.variable} ${geistMono.variable} ${crimsonPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="4017db2e-d81f-48e3-a304-2d4fba9eded9"
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <Nav />
          <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:px-6">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
