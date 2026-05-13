'use client';

import { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortableText } from '@portabletext/react';
import styles from './ServiceStack.module.css';
import { SanityServicesPage, SanityFocusedService } from '@/sanity/lib/types';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceStackProps {
  pageData: SanityServicesPage | null;
  services: SanityFocusedService[];
}

export function ServiceStack({ pageData, services }: ServiceStackProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const servicesToDisplay = (Array.isArray(services) && services.length > 0) ? services : [
    {
      _id: 'default-1',
      title: "Network Infrastructure",
      category: "Infrastructure",
      description: "Advanced wireless network solutions for enterprise environments. We design, deploy and manage complex networks.",
      image: null,
      content: undefined
    },
    {
      _id: 'default-2',
      title: "Cloud Solutions",
      category: "Cloud",
      description: "Secure and scalable cloud infrastructure for modern businesses. Migration and optimization services included.",
      image: null,
      content: undefined
    },
    {
      _id: 'default-3',
      title: "Data Center Design",
      category: "Datacenter",
      description: "End-to-end data center design and implementation services with a focus on efficiency and reliability.",
      image: null,
      content: undefined
    },
    {
      _id: 'default-4',
      title: "Cyber Security",
      category: "Security",
      description: "Comprehensive security audits and threat protection for your digital assets and infrastructure.",
      image: null,
      content: undefined
    }
  ];

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const totalCards = cards.length;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(cards.slice(1), {
        yPercent: 100,
        opacity: 0
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalCards * 150}%`, // More scroll room for a premium feel
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // Build the stacking timeline
      cards.forEach((card, index) => {
        if (index === totalCards - 1) return;

        const nextCard = cards[index + 1];

        // 1. Current card moves up and stays as a sliver at the top
        tl.to(card, {
          yPercent: -15, // Move up slightly
          scale: 0.92,
          opacity: 0.4,
          filter: 'blur(4px)',
          ease: 'power2.inOut',
          duration: 1
        }, index)

          // 2. Next card slides up and covers it
          .to(nextCard, {
            yPercent: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1.2
          }, index + 0.1);

        gsap.set(nextCard, { zIndex: index + 2 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [servicesToDisplay.length]);

  const getGradient = (index: number) => {
    const gradients = [
      styles.blueGradient,
      styles.redGradient,
      styles.orangeGradient,
      styles.greenGradient,
      styles.purpleGradient,
      styles.darkGradient
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section ref={sectionRef} className={styles.stackContainer}>
      <div ref={containerRef} className={styles.stackWrapper}>
        {servicesToDisplay.map((service, index) => {
          const displayIndex = (index + 1).toString().padStart(2, '0');

          return (
            <div
              key={service._id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`${styles.serviceCard} ${getGradient(index)}`}
              style={{ zIndex: index + 1 }}
            >
              <div className={styles.cardLabel}>({service.category?.substring(0, 2).toUpperCase() || 'SR'})</div>
              <div className={styles.cardNumber}>{displayIndex}</div>

              <div className={styles.mainContent}>
                <h3 className={styles.title}>{service.title}</h3>

                <div className={styles.descriptionBox}>
                  <div className={styles.description}>
                    {service.content ? (
                      <PortableText value={service.content} />
                    ) : (
                      <p>{service.description}</p>
                    )}
                  </div>

                  {!service.content && (
                    <ul className={styles.featuresList}>
                      <li className={styles.featureItem}>Optimized performance</li>
                      <li className={styles.featureItem}>Enterprise grade security</li>
                      <li className={styles.featureItem}>24/7 Support available</li>
                    </ul>
                  )}
                </div>
              </div>

              <button className={styles.getStartedBtn}>Get started</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
