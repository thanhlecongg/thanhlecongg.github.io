"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * Renders a single BibTeX line with syntax highlighting.
 * Returns null for blank lines — the parent adds the newline character.
 */
function BibtexLine({ line }: { line: string }): React.ReactNode {
  if (line.trim() === "") return null;

  // Closing brace
  if (line.trim() === "}") {
    return <span className="text-muted-foreground/70">{"}"}</span>;
  }

  // Entry declaration: @type{key,
  const entryMatch = line.match(/^(\s*)(@\w+)\{(\S+),\s*$/);
  if (entryMatch) {
    const [, indent, entryType, key] = entryMatch;
    return (
      <>
        {indent}
        <span className="text-violet-600 dark:text-violet-400 font-semibold">{entryType}</span>
        <span className="text-muted-foreground/70">{"{"}</span>
        <span className="text-amber-600 dark:text-amber-400">{key}</span>
        <span className="text-muted-foreground/70">,</span>
      </>
    );
  }

  // Field line: "  fieldName   = {value}," or "  fieldName = value"
  const fieldMatch = line.match(/^(\s+)(\w+)(\s*=\s*)(.*)$/);
  if (fieldMatch) {
    const [, indent, field, eq, rest] = fieldMatch;
    const hasComma = rest.endsWith(",");
    const value = hasComma ? rest.slice(0, -1) : rest;
    return (
      <>
        {indent}
        <span className="text-sky-600 dark:text-sky-400">{field}</span>
        <span className="text-muted-foreground/70">{eq}</span>
        <span className="text-foreground/85">{value}</span>
        {hasComma && <span className="text-muted-foreground/70">,</span>}
      </>
    );
  }

  return <>{line}</>;
}

interface BibtexBlockProps {
  bibtex: string;
}

/**
 * Shared BibTeX display block with syntax highlighting and a copy button.
 * Used in both the publication card's expand panel and the paper detail page.
 */
export function BibtexBlock({ bibtex }: BibtexBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silent fail
    }
  }

  const lines = bibtex.split("\n");

  return (
    <div className="bg-muted/50 border border-border rounded-lg overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/40">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          BibTeX
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs font-medium
                     text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Copy BibTeX to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code block with syntax highlighting */}
      <pre className="text-xs font-mono leading-tight px-4 py-3 overflow-x-auto whitespace-pre-wrap break-all">
        {lines.map((line, i) => (
          <span key={i}>
            <BibtexLine line={line} />
            {i < lines.length - 1 && "\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}
