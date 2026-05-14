// Root-level ESLint config — delegates to per-package configs
// Each app/package has its own eslint.config.mjs that extends @chainwork/config/eslint/*

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/.next/**",
    "**/out/**",
    "**/.turbo/**",
    "**/target/**",
    "nul",
  ]),
]);
