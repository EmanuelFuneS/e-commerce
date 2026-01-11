/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  serverExternalPackages: ["database", "@prisma/client", "@prisma/engines"],

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
  /* webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};

      config.resolve.alias[".prisma/client/index-browser"] =
        "./node_modules/.prisma/client/index-browser.js";
      return config;
    }
  }, */

  outputFileTracingIncludes: {
    "**/*": [
      "./node_modules/.prisma/client/**/*",
      "./node_modules/@prisma/engines/**/*",
    ],
  },
};

export default nextConfig;
