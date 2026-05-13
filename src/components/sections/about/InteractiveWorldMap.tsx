"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AboutHero.module.css";

const geoUrl = "/data/features.json";

interface InteractiveWorldMapProps {
  highlightedCountries?: string[];
  scale?: number;
  center?: [number, number];
}

// No coordinates needed since we highlight the path directly
export function InteractiveWorldMap({
  highlightedCountries = ["Ethiopia"],
  scale = 180,
  center = [40, 10]
}: InteractiveWorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);

  return (
    <div className={styles.mapInteractiveWrapper}>
      <ComposableMap
        projectionConfig={{
          scale: scale,
          center: center // Focused more on the Africa/Middle East/Europe corridor
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredCountry === geo.rsmKey;
              const countryName = geo.properties?.name;
              const isGlow = (highlightedCountries || []).some(c => {
                if (!c) return false;
                const target = c.toLowerCase().trim();
                return (
                  target === countryName?.toLowerCase().trim() ||
                  target === geo.id?.toLowerCase().trim()
                );
              });

              return (
                <motion.g
                  key={geo.rsmKey}
                  initial={false}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  style={{ transformOrigin: "center" }}
                >
                  <Geography
                    geography={geo}
                    onMouseEnter={() => {
                      setHoveredCountry(geo.rsmKey);
                      setTooltipContent(geo.properties.name);
                    }}
                    onMouseLeave={() => {
                      setHoveredCountry(null);
                      setTooltipContent(null);
                    }}
                    className={`${styles.country} ${isGlow ? styles.glow : ""} ${isHovered ? styles.hovered : ""}`}
                  />
                </motion.g>
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Dynamic Tooltip */}
      <AnimatePresence>
        {tooltipContent && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={styles.mapTooltip}
          >
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
