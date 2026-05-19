import Link from "next/link";
import styles from "./OpenRoles.module.css";

import { SanityCareerPage, SanityJobRole } from "@/sanity/lib/types";

interface OpenRolesProps {
  data: SanityCareerPage | null;
  roles: SanityJobRole[];
}

const ensureAbsoluteUrl = (url: string) => {
  if (!url || url === "#") return "#";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:") || url.startsWith("tel:")) {
    return url;
  }
  return `https://${url}`;
};

export function OpenRoles({ data, roles }: OpenRolesProps) {
  const rolesToDisplay = roles?.length > 0 ? roles : [
    { _id: "1", title: "Fiber Optic Technician", location: "Addis Ababa", type: "Fulltime", department: "Telecom", applyUrl: "#" },
    { _id: "2", title: "Network Operations Center (NOC)", location: "Addis Ababa", type: "Fulltime", department: "Telecom", applyUrl: "#" },
    { _id: "3", title: "Hardware Design Engineer", location: "Addis Ababa", type: "Fulltime", department: "Engineering", applyUrl: "#" },
    { _id: "4", title: "Civil Engineer (Telecommunications)", location: "Addis Ababa", type: "Fulltime", department: "Engineering", applyUrl: "#" }
  ];

  const groupedRoles = rolesToDisplay.reduce((acc: any, role) => {
    const cat = (role as any).department || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(role);
    return acc;
  }, {});

  return (
    <section id="open-roles" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{data?.openRolesTitle || "Join Adiu"}</h2>
          <div className={styles.subtitleContainer}>
            <p className={styles.bodyText}>
              {data?.openRolesSubtitle || "Explore our open roles below and become part of the team shaping the next generation of intelligent operations. Your next opportunity starts here."}
            </p>
          </div>
        </div>

        <div className={styles.rolesContainer}>
          {Object.entries(groupedRoles).map(([category, catRoles]: [string, any]) => (
            <div key={category} className={styles.categoryGroup}>
              <h3 className={styles.categoryTitle}>{category}</h3>
              {catRoles.map((role: any) => (
                <Link
                  href={ensureAbsoluteUrl(role.applyUrl)}
                  key={role._id}
                  className={styles.roleCard}
                  target={role.applyUrl && role.applyUrl !== "#" ? "_blank" : undefined}
                  rel={role.applyUrl && role.applyUrl !== "#" ? "noopener noreferrer" : undefined}
                >
                  <div className={styles.roleInfo}>
                    <h4 className={styles.roleName}>{role.title}</h4>
                  </div>
                  <div className={styles.roleMeta}>
                    <span className={styles.metaItem}>{role.location}</span>
                    <span className={styles.divider}>|</span>
                    <span className={styles.metaItem}>{role.type}</span>
                  </div>
                  <div className={styles.arrowIcon}>&#8599;</div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
