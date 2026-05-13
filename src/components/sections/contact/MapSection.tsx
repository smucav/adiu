import styles from "./MapSection.module.css";

import { SanityContactPage } from "@/sanity/lib/types";

interface MapSectionProps {
  data: SanityContactPage | null;
}

export function MapSection({ data }: MapSectionProps) {
  // ADIU Communications location in Addis Ababa (Meskel Flower Road area)
  const mapUrl = data?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.697561!2d38.767!3d9.006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef0!2sMeskel+Flower+Rd%2C+Addis+Ababa!5e0!3m2!1sen!2set!4v1713300000000!5m2!1sen!2set";

  return (
    <section className={styles.mapSection}>
      <iframe
        src={mapUrl}
        className={styles.mapFrame}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="ADIU Communications Location"
      ></iframe>
    </section>
  );
}
