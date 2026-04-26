"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useTheme } from "next-themes";
import travelData from "@/data/travel.json";

const GEO_URL = "/data/world-110m.json";

const REGION_MAP = [
  { ids: ["704","702","764","458"], light:"#0d9488", dark:"#2dd4bf", hl:"#0f766e", hd:"#5eead4" },
  { ids: ["392","156","158"],       light:"#d97706", dark:"#fbbf24", hl:"#b45309", hd:"#fde68a" },
  { ids: ["036"],                   light:"#7c3aed", dark:"#a78bfa", hl:"#6d28d9", hd:"#c4b5fd" },
  { ids: ["840"],                   light:"#2563eb", dark:"#60a5fa", hl:"#1d4ed8", hd:"#93c5fd" },
  { ids: ["276","250","040","756","528","724","380"],
                                    light:"#e11d48", dark:"#fb7185", hl:"#be123c", hd:"#fda4af" },
];

const REGION_COLORS = Object.fromEntries(
  REGION_MAP.flatMap(r => r.ids.map(id => [id, r]))
);

const MARKER_COORDS: Record<string, [number, number]> = {
  "704": [105.85, 16.86],
  "702": [103.82,  1.35],
  "036": [133.78, -25.27],
};

const visitedIdSet = new Set(travelData.visitedCountries.map(c => c.id));
const idToCountry  = Object.fromEntries(travelData.visitedCountries.map(c => [c.id, c]));

// All labelled countries with known coordinates → always get a pulsing dot
const labelledMarkers = travelData.visitedCountries
  .filter(c => c.label && c.id in MARKER_COORDS)
  .map(c => ({ ...c, coordinates: MARKER_COORDS[c.id], photo: (c as { photo?: string }).photo }));

// Clip-path circle center for the photo bubble, offset above the dot
const PHOTO_CY = -26;  // y-offset of photo center in marker-local coords
const PHOTO_R  = 16;   // photo circle radius

interface Tooltip { x: number; y: number; name: string; label?: string }
interface Lightbox { photo: string; name: string; label: string }

export default function TravelMap() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip,  setTooltip]  = useState<Tooltip | null>(null);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const defaultFill  = isDark ? "#1e293b" : "#94a3b8";
  const defaultHover = isDark ? "#334155" : "#64748b";
  const stroke       = isDark ? "#0f172a" : "#f8fafc";
  const ocean        = isDark ? "#0c1220" : "#bfdbfe";

  const getColor = (id: string, hover = false) => {
    const r = REGION_COLORS[id];
    if (!r) return hover ? defaultHover : defaultFill;
    return isDark ? (hover ? r.hd : r.dark) : (hover ? r.hl : r.light);
  };

  const handleEnter = (evt: React.MouseEvent, geoId: string, fallback: string) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const c = idToCountry[geoId];
    const name = c?.name ?? fallback;
    if (!name) return;
    setTooltip({ x: evt.clientX - rect.left, y: evt.clientY - rect.top, name, label: c?.label });
  };

  return (
    <>
      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-xl w-full mx-4 rounded-2xl overflow-hidden shadow-2xl bg-card"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3]">
              <Image src={lightbox.photo} alt={lightbox.name} fill className="object-cover" sizes="600px" />
            </div>
            <div className="p-4 border-t border-border">
              <p className="font-semibold text-foreground">{lightbox.name}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{lightbox.label}</p>
            </div>
            <button
              aria-label="Close photo"
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white text-sm hover:bg-black/80 transition-colors"
            >✕</button>
          </div>
        </div>
      )}

      {/* ── Map ── */}
      <div
        ref={containerRef}
        className="map-entrance relative w-full rounded-xl overflow-hidden border border-border"
        style={{ background: ocean }}
      >
        {tooltip && (
          <div
            className="absolute z-20 px-2.5 py-1.5 text-xs bg-popover text-popover-foreground border border-border rounded-lg shadow-md pointer-events-none whitespace-nowrap"
            style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -130%)" }}
          >
            <span className="font-semibold">{tooltip.name}</span>
            {tooltip.label && <span className="ml-1.5 text-muted-foreground">· {tooltip.label}</span>}
          </div>
        )}

        <ComposableMap projectionConfig={{ scale: 147 }} style={{ width: "100%", height: "auto" }}>
          {/* Clip paths for photo bubbles — circle centred at PHOTO_CY in marker-local space */}
          <defs>
            {labelledMarkers.filter(m => m.photo).map(m => (
              <clipPath key={`clip-${m.id}`} id={`clip-${m.id}`}>
                <circle cx={0} cy={PHOTO_CY} r={PHOTO_R} />
              </clipPath>
            ))}
          </defs>

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const id = String(geo.id ?? "").padStart(3, "0");
                const isVisited = visitedIdSet.has(id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke={stroke}
                    strokeWidth={0.35}
                    style={{
                      default: { fill: getColor(id),       outline: "none" },
                      hover:   { fill: getColor(id, true), outline: "none", cursor: isVisited ? "pointer" : "default" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={evt => handleEnter(evt, id, geo.properties?.name ?? "")}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })
            }
          </Geographies>

          {/* Markers: pulsing dot always + photo bubble above when available */}
          {labelledMarkers.map(m => {
            const r    = REGION_COLORS[m.id];
            const ring = r ? (isDark ? r.dark : r.light) : "#3b82f6";
            return (
              <Marker key={m.id} coordinates={m.coordinates}>

                {/* ── Photo bubble (only when photo exists) ── */}
                {m.photo && (
                  <>
                    {/* Solid stem connecting dot to photo bubble */}
                    <line
                      x1={0} y1={-5}
                      x2={0} y2={PHOTO_CY + PHOTO_R}
                      stroke="white" strokeWidth={2}
                      opacity={0.9}
                      style={{ pointerEvents: "none" }}
                    />
                    {/* Circular photo thumbnail */}
                    <image
                      href={m.photo}
                      x={-PHOTO_R} y={PHOTO_CY - PHOTO_R}
                      width={PHOTO_R * 2} height={PHOTO_R * 2}
                      clipPath={`url(#clip-${m.id})`}
                      preserveAspectRatio="xMidYMid slice"
                      style={{ cursor: "pointer" }}
                      onClick={() => setLightbox({ photo: m.photo!, name: m.name, label: m.label! })}
                      onMouseEnter={evt => handleEnter(evt as unknown as React.MouseEvent, m.id, m.name)}
                      onMouseLeave={() => setTooltip(null)}
                    />
                    {/* White border around photo */}
                    <circle cx={0} cy={PHOTO_CY} r={PHOTO_R} fill="none" stroke="white" strokeWidth={2} style={{ pointerEvents: "none" }} />
                  </>
                )}

                {/* ── Pulsing dot — always visible ── */}
                <circle r={9} fill="none" stroke={ring} strokeWidth={2} className="pulse-ring" />
                <circle
                  r={5}
                  fill="white"
                  stroke={ring}
                  strokeWidth={2}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={evt => handleEnter(evt as unknown as React.MouseEvent, m.id, m.name)}
                  onMouseLeave={() => setTooltip(null)}
                />

              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </>
  );
}
