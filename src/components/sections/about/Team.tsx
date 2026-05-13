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

    // Arch shuffle: [M7, M5, M3, M1, M2, M4, M6]
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

    return [...left, sorted[0], ...right];
  }, [members]);

  const middleIndex = Math.floor(archMembers.length / 2);

  return (
    <section className={styles.section}>
      <div className="container">
        <FadeIn direction="up" distance={30}>
          <div className={styles.header}>
            <h2 className={styles.heading}>{data?.teamHeading || "Meet our team"}</h2>
            <p className={styles.description}>
              {data?.teamDescription || "We’ve got an entire team dedicated to supporting you and your business 24/7."}
            </p>
          </div>
        </FadeIn>
      </div>

      <div className={styles.teamWrapper}>
        <div className={styles.teamScroll}>
          {archMembers.map((member: any, index) => {
            const distanceFromCenter = Math.abs(index - middleIndex);
            // Dynamic arch calculation: drop increases as we move from center
            // Flattened arch formula: y = 20 * (distance^1.2)
            const yOffset = index === middleIndex ? -30 : (20 * Math.pow(distanceFromCenter, 1.1) - 30);
            const scale = index === middleIndex ? 1.1 : Math.max(0.85, 1 - (distanceFromCenter * 0.03));
            const opacity = Math.max(0.7, 1 - (distanceFromCenter * 0.1));

            const imageSrc = member.photo ? urlForImage(member.photo).width(300).height(420).url() : null;

            return (
              <div
                key={index}
                className={styles.teamCard}
                style={{
                  transform: `translateY(${yOffset}px) scale(${scale})`,
                  opacity: opacity,
                  zIndex: 10 - distanceFromCenter
                } as React.CSSProperties}
              >
                <div className={styles.imageWrapper}>
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="300px"
                    />
                  ) : (
                    <div className={styles.placeholderImage} style={{
                      background: `linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      fontSize: '3rem',
                      color: 'rgba(0,0,0,0.1)',
                      fontWeight: 700
                    }}>
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className={styles.cardOverlay}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <span className={styles.memberRole}>{member.role}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
