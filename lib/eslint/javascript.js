import { createRequire } from "node:module";

import globals from "globals";

import { Severity, tuple } from "./_helpers.js";

/**
 * @import {Linter} from "eslint"
 */

const require = createRequire(import.meta.url);

const sharedRules = {
  "constructor-super": Severity.ERROR,
  "for-direction": Severity.ERROR,
  "getter-return": Severity.ERROR,
  "no-async-promise-executor": Severity.ERROR,
  "no-case-declarations": Severity.ERROR,
  "no-class-assign": Severity.ERROR,
  "no-compare-neg-zero": Severity.ERROR,
  "no-cond-assign": Severity.ERROR,
  "no-const-assign": Severity.ERROR,
  "no-constant-binary-expression": Severity.ERROR,
  "no-constant-condition": Severity.ERROR,
  "no-control-regex": Severity.ERROR,
  "no-debugger": Severity.ERROR,
  "no-delete-var": Severity.ERROR,
  "no-dupe-args": Severity.ERROR,
  "no-dupe-class-members": Severity.ERROR,
  "no-dupe-else-if": Severity.ERROR,
  "no-dupe-keys": Severity.ERROR,
  "no-duplicate-case": Severity.ERROR,
  "no-empty": Severity.ERROR,
  "no-empty-character-class": Severity.ERROR,
  "no-empty-pattern": Severity.ERROR,
  "no-empty-static-block": Severity.ERROR,
  "no-ex-assign": Severity.ERROR,
  "no-extra-boolean-cast": Severity.ERROR,
  "no-fallthrough": Severity.ERROR,
  "no-func-assign": Severity.ERROR,
  "no-global-assign": Severity.ERROR,
  "no-import-assign": Severity.ERROR,
  "no-invalid-regexp": Severity.ERROR,
  "no-irregular-whitespace": Severity.ERROR,
  "no-loss-of-precision": Severity.ERROR,
  "no-misleading-character-class": Severity.ERROR,
  "no-new-native-nonconstructor": Severity.ERROR,
  "no-nonoctal-decimal-escape": Severity.ERROR,
  "no-obj-calls": Severity.ERROR,
  "no-octal": Severity.ERROR,
  "no-prototype-builtins": Severity.ERROR,
  "no-redeclare": Severity.ERROR,
  "no-regex-spaces": Severity.ERROR,
  "no-self-assign": Severity.ERROR,
  "no-setter-return": Severity.ERROR,
  "no-shadow-restricted-names": Severity.ERROR,
  "no-sparse-arrays": Severity.ERROR,
  "no-this-before-super": Severity.ERROR,
  "no-undef": Severity.ERROR,
  "no-unexpected-multiline": Severity.ERROR,
  "no-unreachable": Severity.ERROR,
  "no-unsafe-finally": Severity.ERROR,
  "no-unsafe-negation": Severity.ERROR,
  "no-unsafe-optional-chaining": Severity.ERROR,
  "no-unused-labels": Severity.ERROR,
  "no-unused-private-class-members": Severity.ERROR,
  "no-unused-vars": Severity.ERROR,
  "no-useless-backreference": Severity.ERROR,
  "no-useless-catch": Severity.ERROR,
  "no-useless-escape": Severity.ERROR,
  "no-with": Severity.ERROR,
  "require-yield": Severity.ERROR,
  "use-isnan": Severity.ERROR,
  "valid-typeof": Severity.ERROR,
};

export const javascriptModuleRules = {
  ...sharedRules,
  "simple-import-sort/imports": tuple(Severity.ERROR, {
    groups: [["^\\u0000"], ["^node:"], ["^@?\\w"], ["^"], ["^\\."]],
  }),
  "simple-import-sort/exports": Severity.ERROR,
  "no-unused-vars": tuple(Severity.WARN, {
    argsIgnorePattern: "^_",
    varsIgnorePattern: "^_",
  }),
};

const javascriptBrowserRules = {
  ...sharedRules,
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

/**
 * @satisfies {Linter.Config}
 */
const js = {
  name: "@toridoriv/javascript-esm",
  files: ["**/*.js", "**/*.mjs"],
  languageOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
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
  name: "@toridoriv/javascript-applescript",
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
  js,
  {
    name: "@toridoriv/javascript-commonjs",
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    name: "@toridoriv/javascript-nodejs",
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
      },
    },
  },
];
