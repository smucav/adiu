import Image from "next/image";
import Link from "next/link";
import styles from "./BlogHero.module.css";

import { SanityBlogPage, SanityArticle } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface BlogHeroProps {
  data: SanityBlogPage | null;
  featured: SanityArticle[];
}

export function BlogHero({ data, featured }: BlogHeroProps) {
  const featuredArticlesToDisplay = featured?.length > 0 ? featured : [
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

  return (
    <section className={`section ${styles.blogHeroSection}`}>
      <div className={`container`}>
        <div className={styles.headerRow}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>{data?.heroTitle || "Latest Articles"}</h1>
            <p className={styles.subtitle}>
              {data?.heroSubtitle || "Lorem ipsum dolor sit amet consectetur nec quis suspendisse."}
            </p>
          </div>
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="search for articles ......" 
            />
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>

        <div className={styles.featuredList}>
          {featuredArticlesToDisplay.map((article: any) => {
            const slug = article.slug?.current || "#";
            return (
              <Link href={`/blog/${slug}`} key={article._id} className={styles.featuredArticle}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={article.mainImage?.asset ? urlForImage(article.mainImage).width(800).quality(80).url() : "/images/blog_image_kinda.png"} 
                  alt={article.mainImage?.alt || article.title || ""}
                  fill
                  style={{ objectFit: 'contain' }} 
                  sizes="(max-width: 992px) 100vw, 45vw"
                />
              </div>
              <div className={styles.articleContent}>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <p className={styles.articleExcerpt}>{article.excerpt}</p>
                <div className={styles.articleMeta}>
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase() : ""}
                  {article.category ? ` / ${article.category}` : ""}
                </div>
                <span className={styles.readMore}>Read more &rarr;</span>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
