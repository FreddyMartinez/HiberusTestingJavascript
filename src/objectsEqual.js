function isEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  if (keys1.length !== Object.keys(obj2).length) return false;

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}

module.exports = isEqual;
