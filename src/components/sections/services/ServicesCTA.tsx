"use client";

import Link from "next/link";
import styles from "./ServicesCTA.module.css";
import { FadeIn } from "../../animations/ScrollAnimations";
import { SanityServicesPage } from "@/sanity/lib/types";

interface ServicesCTAProps {
  data: SanityServicesPage | null;
}

export function ServicesCTA({ data }: ServicesCTAProps) {
  const eyebrow = data?.ctaEyebrow || "Ready to move forward";
  const heading = data?.ctaHeading || "Let\u2019s build something";
  const subHeading = data?.ctaSubHeading || "that lasts.";
  const description =
    data?.ctaDescription ||
    "From fiber infrastructure to cloud architecture \u2014 we deliver solutions engineered for scale, reliability, and longevity.";
  const primaryText = data?.ctaPrimaryText || "Start a project";
  const primaryLink = data?.ctaPrimaryLink || "/contact";
  const secondaryText = data?.ctaSecondaryText || "See our work";
  const secondaryLink = data?.ctaSecondaryLink || "/projects";
  const metaItems = data?.ctaMetaItems || [
    "Enterprise-grade delivery",
    "24 / 7 Support",
    "End-to-end ownership",
  ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <FadeIn direction="up" distance={40}>
          <p className={styles.eyebrow}>{eyebrow}</p>
        </FadeIn>

        <FadeIn direction="up" distance={40} delay={0.1}>
          <h2 className={styles.heading}>
            {heading}
            <br />
            <em className={styles.italic}>{subHeading}</em>
          </h2>
        </FadeIn>

        <FadeIn direction="up" distance={30} delay={0.2}>
          <p className={styles.sub}>{description}</p>
        </FadeIn>

        <FadeIn direction="up" distance={20} delay={0.3}>
          <div className={styles.actions}>
            <Link href={primaryLink} className={styles.primaryBtn}>
              {primaryText}
              <span className={styles.btnArrow}>→</span>
            </Link>
            <Link href={secondaryLink} className={styles.ghostLink}>
              {secondaryText}
            </Link>
          </div>
        </FadeIn>

        <div className={styles.divider} aria-hidden="true" />

        <FadeIn direction="up" distance={20} delay={0.4}>
          <div className={styles.metaRow}>
            {metaItems.map((item, i) => (
              <span key={i} className={styles.metaGroup}>
                {i > 0 && <span className={styles.dot} aria-hidden="true" />}
                <span className={styles.metaItem}>{item}</span>
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
