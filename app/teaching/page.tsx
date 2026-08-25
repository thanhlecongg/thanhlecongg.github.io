"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function TeachingPage() {
  useEffect(() => {
    window.location.replace("/experience/#teaching");
  }, []);

  return (
    <div className="py-12 text-center">
      <p className="text-muted-foreground">
        Teaching is now part of the{" "}
        <Link href="/experience/#teaching" className="text-primary hover:underline underline-offset-2">
          Experience page
        </Link>
        .
      </p>
    </div>
  );
}
