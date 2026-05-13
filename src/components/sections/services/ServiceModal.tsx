'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SanityFocusedService } from '@/sanity/lib/types';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@/components/ui/PortableText';
import styles from './ServiceModal.module.css';

interface ServiceModalProps {
  service: SanityFocusedService | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContainer}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {service.image?.asset && (
              <div className={styles.modalBgImage}>
                <Image
                  src={urlForImage(service.image).width(1000).quality(80).url()}
                  alt=""
                  fill
                  className={styles.bgImage}
                  priority
                  sizes="(max-width: 1000px) 100vw, 1000px"
                />
                <div className={styles.imageOverlay} />
              </div>
            )}

            <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
              &times;
            </button>

            <div className={styles.modalGlassContent}>
              <div className={styles.scrollArea}>
                <div className={styles.header}>
                  <span className={styles.category}>{service.category || 'Service'}</span>
                  <h2 className={styles.title}>{service.title}</h2>
                </div>

                <div className={styles.content}>
                  {service.content ? (
                    <PortableText value={service.content} />
                  ) : (
                    <p>{service.description}</p>
                  )}
                </div>
              </div>

              <div className={styles.footer}>
                <Link 
                  href={`/services/${service.slug?.current || '#'}`} 
                  className={styles.ctaButton}
                  onClick={onClose}
                >
                  Go to Service Page
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
