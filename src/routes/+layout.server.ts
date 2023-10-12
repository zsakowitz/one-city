import { unwrapOr500 } from "$lib/server/unwrap"
import type { LayoutServerLoad } from "./$types"

export async function load({
  locals: { account },
}: Parameters<LayoutServerLoad>[0]) {
  return {
    isLoggedIn: !!account,
    isAdmin: account
      ? unwrapOr500(await account.select({ admin: true })).admin
      : false,
  }
}
