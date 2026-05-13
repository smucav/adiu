'use client';

import Image from "next/image";

import styles from "./FocusedServices.module.css";

import { SanityProjectsPage, SanityFocusedService } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface FocusedServicesProps {
  data: SanityProjectsPage | null;
  services: SanityFocusedService[];
}

import { motion } from "framer-motion";

export function FocusedServices({ data, services }: FocusedServicesProps) {
  const servicesToDisplay = (Array.isArray(services) && services.length > 0) ? services : [
    {
      title: "Rectifier Module Commissioning",
      description: "Expert installation and commissioning of power rectifier modules for resilient infrastructure.",
      category: "Power Systems",
      features: ["DC Power Systems", "Battery Backup", "Load Testing"]
    },
    {
      title: "Radio Unit Installation",
      description: "Precision deployment of high-capacity radio units for optimal network coverage.",
      category: "Network Ops",
      features: ["RAN Optimization", "Fiber Integration", "Site Audits"]
    },
    {
      title: "Data Center Infrastructure",
      description: "Scalable solutions for modern data centers, from cooling to cable management.",
      category: "Critical Facilities",
      features: ["PUE Optimization", "Rack Design", "Climate Control"]
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
            {data?.servicesHeading || "Focused on Technical Excellence"}
          </motion.h2>
        </div>

        <div className={styles.grid}>
          {servicesToDisplay.map((service: any, index: number) => {
            return (
              <motion.div 
                key={index} 
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircle}>
                    <div className={styles.innerDot} />
                  </div>
                  <span className={styles.category}>{service.category || 'Specialized'}</span>
                </div>
                
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.featureList}>
                    {(service.features || ["High Performance", "Scalable"]).map((feature: string, fIdx: number) => (
                      <span key={fIdx} className={styles.featureTag}>{feature}</span>
                    ))}
                  </div>
                  <div className={styles.index}>0{index + 1}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


