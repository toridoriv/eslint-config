import { createRequire } from "node:module";

import eslintJs from "@eslint/js";
import globals from "globals";

const require = createRequire(import.meta.url);

/**
 * @type {import("eslint").Linter.FlatConfig}
 */
const js = {
  files: ["**/*.js", "**/*.mjs"],
  languageOptions: {
    sourceType: "module",
    parserOptions: {
      ecmaVersion: "latest",
    },
  },
  plugins: {
    "simple-import-sort": require("eslint-plugin-simple-import-sort"),
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
  },
};

/**
 * Configurations for JavaScript executed by AppleScripts.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export const appleScript = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.applescript,
      },
    },
  },
];

/**
 * Configurations for JavaScript modules in the Browser.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export const browser = [
  js,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];

/**
 * Configurations for JavaScript modules in NodeJs. CommonJS modules are also valid as
 * long as the file containing them has the `.cjs` extension.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export const node = [
  eslintJs.configs.recommended,
  js,
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
      },
    },
  },
];
