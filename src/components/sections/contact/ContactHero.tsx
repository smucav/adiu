"use client";

import { Button } from "@/components/ui/Button";
import styles from "./ContactHero.module.css";

import { SanityContactPage } from "@/sanity/lib/types";

interface ContactHeroProps {
  data: SanityContactPage | null;
}

export function ContactHero({ data }: ContactHeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.layout}>
          {/* Info Column */}
          <div className={styles.infoColumn}>
            <span className={styles.label}>
              {data?.heroLabel || "Get in Touch"}
            </span>
            <h1 className={styles.title}>{data?.heroTitle || "Contact Us"}</h1>
            <p className={styles.subtitle}>
              {data?.heroSubtitle ||
                "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu malesuada."}
            </p>

            <div className={styles.infoBlock}>
              <h3>{data?.addressHeading || "Addis Ababa"}</h3>
              <p>
                {data?.addressText ||
                  "Lorem ipsum dolor sit amet consectetur viverra velit faucibus."}
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h3>{data?.emailHeading || "info@adiucommunications.com"}</h3>
              <p>
                {data?.emailText ||
                  "Lorem ipsum dolor sit amet consectetur viverra velit faucibus."}
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className={styles.formColumn}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.inputLabel}>full name</label>
                  <input type="text" className={styles.inputField} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.inputLabel}>email</label>
                  <input type="email" className={styles.inputField} />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.inputLabel}>phone number</label>
                <input type="tel" className={styles.inputField} />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.inputLabel}>
                  write your message here.
                </label>
                <textarea
                  className={`${styles.inputField} ${styles.textareaField}`}
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="primary"
                className={styles.submitBtn}
              >
                Send Message <span style={{ marginLeft: "8px" }}>&rsaquo;</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
