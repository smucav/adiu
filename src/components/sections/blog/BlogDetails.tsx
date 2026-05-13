import Image from "next/image";
import Link from "next/link";
import styles from "./BlogDetails.module.css";

import { SanityArticle } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@/components/ui/PortableText";

interface BlogDetailsProps {
  article: SanityArticle;
}

export function BlogDetails({ article }: BlogDetailsProps) {
  if (!article) return null;

  return (
    <article className={styles.articleContainer}>
      <div className="container">
        
        {/* Article Header (Title & Meta) */}
        <header className={styles.header}>
          <span className={styles.category}>{article.category}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span>By <strong>{article.author?.name || "ADIU Team"}</strong></span>
            </div>
            <div className={styles.metaItem}>
              <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ""}</span>
            </div>
            <div className={styles.metaItem}>
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Massive Hero Image */}
        <div className={styles.heroImageWrapper}>
          <Image 
            src={article.mainImage ? urlForImage(article.mainImage).width(900).quality(80).url() : "/images/blog_image_kinda.png"} 
            alt={article.mainImage?.alt || article.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        {/* Content Centered Wrapper */}
        <div className={styles.contentWrapper}>
          
          {/* Share Bar */}
          <div className={styles.shareBar}>
            <span className={styles.shareLabel}>Share this article:</span>
            <Link href="#" className={styles.shareIcon} aria-label="Share on Facebook">f</Link>
            <Link href="#" className={styles.shareIcon} aria-label="Share on Twitter">t</Link>
            <Link href="#" className={styles.shareIcon} aria-label="Share on LinkedIn">in</Link>
          </div>

          {/* Main Prose (Portable Text) */}
          <div className={styles.prose}>
            <PortableText value={article.body} />
          </div>

          {/* Author Box */}
          {article.author && (
            <div className={styles.authorBox}>
              <div className={styles.authorImage}>
                <Image 
                  src={article.author.image ? urlForImage(article.author.image).width(50).quality(75).url() : "/images/human_image.png"} 
                  alt={article.author.image?.alt || article.author.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="80px"
                />
              </div>
              <div className={styles.authorInfo}>
                <h4>{article.author.name}</h4>
                <p>{article.author.role}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </article>
  );
}
