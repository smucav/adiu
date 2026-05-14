"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const rawLinks = settings?.navLinks || [
    { label: "Home",     href: "/" },
    { label: "About",    href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Blog",     href: "/blog" },
    { label: "Career",   href: "/career" },
  ];

  const hasServices = rawLinks.some((link) => link.href === "/services");
  const navLinks = hasServices
    ? rawLinks
    : [...rawLinks.slice(0, 2), { label: "Services", href: "/services" }, ...rawLinks.slice(2)];

  const logoSrc = settings?.logoImage
    ? urlForImage(settings.logoImage).width(200).quality(80).url()
    : "/images/company_logo.png";

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuActive : ""}`}
        role="banner"
      >
        <div className={`container ${styles.navContainer}`}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link
              href="/"
              aria-label="ADIU Communication — Home"
              style={{ display: "block", position: "relative", width: 140, height: 44 }}
            >
              <Image
                src={logoSrc}
                alt={settings?.logoImage?.alt || settings?.siteTitle || "ADIU"}
                fill
                sizes="140px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </Link>
          </div>

          {/* Desktop nav pill */}
          <div className={styles.navLinksWrapper} aria-hidden="true">
            <nav className={styles.navLinks} aria-label="Primary navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop CTA */}
          <div className={styles.actions}>
            <Button href="/contact" variant="primary" className={styles.signUpButton}>
              Get in Touch
            </Button>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            ref={toggleRef}
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Decorative glow orbs */}
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />

        {/* Menu content */}
        <div className={styles.drawerInner}>
          {/* Top bar: logo + close */}
          <div className={styles.drawerTop}>
            <Link href="/" className={styles.drawerLogo} onClick={() => setMenuOpen(false)} aria-label="ADIU — Home">
              <Image
                src={logoSrc}
                alt="ADIU"
                width={120}
                height={38}
                style={{ objectFit: "contain", objectPosition: "left center", filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <button
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav aria-label="Mobile navigation" className={styles.drawerNav}>
            <ul className={styles.mobileNavList}>
              {navLinks.map((link, i) => (
                <li
                  key={link.href}
                  className={styles.mobileNavItem}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Link
                    href={link.href}
                    className={`${styles.mobileNavLink} ${pathname === link.href ? styles.activeMobileLink : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={styles.linkIndex}>0{i + 1}</span>
                    <span className={styles.linkLabel}>{link.label}</span>
                    <span className={styles.linkLine} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer area */}
          <div className={styles.drawerFooter}>
            <a href="/contact" className={styles.drawerCta} onClick={() => setMenuOpen(false)}>
              Start a project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <div className={styles.drawerMeta}>
              <span className={styles.drawerTagline}>Building East Africa's digital infrastructure.</span>
              <div className={styles.drawerSocials}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.drawerSocialIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className={styles.drawerSocialIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
