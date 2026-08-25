"use client";
import { useState } from "react";
import { NewsItem } from "./news-item";

const INITIAL_VISIBLE = 4;

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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4 pb-3 mb-2 border-b border-border">
        <h2 className="eyebrow">News</h2>
        {news.length > INITIAL_VISIBLE && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-[13.5px] text-primary hover:underline underline-offset-2"
          >
            {expanded ? "Show less" : `Show all (${news.length})`}
          </button>
        )}
      </div>
      <ul>
        {visible.map((item, i) => (
          <NewsItem key={i} date={item.date} text={item.text} />
        ))}
      </ul>
    </div>
  );
}
