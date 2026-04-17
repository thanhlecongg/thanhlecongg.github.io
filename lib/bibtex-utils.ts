import type { Publication } from "./types";

/** Convert "First Last" or "First Mid-Last" to "Last, First" BibTeX author format */
function formatAuthor(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const last = parts[parts.length - 1];
  const first = parts.slice(0, -1).join(" ");
  return `${last}, ${first}`;
}

/**
 * Build a meaningful entry key: firstAuthorLastname + year + firstSignificantTitleWord.
 * Skips common stop words (A, An, The, Toward, Towards, Better, Are, Can, How)
 * so the keyword reflects the tool/concept name.
 */
const KEY_STOPWORDS = new Set(["a","an","the","toward","towards","better","are","can","how","do","is","of","for","on","in","with","from","via"]);

function buildKey(pub: Publication): string {
  const firstAuthor = pub.authors[0] ?? "unknown";
  const nameParts = firstAuthor.trim().split(/\s+/);
  const lastName = nameParts[nameParts.length - 1].toLowerCase().replace(/[^a-z]/g, "");

  // Find first title word that isn't a stop word
  const titleWords = pub.title.split(/\s+/).map((w) => w.toLowerCase().replace(/[^a-z]/g, "")).filter(Boolean);
  const keyword = titleWords.find((w) => !KEY_STOPWORDS.has(w)) ?? titleWords[0] ?? "paper";

  return `${lastName}${pub.year}${keyword}`;
}

/** BibTeX entry type per venue type */
const ENTRY_TYPE: Record<Publication["venueType"], string> = {
  conference: "inproceedings",
  journal:    "article",
  workshop:   "inproceedings",
  preprint:   "misc",
};

/** Venue field name per entry type */
const VENUE_FIELD: Record<Publication["venueType"], string> = {
  conference: "booktitle",
  journal:    "journal",
  workshop:   "booktitle",
  preprint:   "howpublished",
};

/**
 * Normalize a BibTeX string so every field is separated by exactly one blank line.
 * Handles entries sourced from DBLP, arXiv, or manually written (all use different styles).
 *
 * Algorithm:
 *  1. Collapse any run of 2+ consecutive newlines to a single newline.
 *  2. Re-insert a blank line before every indented field line (`  key = …`).
 *  3. Re-insert a blank line before the closing `}`.
 */
export function normalizeBibtex(raw: string): string {
  return raw
    .trim()
    .replace(/\n{2,}/g, "\n")              // step 1: flatten excess blank lines
    .replace(/\n(\s+\w)/g, "\n\n$1")       // step 2: blank line before each field
    .replace(/\n\s*\}$/, "\n\n}");         // step 3: blank line before closing brace
}

/**
 * Return a normalized BibTeX string for a publication.
 * Uses the stored `bibtex` field when present; falls back to auto-generation.
 */
export function getBibtex(pub: Publication): string {
  return normalizeBibtex(pub.bibtex ?? generateBibtex(pub));
}

/**
 * Auto-generate a BibTeX entry from publication metadata.
 * Used as fallback when `bibtex` is not explicitly set on a publication.
 */
export function generateBibtex(pub: Publication): string {
  const type = ENTRY_TYPE[pub.venueType];
  const key = buildKey(pub);
  const authors = pub.authors.map(formatAuthor).join(" and ");
  const venueField = VENUE_FIELD[pub.venueType];
  const venueValue = pub.venueType === "preprint" ? `arXiv preprint` : pub.venue;

  // Build field list — blank line between each field matches the hand-crafted entries
  const fields = [
    `  title     = {${pub.title}}`,
    `  author    = {${authors}}`,
    `  ${venueField.padEnd(9)} = {${venueValue}}`,
    `  year      = {${pub.year}}`,
  ];

  return `@${type}{${key},\n\n${fields.join(",\n\n")}\n\n}`;
}
