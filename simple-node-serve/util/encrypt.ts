import { genSalt, hash } from "bcrypt";
import { randomBytes } from "crypto";

export function createToken(length: number) {
  return randomBytes(length).toString("hex");
}

export function generateSalt() {
  return genSalt(10);
}

export function encrypt(pasword: string, salt: string) {
  return hash(pasword, salt);
}
