"use client";
import { useState } from "react";
import { NewsItem } from "./news-item";

const INITIAL_VISIBLE = 5;

interface NewsEntry {
  date: string;
  text: string;
}

interface NewsListProps {
  news: NewsEntry[];
}

export function NewsList({ news }: NewsListProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? news : news.slice(0, INITIAL_VISIBLE);
  const hiddenCount = news.length - INITIAL_VISIBLE;

  return (
    <>
      <ul className="space-y-2">
        {visible.map((item, i) => (
          <NewsItem key={i} index={i} date={item.date} text={item.text} />
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          {expanded ? "Show less" : `Show ${hiddenCount} more`}
        </button>
      )}
    </>
  );
}
