import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

export default eslintPluginPrettierRecommended;
