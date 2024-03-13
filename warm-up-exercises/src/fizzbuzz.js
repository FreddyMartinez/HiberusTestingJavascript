function fizzbuzz(n) {
  let res = "";

  if (n % 3 === 0) {
    res += "Fizz";
  }

  if (n % 5 === 0) {
    res += "Buzz";
  }

  return res ? res : n;
}

module.exports = fizzbuzz;