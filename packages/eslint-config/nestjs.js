import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import ts from "typescript-eslint";

export const nestJsConfig = [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: {
      "only-warn": onlyWarn,
    },
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // Esta regla es la que te daba problemas con el Guard/Cookies
      "@typescript-eslint/no-unsafe-assignment": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "eslint.config.mjs"],
  },
  prettier,
];
