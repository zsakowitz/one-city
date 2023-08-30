import { ItemRequest } from "$lib/server/item-request.js"
import { unwrapOr500 } from "$lib/server/unwrap.js"
import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export async function load({
  locals,
  params: { id },
}: Parameters<PageServerLoad>[0]) {
  if (!locals.account) {
    throw error(403, "You need to be logged in to access this page.")
  }

  if (!unwrapOr500(await locals.account.select({ admin: true })).admin) {
    throw error(403, "You don't have permission to access this page.")
  }

  const request = new ItemRequest({ id })

  unwrapOr500(await request.delete())

  throw redirect(303, "/requests")
}
