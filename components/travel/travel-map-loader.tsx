"use client";

import dynamic from "next/dynamic";

// ssr: false must live in a Client Component (Next.js 16 / Turbopack restriction)
const TravelMap = dynamic(() => import("@/components/travel/travel-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[2/1] animate-pulse rounded-xl bg-muted border border-border" />
  ),
});

export default function TravelMapLoader() {
  return <TravelMap />;
}
