/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "commonjs",
          moduleResolution: "node16",
          esModuleInterop: true,
          strict: true,
          skipLibCheck: true,
          resolveJsonModule: true,
        },
        useESM: false,
      },
    ],
  },

  transformIgnorePatterns: ["node_modules/(?!@workspace/)"],

  testMatch: ["**/__tests__/**/*.test.ts", "**/*.spec.ts"],

  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],
};
