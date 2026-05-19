"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./LookingFor.module.css";
import { SanityCareerPage } from "@/sanity/lib/types";

interface LookingForProps {
  data: SanityCareerPage | null;
}

interface ConnectionLine {
  path: string;
  dotX: number;
  dotY: number;
  isLeft: boolean;
  index: number;
}

export function LookingFor({ data }: LookingForProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lines, setLines] = useState<ConnectionLine[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  const items = data?.lookingForItems && data.lookingForItems.length > 0
    ? data.lookingForItems
    : [
      "Curious and eager to learn",
      "Comfortable solving complex problems",
      "Collaborative and communicative",
      "Driven by impact and execution",
      "Excited to help build and scale something meaningful"
    ];

  // Distribute items: left column gets up to half, right column gets the rest
  const half = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, half);
  const rightItems = items.slice(half);

  // Resize and layout change connection calculations
  const updateConnections = () => {
    if (!containerRef.current || !centerRef.current) return;
    
    // Check if we are on desktop
    const desktop = window.innerWidth >= 1024;
    setIsDesktop(desktop);
    
    if (!desktop) {
      setLines([]);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();

    const centerX = centerRect.left - containerRect.left + centerRect.width / 2;
    const centerY = centerRect.top - containerRect.top + centerRect.height / 2;

    const newLines: ConnectionLine[] = [];

    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      
      const cardRect = cardEl.getBoundingClientRect();
      const cardY = cardRect.top - containerRect.top + cardRect.height / 2;
      let cardX = 0;
      let isLeft = false;

      // Determine if the card is to the left or right of the center
      const cardCenterX = cardRect.left - containerRect.left + cardRect.width / 2;
      
      if (cardCenterX < centerX) {
        // Connect to right edge of card
        cardX = cardRect.right - containerRect.left;
        isLeft = true;
      } else {
        // Connect to left edge of card
        cardX = cardRect.left - containerRect.left;
        isLeft = false;
      }

      // Target connection points on the center node
      const targetX = isLeft 
        ? centerRect.left - containerRect.left 
        : centerRect.right - containerRect.left;
      const targetY = centerY;

      // Smooth horizontal S-curve cubic Bezier path
      const midX = (cardX + targetX) / 2;
      const path = `M ${cardX} ${cardY} C ${midX} ${cardY}, ${midX} ${targetY}, ${targetX} ${targetY}`;

      // Algebraic midpoint on the cubic Bezier (t = 0.5)
      // B(0.5) = 0.125 * P0 + 0.375 * P1 + 0.375 * P2 + 0.125 * P3
      const t = 0.5;
      const mt = 1 - t;
      const dotX = Math.pow(mt, 3) * cardX + 3 * Math.pow(mt, 2) * t * midX + 3 * mt * Math.pow(t, 2) * midX + Math.pow(t, 3) * targetX;
      const dotY = Math.pow(mt, 3) * cardY + 3 * Math.pow(mt, 2) * t * cardY + 3 * mt * Math.pow(t, 2) * targetY + Math.pow(t, 3) * targetY;

      newLines.push({
        path,
        dotX,
        dotY,
        isLeft,
        index: idx
      });
    });

    setLines(newLines);
  };
  useEffect(() => {
    // Initial call after a brief delay to allow the layout to settle and refs to register
    const timer = setTimeout(updateConnections, 100);

    // Use ResizeObserver for precise recalculation on layout/font-size changes
    if (typeof window !== "undefined" && "ResizeObserver" in window && containerRef.current) {
      const observer = new ResizeObserver(() => {
        requestAnimationFrame(updateConnections);
      });
      
      observer.observe(containerRef.current);
      if (centerRef.current) observer.observe(centerRef.current);
      cardRefs.current.forEach(card => {
        if (card) observer.observe(card);
      });

      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    }

    window.addEventListener("resize", updateConnections);
    return () => {
      window.removeEventListener("resize", updateConnections);
      clearTimeout(timer);
    };
  }, [items.length]);
  // Premium Custom Card Icons
  const getCardIcon = (index: number) => {
    const strokeWidth = 1.8;
    switch (index) {
      case 0: // Curious / Eager
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
        );
      case 1: // Problem Solving
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22a7 7 0 0 0 7-7c0-2.41-1.3-4.5-3.2-5.63l-.8-.47v-.9a4 4 0 0 0-4-4V2" />
            <path d="M12 22a7 7 0 0 1-7-7c0-2.41 1.3-4.5 3.2-5.63l.8-.47v-.9a4 4 0 0 1 4-4V2" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case 2: // Collaborative
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 3: // Impact
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case 4: // Growth / Build / Scale
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        );
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        );
    }
  };

  // Premium Intermediate Badge Icons
  const getIntermediateIcon = (index: number) => {
    switch (index) {
      case 0: // Mind / Sparks (Top Left)
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#82c341" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case 1: // Gear / Mechanism (Bottom Left)
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case 2: // Cloud / Connected (Top Right)
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        );
      case 3: // Flame / Target (Middle Right)
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
        );
      case 4: // Arrow Up (Bottom Right)
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 8 22 12 18 16" />
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
        );
      default:
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
          </svg>
        );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className={styles.section}>
      {/* Decorative Orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className={styles.label}>
            Talent Profile
          </span>
          <h2 className={styles.title}>
            {data?.lookingForTitle || "who we are looking for"}
          </h2>
          <p className={styles.subtitle}>
            If you’re passionate about innovation and want to work with a team that values initiative, creativity, and ambition, Adiu could be the right place for you.
          </p>
        </motion.div>

        {/* Dynamic Mindmap/Network Layout */}
        <motion.div
          ref={containerRef}
          className={`${styles.networkContainer} ${isDesktop ? styles.desktopView : styles.mobileView}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* SVG Connection Lines overlay (Only rendered on desktop) */}
          {isDesktop && lines.length > 0 && (
            <svg className={styles.svgOverlay} aria-hidden="true">
              <defs>
                <linearGradient id="lineGradLeft" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="lineGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {lines.map((line, idx) => (
                <g key={idx}>
                  {/* Outer Thick Blur Glow Path */}
                  <motion.path
                    d={line.path}
                    fill="none"
                    stroke={line.isLeft ? "url(#lineGradLeft)" : "url(#lineGradRight)"}
                    strokeWidth="6"
                    opacity="0.12"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                  {/* Sharp Connection Path */}
                  <motion.path
                    d={line.path}
                    fill="none"
                    stroke={line.isLeft ? "url(#lineGradLeft)" : "url(#lineGradRight)"}
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: idx * 0.1 }}
                  />
                </g>
              ))}
            </svg>
          )}

          {/* Left Column of Cards */}
          <div className={styles.leftColumn}>
            {leftItems.map((item, idx) => {
              const globalIdx = idx;
              return (
                <div
                  key={globalIdx}
                  ref={el => { cardRefs.current[globalIdx] = el; }}
                  className={styles.cardWrapper}
                >
                  <motion.div
                    className={styles.card}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrapper} style={{ color: "var(--brand-green)" }}>
                        {getCardIcon(globalIdx)}
                      </div>
                      <span className={styles.cardIndex}>0{globalIdx + 1}</span>
                    </div>
                    <p className={styles.cardText}>{item}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Center Column: ADIU branding circle */}
          <div className={styles.centerColumn}>
            <div ref={centerRef} className={styles.centerNodeWrapper}>
              <motion.div
                className={styles.centerNode}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(130, 195, 65, 0.15), inset 0 0 15px rgba(130, 195, 65, 0.1)",
                    "0 0 35px rgba(130, 195, 65, 0.35), inset 0 0 25px rgba(130, 195, 65, 0.2)",
                    "0 0 20px rgba(130, 195, 65, 0.15), inset 0 0 15px rgba(130, 195, 65, 0.1)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className={styles.centerText}>ADIU</span>
                <div className={styles.pulseRing} />
              </motion.div>
            </div>
          </div>

          {/* Right Column of Cards */}
          <div className={styles.rightColumn}>
            {rightItems.map((item, idx) => {
              const globalIdx = leftItems.length + idx;
              return (
                <div
                  key={globalIdx}
                  ref={el => { cardRefs.current[globalIdx] = el; }}
                  className={styles.cardWrapper}
                >
                  <motion.div
                    className={styles.card}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrapper} style={{ color: "var(--brand-green)" }}>
                        {getCardIcon(globalIdx)}
                      </div>
                      <span className={styles.cardIndex}>0{globalIdx + 1}</span>
                    </div>
                    <p className={styles.cardText}>{item}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Floating intermediate badges along paths (Only desktop) */}
          {isDesktop && lines.map((line, idx) => (
            <motion.div
              key={`badge-${idx}`}
              className={styles.intermediateBadge}
              style={{
                position: 'absolute',
                left: line.dotX,
                top: line.dotY,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 + idx * 0.1 }}
              whileHover={{ scale: 1.25 }}
            >
              {getIntermediateIcon(idx)}
              <span className={styles.badgePulse} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
