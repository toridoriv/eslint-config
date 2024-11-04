import { createRequire } from "node:module";

import eslintJs from "@eslint/js";
import globals from "globals";

/**
 * @import {Linter} from "eslint"
 */

const require = createRequire(import.meta.url);

const js = {
  files: ["**/*.js", "**/*.mjs"],
  languageOptions: {
    /**
     * @type {"module"}
     */
    sourceType: "module",
    parserOptions: {
      /**
       * @type {"latest"}
       */
      ecmaVersion: "latest",
    },
  },
  plugins: {
    "simple-import-sort": require("eslint-plugin-simple-import-sort"),
  },
  rules: {
    /**
     * @type {"error"}
     */
    "simple-import-sort/imports": "error",
    /**
     * @type {"error"}
     */
    "simple-import-sort/exports": "error",
    /**
     * @type {Linter.RuleSeverityAndOptions}
     */
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
  },
};

/**
 * Configurations for JavaScript executed by AppleScripts.
 *
 * @type {Linter.Config}
 */
export const appleScript = {
  files: ["**/*.js"],
  languageOptions: {
    sourceType: "script",
    globals: {
      ...globals.applescript,
    },
  },
};

/**
 * Configurations for JavaScript modules in the Browser.
 *
 * @type {Linter.Config[]}
 */
export const browser = [
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": js.rules["no-unused-vars"],
    },
  },
  {
    files: ["**/*.mjs"],
    languageOptions: js.languageOptions,
    plugins: js.plugins,
    rules: js.rules,
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      parserOptions: js.languageOptions.parserOptions,
    },
  },
];

/**
 * Configurations for JavaScript modules in NodeJs. CommonJS modules are also valid as
 * long as the file containing them has the `.cjs` extension.
 *
 * @type {Linter.Config[]}
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
