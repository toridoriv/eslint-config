import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const parser = compat.config({ parser: "@typescript-eslint/parser" });

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    files: ["*.ts"],
    languageOptions: {
      parser: parser[0].languageOptions.parser,
    },
  },
];
