import { unwrapOr500 } from "$lib/server/unwrap.js"
import type { PageServerLoad } from "./$types"

export async function load({
  locals: { account },
}: Parameters<PageServerLoad>[0]) {
  return {
    name: account
      ? unwrapOr500(await account.select({ name: true })).name
      : undefined,
  }
}
