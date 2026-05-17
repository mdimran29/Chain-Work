import baseConfig from "./eslint.base.mjs";
import globals from "globals";

/** ESLint config for Node.js / backend packages */
export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // console.log is fine in server code
      "no-console": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
