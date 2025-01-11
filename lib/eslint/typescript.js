import { getExtension } from "./_helpers.js";

/**
 * @import {Linter} from "eslint"
 */

const tsPlugin = getExtension("plugin:@typescript-eslint/recommended");

/**
 * @type {Linter.Config}
 */
export default {
  files: ["**/*.ts", "**/*.d.ts", "**/*.tsx"],
  languageOptions: tsPlugin.languageOptions,
  plugins: tsPlugin.plugins,
  rules: {
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
};
