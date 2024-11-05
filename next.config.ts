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
      {
        protocol: 'https',
        hostname: 'minio.nutech-integrasi.com',
        pathname: '/take-home-test/banner/**',
      },
      {
        protocol: 'https',
        hostname: 'minio.nutech-integrasi.com',
        pathname: '/take-home-test/services/**',
      }
    ],
  },
};

export default nextConfig;
