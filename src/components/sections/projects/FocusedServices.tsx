'use client';

import Image from "next/image";
import styles from "./FocusedServices.module.css";
import { SanityProjectsPage } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { motion } from "framer-motion";

interface FocusedServicesProps {
  data: SanityProjectsPage | null;
  services: any[]; // These are now SanityProject objects
}

export function FocusedServices({ data, services }: FocusedServicesProps) {
  const servicesToDisplay = (Array.isArray(services) && services.length > 0) ? services : [
    {
      title: "Sample Project",
      description: "Description of the project.",
      category: "Infrastructure",
      client: "Sample Client"
    }
  ];

  return (
    <section className={styles.servicesSection}>
      <div className="container">
        <div className={styles.header}>
          <motion.span 
            className={styles.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Capabilities
          </motion.span>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {data?.servicesHeading || "Featured Projects"}
          </motion.h2>
        </div>

        <div className={styles.grid}>
          {servicesToDisplay.map((project: any, index: number) => {
            return (
              <motion.div 
                key={index} 
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {project.mainImage && (
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={urlForImage(project.mainImage).url()} 
                      alt={project.title || "Project"} 
                      fill 
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span className={styles.category}>{project.category || 'Specialized'}</span>
                    {project.client && <span className={styles.client}>{project.client}</span>}
                  </div>
                  
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.description}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.index}>0{index + 1}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
