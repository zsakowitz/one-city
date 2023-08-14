import { Result } from "$lib/result"
import { toBase64, verifyPassword } from "./hash.js"
import { Session } from "./session.js"

const usernameAsBase64 = process.env.ONE_CITY_USERNAME!
const hashedPassword = process.env.ONE_CITY_PASSWORD!

if (!usernameAsBase64 || !hashedPassword) {
  throw new Error(
    "Invalid environment variables were provided. Make sure the `ONE_CITY_USERNAME` and `ONE_CITY_PASSWORD` environment variables are set. To initialize them with proper values, run `npm run auth:init` and use the generated environment variables."
  )
}

export async function checkCredentials(username: string, password: string) {
  try {
    if (toBase64(username) != usernameAsBase64) {
      return Result.error("An incorrect username was provided.")
    }

    if (!(await verifyPassword(password, hashedPassword))) {
      return Result.error("An incorrect password was provided.")
    }

    return Result.ok()
  } catch {
    return Result.error("An unknown error occurred. Try again later.")
  }
}

export {}
