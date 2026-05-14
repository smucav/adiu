"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import styles from "./BlogDetails.module.css";
import { motion, useScroll, useSpring } from "framer-motion";

import { SanityArticle } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@/components/ui/PortableText";

interface BlogDetailsProps {
  article: SanityArticle & { author: any };
  related?: SanityArticle[];
}

export function BlogDetails({ article, related }: BlogDetailsProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!article) return null;

  return (
    <article className={styles.articleContainer}>
      {/* 🟢 Premium Reading Progress */}
      <motion.div className={styles.progressBar} style={{ scaleX }} />

      <div className="container">
        <Link href="/blog" className={styles.backLink}>
          <span className={styles.backArrow}>←</span> ALL LOGS
        </Link>

        {/* 🎭 Minimalist Premium Header */}
        <header className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.categoryRow}>
              {article.categories?.map((cat, i) => (
                <span key={i} className={styles.categoryBadge}>
                  {cat}
                </span>
              ))}
            </div>
            <h1 className={styles.title}>{article.title}</h1>

            <div className={styles.metaRow}>
              <div className={styles.authorBrief}>
                <div className={styles.avatar}>
                  <Image
                    src={
                      article.author?.image
                        ? urlForImage(article.author.image).width(80).url()
                        : "/images/human_image.png"
                    }
                    alt={article.author?.name || "Author"}
                    fill
                  />
                </div>
                <div className={styles.authorText}>
                  <span className={styles.authorName}>
                    {article.author?.name || "ADIU Team"}
                  </span>
                  <span className={styles.authorRole}>
                    {article.author?.role || "Industry Expert"}
                  </span>
                </div>
              </div>

              <div className={styles.readingMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>📅</span>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" },
                      )
                    : "Recently"}
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>⏱️</span>
                  {article.readTime || "6 min read"}
                </div>
              </div>
            </div>
          </motion.div>
        </header>

        {/* 🏔️ Clean Premium Hero Image (No Parallax) */}
        <motion.div
          className={styles.heroWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src={
              article.mainImage
                ? urlForImage(article.mainImage).width(1200).quality(90).url()
                : "/images/blog_placeholder.png"
            }
            alt={article.mainImage?.alt || article.title}
            width={1200}
            height={600}
            className={styles.heroImage}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </motion.div>

        {/* 📝 Content Flow */}
        <div className={styles.layoutGrid}>
          {/* Sticky Side Interactivity */}
          <aside className={styles.sidebar}>
            <div className={styles.stickySide}>
              <div className={styles.sidebarLabel}>Share</div>
              <div className={styles.shareGroup}>
                {article.author.socialLinks?.map((link, idx) => {
                  const platform = link.platform.toLowerCase();
                  let label = link.platform.substring(0, 2).toLowerCase();

                  if (platform.includes("linkedin")) label = "in";
                  if (platform.includes("twitter") || platform.includes("x"))
                    label = "tw";
                  if (platform.includes("facebook")) label = "fb";
                  if (platform.includes("telegram")) label = "tg";
                  if (platform.includes("github")) label = "gh";
                  if (platform.includes("instagram")) label = "ig";

                  return (
                    <Link
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className={styles.mainContent}>
            <div className={styles.prose}>
              <PortableText value={article.body} />
            </div>

            {/* Premium Author Signature */}
            {article.author && (
              <section className={styles.authorSignature}>
                <div className={styles.signatureInner}>
                  <div className={styles.sigAvatar}>
                    <Image
                      src={
                        article.author.image
                          ? urlForImage(article.author.image).width(120).url()
                          : "/images/human_image.png"
                      }
                      alt={article.author.name}
                      fill
                    />
                  </div>
                  <div className={styles.sigInfo}>
                    <span className={styles.sigLabel}>Written By</span>
                    <h3>{article.author.name}</h3>
                    <p className={styles.sigBio}>
                      {article.author.bio ||
                        "Sharing perspectives on the future of infrastructure and engineering across Africa."}
                    </p>
                    {/*<Link href="/blog" className={styles.authorLink}>Explore more from this author</Link>*/}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* 📜 RELATED LOGS: ARCHIVE PREVIEW STYLE */}
        {related && related.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.relatedLabel}>/ RELATED LOGS</div>
            <div className={styles.relatedList}>
              {related.map((post, i) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className={styles.relatedRow}
                >
                  <span className={styles.relatedDate}>
                    {new Date(post.publishedAt)
                      .toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, ".")}
                  </span>
                  <h4 className={styles.relatedTitle}>{post.title}</h4>
                  <div className={styles.relatedLine} />
                  <span className={styles.relatedPlus}>+</span>
                </Link>
              ))}
            </div>

            <div className={styles.archiveAction}>
              <Link href="/blog" className={styles.archiveBtn}>
                EXPLORE FULL ARCHIVE <span>→</span>
              </Link>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
