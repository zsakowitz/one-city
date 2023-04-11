import { unwrapOr500 } from "$lib/server/unwrap.js"

export async function load({ locals: { account } }) {
  return {
    name: account
      ? unwrapOr500(await account.select({ name: true })).name
      : undefined,
  }
}
