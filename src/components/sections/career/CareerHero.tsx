import Image from "next/image";
import Link from "next/link";
import styles from "./CareerHero.module.css";

import { SanityCareerPage } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface CareerHeroProps {
  data: SanityCareerPage | null;
}

export function CareerHero({ data }: CareerHeroProps) {
  const imageUrl = data?.heroImage 
    ? urlForImage(data.heroImage).url() 
    : "/images/fast_growing_team_image.png";

  return (
    <section className={styles.heroSection}>
      {/* Background Image */}
      <div className={styles.bgWrapper}>
        <Image 
          src={imageUrl} 
          alt={data?.heroImage?.alt || data?.heroTitle || "Adiu Team"}
          fill
          className={styles.bgImage}
          priority
          sizes="100vw"
        />
        <div className={styles.overlay} />
      </div>

      <div className="container">
        <div className={styles.content}>
          <div className={styles.textColumn}>
            <h1 className={styles.title}>
              {data?.heroTitle || "Build the Future of Intelligent Operations at Adiu"}
            </h1>
            <p className={styles.subtitle}>
              {data?.heroSubtitle || "At Adiu, we believe technology should make work smarter, faster, and more human. We’re building products and systems that help businesses operate with clarity, efficiency, and confidence. Our team combines curiosity, ownership, and practical innovation to solve meaningful challenges every day."}
            </p>
            <Link href="#open-roles" className={styles.ctaButton}>
              {data?.heroCtaText || "Join our team"} &rsaquo;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
