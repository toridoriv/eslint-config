import jsdoc from "eslint-plugin-jsdoc";

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    plugins: {
      jsdoc,
    },
    rules: {
      "jsdoc/check-access": "error",
      "jsdoc/check-alignment": "off",
      "jsdoc/check-examples": "off",
      "jsdoc/check-values": "error",
      "jsdoc/empty-tags": "error",
      "jsdoc/informative-docs": "warn",
    },
    settings: {
      jsdoc: {
        mode: "typescript",
      },
    },
  },
  {
    files: ["*.ts"],
    rules: {
      "jsdoc/no-types": "error",
    },
  },
];
