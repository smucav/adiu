import { ContactHero } from "@/components/sections/contact/ContactHero";
import { MapSection } from "@/components/sections/contact/MapSection";
import { FAQSection } from "@/components/sections/contact/FAQSection";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { getContactPageQuery, getFAQsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact Us | ADIU Communication",
  description: "Get in touch with ADIU Communication for telecom infrastructure and engineering services in Addis Ababa and East Africa.",
};

export default async function ContactPage() {
  const [contactPage, faqs] = await Promise.all([
    client.fetch(getContactPageQuery),
    client.fetch(getFAQsQuery)
  ]);

  return (
    <main>
      <ContactHero data={contactPage} />
      <MapSection data={contactPage} />
      <FAQSection data={contactPage} faqs={faqs} />
    </main>
  );
}
