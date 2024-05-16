function cannotBeNull(obj) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      return [true, key];
    }
  }
  return [false];
}

export { cannotBeNull };
