"use client";

import { SanityArticle, SanityBlogPage } from "@/sanity/lib/types";
import styles from "./TechArchive.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowRight, Clock } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

interface TechArchiveProps {
  data?: SanityBlogPage | null;
  articles: SanityArticle[];
  categories: string[];
}

export function TechArchive({ data, articles, categories }: TechArchiveProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // 1. Discover all unique categories from articles + defined ones
  const allCategories = useMemo(() => {
    const articleCats = articles.flatMap(a => a.categories || []);
    const unique = Array.from(new Set(["All", ...categories, ...articleCats]));
    return unique.filter(Boolean);
  }, [articles, categories]);

  // 2. Comprehensive Filtering (Category + Search)
  const filteredArticles = useMemo(() => {
    const filtered = articles.filter(article => {
      const matchesCategory = activeCategory === "All" || 
        article.categories?.some(cat => cat.toLowerCase() === activeCategory.toLowerCase());
      
      const matchesSearch = !searchQuery || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    setCurrentPage(1); // Reset to first page when filtering
    return filtered;
  }, [articles, activeCategory, searchQuery]);

  // 3. Featured Logic
  const showFeatured = currentPage === 1 && activeCategory === "All" && !searchQuery && filteredArticles.length > 0;
  const featuredArticle = showFeatured ? filteredArticles[0] : null;
  
  // 4. Grid Articles (Exclude featured if showing)
  const gridArticles = useMemo(() => {
    const startList = showFeatured ? filteredArticles.slice(1) : filteredArticles;
    const startIndex = (currentPage - 1) * articlesPerPage;
    return startList.slice(startIndex, startIndex + articlesPerPage);
  }, [filteredArticles, showFeatured, currentPage]);

  // 5. Pagination Logic
  const totalItems = showFeatured ? filteredArticles.length - 1 : filteredArticles.length;
  const totalPages = Math.ceil(totalItems / articlesPerPage) || 1;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={styles.archiveWrapper}>
      <div className="container">
        
        {/* ── Page Header ──────────────────────────────────────── */}
        <header className={styles.pageHeader}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.badge}>{data?.heroBadge || "Our Blog"}</div>
            <h1 className={styles.bigTitle}>{data?.archiveTitle || "Latest Insights & News"}</h1>
            <p className={styles.subtitle}>
              {data?.archiveSubtitle || "Discover the latest trends, tips, and insights from our team of experts."}
            </p>
          </motion.div>
        </header>

        {/* ── Controls (Search & Filters) ──────────────────────────────── */}
        <div className={styles.controlsRow}>
          <div className={styles.categoryPills}>
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={styles.pillBtn}
                data-active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder={data?.searchPlaceholder || "Search articles..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* ── Featured Article ────────────────────────────────────────── */}
        {showFeatured && featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href={`/blog/${featuredArticle.slug.current}`} className={styles.featuredArticle}>
              <div className={styles.featuredImageWrapper}>
                {featuredArticle.mainImage && (
                  <Image
                    src={urlForImage(featuredArticle.mainImage).width(800).height(500).url() as string}
                    alt={featuredArticle.mainImage.alt || featuredArticle.title}
                    width={800}
                    height={500}
                    className={styles.featuredImage}
                  />
                )}
              </div>
              <div className={styles.featuredContent}>
                <span className={styles.featuredCategory}>
                  {featuredArticle.categories?.[0] || "General"}
                </span>
                <h2 className={styles.featuredTitle}>{featuredArticle.title}</h2>
                {featuredArticle.excerpt && (
                  <p className={styles.featuredExcerpt}>{featuredArticle.excerpt}</p>
                )}
                <div className={styles.featuredMeta}>
                  <span className={styles.featuredDate}>{formatDate(featuredArticle.publishedAt)}</span>
                  {featuredArticle.readTime && (
                    <span className={styles.featuredDate}>
                      <Clock size={14} /> {featuredArticle.readTime}
                    </span>
                  )}
                </div>
                <div className={styles.featuredReadMore}>
                  Read Article <ArrowRight size={16} className={styles.readMoreArrow} />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ── Article Grid ───────────────────────────────────────────── */}
        <div className={styles.articleGrid}>
          <AnimatePresence mode="popLayout">
            {gridArticles.map((article, i) => (
              <motion.div
                key={article._id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/blog/${article.slug.current}`} className={styles.articleCard}>
                  <div className={styles.cardImageWrapper}>
                    <span className={styles.cardCategory}>
                      {article.categories?.[0] || "General"}
                    </span>
                    {article.mainImage && (
                      <Image
                        src={urlForImage(article.mainImage).width(600).height(400).url() as string}
                        alt={article.mainImage.alt || article.title}
                        width={600}
                        height={400}
                        className={styles.cardImage}
                      />
                    )}
                  </div>
                  
                  <div className={styles.cardMeta}>
                    <span>{formatDate(article.publishedAt)}</span>
                    {article.readTime && (
                      <span className={styles.featuredDate}>
                        <Clock size={14} /> {article.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  
                  {article.excerpt && (
                    <p className={styles.cardExcerpt}>{article.excerpt}</p>
                  )}

                  <div className={styles.readMore}>
                    Read Article <ArrowRight size={16} className={styles.readMoreArrow} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div className={styles.noResults}>
              No articles found matching your criteria. Try adjusting your search or filters.
            </div>
          )}
        </div>

        {/* ── Pagination ─────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className={styles.paginationRow}>
            <button 
              className={styles.pageBtnIcon}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={styles.pageNum}
                  data-active={currentPage === page}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button 
              className={styles.pageBtnIcon}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
