"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SanityGlobalSettings } from "@/sanity/lib/types";

// Lazy-load Lenis smooth scroll — not critical for initial render
const SmoothScroll = dynamic(
  () => import("../animations/ScrollAnimations").then((mod) => mod.SmoothScroll),
  { ssr: false }
);

interface ConditionalLayoutProps {
  children: React.ReactNode;
  settings: SanityGlobalSettings | null;
}

export function ConditionalLayout({ children, settings }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Navbar settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </SmoothScroll>
  );
}
