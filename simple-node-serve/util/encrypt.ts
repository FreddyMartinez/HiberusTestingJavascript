import { genSalt, hash } from "bcrypt";

export function generateSalt() {
  return new Promise<string>((resolve, reject) => {
    genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      resolve(salt);
    });
  });
}

export function encrypt(pasword: string, salt: string) {
  return new Promise((resolve, reject) => {
    hash(pasword, salt, (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(derivedKey);
    });
  });
}
