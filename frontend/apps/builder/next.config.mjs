/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile shared monorepo packages
  transpilePackages: ["@builder/ui", "@builder/types", "@builder/api-client"],

  // Allow images from external CDN domains
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
      { protocol: "https", hostname: "cdn.example.com" },
    ],
  },
};

export default nextConfig;
