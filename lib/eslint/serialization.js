import { getParser } from "./_helpers.js";

/**
 * @import {Linter} from "eslint"
 */

const parser = getParser("jsonc-eslint-parser");

/**
 * Configuration for JSON files.
 *
 * @type {Linter.Config}
 */
export const json = {
  name: "@toridoriv/serialization/json",
  files: ["**/*.json"],
  languageOptions: {
    parser,
    parserOptions: {
      jsonSyntax: "JSON",
    },
  },
};

/**
 * Configuration for JSONC files.
 *
 * @type {Linter.Config}
 */
export const jsonc = {
  name: "@toridoriv/serialization/jsonc",
  files: ["**/*.jsonc", "**/jsconfig.json", "**/tsconfig.json", ".vscode/settings.json"],
  languageOptions: {
    parser,
    parserOptions: {
      jsonSyntax: "JSONC",
    },
  },
};
