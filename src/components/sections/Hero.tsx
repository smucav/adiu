"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./Hero.module.css";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { SanityHomePage, SanityPartnerLogo } from "@/sanity/lib/types";
import { urlForImage, getLqipUrl } from "@/sanity/lib/image";

import {
  FadeIn,
  StaggerContainer,
  Parallax,
  PhysicsFloat,
  TypewriterText,
  TextReveal,
} from "../animations/ScrollAnimations";

// Lazy-load canvas effect
const FisheyeGrid = dynamic(
  () => import("../ui/FisheyeGrid").then((mod) => mod.FisheyeGrid),
  { ssr: false },
);

interface HeroProps {
  data: SanityHomePage | null;
  partners: SanityPartnerLogo[];
}

export function Hero({ data, partners }: HeroProps) {
  const partnersToDisplay = partners?.length > 0 ? partners : [];
  const scrollingPartners = [...partnersToDisplay, ...partnersToDisplay];

  const heroImageSrc =
    data?.heroImage?.asset || data?.heroImage?._type === "image"
      ? urlForImage(data.heroImage).width(900).quality(80).url() ||
        "/images/first_page_hero_section_image_of_servers.png"
      : "/images/first_page_hero_section_image_of_servers.png";
  const heroBlur = data?.heroImage ? getLqipUrl(data.heroImage) : undefined;

  return (
    <>
      <section className={`section ${styles.heroSection}`}>
        <FisheyeGrid />
        <div className={`container ${styles.heroContainer}`}>
          <StaggerContainer delay={0.2}>
            <div className={styles.content}>
              <TextReveal
                text={
                  data?.heroTitle || (
                    <>
                      Infrastructure
                      <br />
                      that works for you
                    </>
                  )
                }
                className={styles.title}
                delay={0.2}
              />

              <TypewriterText
                text={
                  data?.heroDescription ||
                  "To Transform Businesses and Enhance Lives Across Africa for a Sustainable, Connected, and Digital Future"
                }
                className={styles.description}
                delay={0.8}
                speed={15}
              />

              <FadeIn direction="up" distance={30} delay={0.4}>
                <Button
                  href={data?.heroCtaLink || "/contact"}
                  variant="primary"
                  size="lg"
                >
                  {data?.heroCtaText || "Start deployment"}{" "}
                  <span className={styles.arrow}>&rsaquo;</span>
                </Button>
              </FadeIn>
            </div>
          </StaggerContainer>

          <FadeIn direction="up" distance={50} delay={0.4}>
            <PhysicsFloat>
              <Parallax offset={40} className={styles.graphic}>
                <Image
                  src={heroImageSrc}
                  alt={
                    data?.heroImage?.alt ||
                    data?.heroTitle ||
                    "Servers Infrastructure"
                  }
                  width={800}
                  height={600}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  {...(heroBlur
                    ? { placeholder: "blur" as const, blurDataURL: heroBlur }
                    : {})}
                />
              </Parallax>
            </PhysicsFloat>
          </FadeIn>
        </div>
      </section>

      <div className={styles.partnersSection}>
        <FadeIn direction="up" distance={20} delay={0.6}>
          <div className={`container ${styles.partnersContainer}`}>
            <p className={styles.partnersText}>
              {data?.partnersLabel ||
                "Trusted by global leaders and infrastructure pioneers"}
            </p>

            <div className={styles.logoWrapper}>
              <div className={styles.logoRow}>
                {scrollingPartners.map(
                  (partner: SanityPartnerLogo, index: number) => {
                    const logoSrc = partner.logo?.asset
                      ? urlForImage(partner.logo).width(200).quality(75).url()
                      : "";

                    if (!logoSrc) return null;

                    // Always wrap in a link tag if websiteUrl exists, otherwise just a div
                    if (partner.websiteUrl) {
                      return (
                        <a
                          key={`${partner._id}-${index}`}
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.partnerLink}
                        >
                          <div className={styles.partnerImgLogo}>
                            <Image
                              src={logoSrc}
                              alt={partner.logo?.alt || partner.name}
                              width={140}
                              height={60}
                              sizes="140px"
                              style={{ width: "auto", height: "auto", objectFit: "contain" }}
                            />
                          </div>
                        </a>
                      );
                    }

                    return (
                      <div
                        key={`${partner._id}-${index}`}
                        className={styles.partnerImgLogo}
                      >
                        <Image
                          src={logoSrc}
                          alt={partner.logo?.alt || partner.name}
                          width={140}
                          height={60}
                          sizes="140px"
                          style={{ width: "auto", height: "auto", objectFit: "contain" }}
                        />
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </>
  );
}
