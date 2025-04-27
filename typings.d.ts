/* eslint-disable prettier/prettier */
export type * from "./lib/eslint/index.js";
export type * from "./lib/prettier/index.js";

import * as eslint from "./lib/eslint/index.js";
import * as prettier  from "./lib/prettier/index.js";

export const eslintConfig: typeof eslint["default"];
export const prettierConfig: typeof prettier["default"];