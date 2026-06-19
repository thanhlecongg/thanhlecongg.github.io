"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "site-analytics-consent";
const UMAMI_WEBSITE_ID = "4017db2e-d81f-48e3-a304-2d4fba9eded9";

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    window.setTimeout(() => {
      setConsent(stored === null ? null : stored === "accepted");
    }, 0);
  }, []);

  return (
    <>
      {consent === true && (
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
      )}

      {consent === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Analytics consent"
          className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-xl rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">Analytics</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This site uses anonymous analytics to understand what pages are useful.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  window.localStorage.setItem(CONSENT_KEY, "declined");
                  setConsent(false);
                }}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => {
                  window.localStorage.setItem(CONSENT_KEY, "accepted");
                  setConsent(true);
                }}
                className="rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
