import Link from "next/link";
import Image from "next/image";
import styles from "./ServicesGrid.module.css";
import { FadeIn, StaggerContainer, InteractiveTiltCard } from "../../animations/ScrollAnimations";
import { SanityServicesPage, SanityFocusedService } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface ServicesGridProps {
  pageData: SanityServicesPage | null;
  services: SanityFocusedService[];
}

export function ServicesGrid({ pageData, services }: ServicesGridProps) {
  return (
    <section className={styles.section}>
      <div className="container">
        <FadeIn direction="up" distance={30}>
          <div className={styles.intro}>
            <span className={styles.introLabel}>What we do</span>
            <h2 className={styles.introTitle}>
              {pageData?.introHeading || "Comprehensive ICT Infrastructure Services"}
            </h2>
            <p className={styles.introText}>
              {pageData?.introText || "From initial consultation and design to installation, commissioning, and maintenance, we offer a full suite of services to support your telecommunications and digital infrastructure needs."}
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className={styles.grid} staggerDelay={0.1}>
          {services.map((service) => (
            <FadeIn key={service._id} direction="up" distance={40}>
              <InteractiveTiltCard>
                <div className={styles.serviceCard}>
                  <div className={styles.imageWrapper}>
                    {service.image?.asset ? (
                      <Image 
                        src={urlForImage(service.image).width(400).quality(75).url()} 
                        alt={service.image?.alt || service.title} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    ) : (
                      <div className="placeholder-image" />
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    {service.category && (
                      <span className={styles.category}>{service.category}</span>
                    )}
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDesc}>{service.description}</p>
                    
                    <Link href={`/services/${service.slug?.current || '#'}`} className={styles.learnMore}>
                      Explore Service <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </InteractiveTiltCard>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
