"use client";

import { useState } from "react";
import styles from "./FAQSection.module.css";

import { SanityContactPage, SanityFAQ } from "@/sanity/lib/types";

interface FAQSectionProps {
  data: SanityContactPage | null;
  faqs: SanityFAQ[];
}

export function FAQSection({ data, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first one open

  const faqsToDisplay = faqs?.length > 0 ? faqs : [
    {
      question: "What specialized services does ADIU Communication provide in the telecom sector?",
      answer: "We specialize in end-to-end telecom infrastructure solutions, including site survey, antenna installation, radio unit commissioning, and maintenance. Our expertise covers both mobile network expansion and critical infrastructure upgrades."
    },
    {
      question: "How can I request a technical consultation or project quote?",
      answer: "You can reach out through our contact form above or email us directly at info@adiucommunications.com. We typically respond to initial inquiries within 24–48 hours to schedule a deep-dive consultation."
    },
    {
      question: "In which regions of East Africa do you currently offer engineering services?",
      answer: "While headquartered in Addis Ababa, Ethiopia, we provide project management and engineering services across the East African region. Contact our team to discuss specific regional mobilization for your project."
    },
    {
      question: "Is ADIU currently hiring specialized technicians or engineers?",
      answer: "We are always looking for talented civil engineers, telecom technicians, and project managers. Please check our Career page for open roles or submit your CV to our recruitment team."
    },
    {
      question: "What are your quality assurance standards for infrastructure projects?",
      answer: "We adhere strictly to international ISO standards and local regulatory requirements. Our team performs rigourous testing at every stage—from site commissioning to final project handover—to ensure 99.9% reliability."
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{data?.faqTitle || "frequently asked questions"}</h2>
          <p className={styles.subtitle}>
            {data?.faqSubtitle || "Find quick answers to common questions about our partnership models, engineering capabilities, and project delivery."}
          </p>
        </div>

        <div className={styles.accordion}>
          {faqsToDisplay.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button 
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className={styles.icon}>
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className={styles.answer}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
