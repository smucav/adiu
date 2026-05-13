"use client";

import styles from "./ActionBanner.module.css";
import Image from "next/image";
import { Button } from "../ui/Button";
import { FadeIn } from "../animations/ScrollAnimations";

import { SanityHomePage } from "@/sanity/lib/types";
import { urlForImage, getLqipUrl } from "@/sanity/lib/image";

interface ActionBannerProps {
  data: SanityHomePage | null;
}

export function ActionBanner({ data }: ActionBannerProps) {
  return (
    <section className={`section`}>
      <div className={`container`}>
        <div className={styles.banner}>
          <div className={styles.content}>
            <FadeIn direction="up" distance={30}>
              <h2 className={styles.heading}>
                {data?.actionBannerHeading || <>Accelerate your<br/>infrastructure growth</>}
              </h2>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={0.1}>
              <p className={styles.description}>
                {data?.actionBannerDescription || "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu malesuada."}
              </p>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={0.2}>
              <Button href={data?.actionBannerCtaLink || "/contact"} variant="primary">
                {data?.actionBannerCtaText || "Start deployment"} <span className={styles.arrow}>&rsaquo;</span>
              </Button>
            </FadeIn>
          </div>
          <FadeIn direction="right" distance={50} delay={0.3}>
            <div className={styles.backgroundGraphic}>
              <Image 
                src={data?.actionBannerImage ? urlForImage(data.actionBannerImage).width(600).quality(80).url() : "/images/accelerate_your_growth_kinda_image.png"} 
                alt={data?.actionBannerImage?.alt || data?.actionBannerHeading || "Accelerate Infrastructure"} 
                width={600} 
                height={600}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ width: 'auto', height: '120%', objectFit: 'contain' }}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

