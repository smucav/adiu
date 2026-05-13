"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectMasonry.module.css";
import { SanityProject } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectMasonryProps {
  projects: SanityProject[];
}

export function ProjectMasonry({ projects }: ProjectMasonryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!triggerRef.current || !galleryRef.current || !sectionRef.current) return;

    const gallery = galleryRef.current;
    const totalWidth = gallery.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollAmount = totalWidth - windowWidth + (windowWidth * 0.1); // Add a small buffer

    const ctx = gsap.context(() => {
      // Horizontal Scroll Animation
      gsap.to(gallery, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${totalWidth}`, // Scroll duration based on content width
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Subtle parallax for cards inside the gallery
      gsap.fromTo(".project-parallax", 
        { x: 50 },
        { 
          x: -50, 
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Ensure we have projects to display, or fallback to dummy data
  const items = (projects && projects.length > 0) ? projects : Array(12).fill(null).map((_, i) => ({
    _id: `dummy-${i}`,
    title: ["Infrastructure Hub", "Energy Storage", "Network Tower", "City Grid", "Water Treatment", "Tech Campus"][i % 6],
    description: "Engineering the future of high-performance infrastructure.",
    category: "Infrastructure",
    mainImage: null
  } as any));

  // Chunk items into a repeating layout pattern
  const renderProjects = () => {
    const elements: React.ReactNode[] = [];
    let i = 0;
    while (i < items.length) {
      // 1. Single (portrait)
      if (items[i]) {
        elements.push(
          <div key={`set-${i}-1`} className={`${styles.colSingle} project-parallax`}>
            <ProjectCard project={items[i]} index={i} size="portrait" />
          </div>
        );
        i++;
      }

      // 2. Group (Large top + 2 small bottom)
      if (i < items.length) {
        const p1 = items[i];
        const p2 = items[i + 1];
        const p3 = items[i + 2];
        elements.push(
          <div key={`set-${i}-2`} className={`${styles.colGroup} project-parallax`}>
            <div className={styles.topRow}>
              <ProjectCard project={p1} index={i} size="large" />
            </div>
            {(p2 || p3) && (
              <div className={styles.bottomRow}>
                {p2 && <ProjectCard project={p2} index={i + 1} size="square" />}
                {p3 && <ProjectCard project={p3} index={i + 2} size="square" />}
              </div>
            )}
          </div>
        );
        i += 3;
      }

      // ... adding more variety ...
      if (i < items.length) {
        elements.push(
          <div key={`set-${i}-3`} className={`${styles.colSingle} project-parallax`}>
            <ProjectCard project={items[i]} index={i} size="tallPortrait" />
          </div>
        );
        i++;
      }
    }
    return elements;
  };

  return (
    <section ref={sectionRef} className={styles.masonrySection}>
      <div ref={triggerRef} className={styles.masonryContainer}>
        <div className={styles.horizontalWrapper}>
          <div ref={galleryRef} className={styles.gallery}>
            {renderProjects()}
          </div>
        </div>
      </div>
    </section>
  );
}




function ProjectCard({ project, index, size = "medium" }: { project: any, index: number, size?: string }) {
  const fallbacks = [
    "/images/tower.png",
    "/images/working_man_on_tower.png",
    "/images/radio_unit.png",
    "/images/rectifier_module.png",
    "/images/network_of_servers_kinda_image.png",
    "/images/first_page_hero_section_image_of_servers.png",
    "/images/acdb_left.png",
    "/images/alarm_sensor.png"
  ];

  const imageUrl = project.mainImage?.asset?._ref
    ? urlForImage(project.mainImage).width(800).quality(85).url()
    : fallbacks[index % fallbacks.length];

  return (
    <div className={`${styles.projectCard} ${styles[size]}`}>

      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={project.title || "Project"}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div className={styles.overlay}>
          <div className={styles.content}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description || "Innovative infrastructure solutions."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
