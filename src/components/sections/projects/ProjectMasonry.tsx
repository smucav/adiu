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
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const gallery = galleryRef.current;
      if (!gallery) return;
      
      const totalWidth = gallery.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollAmount = totalWidth - windowWidth + (windowWidth * 0.05);

      // Horizontal Scroll Animation
      gsap.to(gallery, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${scrollAmount}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Subtle parallax for cards inside the gallery —
      // scoped to galleryRef so it doesn't accidentally target other elements
      if (gallery) {
        gsap.fromTo(
          gallery.querySelectorAll("[data-parallax]"),
          { x: 40 },
          {
            x: -40,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  // Ensure we have projects to display, or fallback to dummy data
  const items = (projects && projects.length > 0) ? projects : Array(12).fill(null).map((_, i) => ({
    _id: `dummy-${i}`,
    title: ["Infrastructure Hub", "Energy Storage", "Network Tower", "City Grid", "Water Treatment", "Tech Campus"][i % 6],
    description: "Engineering the future of high-performance infrastructure.",
    category: "Infrastructure",
    mainImage: null
  } as any));

  // Flat rendering for mobile carousel, chunked for desktop
  const renderProjects = () => {
    // If we're on mobile/tablet (using a simple check or CSS-only approach)
    // For CSS-only simplicity, we can render both or just ensure the desktop chunks look good on mobile.
    // However, to satisfy "beautiful carousel", a flat list is better on mobile.
    
    // We'll use a CSS-driven approach where we might hide/show, 
    // but better yet, let's just make the desktop chunks work as individual slides.
    
    const elements: React.ReactNode[] = [];
    let i = 0;
    while (i < items.length) {
      // 1. Single
      if (items[i]) {
        elements.push(
          <div key={`set-${i}-1`} className={`${styles.colSingle}`} data-parallax>
            <ProjectCard project={items[i]} index={i} size="portrait" />
          </div>
        );
        i++;
      }

      // 2. Group
      if (i < items.length) {
        const p1 = items[i];
        const p2 = items[i + 1];
        const p3 = items[i + 2];
        
        elements.push(
          <div key={`set-${i}-2`} className={`${styles.colGroup}`} data-parallax>
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

      // 3. Another Single
      if (i < items.length) {
        elements.push(
          <div key={`set-${i}-3`} className={`${styles.colSingle}`} data-parallax>
            <ProjectCard project={items[i]} index={i} size="tallPortrait" />
          </div>
        );
        i++;
      }
    }
    return elements;
  };

  return (
    <section id="projects-masonry" ref={sectionRef} className={styles.masonrySection}>
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

  const imageUrl = urlForImage(project.mainImage).width(800).quality(85).url() || fallbacks[index % fallbacks.length];

  return (
    <div className={`${styles.projectCard} ${styles[size]}`}>

      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={project.title || "Project"}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 40vw"
          loading="lazy"
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
