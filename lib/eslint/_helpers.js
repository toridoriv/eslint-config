import { FlatCompat } from "@eslint/eslintrc";

export const Severity = Object.seal({
  OFF: literal("off"),
  WARN: literal("warn"),
  ERROR: literal("error"),
});

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

/**
 * @param {string} name
 * @param {{ name: string; version: string } | null} meta
 */
export function getParser(name, meta = null) {
  const config = compat.config({ parser: name });
  const parser = config[0]?.languageOptions?.parser;

  if (!parser) {
    throw new Error(`Parser ${name} not found.`);
  }

  if (meta && !parser?.meta) {
    Object.defineProperty(parser, "meta", {
      value: meta,
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
