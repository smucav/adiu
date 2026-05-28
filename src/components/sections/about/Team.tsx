"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import styles from "./Team.module.css";
import { FadeIn } from "../../animations/ScrollAnimations";
import { SanityAboutPage, SanityTeamMember } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface TeamProps {
  data: SanityAboutPage | null;
  members: SanityTeamMember[];
}

export function Team({ data, members }: TeamProps) {
  // 1. Sort members by rank and re-arrange into an arch-ready array
  const archMembers = useMemo(() => {
    const rawMembers = (Array.isArray(members) && members.length > 0) ? members : [
      { name: "Jhon Don", role: "CEO & FOUNDER", rank: 1 },
      { name: "Viola Bassett", role: "Product Design", rank: 2 },
      { name: "Sophie Chamberlain", role: "Lead Engineer", rank: 3 },
      { name: "Richard Mills", role: "Payments Support", rank: 4 },
      { name: "Marcus Thorne", role: "Ops Director", rank: 5 },
      { name: "Erik Anders", role: "VP Success", rank: 6 },
      { name: "Natalie Carter", role: "Customer Associate", rank: 7 },
    ];

    // Sort by rank (1 first)
    const sorted = [...rawMembers].sort((a, b) => (a.rank || 99) - (b.rank || 99));

    // Arch shuffle: [..., R4, R2, R1, R3, R5, ...]
    const left: any[] = [];
    const right: any[] = [];

    sorted.forEach((m, i) => {
      if (i === 0) return; // Skip Rank 1 (CEO)
      if (i % 2 === 1) {
        // R2, R4, R6... move to LEFT
        left.unshift(m);
      } else {
        // R3, R5, R7... move to RIGHT
        right.push(m);
      }
    });

    const base = [...left, sorted[0], ...right];
    // Duplication for infinite loop (5x ensures enough scrollable area)
    return [...base, ...base, ...base, ...base, ...base];
  }, [members]);

  const middleIndex = Math.floor(archMembers.length / 2);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  // Ref attached to the actual Rank-1 card in the middle set
  const middleCardRef = React.useRef<HTMLDivElement>(null);
  // rAF-throttled scroll handler — prevents forced layout on every scroll event
  const rafId = React.useRef<number | null>(null);
  // Suppress handleScroll while we're setting scrollLeft programmatically
  const isProgrammatic = React.useRef(false);

  const handleScroll = React.useCallback(() => {
    // Ignore scroll events we triggered ourselves (centering / re-centering)
    if (isProgrammatic.current) return;
    if (rafId.current !== null) return; // already queued
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const setWidth = scrollWidth / 5;
      if (scrollLeft < setWidth) {
        isProgrammatic.current = true;
        scrollRef.current.scrollLeft = scrollLeft + setWidth * 2;
        requestAnimationFrame(() => { isProgrammatic.current = false; });
      } else if (scrollLeft + clientWidth > scrollWidth - setWidth) {
        isProgrammatic.current = true;
        scrollRef.current.scrollLeft = scrollLeft - setWidth * 2;
        requestAnimationFrame(() => { isProgrammatic.current = false; });
      }
    });
  }, []);

  // Center the actual Rank-1 card element in the viewport on mount and resize
  React.useEffect(() => {
    const centerTeam = () => {
      if (scrollRef.current && middleCardRef.current) {
        const container = scrollRef.current;
        const card = middleCardRef.current;
        // getBoundingClientRect gives positions in viewport space,
        // independent of offsetParent — accurate regardless of CSS positioning
        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        // Convert card center to scroll-container coordinate space
        const cardCenterInScroll =
          (cardRect.left - containerRect.left) + container.scrollLeft + cardRect.width / 2;
        // Mark as programmatic so handleScroll ignores this assignment
        isProgrammatic.current = true;
        container.scrollLeft = cardCenterInScroll - container.clientWidth / 2;
        requestAnimationFrame(() => { isProgrammatic.current = false; });
      }
    };

    // Run centering immediately
    centerTeam();

    // Reflow-safe retry
    let frameId: number;
    const triggerCentering = () => {
      centerTeam();
      frameId = requestAnimationFrame(centerTeam);
    };
    const timeoutId = setTimeout(triggerCentering, 100);

    // Debounce resize so zoom doesn't fire centerTeam dozens of times mid-gesture
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        frameId = requestAnimationFrame(centerTeam);
      }, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
    };
  }, [archMembers]);

  return (
    <section className={styles.section}>
      <div className="container">
        <FadeIn direction="up" distance={30}>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <div className={styles.titleGroup}>
                <h2 className={styles.heading}>{data?.teamHeading || "Meet our team"}</h2>
                <p className={styles.description}>
                  {data?.teamDescription || "We’ve got an entire team dedicated to supporting you and your business 24/7."}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className={styles.teamWrapper}>
        <div className={styles.gradientLeft}></div>
        <div className={styles.gradientRight}></div>
        
        <div 
          className={styles.teamScroll} 
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {archMembers.length > 0 && archMembers.map((member: any, index) => {
            // Index in the original single set (for consistent arch)
            const baseCount = Math.max(1, archMembers.length / 5);
            const indexInBase = index % baseCount;
            const middleInBase = Math.floor(baseCount / 2);
            const distanceFromMiddle = Math.abs(indexInBase - middleInBase);
            
            // Normalize distance so arch stays gentle regardless of member count
            const maxDistance = Math.floor(baseCount / 2) || 1;
            const normalizedDist = distanceFromMiddle / maxDistance; // 0 → 1
            // Arch: center sits 20px ABOVE baseline; edge sits max 40px BELOW
            const yOffset = indexInBase === middleInBase
              ? -20
              : Math.round(normalizedDist * 60 - 20); // ranges -20 → +40 px
            const scale   = indexInBase === middleInBase ? 1.1  : Math.max(0.82, 1.05 - normalizedDist * 0.25);
            const opacity = indexInBase === middleInBase ? 1    : Math.max(0.55, 1    - normalizedDist * 0.45);

            const imageSrc = member.photo ? urlForImage(member.photo).width(400).height(550).url() : null;

            return (
              <div
                key={`${member._id || member.name}-${index}`}
                className={styles.archOffset}
                ref={index === middleIndex ? middleCardRef : undefined}
                style={{
                  transform: `translateY(${yOffset}px)`,
                  zIndex: 100 - distanceFromMiddle
                } as React.CSSProperties}
              >
                <div 
                  className={styles.teamCard} 
                  style={{ 
                    transform: `scale(${scale})`,
                    opacity: opacity 
                  } as React.CSSProperties}
                >
                  <div className={styles.imageWrapper}>
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 160px, 240px"
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className={styles.cardOverlay}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <span className={styles.memberRole}>{member.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
