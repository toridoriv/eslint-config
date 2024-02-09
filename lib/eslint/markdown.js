import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

const parser = compat.config({ parser: "markdown-eslint-parser" });

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    files: ["*.md"],
    languageOptions: {
      parser: parser[0].languageOptions.parser,
    },
  },
];
