import { LegalPage } from "@/components/sections/legal/LegalPage";
import { client } from "@/sanity/lib/client";
import { getLegalPageQuery } from "@/sanity/lib/queries";
import { SanityLegalPage } from "@/sanity/lib/types";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy Policy | ADIU Communications",
  description:
    "Learn how ADIU Communications collects, uses, and protects your personal information.",
};

// Hardcoded fallback content — used when Sanity has no document yet
const fallback = {
  badge: "Legal",
  title: "Privacy Policy",
  subtitle:
    "Your privacy matters to us. This policy explains how we collect, use, and protect your personal information.",
  lastUpdated: "May 29, 2025",
  sections: [
    {
      title: "1. Information We Collect",
      body: `We collect information you provide directly to us, such as when you fill out our contact form, request a quote, or communicate with our team. This may include your full name, email address, phone number, company name, and the content of your message.\n\nWe may also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed.`,
    },
    {
      title: "2. How We Use Your Information",
      body: `We use the information we collect to:\n\n- Respond to your inquiries and provide customer support\n- Send you project updates, proposals, and communications relevant to our services\n- Improve and optimize our website and services\n- Comply with legal obligations\n- Protect the rights and safety of ADIU Communications and our users\n\nWe do not sell, rent, or share your personal information with third parties for their marketing purposes.`,
    },
    {
      title: "3. Cookies and Tracking Technologies",
      body: `Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files placed on your device that help us remember your preferences and understand how you use our site.\n\nYou can control cookie usage through your browser settings or our Cookie Settings page.`,
    },
    {
      title: "4. Data Security",
      body: `We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encrypted connections (HTTPS), secure servers, and access controls.\n\nWhile we take every reasonable precaution, no method of transmission over the internet is 100% secure.`,
    },
    {
      title: "5. Your Rights",
      body: `Depending on your location, you may have the right to:\n\n- Access the personal data we hold about you\n- Request correction of inaccurate information\n- Request deletion of your personal data\n- Object to or restrict processing of your data\n\nTo exercise any of these rights, please contact us at the email address below.`,
    },
    {
      title: "6. Contact Us",
      body: `If you have any questions about this Privacy Policy, please contact us at:\n\n**ADIU Communications PLC**\nBole Road, Addis Ababa, Ethiopia\nEmail: info@adiucommunications.com\nPhone: +251 11 661 0000`,
    },
  ],
};

export default async function PrivacyPolicyPage() {
  let data: SanityLegalPage | null = null;
  try {
    data = await client.fetch(getLegalPageQuery, { pageType: "privacy" });
  } catch (_) {}

  const badge = data?.badge || fallback.badge;
  const title = data?.title || fallback.title;
  const subtitle = data?.subtitle || fallback.subtitle;
  const lastUpdated = data?.lastUpdated || fallback.lastUpdated;
  const sections =
    data?.sections && data.sections.length > 0 ? data.sections : fallback.sections;

  return (
    <LegalPage
      badge={badge}
      title={title}
      subtitle={subtitle}
      lastUpdated={lastUpdated}
      sections={sections}
    />
  );
}
