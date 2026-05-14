"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./BlogHero.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { SanityBlogPage, SanityArticle } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

// Lazy-load the techy grid background
const FisheyeGrid = dynamic(
  () => import("../../ui/FisheyeGrid").then((mod) => mod.FisheyeGrid),
  { ssr: false },
);

interface BlogHeroProps {
  data: SanityBlogPage | null;
  featured: SanityArticle[];
}

export function BlogHero({ data, featured }: BlogHeroProps) {
  const containerRef = useRef(null);
  const featuredArticle = featured?.[0] || null;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className={styles.blogHeroSection}>
      {/* 🟢 The Interactive Background (Same as Home Page) */}
      <FisheyeGrid />

      <div className={`container ${styles.contentContainer}`}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ opacity }}
            >
              <div className={styles.badge}>{data?.heroBadge || "Knowledge Center"}</div>
              <h1 className={styles.title}>
                {data?.heroTitle || (
                  <>
                    Engineering the <br />
                    <span>Future of Connectivity</span>
                  </>
                )}
              </h1>
              <p className={styles.subtitle}>
                {data?.heroSubtitle || "Deep dives into telecom infrastructure, network optimization, and the digital evolution of East Africa."}
              </p>
            </motion.div>

            <motion.div 
              className={styles.searchBox}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={styles.searchBar}>
                <span className={styles.searchIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  placeholder={data?.searchPlaceholder || "Search the archive..."} 
                  className={styles.searchInput} 
                />
                <button className={styles.searchBtn}>{data?.searchButtonText || "Find Insights"}</button>
              </div>
            </motion.div>
          </div>
        </header>

        {featuredArticle && (
          <motion.div 
            className={styles.featuredSection}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Link href={`/blog/${featuredArticle.slug?.current}`} className={styles.glassCard}>
              <div className={styles.imageZone}>
                <Image 
                  src={featuredArticle.mainImage?.asset ? urlForImage(featuredArticle.mainImage).width(1200).quality(90).url() : "/images/blog_placeholder.png"} 
                  alt={featuredArticle.mainImage?.alt || featuredArticle.title}
                  fill
                  className={styles.featuredImage}
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
                <div className={styles.cardGlow} />
              </div>
              
              <div className={styles.textZone}>
                <div className={styles.tagWrapper}>
                  {featuredArticle.categories?.map((cat, i) => (
                    <div key={i} className={styles.featuredLabel}>
                      <span className={styles.pulseDot} />
                      {cat}
                    </div>
                  ))}
                </div>
                <h2 className={styles.featuredTitle}>{featuredArticle.title}</h2>
                <p className={styles.featuredExcerpt}>{featuredArticle.excerpt}</p>
                
                <div className={styles.cardFooter}>
                  <div className={styles.authorGroup}>
                    <div className={styles.avatar}>
                      <Image 
                        src={featuredArticle.author?.image ? urlForImage(featuredArticle.author.image).width(80).url() : "/images/human_image.png"}
                        alt={featuredArticle.author?.name || "Author"}
                        fill
                      />
                    </div>
                    <div className={styles.authorMeta}>
                      <span className={styles.authorName}>{featuredArticle.author?.name || "ADIU Team"}</span>
                      <span className={styles.readTime}>{featuredArticle.readTime || "7 min read"}</span>
                    </div>
                  </div>
                  <div className={styles.readArticle}>
                    Read Full Article
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Decorative Floating Tech Elements */}
      <motion.div className={styles.float1} style={{ y: y1 }}>0101</motion.div>
      <motion.div className={styles.float2} style={{ y: y2 }}>SYSTEM_ACTIVE</motion.div>
    </section>
  );
}
