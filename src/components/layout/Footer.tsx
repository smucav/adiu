import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

import { SanityGlobalSettings } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface FooterProps {
  settings: SanityGlobalSettings | null;
}

export function Footer({ settings }: FooterProps) {
  const logoSrc = settings?.logoImage?.asset 
    ? urlForImage(settings.logoImage).width(120).quality(80).url() 
    : "/images/company_logo.png";

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <Image 
                src={logoSrc} 
                alt={settings?.logoImage?.alt || settings?.siteTitle || "ADIU"} 
                width={60} 
                height={60}
                style={{ objectFit: 'contain' }} 
              />
              <h3 className={styles.brandName}>{settings?.siteTitle || "ADIU"}</h3>
            </div>
            <p className={styles.brandDesc}>
              {settings?.footerBrandDesc || "Leading the way in high-tech communication infrastructure and digital excellence across the region."}
            </p>
            <div className={styles.socials}>
              {settings?.socialUrls?.facebook && (
                <a href={settings.socialUrls.facebook} className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
              )}
              {settings?.socialUrls?.linkedin && (
                <a href={settings.socialUrls.linkedin} className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
              )}
              {settings?.socialUrls?.instagram && (
                <a href={settings.socialUrls.instagram} className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
              )}
              {settings?.socialUrls?.twitter && (
                <a href={settings.socialUrls.twitter} className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Twitter">tw</a>
              )}
              {settings?.socialUrls?.youtube && (
                <a href={settings.socialUrls.youtube} className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="YouTube">yt</a>
              )}
            </div>
          </div>

          {/* Navigation Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Company</h4>
            <nav className={styles.nav}>
              <Link href="/about">About Us</Link>
              <Link href="/services">Our Services</Link>
              <Link href="/projects">Our Projects</Link>
              <Link href="/blog">Latest Blogs</Link>
              <Link href="/career">Careers</Link>
            </nav>
          </div>

          {/* Solutions Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Solutions</h4>
            <nav className={styles.nav}>
              <Link href="/services">Infrastructure</Link>
              <Link href="/services">Enterprise Network</Link>
              <Link href="/services">Cyber Security</Link>
              <Link href="/services">Cloud Services</Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Get in touch</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div>
                  <div className={styles.contactLabel}>Email us</div>
                  <div className={styles.contactValue}>
                    {settings?.supportEmail || "hello@adiu.com"}
                  </div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div>
                  <div className={styles.contactLabel}>Call us</div>
                  <div className={styles.contactValue}>
                    {settings?.supportPhone || "+251 11 661 0000"}
                  </div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div>
                  <div className={styles.contactLabel}>Visit us</div>
                  <div className={styles.contactValue}>
                    {settings?.supportAddress || "Bole Road, Addis Ababa, Ethiopia"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {settings?.siteTitle || "Adiu Communication"}. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href={settings?.privacyPolicyUrl || "/privacy"}>Privacy Policy</Link>
            <Link href={settings?.termsUrl || "/terms"}>Terms of Service</Link>
            <Link href="/cookies">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
