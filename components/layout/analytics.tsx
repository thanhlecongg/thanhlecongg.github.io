import Script from "next/script";

const UMAMI_WEBSITE_ID = "4017db2e-d81f-48e3-a304-2d4fba9eded9";

export function Analytics() {
  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}
