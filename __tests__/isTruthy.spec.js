const { isTruthy } = require('../index.js');

describe('isTruthy', () => {
  
  it.each([
    [1, true],
    ["hello", true],
    [true, true],
    [0, false],
    ["", false],
    [[], true],
  ])("return %s when the value is %s", (value, result) => {
    expect(isTruthy(value)).toBe(result);
  });
});