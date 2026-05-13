'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from './ServiceCarousel.module.css';
import { SanityServicesPage, SanityFocusedService } from '@/sanity/lib/types';
import { urlForImage, getLqipUrl } from '@/sanity/lib/image';

// Lazy-load the modal — only needed on user click
const ServiceModal = dynamic(
  () => import('./ServiceModal').then((mod) => mod.ServiceModal),
  { ssr: false }
);

interface ServiceCarouselProps {
  pageData: SanityServicesPage | null;
  services: SanityFocusedService[];
}

export function ServiceCarousel({ pageData, services }: ServiceCarouselProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<SanityFocusedService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fallback services if none are selected in Sanity
  const servicesToDisplay = (Array.isArray(services) && services.length > 0) ? services : [
    {
      _id: 'default-1',
      title: "Network Infrastructure",
      category: "Wireless",
      description: "Advanced wireless network solutions for enterprise environments.",
      image: null
    },
    {
      _id: 'default-2',
      title: "Cloud Solutions",
      category: "Cloud",
      description: "Secure and scalable cloud infrastructure for modern businesses.",
      image: null
    },
    {
      _id: 'default-3',
      title: "Data Center Design",
      category: "Datacenter",
      description: "End-to-end data center design and implementation services.",
      image: null
    }
  ];

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Convert vertical scroll into horizontal translation
  const horizontalMove = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${Math.max(0, (servicesToDisplay.length * 450) - 800)}px`]
  );

  return (
    <section ref={targetRef} className={styles.horizontalSection}>
      <div className={styles.stickyWrapper}>
        <div className={styles.contentHeader}>
          <motion.span
            className={styles.label}
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0.5]) }}
          >
            What we offer
          </motion.span>
          <h2 className={styles.mainTitle}>
            {pageData?.introHeading || "Our Specialized Services"}
          </h2>
        </div>

        <motion.div style={{ x: horizontalMove }} className={styles.horizontalTrack}>
          {servicesToDisplay.map((service: any) => {
            const imgUrl = service.image?.asset
              ? urlForImage(service.image).width(420).quality(75).url()
              : undefined;
            const blurUrl = service.image ? getLqipUrl(service.image) : undefined;

            return (
              <div key={service._id} className={styles.cardContainer}>
                <div className={styles.serviceCard}>
                  <div className={styles.mainImageWrapper}>
                    {imgUrl && (
                      <Image
                        src={imgUrl}
                        alt={service.image?.alt || service.title}
                        fill
                        className={styles.mainImage}
                        sizes="420px"
                        {...(blurUrl ? { placeholder: "blur" as const, blurDataURL: blurUrl } : {})}
                      />
                    )}
                  </div>

                  <div className={styles.glassContent}>
                    <div className={styles.glassBg} />
                    <div className={styles.glassInfo}>
                      <span className={styles.cardCategory}>{service.category || 'Service'}</span>
                      <h3 className={styles.cardTitle}>{service.title}</h3>
                      <p className={styles.cardDescription}>{service.description}</p>

                      <button 
                        className={styles.cardLink}
                        onClick={() => {
                          setSelectedService(service);
                          setIsModalOpen(true);
                        }}
                      >
                        View Details <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Scroll Progress Bar at bottom */}
        <div className={styles.progressBarContainer}>
          <motion.div
            className={styles.progressBar}
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>

      {isModalOpen && (
        <ServiceModal 
          service={selectedService} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  );
}
