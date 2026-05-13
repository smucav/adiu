import Image from "next/image";
import styles from "./ProjectShowcase.module.css";

import { SanityProjectsPage } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface ProjectShowcaseProps {
  data: SanityProjectsPage | null;
}

export function ProjectShowcase({ data }: ProjectShowcaseProps) {
  return (
    <section className={styles.showcaseSection}>
      <div className="container">
        <div className={styles.showcaseContainer}>
          
          {/* Alarm and Sensor Row */}
          <div className={styles.alarmRow}>
            <div className={`${styles.imageCard} ${styles.alarmImageWrapper}`}>
              <Image 
                src={data?.showcase1Image ? urlForImage(data.showcase1Image).width(800).quality(80).url() : "/images/alarm_sensor.png"} 
                alt={data?.showcase1Image?.alt || data?.showcase1Title || "Alarm and Sensor Commissioning"} 
                fill 
                className={styles.image}
                sizes="(max-width: 992px) 100vw, 60vw"
              />
            </div>
            <div className={styles.textBlock}>
              <h2>{data?.showcase1Title || "Alarm and Sensor Commissioning"}</h2>
              <p>
                {data?.showcase1Description || "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu."}
              </p>
            </div>
          </div>

          {/* ACDB Row */}
          <div className={styles.acdbRow}>
            <div className={`${styles.imageCard} ${styles.acdbImageLeft}`}>
              <Image 
                src={data?.showcase2ImageLeft ? urlForImage(data.showcase2ImageLeft).width(400).quality(80).url() : "/images/tower.png"} 
                alt={data?.showcase2ImageLeft?.alt || "Tower"} 
                fill 
                className={styles.image}
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 992px) 100vw, 30vw"
              />
            </div>
            
            <div className={`${styles.textBlock} ${styles.acdbTextCenter}`}>
              <h2>{data?.showcase2Title || "ACDB Commissioning"}</h2>
              <p>
                {data?.showcase2Description || "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu."}
              </p>
            </div>

            <div className={`${styles.imageCard} ${styles.acdbImageRight}`}>
              <Image 
                src={data?.showcase2ImageRight ? urlForImage(data.showcase2ImageRight).width(600).quality(80).url() : "/images/acdb_right.png"} 
                alt={data?.showcase2ImageRight?.alt || "Commissioning board"} 
                fill 
                className={styles.image}
                sizes="(max-width: 992px) 100vw, 45vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
