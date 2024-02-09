import globals from "globals";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/**
 * @type {import("eslint").Linter.FlatConfig}
 */
const js = {
  files: ["*.js", "*.mjs"],
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
  },
};

/**
 * Configurations for JavaScript executed by AppleScripts.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export const appleScript = [
  {
    files: [".js"],
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
  js,
  {
    files: ["*.cjs"],
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
