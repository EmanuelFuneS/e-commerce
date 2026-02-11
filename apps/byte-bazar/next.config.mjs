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
        destination: `${process.env.AUTH_SERVICE_URL}/:path*`,
      },
      {
        source: "/auth/:path*",
        destination: `${process.env.AUTH_APP_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
