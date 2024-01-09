import { ItemRequestList } from "$lib/server/item-request.js"
import { unwrapOr500 } from "$lib/server/unwrap.js"
import type { PageServerLoad } from "./$types"

export async function load(event: Parameters<PageServerLoad>[0]) {
  const completed = event.url.searchParams.get("completed")

  const list = new ItemRequestList({})

  let json = unwrapOr500(await list.toJSON())

  if (completed == "true") {
    json = json.filter((x) => x.completed)
  } else if (completed != "any") {
    json = json.filter((x) => !x.completed)
  }

  let admin = false

  if (event.locals.account) {
    ;({ admin } = unwrapOr500(
      await event.locals.account.select({ admin: true })
    ))
  }

  if (!admin) {
    for (const entry of json) {
      entry.requester = ""
      entry.requesterFirst = ""
      entry.requesterLast = ""
      entry.requesterHTML = ""
    }
  }

  return { admin, completed, list: json }
}
