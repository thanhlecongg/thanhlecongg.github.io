import type { Metadata } from "next";
import TravelMapLoader from "@/components/travel/travel-map-loader";
import travelData from "@/data/travel.json";

export const metadata: Metadata = { title: "Travel" };

// Continent grouping — used only to compute the summary count below
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
    <div className="flex flex-col gap-8 pt-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-[clamp(1.875rem,4.6vw,2.5rem)] font-bold tracking-tight text-foreground">
          Travel
        </h1>
        <p className="text-[15px] text-muted-foreground">
          I am avid traveler and have visited {countries.length} countries across {continentCount} continents, with {highlighted.length} longer stories.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <TravelMapLoader />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 justify-end text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-primary inline-block flex-shrink-0" />
            Visited
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-800 inline-block flex-shrink-0" />
            Not yet
          </span>
        </div>
      </div>
    </div>
  );
}
