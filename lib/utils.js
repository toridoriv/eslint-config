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
