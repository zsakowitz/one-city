import { compare, hash } from "bcrypt"

export async function hashPassword(password: string) {
  return toBase64(await hash(password, 10))
}

export function verifyPassword(password: string, hashed: string) {
  return compare(password, fromBase64(hashed))
}

export function toBase64(text: string) {
  return Buffer.from(text).toString("base64url")
}

export function fromBase64(text: string) {
  return Buffer.from(text, "base64url").toString("utf8")
}
