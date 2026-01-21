/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  serverExternalPackages: [
    "@workspace/database",
    "@prisma/client",
    "@prisma/engines",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === "development",
  },

  async rewrites() {
    return [
      {
        source: "/api-service/:path*",
        destination: "http://127.0.0.1:3010/auth/:path*",
      },
      {
        source: "/auth/:path*",
        destination: "http://127.0.0.1:3005/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
