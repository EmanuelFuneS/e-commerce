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

  outputFileTracingIncludes: {
    "/api/**/*": [
      "../../node_modules/.prisma/client/**/*",
      "../../node_modules/@prisma/engines/**/*",
      "../../node_modules/@prisma/client/**/*",
    ],
    "/products/**/*": [
      "../../node_modules/.prisma/client/**/*",
      "../../node_modules/@prisma/engines/**/*",
      "../../node_modules/@prisma/client/**/*",
    ],
    "/**/*": [
      "../../node_modules/.prisma/client/**/*",
      "../../node_modules/@prisma/engines/**/*",
      "../../node_modules/@prisma/client/**/*",
    ],
  },
};

export default nextConfig;
