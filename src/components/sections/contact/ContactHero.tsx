"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./ContactHero.module.css";

import { SanityContactPage } from "@/sanity/lib/types";

interface ContactHeroProps {
  data: SanityContactPage | null;
}

export function ContactHero({ data }: ContactHeroProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    
    // IMPORTANT: Replace this access key with your actual key from web3forms.com
    // or put it in your .env.local as NEXT_PUBLIC_WEB3FORMS_KEY
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
    formData.append("access_key", accessKey);

    // Optional settings for Web3Forms
    formData.append("subject", "New Inquiry from ADIU Website");
    formData.append("from_name", "ADIU Notifications");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again later.");
    }
  };

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
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.inputLabel}>full name</label>
                  <input type="text" name="name" className={styles.inputField} required disabled={status === "submitting"} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.inputLabel}>email</label>
                  <input type="email" name="email" className={styles.inputField} required disabled={status === "submitting"} />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.inputLabel}>phone number</label>
                <input type="tel" name="phone" className={styles.inputField} disabled={status === "submitting"} />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.inputLabel}>
                  write your message here.
                </label>
                <textarea
                  name="message"
                  className={`${styles.inputField} ${styles.textareaField}`}
                  required
                  disabled={status === "submitting"}
                ></textarea>
              </div>

              {status === "error" && (
                <div style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  {errorMessage}
                </div>
              )}

              {status === "success" && (
                <div style={{ color: "var(--brand-green)", fontSize: "0.875rem", marginBottom: "1rem", fontWeight: "bold" }}>
                  Message sent successfully! We will get back to you soon.
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className={styles.submitBtn}
                disabled={status === "submitting" || status === "success"}
              >
                {status === "submitting" ? "Sending..." : status === "success" ? "Sent ✓" : "Send Message"} <span style={{ marginLeft: "8px" }}>&rsaquo;</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
