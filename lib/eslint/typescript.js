import { deepMergeMultiple } from "../utils.js";
import { getExtension, Severity, tuple } from "./_helpers.js";
import { node } from "./javascript.js";

/**
 * @import {Linter} from "eslint"
 */

const tsPlugin = getExtension("plugin:@typescript-eslint/recommended");
const rules = {
  "no-unused-vars": Severity.OFF,
  "no-undef": Severity.OFF,
  "no-redeclare": Severity.OFF,
  "@typescript-eslint/no-redeclare": tuple(Severity.ERROR, {
    ignoreDeclarationMerge: true,
  }),
  "@typescript-eslint/no-unused-vars": tuple(Severity.WARN, {
    argsIgnorePattern: "^_",
    varsIgnorePattern: "^_",
  }),
};

/**
 * @typedef {typeof rules}                  TsRules
 * @typedef {keyof TsRules | (string & {})} TsRule
 */

/**
 * Sets a rule for TypeScript files.
 *
 * @param {TsRule}           name
 * @param {Linter.RuleEntry} value
 * @returns {void}
 */
export function setTypescriptRule(name, value) {
  // @ts-ignore: ¯\_(ツ)_/¯
  rules[name] = value;
}

/**
 * Sets multiple rules for TypeScript files.
 *
 * @param {Partial<Record<TsRule, Linter.RuleEntry>>} newRules
 */
export function setTypescriptRules(newRules) {
  Object.assign(rules, newRules);
}

/**
 * @type {Linter.Config}
 */
const typescript = deepMergeMultiple(
  {
    files: ["**/*.ts", "**/*.d.ts", "**/*.tsx"],
    languageOptions: tsPlugin.languageOptions,
    plugins: tsPlugin.plugins,
    rules,
  },
  {
    objects: node,
    exclude: ["@typescript-eslint"].concat(
      node.map((config) => Object.keys(config.plugins || {})).flat(),
    ),
  },
);

export default typescript;
