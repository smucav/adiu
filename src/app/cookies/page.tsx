import { LegalPage } from "@/components/sections/legal/LegalPage";
import { client } from "@/sanity/lib/client";
import { getLegalPageQuery } from "@/sanity/lib/queries";
import { SanityLegalPage } from "@/sanity/lib/types";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cookie Settings | ADIU Communications",
  description:
    "Learn about how ADIU Communications uses cookies and manage your cookie preferences.",
};

const fallback = {
  badge: "Cookie Policy",
  title: "Cookie Settings",
  subtitle:
    "We use cookies to enhance your browsing experience. Learn about what cookies we use and how you can manage them.",
  lastUpdated: "May 29, 2025",
  sections: [
    {
      title: "What Are Cookies?",
      body: `Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently, remember your preferences, and provide information to the website owner.`,
    },
    {
      title: "How We Use Cookies",
      body: `ADIU Communications uses cookies to:\n\n- **Ensure the website functions correctly** — Some cookies are essential for the website to operate.\n- **Remember your preferences** — Cookies help us remember settings like language or display preferences.\n- **Analyze website traffic** — We use analytics cookies to understand how visitors interact with our site.\n- **Deliver relevant content** — Cookies may help us show content relevant to your interests.`,
    },
    {
      title: "Types of Cookies We Use",
      body: `**Strictly Necessary Cookies**\nThese cookies are required for the website to function and cannot be disabled.\n\n**Performance & Analytics Cookies**\nThese cookies allow us to count visits and traffic sources so we can improve the performance of our site.\n\n**Functional Cookies**\nThese cookies enable the website to provide enhanced functionality and personalization.\n\n**Marketing Cookies**\nWe currently do not use marketing cookies unless you explicitly consent.`,
    },
    {
      title: "Managing Your Cookie Preferences",
      body: `You have the right to decide whether to accept or reject cookies. You can manage them through your browser settings:\n\n- **Chrome:** Settings → Privacy and security → Cookies and other site data\n- **Firefox:** Options → Privacy & Security → Cookies and Site Data\n- **Safari:** Preferences → Privacy → Manage Website Data\n- **Edge:** Settings → Cookies and site permissions`,
    },
    {
      title: "Contact Us",
      body: `If you have any questions about our use of cookies, please contact us at:\n\n**ADIU Communications PLC**\nBole Road, Addis Ababa, Ethiopia\nEmail: info@adiucommunications.com\nPhone: +251 11 661 0000`,
    },
  ],
};

export default async function CookieSettingsPage() {
  let data: SanityLegalPage | null = null;
  try {
    data = await client.fetch(getLegalPageQuery, { pageType: "cookies" });
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
