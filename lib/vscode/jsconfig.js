/**
 * @import {TsConfigJson} from "type-fest"
 */

/**
 * @import tsconfig from "./tsconfig.js"
 */

/**
 * Properties for a `jsconfig.json` file.
 * A `jsconfig.json` file specifies the root files and the options for the features
 * provided by the JavaScript language service.
 *
 * @module jsconfig
 * @deprecated Use {@link tsconfig} instead.
 * @satisfies {TsConfigJson}
 */
const jsconfig = {
  compilerOptions: {
    allowJs: true,
    allowUnreachableCode: false,
    checkJs: true,
    declaration: false,
    exactOptionalPropertyTypes: true,
    isolatedModules: true,
    keyofStringsOnly: false,
    maxNodeModuleJsDepth: 3,
    module: "nodenext",
    moduleResolution: "nodenext",
    noEmit: true,
    noErrorTruncation: true,
    noImplicitAny: true,
    noImplicitOverride: false,
    noImplicitReturns: true,
    noImplicitThis: true,
    noPropertyAccessFromIndexSignature: false,
    noUncheckedIndexedAccess: false,
    resolveJsonModule: true,
    skipLibCheck: true,
    strictBindCallApply: true,
    strictFunctionTypes: true,
    strictNullChecks: true,
    strictPropertyInitialization: true,
    target: "esnext",
    typeRoots: ["./node_modules/@types/"],
    types: ["node"],
    useUnknownInCatchVariables: true,
  },
  exclude: ["node_modules", "tmp", ".tmp", "dist", "coverage", "logs", "*.log"],
  typeAcquisition: {
    enable: false,
  },
};

export default jsconfig;
