import { getParser } from "./_helpers.js";

const parser = getParser("jsonc-eslint-parser");

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    files: ["**/*.json"],
    languageOptions: {
      parser,
      parserOptions: {
        jsonSyntax: "JSON",
      },
    },
  },
  {
    files: [
      "**/*.jsonc",
      "**/jsconfig.json",
      "**/tsconfig.json",
      ".vscode/settings.json",
    ],
    languageOptions: {
      parser,
      parserOptions: {
        jsonSyntax: "JSONC",
      },
    },
  },
];
