function isEven(n) {
  return n % 2 === 0;
}

function isOdd(n) {
  return !isEven(n);
}

module.exports = { isEven, isOdd };