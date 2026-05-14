"use client";

import { SanityArticle, SanityBlogPage } from "@/sanity/lib/types";
import styles from "./TechArchive.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

interface TechArchiveProps {
  data?: SanityBlogPage | null;
  articles: SanityArticle[];
  categories: string[];
}

export function TechArchive({ data, articles, categories }: TechArchiveProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

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

    // Reset to first page when filtering
    setCurrentPage(1);
    return filtered;
  }, [articles, activeCategory, searchQuery]);

  // 3. Pagination Logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    return filteredArticles.slice(startIndex, startIndex + articlesPerPage);
  }, [filteredArticles, currentPage, articlesPerPage]);

  // 4. Count articles per category (always based on total list)
  const categoryCounts = useMemo(() => {
    return allCategories.reduce((acc, cat) => {
      if (cat === "All") {
        acc[cat] = articles.length;
      } else {
        acc[cat] = articles.filter(a => 
          a.categories?.some(c => c.toLowerCase() === cat.toLowerCase())
        ).length;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [allCategories, articles]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 300, behavior: 'smooth' });
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
            <div className={styles.badge}>{data?.heroBadge || "Archive"}</div>
            <h1 className={styles.bigTitle}>
              {data?.heroTitle || "Blog"} <span>({articles.length})</span>
            </h1>
            <p className={styles.subtitle}>{data?.heroSubtitle}</p>
          </motion.div>

          {/* 🔍 Search Bar */}
          <motion.div 
            className={styles.searchContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.searchBar}>
              <Search size={20} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder={data?.searchPlaceholder || "Search archive..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </motion.div>
        </header>

        <div className={styles.layout}>
          {/* 📂 SIDEBAR: TOPICS */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarLabel}>/ TOPICS</div>
              <ul className={styles.topicList}>
                {allCategories.map((cat) => (
                  <li key={cat}>
                    <button 
                      className={styles.topicBtn}
                      data-active={activeCategory === cat}
                      onClick={() => setActiveCategory(cat)}
                    >
                      <span className={styles.topicName}>{cat}</span>
                      <span className={styles.topicCount}>{categoryCounts[cat] || 0}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* 📜 MAIN LIST */}
          <main className={styles.mainList}>
            <div className={styles.listHeader}>
              <span className={styles.colDate}>/ DATE</span>
              <span className={styles.colName}>/ NAME</span>
            </div>

            <div className={styles.rows}>
              <AnimatePresence mode="popLayout">
                {paginatedArticles.map((article, i) => (
                  <motion.div
                    key={article._id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, delay: i * 0.01 }}
                  >
                    <Link href={`/blog/${article.slug.current}`} className={styles.articleRow}>
                      <span className={styles.date}>
                        {new Date(article.publishedAt).toLocaleDateString('en-GB', { 
                          year: 'numeric', 
                          month: '2-digit', 
                          day: '2-digit' 
                        }).replace(/\//g, '.')}
                      </span>

                      <h3 className={styles.title}>{article.title}</h3>
                      <div className={styles.rowLine} />
                      <span className={styles.plus}>+</span>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredArticles.length === 0 && (
                <div className={styles.noResults}>
                  NO LOGS MATCH YOUR SEARCH CRITERIA
                </div>
              )}
            </div>

            {/* ── Pagination Controls ───────────────────────────── */}
            <div className={styles.pagination}>
              <button 
                className={styles.pageBtn}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                ← PREV
              </button>
              
              <div className={styles.pageNumbers}>
                {totalPages <= 1 ? (
                  <button className={styles.pageNum} data-active="true">01</button>
                ) : (
                  Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={styles.pageNum}
                      data-active={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page.toString().padStart(2, '0')}
                    </button>
                  ))
                )}
              </div>

              <button 
                className={styles.pageBtn}
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                NEXT →
              </button>
            </div>

            <div className={styles.showingInfo}>
              SHOWING {Math.min(paginatedArticles.length, articlesPerPage)} OF {filteredArticles.length} LOGS
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
