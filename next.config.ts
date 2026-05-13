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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 31536000, // 1 year — Sanity URLs are content-addressed
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@sanity/icons',
      'framer-motion',
      'react-simple-maps',
      'd3-geo',
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
