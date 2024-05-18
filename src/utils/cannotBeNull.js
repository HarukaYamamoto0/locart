/**
 * Checks if any property of the given object is null or undefined.
 * @param {Object} obj - The object to check.
 * @returns {[boolean, string?]} - A tuple where the first element is a boolean indicating if any property is null or
 * undefined, and the second element (if applicable) is the key of the first null or undefined property found.
 */
function cannotBeNull(obj) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      return [true, key];
    }
  }
  return [false];
}

export { cannotBeNull };
