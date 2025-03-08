import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "fastly.picsum.photos",
  //       port: "",
  //       pathname: "/**",
  //       search: "",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "fastly.picsum.photos",
  //       port: "",
  //       pathname: "/**",
  //       search: "",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "picsum.photos",
  //       port: "",
  //       pathname: "/**",
  //       search: "",
  //     },
  //   ],
  // },
  images: {
    domains: ["fastly.picsum.photos", "picsum.photos"],
  },
};

export default nextConfig;
