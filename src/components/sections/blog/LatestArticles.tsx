import Image from "next/image";
import Link from "next/link";
import styles from "./LatestArticles.module.css";

import { SanityBlogPage, SanityArticle } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface LatestArticlesProps {
  data?: SanityBlogPage | null;
  articles: SanityArticle[];
}

export function LatestArticles({ data, articles }: LatestArticlesProps) {
  const articlesToDisplay = articles?.length > 0 ? articles : [
    {
      _id: "1",
      title: "AI-powered predictive models and their impact across industries",
      excerpt: "Lorem ipsum dolor sit amet consectetur convallis ut et in id enim tempus quis amet consequat.......",
      publishedAt: "2025-10-17",
      category: "infrastructure",
      mainImage: { asset: { _ref: 'dummy' } },
      slug: { current: "#" }
    },
  ];

  const categories = data?.filterCategories || ["All", "Technology", "Infrastructure", "Business", "Healthcare"];

  return (
    <section className={`section ${styles.latestSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{data?.archiveTitle || "Article Archive"}</h2>
          <p className={styles.subtitle}>
            {data?.archiveSubtitle || "Lorem ipsum dolor sit amet consectetur nec quis suspendisse."}
          </p>
        </div>

        <div className={styles.filters}>
          {categories.map((cat, i) => (
            <button key={cat} className={styles.filterButton} data-active={i === 0 ? "true" : "false"}>
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.articleGrid}>
          {articlesToDisplay.map((article: any) => {
            const slug = article.slug?.current || "#";
            return (
              <Link href={`/blog/${slug}`} key={article._id} className={styles.articleCard}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={article.mainImage?.asset ? urlForImage(article.mainImage).width(400).quality(75).url() : "/images/blog_image_kinda.png"} 
                  alt={article.mainImage?.alt || article.title || ""}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, 33vw"
                />
              </div>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleExcerpt}>{article.excerpt}</p>
              <div className={styles.articleMeta}>
                {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase() : ""}
                {article.category ? ` / ${article.category}` : ""}
              </div>
              <span className={styles.readMore}>Read more &rarr;</span>
            </Link>
          ); })}
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageButton} data-active="true">1</button>
          <button className={styles.pageButton}>2</button>
          <button className={styles.pageButton}>3</button>
          <span className={styles.dots}>......</span>
          <button className={styles.nextButton}>Next</button>
        </div>
      </div>
    </section>
  );
}
