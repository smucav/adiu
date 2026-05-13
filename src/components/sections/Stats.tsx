"use client";

import styles from "./Stats.module.css";
import { Button } from "../ui/Button";
import { FadeIn, ScrollCounter } from "../animations/ScrollAnimations";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

import { SanityHomePage, SanityStat } from "@/sanity/lib/types";

interface StatsProps {
  data: SanityHomePage | null;
  stats: SanityStat[];
}

interface StatItemProps {
  stat: SanityStat;
  index: number;
  scrollYProgress: MotionValue<number>;
  totalStats: number;
}

function StatItem({ stat, index, scrollYProgress, totalStats }: StatItemProps) {
  const isAbove = index % 2 === 0;

  // Calculate the segment of the scroll that this stat occupies
  const step = 1 / totalStats;
  const start = index * step;
  const end = (index + 1) * step;
  const range: [number, number] = [start, end];

  const opacity = useTransform(scrollYProgress, range, [0, 1]);
  const scale = useTransform(scrollYProgress, range, [0.5, 1]);
  const y = useTransform(scrollYProgress, range, [isAbove ? -20 : 20, 0]);

  return (
    <div className={`${styles.statItem} ${isAbove ? styles.above : styles.below}`}>
      <motion.div
        className={styles.statContent}
        style={{ opacity, y }}
      >
        <h3 className={styles.statValue}>
          <ScrollCounter
            value={stat.number}
            scrollYProgress={scrollYProgress}
            range={range}
          />
          <span className={styles.plus}>+</span>
        </h3>
        <p className={styles.statLabel}>{stat.title}</p>
      </motion.div>

      <motion.div
        className={styles.statNode}
        style={{ scale, opacity }}
      >
        <div className={styles.nodeRipple} />
      </motion.div>
    </div>
  );
}

export function Stats({ data, stats }: StatsProps) {
  const statsToDisplay = stats?.length > 0 ? stats : [
    { number: "2,257", title: "Telecom Sites", description: "Strategic infrastructure across the region.", themeColor: 'dark' },
    { number: "1,133", title: "Site Implementations", description: "Successful end-to-end site deployments.", themeColor: 'brand' },
    { number: "5,000", title: "Concurrent Users", description: "Robust performance for high-traffic networks.", themeColor: 'olive' }
  ] as SanityStat[];

  const wrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 85%", "end 85%"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className={`section`}>
      <div className={`container ${styles.statsContainer}`}>
        <div className={styles.headerWrapper}>
          <FadeIn direction="up" distance={30}>
            <div className={styles.headerColumn}>
              <h2 className={styles.heading}>{data?.statsHeading || "Our journey, by stats"}</h2>
              <p className={styles.description}>
                {data?.statsDescription || "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu malesuada."}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" distance={20} delay={0.2} className={styles.headerAction}>
            <Button href={data?.statsCtaLink || "/about"} variant="primary">
              {data?.statsCtaText || "Learn more"} <span className={styles.arrow}>&rsaquo;</span>
            </Button>
          </FadeIn>
        </div>

        <div className={styles.minimalistWrapper} ref={wrapperRef}>
          <div className={styles.mainLine}>
            <motion.div
              className={styles.lineProgress}
              style={{ scaleX, transformOrigin: "left" }}
            />
          </div>

          <div className={styles.statsRow}>
            {statsToDisplay.map((stat, index) => (
              <StatItem
                key={index}
                stat={stat}
                index={index}
                totalStats={statsToDisplay.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
