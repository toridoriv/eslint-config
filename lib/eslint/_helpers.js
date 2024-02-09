import { FlatCompat } from "@eslint/eslintrc";
import { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

/**
 * @param {string} name
 * @param {{ name: string; version: string } | null} meta
 * @returns {Linter.ParserModule}
 */
export function getParser(name, meta = null) {
  const config = compat.config({ parser: name });
  const parser = config[0]?.languageOptions?.parser;

  if (!parser) {
    throw new Error(`Parser ${name} not found.`);
  }

  if (meta) {
    Object.defineProperty(parser, "meta", {
      value: meta,
      enumerable: true,
    });
  }

  return parser;
}
