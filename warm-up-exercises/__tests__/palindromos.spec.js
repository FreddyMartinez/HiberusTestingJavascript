// Función que retorne si una palaba/frase es palíndroma
// Anita la gorda lagartona no traga la droga latina -> true
// Super palindromo -> false
const searchPalindrom = require('../src/palindromos.js');

describe('buscar palindromos', () => {
    it('should return false if a word is not palindrom', () => {
        expect(searchPalindrom('Super palindromo')).toBe(false);
    });

    it('should return true if a word is palindrom', () => {
        expect(searchPalindrom('Anita, la gorda lagartona, no traga la droga latina')).toBe(true);
        expect(searchPalindrom('Amo la pacifica paloma')).toBe(true);
    });
})