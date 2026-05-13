"use client";

import Image from "next/image";
import styles from "./Testimonials.module.css";
import { FadeIn, StaggerContainer, TextReveal, InteractiveTiltCard } from "../animations/ScrollAnimations";

import { SanityHomePage, SanityTestimonial } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface TestimonialsProps {
  data: SanityHomePage | null;
  testimonials: SanityTestimonial[];
}

export function Testimonials({ data, testimonials }: TestimonialsProps) {
  const testimonialsToDisplay = testimonials?.length > 0 ? testimonials : [
    {
      quote: "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu malesuada.",
      author: "Abebe Kebede",
      role: "IT Operations Director"
    },
    {
      quote: "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu malesuada.",
      author: "Ahmed Omer",
      role: "Senior Project Manager"
    }
  ];

  return (
    <section className={`section ${styles.sectionWrapper}`}>
      {/* Decorative Mountain Background */}
      <div className={styles.bgDecoration}>
        <svg viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}>
          <path d="M0 400L240 320C480 240 960 80 1440 240V400H0V400Z" fill="currentColor" fillOpacity="0.08" />
          <path d="M0 400L360 280C720 160 1080 320 1440 200V400H0V400Z" fill="currentColor" fillOpacity="0.05" />
        </svg>
      </div>

      <div className={`container ${styles.testimonialsContainer}`}>
        <div className={styles.header}>
          <TextReveal 
            text={data?.testimonialsHeading || "What our clients think"} 
            className={styles.heading} 
          />
          <FadeIn direction="up" distance={20} delay={0.2}>
            <p className={styles.description}>
              {data?.testimonialsDescription || (
                <>
                  Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra<br/>
                  lorem sed scelerisque sit in nec arcu malesuada.
                </>
              )}
            </p>
          </FadeIn>
        </div>
        
        <StaggerContainer className={styles.grid} staggerDelay={0.15}>
          {testimonialsToDisplay.map((test: any, index: number) => {
            const initials = test.author?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || '??';
            return (
              <FadeIn key={index} direction="up" distance={40} className={styles.card}>
                <p className={styles.quote}>{test.quote}</p>
                <div className={styles.authorInfo}>
                  <div className={styles.avatarWrapper}>
                    {test.photo ? (
                      <Image 
                        src={urlForImage(test.photo).width(100).height(100).url() || ""} 
                        alt={test.photo.alt || test.author} 
                        width={100} 
                        height={100}
                        className={styles.authorPhoto}
                      />
                    ) : (
                      <div className={styles.authorInitial}>{initials}</div>
                    )}
                  </div>
                  <div className={styles.authorMeta}>
                    <h4 className={styles.authorName}>{test.author}</h4>
                    <p className={styles.authorTitle}>{test.role}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

