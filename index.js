function isEvenAsync(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (n % 2 === 0) {
        resolve(true);
      } else {
        reject(false);
      }
    }, 1000);
  });
}

function isTruthy(val) {
  return !!val;
}

module.exports = { isEvenAsync, isTruthy };
