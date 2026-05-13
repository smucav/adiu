"use client";

import styles from "./Mission.module.css";
import { FadeIn, StaggerContainer } from "../../animations/ScrollAnimations";
import { Counter } from "../../animations/Counter";
import { motion } from "framer-motion";

import { SanityAboutPage } from "@/sanity/lib/types";

interface MissionProps {
  data: SanityAboutPage | null;
}

export function Mission({ data }: MissionProps) {
  const stats = data?.missionStats || [
    { value: "2,257", label: "Telecom site" },
    { value: "50", label: "Civil work project" },
    { value: "95%", label: "ISO Certification" }
  ];

  return (
    <section className={styles.missionSection}>
      {/* Dynamic Background Elements */}
      <div className={styles.bgEffects}>
        <div className={styles.grid} />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={styles.glow} 
        />
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.titleColumn}>
          <FadeIn direction="right" distance={40}>
            <h2 className={styles.heading}>
              Our <span className={styles.accent}>Mission</span> <br />& Values
            </h2>
          </FadeIn>
        </div>

        <div className={styles.contentColumn}>
          <FadeIn direction="up" distance={30} delay={0.2}>
            <div className={styles.description}>
              {data?.missionDescription || (
                "To provide superior engineering services that empower businesses and communities through seamless connectivity."
              )}
            </div>
          </FadeIn>

          <StaggerContainer className={styles.statsGrid} staggerDelay={0.15}>
            {stats.map((stat, i) => (
              <FadeIn key={i} direction="up" distance={40} delay={0.3 + (i * 0.1)}>
                <motion.div 
                  className={styles.statCard}
                  whileHover={{ y: -10 }}
                >
                  <div className={styles.statValue}>
                    <Counter value={stat.value} />
                  </div>
                  <p className={styles.statLabel}>{stat.label}</p>
                </motion.div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
