import { sortAlphabetically } from "../utils.js";
import jsconfig from "./jsconfig.js";

/**
 * @import {TsConfigJson} from "type-fest"
 */

/**
 * @satisfies {TsConfigJson}
 */
const tsconfig = {
  compilerOptions: sortAlphabetically({
    ...jsconfig.compilerOptions,
    allowImportingTsExtensions: true,
  }),
  exclude: sortAlphabetically(jsconfig.exclude),
  typeAcquisition: jsconfig.typeAcquisition,
};

export default tsconfig;
