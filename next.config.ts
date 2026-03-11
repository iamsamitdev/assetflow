import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // ตั้งค่าให้ Next.js สร้างไฟล์ที่สามารถรันได้เอง
  cacheComponents: true, // เปิดการ cache components
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;