import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

const parser = compat.config({ parser: "jsonc-eslint-parser" });

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    files: ["*.json"],
    languageOptions: {
      parser: parser[0].languageOptions.parser,
      parserOptions: {
        jsonSyntax: "JSON",
      },
    },
  },
  {
    files: ["*.jsonc", "jsconfig.json", ".vscode/settings.json"],
    languageOptions: {
      parser: parser[0].languageOptions.parser,
      parserOptions: {
        jsonSyntax: "JSONC",
      },
    },
  },
];
