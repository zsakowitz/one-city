import { extract } from "$lib/server/extract.js"
import { ItemRequest } from "$lib/server/item-request.js"

export const actions = {
  async default(event) {
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
