import { createRequire } from "node:module";

import { FlatCompat } from "@eslint/eslintrc";

import { coerce, deepMerge } from "../utils.js";

/**
 * @import {Linter} from "eslint";
 */

/**
 * @typedef {Linter.Parser} EslintParser
 * @typedef {Exclude<EslintParser["meta"], undefined>} EslintParserMeta
 * @typedef {Linter.Config} EslintConfig
 */

export const Severity = Object.seal({
  OFF: literal("off"),
  WARN: literal("warn"),
  ERROR: literal("error"),
});

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  resolvePluginsRelativeTo: process.cwd(),
});

const require = createRequire(import.meta.url);

const packageJson = require("../../package.json");

/**
 * @param {string}           name
 * @param {EslintParserMeta} meta
 */
export function getParser(name, meta = {}) {
  const configs = compat.config({ parser: name });
  /**
   * @type {EslintConfig}
   */
  const config = coerce(configs[0]);
  /**
   * @type {EslintParser}
   */
  const parser = coerce(config?.languageOptions?.parser);

  if (!parser) {
    throw new Error(`Parser ${name} not found.`);
  }

  const _meta = deepMerge(meta, getMetaFromPackageJson(name));

  if (!parser?.meta) {
    Object.defineProperty(parser, "meta", {
      value: _meta,
      enumerable: true,
    });
  }

  return parser;
}

/**
 * @param {string} name
 */
export function getPlugin(name) {
  const config = compat.plugins(name);
  const plugin = config[0]?.plugins?.[name];

  if (!plugin) {
    throw new Error(`Plugin ${name} not found.`);
  }

  return plugin;
}

/**
 * @param {string} name
 * @returns {Required<import("eslint").Linter.FlatConfig>}
 */
export function getExtension(name) {
  const configs = compat.extends(name);
  const config = configs[0];

  if (!config) {
    throw new Error(`Config ${name} not found.`);
  }

  // @ts-ignore: ¯\_(ツ)_/¯
  return config;
}

/**
 * @template {string} T
 * @param {T} value
 * @returns {T}
 */
export function literal(value) {
  return value;
}

/**
 * @template {unknown[]} T
 * @param {T} values
 * @returns {T}
 */
export function tuple(...values) {
  return values;
}

/**
 * @param {string} name
 * @returns {EslintParserMeta}
 */
function getMetaFromPackageJson(name) {
  const version = { ...packageJson.devDependencies, ...packageJson.dependencies }[name];

  if (!version) {
    return { name };
  }

  return {
    name,
    version: version.match(/[\d.]+/)?.[0] || version,
  };
}
