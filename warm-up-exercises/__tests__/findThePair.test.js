// recibe un array de números y un número objetivo
// encuentra los indices del par de números que sumados sean igual al número objetivo

const findPairs = require("../src/findPairs.js");

describe("findPairs", () => {
  it.each([
    [[2, 7, 11, 15], 9, [0, 1]],
    [[2, 3, 5, -11, 11, 15], 0, [3, 4]],
    [[-2, 3, 5, -15], 3, [0, 2]],
    [[1, 2, 3, 5, 6], 5, [1, 2]],
  ])(
    "should return the indexes of the pair of numbers that sum the target number",
    (testArray, target, result) => {
      expect(findPairs(testArray, target)).toEqual(result);
    }
  );
});
