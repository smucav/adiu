"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Target, Shield, Check } from "lucide-react";
import styles from "./VisionMissionValues.module.css";
import { SanityAboutPage } from "@/sanity/lib/types";
import { Counter } from "../../animations/Counter";

interface VisionMissionValuesProps {
  data: SanityAboutPage | null;
}

type TabType = "vision" | "mission" | "values";

export function VisionMissionValues({ data }: VisionMissionValuesProps) {
  const [activeTab, setActiveTab] = useState<TabType>("vision");

  const metrics = data?.missionStats || [
    { value: "2,257", label: "Telecom Sites" },
    { value: "50", label: "Civil Work Projects" },
    { value: "95%", label: "ISO Certification" }
  ];

  const visionText = data?.visionStatement || "To be the leading engineering and telecommunications partner in Africa, driving innovation and infrastructure excellence through sustainable and cutting-edge solutions.";
  const missionText = data?.missionDescription || "To provide superior engineering services that empower businesses and communities through seamless connectivity, technical expertise, and unwavering commitment to quality.";
  const coreValues = data?.coreValues || ["Integrity", "Excellence", "Innovation", "Safety", "Collaboration"];

  const tabs = [
    { id: "vision", label: "Our Vision", icon: Eye },
    { id: "mission", label: "Our Mission", icon: Target },
    { id: "values", label: "Core Values", icon: Shield },
  ];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.tabsContainer}`}>
        {/* Tab Buttons */}
        <div className={styles.tabList}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`${styles.tabButton} ${isActive ? styles.activeTab : ""}`}
                onClick={() => setActiveTab(tab.id as TabType)}
              >
                <div className={styles.iconWrapper}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className={styles.tabPanel}>
          <div className={styles.contentSide}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {activeTab === "vision" && (
                  <>
                    <h2 className={styles.heading}>Our Vision</h2>
                    <p className={styles.paragraph}>{visionText}</p>
                  </>
                )}
                {activeTab === "mission" && (
                  <>
                    <h2 className={styles.heading}>Our Mission</h2>
                    <p className={styles.paragraph}>{missionText}</p>
                  </>
                )}
                {activeTab === "values" && (
                  <>
                    <h2 className={styles.heading}>Core Values</h2>
                    <ul className={styles.valuesList}>
                      {coreValues.map((value, index) => (
                        <motion.li
                          key={index}
                          className={styles.valueItem}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Check className={styles.checkIcon} size={20} />
                          {value}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Fixed Metrics Sidebar */}
        <div className={styles.statsSide}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles.metricCard}>
              <div className={styles.metricText}>
                <span className={styles.metricValue}>
                  <Counter value={metric.value} />
                </span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
