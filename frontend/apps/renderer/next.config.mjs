/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@builder/ui", "@builder/types", "@builder/api-client"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
      { protocol: "https", hostname: "cdn.example.com" },
    ],
  },
};

export default nextConfig;
