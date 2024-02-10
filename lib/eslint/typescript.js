import { getExtension } from "./_helpers.js";

const tsPlugin = getExtension("plugin:@typescript-eslint/recommended");

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    files: ["**/*.ts", "**/*.d.ts"],
    languageOptions: tsPlugin.languageOptions,
    plugins: tsPlugin.plugins,
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
