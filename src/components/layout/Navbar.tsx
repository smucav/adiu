import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { Button } from "../ui/Button";

import { SanityGlobalSettings } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

interface NavbarProps {
  settings: SanityGlobalSettings | null;
}

export function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  // Unified theme logic: No more hardcoded page checks.
  // We use a high-contrast glass pill that works on any background.
  const isDarkText = true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rawLinks = settings?.navLinks || [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Career", href: "/career" },
  ];

  // Ensure "Services" is included even if Sanity data is outdated
  const hasServices = rawLinks.some((link) => link.href === "/services");
  const navLinks = hasServices
    ? rawLinks
    : [
        ...rawLinks.slice(0, 2),
        { label: "Services", href: "/services" },
        ...rawLinks.slice(2),
      ];

  const logoSrc = settings?.logoImage
    ? urlForImage(settings.logoImage).width(200).quality(80).url()
    : "/images/company_logo.png";

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${isDarkText ? styles.darkText : styles.lightText}`}
    >
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <Link
            href="/"
            style={{
              display: "block",
              position: "relative",
              width: 160,
              height: 50,
            }}
          >
            <Image
              src={logoSrc}
              alt={settings?.logoImage?.alt || settings?.siteTitle || "ADIU"}
              fill
              sizes="160px"
              style={{
                objectFit: "contain",
                objectPosition: "left center",
                // Keep logo original colors, it will be visible on our white glass bar
                filter: "none",
              }}
              priority
            />
          </Link>
        </div>

        <div className={styles.navLinksWrapper}>
          <nav className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.actions}>
          {/*<Link href="/contact" className={styles.loginLink}>
            contact <span className={styles.loginArrow}>&rsaquo;</span>
          </Link>*/}
          <Button
            href="/contact"
            variant="primary"
            className={styles.signUpButton}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </header>
  );
}
