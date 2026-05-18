"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import styles from "./AboutHero.module.css";
import { FadeIn, StaggerContainer } from "../../animations/ScrollAnimations";
import { Counter } from "../../animations/Counter";

import { SanityAboutPage } from "@/sanity/lib/types";

// Lazy-load the heavy map component — react-simple-maps + d3-geo is 64KB+ gzipped
const InteractiveWorldMap = dynamic(
  () => import("./InteractiveWorldMap").then((mod) => mod.InteractiveWorldMap),
  { ssr: false, loading: () => <div className={styles.mapPlaceholder} /> }
);

interface AboutHeroProps {
  data: SanityAboutPage | null;
}

export function AboutHero({ data }: AboutHeroProps) {
  const stats = data?.heroStats || [
    { value: "100M", label: "Active Customers", description: "In the web design industry field." },
    { value: "45M", label: "Total funding to date", description: "Around worldwide in last five years." },
    { value: "10B", label: "In transactions", description: "With a great experience and results." }
  ];

  return (
    <section className={`section ${styles.heroSection}`}>
      {data?.heroBackgroundImage && (
        <Image
          src={urlForImage(data.heroBackgroundImage).url()}
          alt={data.heroBackgroundImage.alt || "Hero Background"}
          fill
          style={{ objectFit: "cover", opacity: 0.12, mixBlendMode: "overlay" }}
          priority
        />
      )}
      <div className={styles.mapContainer}>
        <InteractiveWorldMap
          highlightedCountries={data?.highlightedCountries}
          scale={data?.mapScale}
          center={data?.mapCenter?.lng !== undefined && data?.mapCenter?.lat !== undefined
            ? [data.mapCenter.lng, data.mapCenter.lat]
            : undefined}
        />
      </div>
      <div className={`container ${styles.container}`}>
        <FadeIn direction="up" distance={40}>
          <div className={styles.content}>
            <h1 className={styles.heading}>
              {data?.heroHeading || (
                <>Simplifying Infrastructure<br />For Businesses.</>
              )}
            </h1>
            <p className={styles.description}>
              {data?.heroDescription || "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu malesuada."}
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className={styles.statsRow} staggerDelay={0.15}>
          {stats.map((stat, i) => (
            <FadeIn key={i} direction="up" distance={30} delay={i * 0.1}>
              <div className={styles.statItem}>
                <h2 className={styles.statValue}>
                  <Counter value={stat.value} />
                </h2>
                <h3 className={styles.statLabel}>{stat.label}</h3>
                <p className={styles.statDesc}>
                  {stat.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
