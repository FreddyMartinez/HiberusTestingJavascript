// const s = "asdasf";
// for (const c of s) {console.log(c)}
// s.charAt(idx)

const searchPalindrom = (str) => {
  const cleanString = str.toLowerCase().replace(/[^a-z0-9]/gi, "");

  return cleanString === cleanString.split("").reverse().join("");
};

module.exports = searchPalindrom;
