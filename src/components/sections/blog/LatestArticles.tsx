"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./LatestArticles.module.css";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

import { SanityBlogPage, SanityArticle } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface LatestArticlesProps {
  data?: SanityBlogPage | null;
  articles: SanityArticle[];
}

function ArticleCard({ article, index }: { article: SanityArticle, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const slug = article.slug?.current || "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={styles.cardWrapper}
    >
      <Link href={`/blog/${slug}`} className={styles.articleLink}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={styles.articleCard}
        >
          <div className={styles.imageContainer} style={{ transform: "translateZ(30px)" }}>
            <Image 
              src={article.mainImage?.asset ? urlForImage(article.mainImage).width(600).quality(80).url() : "/images/blog_placeholder.png"} 
              alt={article.mainImage?.alt || article.title}
              fill
              className={styles.articleImage}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className={styles.tagWrapper}>
              {article.categories?.map((cat, i) => (
                <div key={i} className={styles.categoryBadge}>{cat}</div>
              ))}
            </div>
          </div>
          
          <div className={styles.cardBody} style={{ transform: "translateZ(50px)" }}>
            <div className={styles.cardMeta}>
              <span className={styles.date}>
                {article.publishedAt && new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className={styles.dot}>•</span>
              <span className={styles.readTime}>{article.readTime || "5 min"}</span>
            </div>
            
            <h3 className={styles.articleTitle}>{article.title}</h3>
            <p className={styles.articleExcerpt}>{article.excerpt}</p>
            
            <div className={styles.cardFooter}>
              <div className={styles.authorBrief}>
                <div className={styles.miniAvatar}>
                  <Image 
                    src={article.author?.image ? urlForImage(article.author.image).width(40).url() : "/images/human_image.png"}
                    alt={article.author?.name || "Author"}
                    fill
                  />
                </div>
                <span>{article.author?.name || "ADIU Team"}</span>
              </div>
              <div className={styles.goIcon}>→</div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function LatestArticles({ data, articles }: LatestArticlesProps) {
  // 1. Get unique categories from actual live articles (flattening the arrays)
  const activeArticleCategories = Array.from(
    new Set(articles?.flatMap(a => a.categories).filter(Boolean))
  );

  // 2. Use defined categories from Sanity, but only if they actually have articles
  const sanityCategories = data?.filterCategories || [];
  let dynamicCategories = sanityCategories.length > 0 
    ? sanityCategories.filter(cat => activeArticleCategories.some(ac => ac.toLowerCase() === cat.toLowerCase()))
    : activeArticleCategories;

  // 3. Ensure "All" is at the front
  if (!dynamicCategories.includes("All")) {
    dynamicCategories = ["All", ...dynamicCategories];
  }

  const [activeCategory, setActiveCategory] = useState(dynamicCategories[0]);

  useEffect(() => {
    if (!dynamicCategories.includes(activeCategory)) {
      setActiveCategory(dynamicCategories[0]);
    }
  }, [dynamicCategories, activeCategory]);

  const filteredArticles = articles?.filter(article => {
    if (activeCategory === "All") return true;
    return article.categories?.some(cat => cat.toLowerCase() === activeCategory.toLowerCase());
  }) || [];

  return (
    <section className={styles.latestSection}>
      <div className="container">
        <div className={styles.archiveHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.topLabel}>The Archive</div>
            <h2 className={styles.archiveTitle}>{data?.archiveTitle || "Featured Insights"}</h2>
          </div>
          
          <div className={styles.filterList}>
            {dynamicCategories.map((cat) => (
              <button 
                key={cat} 
                className={styles.filterTab} 
                data-active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.articleGrid}>
          {filteredArticles.map((article, index) => (
            <ArticleCard key={article._id} article={article} index={index} />
          ))}
        </div>

        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreBtn}>
            Discover More
            <div className={styles.btnGlow} />
          </button>
        </div>
      </div>
    </section>
  );
}
