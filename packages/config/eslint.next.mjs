import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import baseConfig from "./eslint.base.mjs";

/** ESLint config for Next.js apps */
const nextConfig = defineConfig([
  ...baseConfig,
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "next-env.d.ts"]),
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]);

export default nextConfig;
