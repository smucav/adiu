import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // deviceSizes: viewport-spanning images (hero, full-width sections)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // imageSizes: component-level images (cards, avatars, thumbnails)
    // Generates tighter srcsets so mobile never downloads desktop-sized images
    imageSizes: [16, 32, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 31536000, // 1 year — Sanity URLs are content-addressed
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    scrollRestoration: true, // Restore position on back-navigation (important on mobile)
    optimizePackageImports: [
      'lucide-react',
      '@sanity/icons',
      'framer-motion',
      'react-simple-maps',
      'd3-geo',
      'gsap',
      'lenis',
    ],
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
