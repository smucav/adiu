import Image from "next/image";
import styles from "./WhyWorkWithUs.module.css";

import { SanityCareerPage, SanityWhyWorkFeature } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface WhyWorkWithUsProps {
  data: SanityCareerPage | null;
  features: SanityWhyWorkFeature[];
}

export function WhyWorkWithUs({ data, features }: WhyWorkWithUsProps) {
  const featuresToDisplay = features?.length > 0 ? features : [
    {
      title: "Talented team",
      description: "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu.",
      icon: null,
    },
    {
      title: "Collaborative Culture",
      description: "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu.",
      icon: null,
    },
    {
      title: "Pioneer the Future",
      description: "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu.",
      icon: null,
    }
  ];

  const defaultIcons = ["/images/human_vector.png", "/images/hand_vector.png", "/images/pioneer_the_future.png"];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{data?.whyWorkTitle || "Why should your work with us."}</h2>
          <p className={styles.subtitle}>
            {data?.whyWorkSubtitle || "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu."}
          </p>
        </div>

        <div className={styles.grid}>
          {featuresToDisplay.map((feature: any, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Image 
                  src={urlForImage(feature.icon).width(60).quality(75).url() || defaultIcons[index % defaultIcons.length]} 
                  alt={feature.icon?.alt || feature.title} 
                  fill 
                  sizes="48px"
                  style={{ objectFit: 'contain', objectPosition: 'left center' }} 
                />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardText}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
