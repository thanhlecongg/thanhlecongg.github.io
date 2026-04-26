import type { Metadata } from "next";
import Image from "next/image";
import TravelMapLoader from "@/components/travel/travel-map-loader";
import travelData from "@/data/travel.json";

export const metadata: Metadata = { title: "Travel" };

// Region groups — each gets its own accent color
const REGIONS = [
  {
    name: "Southeast Asia",
    ids: new Set(["704", "702", "764", "458"]),
    badge: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800",
    bar:   "border-teal-400 dark:border-teal-500",
    mapColor: "#0d9488",
  },
  {
    name: "East Asia",
    ids: new Set(["392", "156", "158"]),
    badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
    bar:   "border-amber-400 dark:border-amber-500",
    mapColor: "#d97706",
  },
  {
    name: "Oceania",
    ids: new Set(["036"]),
    badge: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
    bar:   "border-violet-400 dark:border-violet-500",
    mapColor: "#7c3aed",
  },
  {
    name: "Americas",
    ids: new Set(["840"]),
    badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    bar:   "border-blue-400 dark:border-blue-500",
    mapColor: "#2563eb",
  },
  {
    name: "Europe",
    ids: new Set(["276", "250", "040", "756", "528", "724", "380"]),
    badge: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
    bar:   "border-rose-400 dark:border-rose-500",
    mapColor: "#e11d48",
  },
];

// Distinct card styles for the 3 labelled "special places"
const HIGHLIGHT_STYLES: Record<string, { card: string; name: string }> = {
  "704": {
    card: "from-emerald-100 to-teal-100 border-emerald-300 dark:from-emerald-950/60 dark:to-teal-950/60 dark:border-emerald-800",
    name: "text-emerald-800 dark:text-emerald-300",
  },
  "702": {
    card: "from-blue-100 to-cyan-100 border-blue-300 dark:from-blue-950/60 dark:to-cyan-950/60 dark:border-blue-800",
    name: "text-blue-800 dark:text-blue-300",
  },
  "036": {
    card: "from-violet-100 to-purple-100 border-violet-300 dark:from-violet-950/60 dark:to-purple-950/60 dark:border-violet-800",
    name: "text-violet-800 dark:text-violet-300",
  },
};

// Continent count (Asia + Oceania + Americas + Europe = 4)
const CONTINENT_IDS: Record<string, string> = {
  "704": "Asia", "702": "Asia", "764": "Asia", "458": "Asia",
  "392": "Asia", "156": "Asia", "158": "Asia",
  "036": "Oceania",
  "840": "Americas",
  "276": "Europe", "250": "Europe", "040": "Europe",
  "756": "Europe", "528": "Europe", "724": "Europe", "380": "Europe",
};

const countries      = travelData.visitedCountries;
const continentCount = new Set(countries.map((c) => CONTINENT_IDS[c.id]).filter(Boolean)).size;
const highlighted    = countries.filter((c): c is typeof c & { label: string } => Boolean(c.label));

export default function TravelPage() {
  return (
    <div className="space-y-10 pt-6">
      
      {/* ── World map + legend ── */}
      <div className="space-y-2">
        <TravelMapLoader />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 justify-end text-xs text-muted-foreground">
          {REGIONS.map((r) => (
            <span key={r.name} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm inline-block flex-shrink-0" style={{ background: r.mapColor }} />
              {r.name}
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-800 inline-block flex-shrink-0" />
            Not yet
          </span>
        </div>
      </div>

    </div>
  );
}
