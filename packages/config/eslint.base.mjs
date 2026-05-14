import { defineConfig, globalIgnores } from "eslint/config";

/** Base rules shared by all packages */
const baseConfig = defineConfig([
  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.next/**",
    "**/out/**",
    "**/.turbo/**",
  ]),
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
]);

export default baseConfig;
