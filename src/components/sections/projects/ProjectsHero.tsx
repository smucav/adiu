"use client";

import Image from "next/image";
import styles from "./ProjectsHero.module.css";
import { SanityProjectsPage } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ProjectsHeroProps {
  data: SanityProjectsPage | null;
}

const INITIAL_ROTATIONS = [-14, 9, -7, 13, -11, 6, -4, 17];

const END_POSITIONS: [number, number, number][] = [
  [-36, -32, -8],
  [36, -32, 7],
  [-38, 30, 10],
  [38, 30, -7],
  [-18, -42, -4],
  [18, -42, 5],
  [-44, 4, -12],
  [44, 4, 11],
];

const FALLBACK_IMAGES = [
  "/images/working_man_on_tower.png",
  "/images/radio_unit.png",
  "/images/tower.png",
  "/images/rectifier_module.png",
  "/images/alarm_sensor.png",
  "/images/first_page_hero_section_image_of_servers.png",
  "/images/network_of_servers_kinda_image.png",
  "/images/acdb_left.png",
];

export function ProjectsHero({ data }: ProjectsHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const images = [
    data?.heroImageCenter ? urlForImage(data.heroImageCenter).url() : FALLBACK_IMAGES[0],
    data?.heroImageLeft ? urlForImage(data.heroImageLeft).url() : FALLBACK_IMAGES[1],
    data?.heroImageRight ? urlForImage(data.heroImageRight).url() : FALLBACK_IMAGES[2],
    ...FALLBACK_IMAGES.slice(3, 8),
  ];

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);

      // ── Initial state ────────────────────────────────────────────────────
      cards.forEach((card, i) => {
        gsap.set(card, { x: 0, y: 0, rotation: INITIAL_ROTATIONS[i] ?? 0 });
      });
      gsap.set(textRef.current, { opacity: 0, y: 30 });

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // ── Scroll-driven timeline ────────────────────────────────────────────
      // We trigger based on the WHOLE wrapper. The hero is STICKY via CSS.
      // The scroll progress of this timeline is mapped to the length of the spacer.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // Smooth inertia
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 — Cards spread (0 → 70% of the timeline)
      cards.forEach((card, i) => {
        const [xPct, yPct, rot] = END_POSITIONS[i] ?? [0, 0, 0];
        tl.to(card, {
          x: (vw * xPct) / 100,
          y: (vh * yPct) / 100,
          rotation: rot,
          ease: "none",
          duration: 3,
        }, 0);
      });

      // Phase 2 — Text reveal (starts halfway)
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        ease: "none",
        duration: 1.2,
      }, 1.5);

      // Phase 3 — Subtle cards fade (optional, keeps them from being too distracting)
      tl.to(cards, {
        opacity: 0.2,
        scale: 0.9,
        duration: 1,
      }, 2.5);



    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      {/* The sticky container that holds the visual state */}
      <div ref={stickyRef} className={styles.heroSection}>
        {/* Central Content */}
        <div
          ref={textRef}
          className={styles.textContainer}
          style={{ opacity: 0 }}
        >
          <h1 className={styles.title}>
            {data?.heroTitle ?? (
              <>innovating <br />infrastructure</>
            )}
          </h1>
          <p className={styles.subtitle}>
            {data?.heroSubtitle ??
              "Building the backbone of modern connectivity through precision engineering and sustainable practices."}
          </p>
          <button className={styles.ctaButton}>explore our work</button>
        </div>

        {/* Card Deck */}
        <div className={styles.deckContainer}>
          {images.slice(0, 8).map((src, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={styles.card}
              style={{ zIndex: 10 + i }}
            >
              <div className={styles.cardInner}>
                <Image
                  src={src}
                  alt={`Project card ${i + 1}`}
                  fill
                  className={styles.cardImage}
                  priority={i < 3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The spacer that provides the scroll distance. */}
      <div className={styles.spacer} />
    </div>
  );
}
