/**
 * Coerces a value to a specified type.
 *
 * @template T - The type to coerce the value to.
 * @param {any} value - The value to coerce.
 * @returns {T} The coerced value.
 */
export function coerce(value) {
  // eslint-disable-next-line prettier/prettier
  return /** @type {T} */ (value);
}

/**
 * @template {any[] | Record<PropertyKey, any>} T
 * @param {T} value
 * @returns {T}
 */
export function sortAlphabetically(value) {
  if (!isObject(value)) {
    return value.toSorted(compareAlphabetically);
  }

  /**
   * @type {T}
   */
  const result = coerce({});
  const keys = sortAlphabetically(Object.keys(value));

  for (let i = 0; i < keys.length; i++) {
    /**
     * @type {keyof T}
     */
    const key = coerce(keys[i]);
    const curr = value[key];

    result[key] = coerce(isObject(curr) ? sortAlphabetically(coerce(curr)) : curr);
  }

  return result;
}

/**
 * Compares two strings alphabetically.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function compareAlphabetically(a, b) {
  return a.localeCompare(b);
}

/**
 * Simple object check.
 *
 * @template T
 * @template {Record<PropertyKey, any>} [U=Record<PropertyKey, any>]
 * @param {T} item
 * @returns {T is U}
 */
export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * @typedef DeepMergeOptions
 * @property {boolean}       [arrayMerge=true] - Whether to merge arrays or not.
 * @property {PropertyKey[]} [exclude=[]]      - The keys to exclude from merging.
 */

/**
 * Deep merge two objects.
 *
 * @template T
 * @param {any}              obj1
 * @param {any}              obj2
 * @param {DeepMergeOptions} [options={}] - Options for merging.
 * @returns {T}
 */
export function deepMerge(obj1, obj2, { arrayMerge = true, exclude = [] } = {}) {
  /**
   * @type {any}
   */
  const result = coerce({});
  const keys = Object.getOwnPropertyNames(obj1).concat(Object.getOwnPropertyNames(obj2));

  for (const key of keys) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (isObject(value1) && isObject(value2) && !exclude.includes(key)) {
      result[key] = deepMerge(value1, value2, { arrayMerge, exclude });
    } else if (Array.isArray(value1) && Array.isArray(value2) && arrayMerge) {
      result[key] = value1.concat(value2);
    } else if (value2 !== undefined) {
      result[key] = value2;
    } else {
      result[key] = value1;
    }
  }

  return coerce(result);
}

/**
 * @typedef DeepMergeMultipleOptions
 * @property {boolean}       [arrayMerge=false] - Whether to merge arrays or not.
 * @property {any[]}         [objects=[]]       - The objects to merge.
 * @property {PropertyKey[]} [exclude=[]]       - The keys to exclude from merging.
 */

/**
 * @template T
 * @param {any}                      main
 * @param {DeepMergeMultipleOptions} options
 * @returns {T}
 */
export function deepMergeMultiple(
  main,
  { objects = [], arrayMerge = false, exclude = [] } = {},
) {
  /**
   * @type {any}
   */
  let result = {};

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];

    result = deepMerge(result, obj, { arrayMerge, exclude });
  }

  result = deepMerge(result, main, { arrayMerge, exclude });

  return result;
}
