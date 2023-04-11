declare namespace App {
  interface Error {}

  interface Locals {
    account?: import("$lib/server/account").Account
  }

  interface PageData {}

  interface Platform {}
}
