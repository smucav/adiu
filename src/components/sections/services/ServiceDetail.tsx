'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './ServiceDetail.module.css';
import { SanityFocusedService } from '@/sanity/lib/types';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@/components/ui/PortableText';

interface ServiceDetailProps {
  service: SanityFocusedService;
  nextService?: {
    title: string;
    slug: string;
  };
}

export function ServiceDetail({ service, nextService }: ServiceDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const fadeIn: any = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        {/* Back Link */}
        <motion.div variants={fadeIn} initial="initial" animate="animate">
          <Link href="/services" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to Services
          </Link>
        </motion.div>

        {/* Header */}
        <header className={styles.header}>
          <motion.span 
            className={styles.category}
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            {service.category || 'Expert Service'}
          </motion.span>
          <motion.h1 
            className={styles.title}
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            {service.title}
          </motion.h1>
        </header>

        {/* Featured Image */}
        {service.image && (
          <motion.div 
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <Image
              src={urlForImage(service.image).url()}
              alt={service.image.alt || service.title}
              fill
              className={styles.featuredImage}
              priority
              sizes="100vw"
            />
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className={styles.grid}>
          {/* Sidebar - Features */}
          <aside className={styles.sidebar}>
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              <motion.h3 className={styles.sidebarTitle} variants={fadeIn}>
                Key Capabilities
              </motion.h3>
              
              <ul className={styles.featuresList}>
                {service.featureItems?.map((item, index) => (
                  <motion.li 
                    key={item._key || index} 
                    className={styles.featureItem}
                    variants={fadeIn}
                  >
                    <CheckCircle2 className={styles.featureIcon} />
                    <span>{item.text}</span>
                  </motion.li>
                ))}
                
                {(!service.featureItems || service.featureItems.length === 0) && (
                  <motion.li className={styles.featureItem} variants={fadeIn}>
                    <CheckCircle2 className={styles.featureIcon} />
                    <span>Comprehensive solutions tailored to your needs</span>
                  </motion.li>
                )}
              </ul>
            </motion.div>
          </aside>

          {/* Main Content */}
          <article className={styles.contentWrapper}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {service.description && (
                <p className={styles.description}>
                  {service.description}
                </p>
              )}

              <div className={styles.richText}>
                {service.content ? (
                  <PortableText value={service.content} />
                ) : (
                  <p>
                    We are currently updating the detailed information for this service. 
                    Please contact us for more information about how we can help you with {service.title}.
                  </p>
                )}
              </div>
            </motion.div>
          </article>
        </div>

        {/* Footer Navigation */}
        <footer className={styles.footer}>
          <div>
            {/* Could add share links or contact CTA here */}
          </div>
          
          {nextService && (
            <div className={styles.nextService}>
              <div className={styles.nextLabel}>Next Service</div>
              <Link href={`/services/${nextService.slug}`} className={styles.nextTitle}>
                {nextService.title} <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
              </Link>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
