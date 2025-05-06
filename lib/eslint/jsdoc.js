import jsdoc from "eslint-plugin-jsdoc";

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    name: "@toridoriv/jsdoc",
    plugins: {
      jsdoc,
    },
    settings: {
      jsdoc: {
        mode: "typescript",
      },
    },
  },
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    rules: {
      "jsdoc/check-access": "error",
      "jsdoc/check-alignment": "off",
      "jsdoc/check-examples": "off",
      "jsdoc/check-values": "error",
      "jsdoc/empty-tags": "error",
      "jsdoc/informative-docs": "warn",
    },
  },
  {
    name: "@toridoriv/jsdoc-typescript",
    files: ["**/*.ts", "**/*.d.ts"],
    rules: {
      "jsdoc/no-types": "error",
    },
  },
];
