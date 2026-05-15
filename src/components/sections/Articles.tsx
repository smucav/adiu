"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Articles.module.css";
import { Button } from "../ui/Button";
import { FadeIn, StaggerContainer } from "../animations/ScrollAnimations";

import { SanityHomePage, SanityArticle } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface ArticlesProps {
  data: SanityHomePage | null;
  articles: SanityArticle[];
}

export function Articles({ data, articles }: ArticlesProps) {
  const articlesToDisplay = (Array.isArray(articles) && articles.length > 0) 
    ? articles.slice(0, 2) 
    : [];

  return (
    <section className={`section ${styles.sectionWrapper}`}>
      <div className={styles.bgDecoration}>
        <svg viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 400L240 320C480 240 960 80 1440 240V400H0V400Z" fill="currentColor" fillOpacity="0.06" />
          <path d="M0 400L360 280C720 160 1080 320 1440 200V400H0V400Z" fill="currentColor" fillOpacity="0.04" />
        </svg>
      </div>
      <div className={styles.bgDecorationGray}>
        <div className={styles.grayArt} />
      </div>
      <div className={`container`}>
        <FadeIn direction="up" distance={30}>
          <div className={styles.header}>
            <div className={styles.titleColumn}>
              <h2 className={styles.heading}>{data?.articlesHeading || "News & Article"}</h2>
              <p className={styles.description}>
                {data?.articlesDescription || "Stay updated with our latest insights and industry news."}
              </p>
            </div>
            <div className={styles.actionColumn}>
              <Button href={data?.articlesCtaLink || "/blog"} variant="primary">
                {data?.articlesCtaText || "Browse All Blogs"} <span className={styles.arrow}>&rsaquo;</span>
              </Button>
            </div>
          </div>
        </FadeIn>

        <StaggerContainer className={styles.grid} staggerDelay={0.15}>
          {articlesToDisplay.map((article: any, i) => {
            const slug = article.slug?.current || "#";
            return (
              <FadeIn key={i} direction="up" distance={40}>
                {/* Removed InteractiveTiltCard to stop the hover animation movement */}
                <Link href={`/blog/${slug}`} className={styles.articleCard}>
                  <div className={styles.imagePlaceholder}>
                    <Image
                      src={article.mainImage?.asset ? urlForImage(article.mainImage).width(800).quality(85).url() : "/images/blog_image_kinda.png"}
                      alt={article.mainImage?.alt || article.title || ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.articleImage}
                    />
                  </div>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <div className={styles.meta}>
                    <div className={styles.categoriesWrapper}>
                      {article.categories?.slice(0, 2).map((cat: string, idx: number) => (
                        <span key={idx} className={styles.categoryBadge}>{cat}</span>
                      ))}
                    </div>
                    <span className={styles.date}>
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : ""}
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
