import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
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
