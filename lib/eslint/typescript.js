import { getExtension } from "./_helpers.js";

/**
 * @import {Linter} from "eslint"
 */


const tsPlugin = getExtension("plugin:@typescript-eslint/recommended");

/**
 * @type {Linter.Config}
 */
export default {
    files: ["**/*.ts", "**/*.d.ts"],
    languageOptions: tsPlugin.languageOptions,
    plugins: tsPlugin.plugins,
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  }
