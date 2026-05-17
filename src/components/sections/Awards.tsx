"use client";

import Image from "next/image";
import styles from "./Awards.module.css";
import { SanityHomePage, SanityAward } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import {
  FadeIn,
  StaggerContainer,
  TextReveal,
  Counter,
} from "../animations/ScrollAnimations";

interface AwardsProps {
  data: SanityHomePage | null;
  awards: SanityAward[];
}

export function Awards({ data, awards }: AwardsProps) {
  // Ensure we have enough awards or mock them
  const displayAwards =
    Array.isArray(awards) && awards.length > 0 ? awards : mockAwards;

  const displayStats = data?.awardsStats && data.awardsStats.length > 0
    ? data.awardsStats
    : [
        { value: "12+", label: "Awards" },
        { value: "8", label: "Certifications" },
        { value: "6", label: "Partners" },
        { value: "5", label: "Years" }
      ];

  // Distribute awards into rows
  const row1Awards = displayAwards.slice(0, 3);
  const row2Awards = displayAwards.slice(3, 7);
  const row3Award = displayAwards[7] || displayAwards[0];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header Zone */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <FadeIn direction="up" distance={20}>
              <span className={styles.eyebrow}>Recognition</span>
            </FadeIn>
            <TextReveal
              text={data?.awardsHeading || "We've Won Awards"}
              className={styles.heading}
              delay={0.1}
            />
          </div>
          <div className={styles.headerRight}>
            <FadeIn direction="up" distance={20} delay={0.2}>
              <p className={styles.subtitle}>
                {data?.awardsDescription ||
                  "Our commitment to excellence has been recognized by industry leaders worldwide."}
              </p>
            </FadeIn>
            <StaggerContainer
              staggerDelay={0.1}
              delay={0.3}
              className={styles.statsRow}
            >
              {displayStats.map((item, index) => (
                <StatItem key={index} value={item.value} label={item.label} />
              ))}
            </StaggerContainer>
          </div>
        </header>

        <FadeIn direction="up" distance={10} delay={0.4}>
          <div className={styles.divider} />
        </FadeIn>

        {/* Card Grid */}
        <StaggerContainer
          staggerDelay={0.08}
          delay={0.5}
          className={styles.grid}
        >
          {/* Row 1 */}
          <div className={styles.row1}>
            {row1Awards[0] && (
              <FadeIn direction="up" distance={30}>
                <AwardCard award={row1Awards[0]} featured />
              </FadeIn>
            )}
            {row1Awards[1] && (
              <FadeIn direction="up" distance={30}>
                <AwardCard award={row1Awards[1]} />
              </FadeIn>
            )}
            {row1Awards[2] && (
              <FadeIn direction="up" distance={30}>
                <AwardCard award={row1Awards[2]} />
              </FadeIn>
            )}
          </div>

          {/* Row 2 & 3 Combined */}
          <div className={styles.row2}>
            {row2Awards.map((award, i) => (
              <FadeIn key={award._id || i} direction="up" distance={30}>
                <AwardCard award={award} />
              </FadeIn>
            ))}
            <FadeIn direction="up" distance={30}>
              <AwardCard award={row3Award} />
            </FadeIn>
            {/*<FadeIn
              direction="up"
              distance={30}
              className={styles.timelineWrapper}
            >
              <TimelineCard />
            </FadeIn>*/}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>
        <Counter value={value} />
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function AwardCard({
  award,
  featured = false,
}: {
  award: SanityAward;
  featured?: boolean;
}) {
  const badgeColorClass =
    award.status === "amber"
      ? styles.badgeAmber
      : award.status === "blue"
        ? styles.badgeBlue
        : styles.badgeGreen;

  return (
    <div
      className={`${styles.awardCard} ${featured ? styles.featuredCard : ""}`}
    >
      <div className={styles.imageArea}>
        {award.status && (
          <div className={`${styles.statusBadge} ${badgeColorClass}`}>
            {award.status}
          </div>
        )}
        {award.badgeImage ? (
          <Image
            src={urlForImage(award.badgeImage).width(200).url()}
            alt={award.badgeImage.alt || award.name}
            width={200}
            height={200}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div
            style={{
              width: "60%",
              height: "60%",
              backgroundColor: "#e5e7eb",
              borderRadius: "4px",
            }}
          />
        )}
      </div>
      <div className={styles.textArea}>
        <h3 className={styles.awardName}>{award.name}</h3>
        <p className={styles.awardMeta}>
          {award.org} {award.year ? `• ${award.year}` : ""}
        </p>
      </div>
    </div>
  );
}

// function TimelineCard() {
//   const timelineData = [
//     { year: "2024", name: "Global Innovation Excellence" },
//     { year: "2023", name: "Sustainability Leader Award" },
//     { year: "2022", name: "Top Infrastructure Partner" },
//     { year: "2021", name: "Service Quality Distinction" },
//   ];

//   return (
//     <div className={styles.timelineCard}>
//       <h3 className={styles.timelineTitle}>Award Timeline</h3>
//       <div className={styles.timelineList}>
//         {timelineData.map((item, i) => (
//           <div key={i} className={styles.timelineItem}>
//             <div className={styles.timelineDot} />
//             <span className={styles.timelineYear}>{item.year}</span>
//             <span className={styles.timelineAward}>{item.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

const mockAwards: SanityAward[] = [
  {
    _id: "1",
    name: "Best Service Provider",
    org: "Telecom Africa",
    year: "2024",
    status: "green",
    description: "",
    badgeImage: null as any,
    order: 1,
  },
  {
    _id: "2",
    name: "Innovation in Tech",
    org: "Global Forum",
    year: "2023",
    status: "amber",
    description: "",
    badgeImage: null as any,
    order: 2,
  },
  {
    _id: "3",
    name: "Gold Partner Status",
    org: "Huawei",
    year: "2023",
    status: "blue",
    description: "",
    badgeImage: null as any,
    order: 3,
  },
  {
    _id: "4",
    name: "Infrastructure Excellence",
    org: "ITU",
    year: "2022",
    status: "green",
    description: "",
    badgeImage: null as any,
    order: 4,
  },
  {
    _id: "5",
    name: "Outstanding Achievement",
    org: "Ericsson",
    year: "2022",
    status: "amber",
    description: "",
    badgeImage: null as any,
    order: 5,
  },
  {
    _id: "6",
    name: "Regional Leader Award",
    org: "Connect Africa",
    year: "2021",
    status: "blue",
    description: "",
    badgeImage: null as any,
    order: 6,
  },
  {
    _id: "7",
    name: "Safety First Certificate",
    org: "IOSH",
    year: "2021",
    status: "green",
    description: "",
    badgeImage: null as any,
    order: 7,
  },
  {
    _id: "8",
    name: "Quality Management",
    org: "ISO",
    year: "2020",
    status: "amber",
    description: "",
    badgeImage: null as any,
    order: 8,
  },
];
