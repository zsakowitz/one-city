import { stdin, stdout } from "node:process"
import * as readline from "node:readline/promises"
import { colors } from "./ansi.js"
import { fromBase64, hashPassword, toBase64, verifyPassword } from "./hash.js"

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
})

console.clear()
console.log(
  colors.yellow + "Setting up OneCity account configuration..." + colors.reset
)

let username: string
let usernameAsBase64: string

while (true) {
  username = await rl.question(colors.blue + "Username: " + colors.reset)

  usernameAsBase64 = toBase64(username)

  if (fromBase64(usernameAsBase64) == username) {
    break
  }

  console.log(
    colors.red +
      "Error: " +
      colors.yellow +
      username +
      colors.red +
      " is an invalid username. Pick something else." +
      colors.reset
  )
}

let password: string
let hashedPassword: string

while (true) {
  password = await rl.question(colors.blue + "Password: " + colors.reset)

  hashedPassword = await hashPassword(password)

  if (await verifyPassword(password, hashedPassword)) {
    break
  }

  console.log(
    colors.red +
      "Error: " +
      colors.yellow +
      "********" +
      colors.red +
      " is an invalid password. Pick something else." +
      colors.reset
  )
}

console.log()
console.log(colors.yellow + "Confirming configuration...")

console.log(
  colors.blue +
    "Username: “" +
    colors.reset +
    username +
    colors.blue +
    "”." +
    colors.reset
)

console.log(
  colors.blue +
    "Password: “" +
    colors.reset +
    password +
    colors.blue +
    "”." +
    colors.reset
)

console.log()
console.log(colors.yellow + "Add these environment variables..." + colors.reset)

console.log(
  colors.blue +
    "ONE_CITY_USERNAME" +
    colors.reset +
    '="' +
    usernameAsBase64 +
    '"' +
    colors.reset
)

console.log(
  colors.blue +
    "ONE_CITY_PASSWORD" +
    colors.reset +
    '="' +
    hashedPassword +
    '"' +
    colors.reset
)
