/**
 * Use this function to ignore files in Eslint. The only pattern added by default is
 * `node_modules`.
 *
 * @param {string[]} patterns
 * @returns {import("eslint").Linter.Config}
 */
export default function ignore(...patterns) {
  return {
      ignores: ["**/node_modules/", ...patterns],
    }
}
