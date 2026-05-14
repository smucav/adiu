"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import styles from "./AboutHero.module.css";

const geoUrl = "/data/features.json";

interface InteractiveWorldMapProps {
  highlightedCountries?: string[];
  scale?: number;
  center?: [number, number];
}

// CSS-only hover scale — replaces the previous Framer Motion spring that ran
// simultaneously on all ~200 country paths, causing severe jank on mobile.
export const InteractiveWorldMap = React.memo(
  ({
    highlightedCountries = ["Ethiopia"],
    scale = 180,
    center = [40, 10],
  }: InteractiveWorldMapProps) => {
    const [tooltipContent, setTooltipContent] = useState<string | null>(null);

    return (
      <div className={styles.mapInteractiveWrapper}>
        <ComposableMap
          projectionConfig={{ scale, center }}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties?.name;
                const isGlow = (highlightedCountries || []).some((c) => {
                  if (!c) return false;
                  const target = c.toLowerCase().trim();
                  return (
                    target === countryName?.toLowerCase().trim() ||
                    target === geo.id?.toLowerCase().trim()
                  );
                });

                return (
                  // Plain SVG <g> — zero JS animation overhead on hover
                  <g key={geo.rsmKey} className={styles.countryGroup}>
                    <Geography
                      geography={geo}
                      onMouseEnter={() =>
                        setTooltipContent(geo.properties.name)
                      }
                      onMouseLeave={() => setTooltipContent(null)}
                      className={`${styles.country} ${isGlow ? styles.glow : ""}`}
                    />
                  </g>
                );
              })
            }
          </Geographies>

          {/* Ethiopia Marker — locked to geographic coordinates */}
          <Marker coordinates={[39.7, 9.1]}>
            <g className={styles.ethiopiaMarker}>
              <circle className={styles.dotCircle} r={5} />
            </g>
          </Marker>
        </ComposableMap>

        {/* Tooltip — CSS opacity/transform transition, no JS animation library */}
        <div
          className={styles.mapTooltip}
          style={{
            opacity: tooltipContent ? 1 : 0,
            transform: tooltipContent ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            pointerEvents: "none",
          }}
        >
          {tooltipContent}
        </div>
      </div>
    );
  },
);

InteractiveWorldMap.displayName = "InteractiveWorldMap";
