'use client';

import { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import styles from './ServiceStack.module.css';
import { SanityServicesPage, SanityFocusedService } from '@/sanity/lib/types';
import { Target } from 'lucide-react'; // Placeholder icon matching the screenshot

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceStackProps {
  pageData: SanityServicesPage | null;
  services: SanityFocusedService[];
}

export function ServiceStack({ pageData, services }: ServiceStackProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // If no services from Sanity yet, fallback to screenshot data for development
  const servicesToDisplay = (Array.isArray(services) && services.length > 0) ? services : [
    { _id: '1', title: 'Product Development', description: 'Everything from design to emissions calculations' },
    { _id: '2', title: 'Technical Support', description: 'Advice, assistance and personalised support' },
    { _id: '3', title: 'Supply Chain', description: 'Optimised supply chain management' },
    { _id: '4', title: 'Logistics', description: 'Making processes more agile and resilient' },
    { _id: '5', title: 'Traceability and Security', description: 'Protecting each product on several levels' },
    { _id: '6', title: 'Sustainability', description: 'Environmentally-friendly packaging, responsible and transparent processes' },
    { _id: '7', title: 'Full Service', description: 'A single partner, from artwork to batch release' },
  ] as any[];

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !leftPanelRef.current || !rightPanelRef.current || !listContainerRef.current) return;

    // Mobile fallback (no pinning needed)
    if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const windowHeight = window.innerHeight;
      const listContainer = listContainerRef.current!;
      const listHeight = listContainer.scrollHeight;

      // Calculate how much the list exceeds the viewport
      // We want to scroll until the bottom of the list (including its padding) is at the bottom of the screen
      const scrollableHeight = Math.max(0, listHeight - windowHeight);

      // Duration for the horizontal expansion
      // Reduced from 1.5 to 0.5 to make the transition faster and reduce the empty scroll space
      const expandDuration = windowHeight * 0.5;

      // Total scroll distance = expansion distance + vertical scroll distance
      const totalScroll = expandDuration + scrollableHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          pin: true,
          scrub: true,
          anticipatePin: 1
        }
      });

      // PHASE 1: Horizontal Expansion (Duration 1)
      tl.to(leftPanelRef.current, {
        width: '0vw',
        opacity: 0,
        ease: 'none',
        duration: 1
      }, 0);

      tl.to(rightPanelRef.current, {
        width: '100vw',
        ease: 'none',
        duration: 1
      }, 0);

      // Smoothly fade/slide out left content
      const leftContent = leftPanelRef.current!.querySelector(`.${styles.leftContent}`);
      tl.to(leftContent, {
        opacity: 0,
        x: -80,
        duration: 0.6,
        ease: 'power2.inOut'
      }, 0);

      // Stagger items in as we expand
      const items = listContainer.querySelectorAll(`.${styles.listItem}`);
      tl.fromTo(items,
        { x: 30 },
        {
          x: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out'
        },
        0 // Start immediately with expansion
      );

      // PHASE 2: Vertical Scroll (if list is longer than screen)
      if (scrollableHeight > 0) {
        // The duration here is relative to Phase 1. 
        // We want it to take exactly as much "scroll space" as its height.
        const verticalDuration = scrollableHeight / (expandDuration / 1);

        tl.to(listContainer, {
          y: -scrollableHeight,
          ease: 'none',
          duration: verticalDuration
        }, 1); // Starts at time index 1 (end of expansion)
      }
    });

    return () => ctx.revert();
  }, [servicesToDisplay]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>

        {/* Left Side: Fixed text block */}
        <div className={styles.leftPanel} ref={leftPanelRef}>
          <div className={styles.leftContent}>
            <div className={styles.topBadge}>Services</div>
            <h2 className={styles.title}>
              {pageData?.introHeading || "The true value of partnership"}
            </h2>
            <div className={styles.textContent}>
              {pageData?.introText ? (
                pageData.introText.split("\n\n").map((para, idx) => (
                  <div key={idx} className={styles.textBlock}>
                    {para}
                  </div>
                ))
              ) : (
                <>
                  <div className={styles.textBlock}>
                    It is our services that make the most of each product, by optimising each stage of development, while reducing complexity and increasing precision.
                  </div>
                  <div className={styles.textBlock}>
                    An ecosystem designed to take packaging to its full potential.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Expanding list */}
        <div className={styles.rightPanel} ref={rightPanelRef}>
          <div className={styles.listContainer} ref={listContainerRef}>
            {servicesToDisplay.map((service, index) => {
              // Create 001, 002 formatting
              const indexStr = String(index + 1).padStart(3, '0');

              return (
                <Link
                  href={`/services/${service.slug?.current || '#'}`}
                  className={styles.listItem}
                  key={service._id}
                >
                  <div className={styles.itemInner}>
                    <span className={styles.itemIndex}>{indexStr}</span>
                    <Target className={styles.itemIcon} />
                    <span className={styles.itemTitle}>{service.title}</span>
                    <span className={styles.viewMore}>View more</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
