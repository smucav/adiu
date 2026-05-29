import Link from "next/link";
import styles from "./LegalPage.module.css";

interface LegalSection {
  title: string;
  body: string;
}

interface LegalPageProps {
  badge: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

/** Renders plain-text body with basic markdown-like formatting:
 *  - Lines starting with "- " become <li> items
 *  - **bold** becomes <strong>
 *  - Blank lines separate paragraphs
 */
function renderBody(text: string) {
  const blocks = text.split(/\n\n+/);

  return blocks.map((block, i) => {
    const lines = block.split("\n");
    const isList = lines.every((l) => l.trimStart().startsWith("- "));

    if (isList) {
      return (
        <ul key={i} className={styles.list}>
          {lines.map((line, j) => (
            <li key={j}>{renderInline(line.replace(/^- /, ""))}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className={styles.para}>
        {renderInline(block)}
      </p>
    );
  });
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function LegalPage({ badge, title, subtitle, lastUpdated, sections }: LegalPageProps) {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.badge}>{badge}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.updated}>Last updated: {lastUpdated}</p>
        </div>
        <div className={styles.heroDivider} />
      </section>

      {/* Content */}
      <section className={styles.content}>
        <div className={`container ${styles.contentInner}`}>
          {/* Table of Contents */}
          <aside className={styles.toc}>
            <div className={styles.tocCard}>
              <h3 className={styles.tocTitle}>Contents</h3>
              <nav>
                <ol className={styles.tocList}>
                  {sections.map((s, i) => (
                    <li key={i}>
                      <a href={`#section-${i}`} className={styles.tocLink}>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Back to bottom nav */}
            <div className={styles.tocLinks}>
              <Link href="/privacy" className={styles.tocNav}>Privacy Policy</Link>
              <Link href="/terms" className={styles.tocNav}>Terms of Service</Link>
              <Link href="/cookies" className={styles.tocNav}>Cookie Settings</Link>
            </div>
          </aside>

          {/* Sections */}
          <article className={styles.article}>
            {sections.map((section, i) => (
              <div key={i} id={`section-${i}`} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <div className={styles.sectionBody}>{renderBody(section.body)}</div>
              </div>
            ))}

            {/* Footer nav */}
            <div className={styles.articleFooter}>
              <Link href="/contact" className={styles.ctaLink}>
                Have questions? Contact us →
              </Link>
              <p className={styles.footerNote}>
                © {new Date().getFullYear()} ADIU Communications PLC. All rights reserved.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
