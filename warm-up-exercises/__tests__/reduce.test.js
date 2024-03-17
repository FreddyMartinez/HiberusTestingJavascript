// Function should receive an array and a callback
// Function should apply the callback to each element in the array
const reduceNumbers = require("../src/reduce");

describe("Reduce", () => {
  it("should receive array of number and return sum of numbers", () => {
    const numbers = [1, 2, 3, 4, 5, 6];

    const callbackSum = (acc, current) => {
      return acc + current;
    };

    const callbackMult = (acc, current) => {
      return acc * current;
    };

    expect(typeof reduceNumbers(numbers, callbackSum)).toBe("number");
    expect(reduceNumbers(numbers, callbackSum)).toBe(21);
    expect(reduceNumbers(numbers, callbackMult)).toBe(720);
  });
});
