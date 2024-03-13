// Si recibes un número divisible por 3, devuelves "Fizz"
// Si recibes un número divisible por 5, devuelves "Buzz"
// Si recibes un número divisible por 3 y por 5, devuelves "FizzBuzz"
// En cualquier otro caso, devuelves el número recibido

const fizzbuzz = require('../src/fizzbuzz.js');

describe('fizzbuzz', () => {
  test("should return 'Fizz' when the number is divisible by 3", () => {
    expect(fizzbuzz(3)).toBe('Fizz');
    expect(fizzbuzz(6)).toBe('Fizz');
  });

  it("should return 'Buzz' when the number is divisible by 5", () => {
    expect(fizzbuzz(5)).toBe('Buzz');
    expect(fizzbuzz(10)).toBe('Buzz');
  });

  it("should return 'FizzBuzz' when the number is divisible by 3 and 5", () => {
    expect(fizzbuzz(15)).toBe('FizzBuzz');
    expect(fizzbuzz(30)).toBe('FizzBuzz');
  });

  it("should return the number when it's not divisible by 3 or 5", () => {
    expect(fizzbuzz(1)).toBe(1);
    expect(fizzbuzz(11)).toBe(11);
  });
});
