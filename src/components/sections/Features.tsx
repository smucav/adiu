"use client";

import Image from "next/image";
import styles from "./Features.module.css";
import {
  FadeIn,
  StaggerContainer,
  InteractiveTiltCard,
} from "../animations/ScrollAnimations";

import { SanityHomePage } from "@/sanity/lib/types";
import { urlForImage, getLqipUrl } from "@/sanity/lib/image";

interface FeaturesProps {
  data: SanityHomePage | null;
}

export function Features({ data }: FeaturesProps) {
  const points = data?.featurePoints || [
    {
      title: "High availability",
      description:
        "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu.",
    },
    {
      title: "Scalable performance",
      description:
        "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu.",
    },
    {
      title: "Enterprise security",
      description:
        "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu.",
    },
    {
      title: "24/7 expert support",
      description:
        "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu.",
    },
  ];

  return (
    <section className={`section`}>
      <div className={`container`}>
        <div className={styles.featureCard}>
          <div className={styles.leftColumn}>
            <FadeIn direction="up" distance={40}>
              <div className={styles.illustration}>
                <Image
                  src={
                    data?.featuresImage
                      ? urlForImage(data.featuresImage)
                          .width(600)
                          .quality(80)
                          .url()
                      : "/images/network_of_servers_kinda_image.png"
                  }
                  alt={
                    data?.featuresImage?.alt ||
                    data?.featuresHeading ||
                    "Network of Servers"
                  }
                  width={600}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  {...(data?.featuresImage
                    ? {
                        placeholder: "blur" as const,
                        blurDataURL: getLqipUrl(data.featuresImage) || "",
                      }
                    : {})}
                />
              </div>
            </FadeIn>

            <FadeIn direction="up" distance={30} delay={0.2}>
              <h2 className={styles.heading}>
                {data?.featuresHeading || "The Best Network For Your Business"}
              </h2>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={0.3}>
              <p className={styles.description}>
                {data?.featuresDescription ||
                  "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu malesuada."}
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className={styles.rightColumn} staggerDelay={0.15}>
            {points.map((point, index) => (
              <FadeIn key={index} direction="left" distance={30}>
                {/*<InteractiveTiltCard>*/}
                <div className={styles.point}>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                  <p className={styles.pointDescription}>{point.description}</p>
                </div>
                {/*</InteractiveTiltCard>*/}
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
