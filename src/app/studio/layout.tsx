import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio",
  description: "CMS for ADIU Communication",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="studio-container">
      {children}
    </div>
  );
}
