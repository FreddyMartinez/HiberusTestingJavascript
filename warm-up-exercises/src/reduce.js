function reducer(arr, cb) {
  let acc = arr[0];
  for (let i = 1; i < arr.length; i++) {
    acc = cb(acc, arr[i]);
  }
  return acc;
}

module.exports = reducer;