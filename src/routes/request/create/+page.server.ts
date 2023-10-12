import { extract } from "$lib/server/extract.js"
import { ItemRequest } from "$lib/server/item-request.js"
import { unwrapOr500 } from "$lib/server/unwrap.js"
import { error, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types.js"

export async function load(event: Parameters<PageServerLoad>[0]) {
  if (!event.locals.account) {
    throw error(403, "You need to log in to access this page.")
  }

  if (!unwrapOr500(await event.locals.account.select({ admin: true })).admin) {
    throw error(403, "You don't have permission to access this page.")
  }

  const id = event.url.searchParams.get("id")

  if (id) {
    const info = await new ItemRequest({ id }).select({
      description: true,
      email: true,
      id: true,
      name: true,
      location: true,
      requesterFirst: true,
      requesterLast: true,
      size: true,
      tel: true,
      urgency: true,
      url: true,
    })

    if (!info.ok) {
      throw error(404, "No request exists with the ID " + id + ".")
    }

    return info.value!
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
      "description",
      "email",
      "id",
      "name",
      "requesterFirst",
      "requesterLast",
      "location",
      "size",
      "tel",
      "urgency",
      "url",
    ] as const)

    const info = {
      ...data,
      id: undefined,
      size:
        data.size == "sm" ? "Small" : data.size == "lg" ? "Large" : "Medium",
      urgency:
        data.urgency == "1"
          ? "HighPriority"
          : data.urgency == "3"
          ? "LowPriority"
          : "Standard",
    } as const

    if (data.id) {
      const item = await new ItemRequest({ id: data.id }).update(info)

      if (!item.ok) {
        return { ok: false, reason: item.reason } as const
      }

      throw redirect(303, "/request/" + data.id)
    }

    const item = await ItemRequest.create(info)

    if (item.ok) {
      return { ok: true, name: data.name } as const
    } else {
      return { ok: false, reason: item.reason } as const
    }
  },
} satisfies Actions
