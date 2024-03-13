const { isEvenAsync } = require("../index")

describe("isEvenAsync", () => {
  it("should resolve true when the number is even", () => {
    return isEvenAsync(2).then((result) => {
      expect(result).toBe(true);
    });
  });

  it("should reject false when the number is odd", () => {
    return isEvenAsync(3).catch((result) => {
      expect(result).toBe(false);
    });
  });
});