import { LegalPage } from "@/components/sections/legal/LegalPage";
import { client } from "@/sanity/lib/client";
import { getLegalPageQuery } from "@/sanity/lib/queries";
import { SanityLegalPage } from "@/sanity/lib/types";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Terms of Service | ADIU Communications",
  description:
    "Read the terms and conditions governing your use of the ADIU Communications website and services.",
};

const fallback = {
  badge: "Legal",
  title: "Terms of Service",
  subtitle:
    "Please read these terms carefully before using our website or engaging our services.",
  lastUpdated: "May 29, 2025",
  sections: [
    {
      title: "1. Acceptance of Terms",
      body: `By accessing and using the ADIU Communications website (the "Site"), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use this Site.`,
    },
    {
      title: "2. Use of the Website",
      body: `You may use this Site for lawful purposes only. You agree not to:\n\n- Use the Site in any way that violates applicable laws or regulations\n- Transmit any unsolicited or unauthorized advertising or promotional material\n- Attempt to gain unauthorized access to any part of the Site\n- Introduce viruses, trojans, worms, or other malicious code\n\nADIU Communications reserves the right to terminate access to the Site for users who violate these terms.`,
    },
    {
      title: "3. Intellectual Property",
      body: `All content on this Site — including text, graphics, logos, images, audio clips, and software — is the property of ADIU Communications PLC or its content suppliers and is protected by applicable copyright and intellectual property laws.\n\nYou may not reproduce, distribute, or modify any content without prior written permission.`,
    },
    {
      title: "4. Disclaimer of Warranties",
      body: `This Site and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. ADIU Communications makes no representations or warranties regarding the accuracy, completeness, or reliability of any content on the Site.`,
    },
    {
      title: "5. Governing Law",
      body: `These Terms of Service shall be governed by and construed in accordance with the laws of the Federal Democratic Republic of Ethiopia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Addis Ababa, Ethiopia.`,
    },
    {
      title: "6. Contact Us",
      body: `If you have any questions about these Terms of Service, please contact us at:\n\n**ADIU Communications PLC**\nBole Road, Addis Ababa, Ethiopia\nEmail: info@adiucommunications.com\nPhone: +251 11 661 0000`,
    },
  ],
};

export default async function TermsOfServicePage() {
  let data: SanityLegalPage | null = null;
  try {
    data = await client.fetch(getLegalPageQuery, { pageType: "terms" });
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
