/** @type {import('next').NextConfig} */
const authApp = process.env.AUTH_APP_URL || "http://localhost:3005/auth/";
const authService =
  process.env.AUTH_SERVICE_URL || "http://localhost:3010/auth/";
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
        destination: `${authService}/:path*`,
      },
      {
        source: "/auth/:path*",
        destination: `${authApp}/:path*`,
      },
    ];
  },
};

export default nextConfig;
