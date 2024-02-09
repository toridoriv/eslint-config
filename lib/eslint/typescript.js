import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
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
