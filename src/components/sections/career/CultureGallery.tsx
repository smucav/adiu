"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CultureGallery.module.css";
import { SanityCultureImage, SanityCareerPage } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface CultureGalleryProps {
  images?: SanityCultureImage[];
  data?: SanityCareerPage | null;
}

const CATEGORIES = [
  { id: "all", label: "All Moments" },
  { id: "team-events", label: "Team Events" },
  { id: "office-life", label: "Office Life" },
  { id: "onsite-milestones", label: "Onsite Milestones" },
  { id: "workshops", label: "Workshops" },
];

const FALLBACK_IMAGES = [
  {
    _id: "fb-1",
    title: "Annual team retreat and collaboration session.",
    category: "team-events" as const,
    image: { _type: "image", asset: { _ref: "fallback-1", _type: "reference" } },
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    order: 1
  },
  {
    _id: "fb-2",
    title: "Brainstorming the next iteration of our operation software.",
    category: "workshops" as const,
    image: { _type: "image", asset: { _ref: "fallback-2", _type: "reference" } },
    url: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=1200&q=80",
    order: 2
  },
  {
    _id: "fb-3",
    title: "Morning standup in our light-filled central workspace.",
    category: "office-life" as const,
    image: { _type: "image", asset: { _ref: "fallback-3", _type: "reference" } },
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    order: 3
  },
  {
    _id: "fb-4",
    title: "Commissioning smart controls on-site with regional partners.",
    category: "onsite-milestones" as const,
    image: { _type: "image", asset: { _ref: "fallback-4", _type: "reference" } },
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    order: 4
  },
  {
    _id: "fb-5",
    title: "Dynamic cross-team development workshop.",
    category: "workshops" as const,
    image: { _type: "image", asset: { _ref: "fallback-5", _type: "reference" } },
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    order: 5
  },
  {
    _id: "fb-6",
    title: "Celebrating a successful operational release milestone.",
    category: "team-events" as const,
    image: { _type: "image", asset: { _ref: "fallback-6", _type: "reference" } },
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    order: 6
  }
];

export function CultureGallery({ images, data }: CultureGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine live and fallback items
  const items = React.useMemo(() => {
    if (images && images.length > 0) {
      return images.map(img => ({
        ...img,
        url: img.image ? urlForImage(img.image).width(1200).url() : ""
      }));
    }
    return FALLBACK_IMAGES;
  }, [images]);

  // Filter items
  const filteredItems = React.useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter(item => item.category === activeFilter);
  }, [items, activeFilter]);

  // Handle keyboard events for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const handlePrev = () => {
    setLightboxIndex(prev => 
      prev === null ? null : prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setLightboxIndex(prev => 
      prev === null ? null : prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  const activeImage = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section className={styles.section}>
      <div className="container">
        
        {/* Intro */}
        <div className={styles.header}>
          <span className={styles.tag}>{data?.galleryTag || "Life at Adiu"}</span>
          <h2 className={styles.title}>{data?.galleryTitle || "our team in action"}</h2>
          <p className={styles.subtitle}>
            {data?.gallerySubtitle || "A snapshot of our journey. From collaborative engineering workshops to team milestones and offsite adventures, here is how we build together."}
          </p>
        </div>

        {/* Filter Menu */}
        <div className={styles.filterMenu}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveFilter(cat.id);
                setLightboxIndex(null);
              }}
              className={`${styles.filterBtn} ${activeFilter === cat.id ? styles.active : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={styles.card}
                onClick={() => setLightboxIndex(idx)}
              >
                <div className={styles.imageContainer}>
                  {item.url ? (
                    <Image
                      src={item.url}
                      alt={item.title || "Team photo"}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className={styles.placeholder}>Adiu Culture</div>
                  )}
                  
                  {/* Overlay */}
                  <div className={styles.overlay}>
                    <span className={styles.categoryTag}>
                      {CATEGORIES.find(c => c.id === item.category)?.label || item.category}
                    </span>
                    <p className={styles.imageTitle}>{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightbox}
            onClick={() => setLightboxIndex(null)}
          >
            <button 
              className={styles.closeBtn}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
            >
              <X size={24} />
            </button>

            <button 
              className={styles.navBtnLeft}
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft size={28} />
            </button>

            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.lightboxImageWrapper}>
                {activeImage.url && (
                  <Image
                    src={activeImage.url}
                    alt={activeImage.title || "Expanded Team Moment"}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="100vw"
                    priority
                  />
                )}
              </div>
              <div className={styles.lightboxMeta}>
                <span className={styles.lightboxCategory}>
                  {CATEGORIES.find(c => c.id === activeImage.category)?.label}
                </span>
                <p className={styles.lightboxCaption}>{activeImage.title}</p>
              </div>
            </div>

            <button 
              className={styles.navBtnRight}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
