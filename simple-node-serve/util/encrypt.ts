import { pbkdf2, randomBytes } from "crypto";

export function generateSalt() {
  return randomBytes(32).toString("hex");
}

export function encrypt(pasword: string, salt: string) {
  return new Promise((resolve, reject) => {
    pbkdf2(pasword, salt, 10000, 64, "sha512", (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(derivedKey.toString("hex"));
    });
  });
}
