/**
 * Checks if any property of the given object is null or undefined.
 * @param {Object} obj - The object to check.
 * @returns {string[]} - An array of keys where the corresponding property is null or undefined.
 * If no such properties exist, the array will be empty.
 */
function cannotBeEmpty(obj) {
  const invalidFields = [];

  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      invalidFields.push(key);
    }
  }
  return invalidFields;
}

export { cannotBeEmpty };
