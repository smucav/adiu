import Image from "next/image";
import Link from "next/link";
import styles from "./CareerHero.module.css";

import { SanityCareerPage } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface CareerHeroProps {
  data: SanityCareerPage | null;
}

export function CareerHero({ data }: CareerHeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.imageColumn}>
            <Image 
              src={data?.heroImage ? urlForImage(data.heroImage).width(600).quality(80).url() : "/images/fast_growing_team_image.png"} 
              alt={data?.heroImage?.alt || data?.heroTitle || "Fast growing team"}
              fill
              className={styles.heroImage}
              sizes="(max-width: 992px) 100vw, 50vw"
              priority
            />
          </div>
          <div className={styles.textColumn}>
            <h1 className={styles.title}>{data?.heroTitle || "Join our fast growing team"}</h1>
            <p className={styles.subtitle}>
              {data?.heroSubtitle || "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu."}
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
