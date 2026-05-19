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
      title: "Ownership from Day One",
      description: "At Adiu, ideas are welcomed regardless of title. We trust our team members to take responsibility, contribute solutions, and make an impact early.",
      icon: null,
    },
    {
      title: "A Culture of Collaboration",
      description: "We work across teams, share knowledge openly, and support each other in achieving ambitious goals.",
      icon: null,
    },
    {
      title: "Growth-Focused Environment",
      description: "We encourage continuous learning, experimentation, and professional development. As Adiu grows, our people grow with it.",
      icon: null,
    },
    {
      title: "Meaningful Work",
      description: "Everything we build is designed to solve real operational problems for real businesses. Your work will matter.",
      icon: null,
    }
  ];

  const defaultIcons = ["/images/human_vector.png", "/images/hand_vector.png", "/images/pioneer_the_future.png"];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{data?.whyWorkTitle || "What It’s Like to Work Here"}</h2>
          <p className={styles.subtitle}>
            {data?.whyWorkSubtitle || "We move fast, collaborate openly, and value people who take initiative."}
          </p>
        </div>

        <div className={styles.grid}>
          {featuresToDisplay.map((feature: any, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                {feature.icon ? (
                  <Image 
                    src={urlForImage(feature.icon).width(60).quality(75).url()}
                    alt={feature.icon?.alt || feature.title} 
                    fill 
                    sizes="48px"
                    style={{ objectFit: 'contain', objectPosition: 'left center' }} 
                  />
                ) : (
                  <Image 
                    src={defaultIcons[index % defaultIcons.length]}
                    alt={feature.title} 
                    fill 
                    sizes="48px"
                    style={{ objectFit: 'contain', objectPosition: 'left center' }} 
                  />
                )}
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
