const nodePreset = require("@workspace/jest-config/presets/node");

/** @type {import('jest').Config} */
module.exports = {
  ...nodePreset,
  rootDir: ".",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@workspace/(.*)$": "<rootDir>/../../packages/$1/src/index.ts",
  },
};
