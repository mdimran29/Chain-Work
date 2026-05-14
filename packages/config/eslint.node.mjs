import { defineConfig } from "eslint/config";
import baseConfig from "./eslint.base.mjs";

/** ESLint config for Node.js / backend packages */
const nodeConfig = defineConfig([
  ...baseConfig,
  {
    rules: {
      // console.log is fine in server code
      "no-console": "off",
    },
  },
]);

export default nodeConfig;
