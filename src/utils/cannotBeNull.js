function cannotBeNull(obj) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      throw new Error(`Parameter ${key} cannot be null or undefined!`);
    }
  }
  return true;
}

export { cannotBeNull };
