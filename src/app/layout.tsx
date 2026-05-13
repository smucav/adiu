import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { client } from "@/sanity/lib/client";
import { getGlobalSettingsQuery } from "@/sanity/lib/queries";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "ADIU Communication",
    template: "%s | ADIU Communication",
  },
  description:
    "Leading telecom infrastructure and engineering services provider in East Africa. Site deployment, network optimization, and managed services.",
  metadataBase: new URL("https://adiu.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ADIU Communication",
    title: "ADIU Communication — Telecom Infrastructure & Engineering",
    description:
      "Leading telecom infrastructure and engineering services provider in East Africa.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADIU Communication",
    description:
      "Leading telecom infrastructure and engineering services provider in East Africa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#82c341",
  width: "device-width",
  initialScale: 1,
};

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
    <html lang="en">
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
