import { createRequire } from "node:module";

import eslintJs from "@eslint/js";
import globals from "globals";

import { Severity, tuple } from "./_helpers.js";

/**
 * @import {Linter} from "eslint"
 */

const require = createRequire(import.meta.url);

const javascriptModuleRules = {
  "simple-import-sort/imports": Severity.ERROR,
  "simple-import-sort/exports": Severity.ERROR,
  "no-unused-vars": tuple(Severity.WARN, {
    argsIgnorePattern: "^_",
    varsIgnorePattern: "^_",
  }),
};

const javascriptBrowserRules = {
  "no-unused-vars": tuple(Severity.WARN, {
    argsIgnorePattern: "^_",
    varsIgnorePattern: "^_",
  }),
};

/**
 * @typedef {typeof javascriptModuleRules} JsModuleDefRules
 * @typedef {typeof javascriptBrowserRules} JsBrowserDefRules
 * @typedef {keyof JsModuleDefRules | (string & {})} JsModuleRule
 * @typedef {keyof JsBrowserDefRules | (string & {})} JsBrowserRule
 * @typedef {Record<JsModuleRule, Linter.RuleEntry>} JsModuleRules
 * @typedef {Record<JsBrowserRule, Linter.RuleEntry>} JsBrowserRules
 */

/**
 * Sets (or replaces) rules for JavaScript files in EcmaScript modules.
 *
 * @param {Partial<JsModuleRules>} newRules
 * @returns {void}
 */
export function setJavascriptModuleRules(newRules) {
  Object.assign(javascriptModuleRules, newRules);
}

/**
 * Sets (or replaces) rules for JavaScript files in the browser.
 *
 * @param {Partial<JsBrowserRules>} newRules
 * @returns {void}
 */
export function setJavascriptBrowserRules(newRules) {
  Object.assign(javascriptBrowserRules, newRules);
}

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
  rules: javascriptModuleRules,
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
    rules: javascriptBrowserRules,
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
