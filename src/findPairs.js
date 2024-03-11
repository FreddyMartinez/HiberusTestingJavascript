function findPairs(arr, target) {
  const m = new Map();

  for (let i = 0; i < arr.length; i++ ) {
    const res = target - arr[i];

    if (m.has(res)) {
      return [m.get(res), i];
    }

    m.set(arr[i], i);
  }

  return []
}

module.exports = findPairs;