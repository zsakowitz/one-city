import { extract } from "$lib/server/extract.js"
import { ItemRequest } from "$lib/server/item-request.js"
import { unwrapOr500 } from "$lib/server/unwrap.js"
import { error } from "@sveltejs/kit"

export async function load(event) {
  if (!event.locals.account) {
    throw error(403, "You need to log in to access this page.")
  }

  if (!unwrapOr500(await event.locals.account.select({ admin: true })).admin) {
    throw error(403, "You don't have permission to access this page.")
  }
}

export const actions = {
  async default(event) {
    if (!event.locals.account) {
      throw error(403, "You need to log in to access this page.")
    }

    if (
      !unwrapOr500(await event.locals.account.select({ admin: true })).admin
    ) {
      throw error(403, "You don't have permission to access this page.")
    }

    const data = await extract(event.request, [
      "contact",
      "description",
      "name",
      "requester",
      "location",
      "urgency",
      "size",
    ] as const)

    const item = await ItemRequest.create({
      ...data,
      size:
        data.size == "sm" ? "Small" : data.size == "lg" ? "Large" : "Medium",
      urgency:
        data.urgency == "1"
          ? "HighPriority"
          : data.urgency == "3"
          ? "LowPriority"
          : "Standard",
    })

    if (item.ok) {
      return { ok: true, name: data.name } as const
    } else {
      return { ok: false, reason: item.reason } as const
    }
  },
}
