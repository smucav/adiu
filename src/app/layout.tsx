import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { client } from "@/sanity/lib/client";
import { getGlobalSettingsQuery } from "@/sanity/lib/queries";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-outfit",
});

export async function generateMetadata(): Promise<Metadata> {
  let settings = null;
  try {
    settings = await client.fetch(
      getGlobalSettingsQuery,
      {},
      { next: { revalidate: 60 } },
    );
  } catch (e) {
    // Sanity CMS fetch error — continue with defaults
  }

  const siteTitle = settings?.siteTitle || "ADIU Communication";
  const siteDescription =
    settings?.siteDescription ||
    "Leading telecom infrastructure and engineering services provider in East Africa. Site deployment, network optimization, and managed services.";
  
  const faviconUrl = settings?.faviconImage?.asset?.url || "/favicon.ico";

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    metadataBase: new URL("https://adiu.com"),
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteTitle,
      title: `${siteTitle} — Telecom Infrastructure & Engineering`,
      description: siteDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  let settings = null;
  try {
    settings = await client.fetch(
      getGlobalSettingsQuery,
      {},
      { next: { revalidate: 60 } },
    );
  } catch (e) {
    // Sanity CMS fetch error — continue with defaults
  }

  return {
    themeColor: settings?.brandGreen || "#82c341",
    width: "device-width",
    initialScale: 1,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = null;
  try {
    settings = await client.fetch(
      getGlobalSettingsQuery,
      {},
      { next: { revalidate: 60 } },
    );
  } catch (e) {
    // Sanity CMS fetch error — continue with defaults
  }

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {settings && (
          <style>{`
            :root {
              ${settings.brandGreen ? `--brand-green: ${settings.brandGreen};` : ""}
              ${settings.lightMint ? `--light-mint: ${settings.lightMint};` : ""}
              ${settings.darkSlate ? `--dark-slate: ${settings.darkSlate};` : ""}
              ${settings.olive ? `--olive: ${settings.olive};` : ""}
            }
          `}</style>
        )}
      </head>
      <body className={inter.className}>
        <ConditionalLayout settings={settings}>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
