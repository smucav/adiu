import Image from "next/image";
import styles from "./ServicesHero.module.css";
import { FadeIn } from "../../animations/ScrollAnimations";
import { SanityServicesPage } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface ServicesHeroProps {
  data: SanityServicesPage | null;
}

export function ServicesHero({ data }: ServicesHeroProps) {
  const heroImage = data?.heroImage?.asset ? urlForImage(data.heroImage).width(1200).quality(80).url() : null;

  return (
    <section className={styles.hero}>
      {heroImage && (
        <>
          <div className={styles.bgImage}>
            <Image 
              src={heroImage} 
              alt={data?.heroImage?.alt || "Services Hero"} 
              fill 
              priority 
            />
          </div>
          <div className={styles.overlay} />
        </>
      )}
      
      <div className={`container ${styles.heroContent}`}>
        <FadeIn direction="up" distance={40}>
          <span className={styles.label}>Our Expertise</span>
          <h1 className={styles.title}>
            {data?.heroHeading || (
              <>Advanced Solutions<br />for a Connected World</>
            )}
          </h1>
          <p className={styles.description}>
            {data?.heroDescription || "We provide end-to-end ICT and telecommunications infrastructure solutions, helping businesses and governments scale their digital capabilities with reliability and precision."}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
