import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minio.nutech-integrasi.com',
        pathname: '/take-home-test/profile/**',
      },
    ],
  },
};

export default nextConfig;
