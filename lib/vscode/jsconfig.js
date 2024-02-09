/**
 * Properties for a `jsconfig.json` file.
 * A `jsconfig.json` file specifies the root files and the options for the features
 * provided by the JavaScript language service.
 *
 * @module jsconfig
 */
const jsconfig = {
  compilerOptions: {
    allowJs: true,
    allowUnreachableCode: false,
    checkJs: true,
    declaration: false,
    exactOptionalPropertyTypes: true,
    ignoreDeprecations: "5.0",
    isolatedModules: true,
    keyofStringsOnly: false,
    maxNodeModuleJsDepth: 3,
    module: "nodenext",
    moduleResolution: "nodenext",
    noEmit: true,
    noErrorTruncation: false,
    noImplicitAny: true,
    noImplicitOverride: false,
    noImplicitReturns: true,
    noImplicitThis: true,
    noPropertyAccessFromIndexSignature: false,
    noUncheckedIndexedAccess: true,
    resolveJsonModule: true,
    skipLibCheck: true,
    strictBindCallApply: true,
    strictFunctionTypes: false,
    strictNullChecks: true,
    strictPropertyInitialization: true,
    suppressExcessPropertyErrors: true,
    target: "esnext",
    typeRoots: ["./node_modules/@types/"],
    types: ["node"],
    useUnknownInCatchVariables: true,
  },
  exclude: ["node_modules"],
  typeAcquisition: {
    enable: false,
  },
};

export default jsconfig;
