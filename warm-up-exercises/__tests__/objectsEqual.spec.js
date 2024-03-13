// Crear una función que diga si dos objetos son iguales
const isEqual = require('../src/objectsEqual');

describe('isEqualFunction', () => {

  it("Verifica que dos objetos son iguales", () => {
    const obj1 = {
      val1: 'val1',
      val2: 'val2'
    }

    const obj2 = {
      val2: 'val2',
      val1: 'val1'
    }

    expect(isEqual(obj1, obj2)).toBe(true)
  })

  it("should return false if two objs are not equals", () => {
    const obj1 = {
        val1: 'val1',
        val2: 'val2'
      };
  
      const obj2 = {
        val1: 'val1',
        val2: 'val1'
      };

      const obj3 = {
        val1: 'val1'
      };

      expect(isEqual(obj1, obj2)).toBe(false);
      expect(isEqual(obj1, obj3)).toBe(false);
  });

} )