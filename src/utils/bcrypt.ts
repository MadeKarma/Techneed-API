import { hashSync, compareSync } from "bcrypt";

const salt = 10;

export function generateHash(password: string): string {
  return hashSync(password, salt);
}

export function decodeHash(password: string, hash: string): boolean {
  return compareSync(password, hash);
}
