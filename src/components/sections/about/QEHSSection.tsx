"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./QEHSSection.module.css";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface Policy {
  title: string;
  description: string;
  image: any;
}

interface QEHSSectionProps {
  data: {
    qehsHeading?: string;
    qehsDescription?: string;
    qehsPolicies?: Policy[];
  };
}

const DEFAULT_POLICIES: Policy[] = [
  {
    title: "Quality Assurance",
    description:
      "We maintain rigorous quality control standards across all our operations to ensure excellence in every project we deliver. Our commitment to quality is reflected in our ISO certifications.",
    image: null,
  },
  {
    title: "Environmental Stewardship",
    description:
      "Our commitment to the environment drives us to implement sustainable practices and minimize our ecological footprint. We actively monitor our carbon emissions.",
    image: null,
  },
  {
    title: "Health & Occupational Safety",
    description:
      "We prioritize a zero-harm culture, ensuring a safe and healthy working environment for all our stakeholders. Our comprehensive safety training programs ensure protection.",
    image: null,
  },
];

export const QEHSSection: React.FC<QEHSSectionProps> = ({ data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const policies =
    data.qehsPolicies && data.qehsPolicies.length > 0
      ? data.qehsPolicies
      : DEFAULT_POLICIES;

  return <QEHSContent data={{ ...data, qehsPolicies: policies }} />;
};

const QEHSContent: React.FC<QEHSSectionProps> = ({ data }) => {
  const { qehsHeading, qehsPolicies = [] } = data;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const totalItems = qehsPolicies.length;
  // Dynamic scaling: starts compacting after 5 items
  const isCompact = totalItems > 5;
  const itemScale = isCompact ? Math.max(0.75, 5 / totalItems) : 1;
  const itemHeight = isCompact ? Math.max(350, 600 * itemScale) : 600;

  const pathYStep = 1000;
  const generatePath = () => {
    let d = "M 500 0";
    for (let i = 0; i < totalItems; i++) {
      const y = i * pathYStep + pathYStep / 2;
      const endY = (i + 1) * pathYStep;
      const x = i % 2 === 0 ? 350 : 650; // Slightly tighter path in compact mode
      d += ` C 500 ${y - 350}, ${x} ${y - 350}, ${x} ${y}`;
      d += ` C ${x} ${y + 350}, 500 ${y + 350}, 500 ${endY}`;
    }
    return d;
  };

  const riverPath = generatePath();

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.span className={styles.subtitle}>Our Standards</motion.span>
          <h2 className={styles.title}>{qehsHeading || "Our QEHS Policy"}</h2>
        </div>

        <div
          className={styles.mazeWrapper}
          style={
            {
              height: `${totalItems * itemHeight}px`,
              "--item-scale": itemScale,
              "--item-height": `${itemHeight}px`,
            } as React.CSSProperties
          }
        >
          <div className={styles.mazePathContainer}>
            <svg
              viewBox={`0 0 1000 ${totalItems * pathYStep}`}
              fill="none"
              preserveAspectRatio="none"
              className={styles.svgPath}
            >
              <path d={riverPath} className={styles.riverPath} />
              <motion.path
                d={riverPath}
                className={styles.riverProgress}
                style={{ pathLength: smoothProgress }}
              />
            </svg>
          </div>

          {qehsPolicies.map((policy, index) => (
            <PolicyItem
              key={index}
              policy={policy}
              index={index}
              globalProgress={smoothProgress}
              totalItems={totalItems}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PolicyItem = ({
  policy,
  index,
  globalProgress,
  totalItems,
}: {
  policy: Policy;
  index: number;
  globalProgress: any;
  totalItems: number;
}) => {
  const isEven = index % 2 === 1;
  const step = 1 / totalItems;
  const start = index * step;

  // Faster connection range
  const itemProgress = useTransform(
    globalProgress,
    [start, start + step * 0.3],
    [0, 1],
  );

  // Content slides in faster and stays longer
  const xText = useTransform(itemProgress, [0, 0.8], [isEven ? 400 : -400, 0]);
  const xImage = useTransform(itemProgress, [0, 0.8], [isEven ? -400 : 400, 0]);
  const opacity = useTransform(itemProgress, [0, 0.4], [0, 1]);

  // Fix number visibility and glow
  const numberStroke = useTransform(
    itemProgress,
    [0, 0.5, 1],
    [
      "1px rgba(130, 195, 65, 0.2)",
      "1px rgba(130, 195, 65, 0.6)",
      "2px rgba(130, 195, 65, 1)",
    ],
  );
  const numberTextOpacity = useTransform(itemProgress, [0, 0.4], [0.2, 0.6]);
  const activeGlowOpacity = useTransform(itemProgress, [0.7, 1], [0, 1]);

  return (
    <div className={`${styles.policyItem} ${isEven ? styles.reverse : ""}`}>
      {/* Milestone Number */}
      <div className={styles.numberWrapper}>
        <motion.span
          className={styles.largeNumber}
          style={{
            opacity: numberTextOpacity,
            WebkitTextStroke: numberStroke,
          }}
        >
          {index + 1}
        </motion.span>
        {/* Secondary active glow layer */}
        <motion.span
          className={`${styles.largeNumber} ${styles.glowLayer}`}
          style={{
            opacity: activeGlowOpacity,
            WebkitTextStroke: "2px rgba(130, 195, 65, 1)",
            filter: "drop-shadow(0 0 30px rgba(130, 195, 65, 0.8))",
          }}
        >
          {index + 1}
        </motion.span>
      </div>

      <motion.div style={{ x: xText, opacity }} className={styles.textContent}>
        <h3 className={styles.policyTitle}>{policy.title}</h3>
        <p className={styles.policyText}>{policy.description}</p>
        <div className={styles.actionCircle}>
          <div className={styles.arrow} />
        </div>
      </motion.div>

      <motion.div
        style={{ x: xImage, opacity }}
        className={styles.imageContent}
      >
        <div className={styles.policyImageWrapper}>
          {policy.image ? (
            <Image
              src={urlForImage(policy.image).url()}
              alt={policy.image.alt || policy.title}
              fill
              className={styles.policyImage}
              sizes="50vw"
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <div className={styles.placeholderGlow} />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
