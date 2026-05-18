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
  [-44, -36, -10], // Top Left
  [44, -36, 10],   // Top Right
  [-46, 34, 12],   // Bottom Left
  [46, 34, -12],   // Bottom Right
  [-25, -45, -6],  // Top center-left
  [25, -45, 6],    // Top center-right
  [-48, 8, -15],   // Mid Left
  [48, 8, 15],     // Mid Right
];

const MOBILE_END_POSITIONS: [number, number, number][] = [
  [-48, -35, -12], // Top Left
  [48, -35, 12],   // Top Right
  [-52, 35, 15],   // Bottom Left
  [52, 35, -15],   // Bottom Right
  [-30, -48, -8],  // Top center-left
  [30, -48, 8],    // Top center-right
  [-52, 5, -18],   // Mid Left
  [52, 5, 18],     // Mid Right
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
  const deckRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Construct exactly 8 images: take what's available from Sanity, then fill the rest from fallbacks
  const images = Array.from({ length: 8 }).map((_, i) => {
    if (data?.heroImages && data.heroImages[i]) {
      return urlForImage(data.heroImages[i]).url();
    }
    return FALLBACK_IMAGES[i];
  });

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    // Respect prefers-reduced-motion — show final state immediately, no scroll-pin
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
      const positions = window.innerWidth < 768 ? MOBILE_END_POSITIONS : END_POSITIONS;
      cards.forEach((card, i) => {
        const [xPct, yPct, rot] = positions[i] ?? [0, 0, 0];
        gsap.set(card, {
          x: (window.innerWidth * xPct) / 100,
          y: (window.innerHeight * yPct) / 100,
          rotation: rot,
          opacity: 0.4,
          scale: 0.85,
        });
      });
      if (textRef.current) gsap.set(textRef.current, { opacity: 1, y: 0 });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      // Mobile: Tighter spread
      const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
      
      // Initial State
      cards.forEach((card, i) => {
        gsap.set(card, { x: 0, y: 0, opacity: 1, rotation: INITIAL_ROTATIONS[i] ?? 0 });
      });
      gsap.set(textRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      cards.forEach((card, i) => {
        const [xPct, yPct, rot] = MOBILE_END_POSITIONS[i] ?? [0, 0, 0];
        tl.to(card, {
          x: (window.innerWidth * xPct) / 100,
          y: (window.innerHeight * yPct) / 100,
          rotation: rot,
          ease: "power2.out",
          duration: 1.5,
        }, 0);
      });

      tl.to(textRef.current, { opacity: 1, y: 0, duration: 1 }, 0.8);
      // After spread, move the whole deck behind text and fade them more
      tl.set(deckRef.current, { zIndex: 5 }, 1.5);
      tl.to(cards, { opacity: 0.4, scale: 0.85, duration: 1 }, 2);
    });

    mm.add("(min-width: 768px)", () => {
      // Tablet/Desktop: Full spread
      const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
      
      // Initial State
      cards.forEach((card, i) => {
        gsap.set(card, { x: 0, y: 0, opacity: 1, rotation: INITIAL_ROTATIONS[i] ?? 0 });
      });
      gsap.set(textRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      cards.forEach((card, i) => {
        const [xPct, yPct, rot] = END_POSITIONS[i] ?? [0, 0, 0];
        tl.to(card, {
          x: (window.innerWidth * xPct) / 100,
          y: (window.innerHeight * yPct) / 100,
          rotation: rot,
          ease: "power2.out",
          duration: 1.5,
        }, 0);
      });

      tl.to(textRef.current, { opacity: 1, y: 0, duration: 1 }, 1);
      tl.to(cards, { opacity: 0.6, scale: 0.9, duration: 1 }, 2.2);
    });

    return () => mm.revert();
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
          <button 
            className={styles.ctaButton}
            onClick={() => {
              document.getElementById("projects-masonry")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            explore our work
          </button>
        </div>

        {/* Card Deck */}
        <div ref={deckRef} className={styles.deckContainer}>
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
