import { ItemRequestList } from "$lib/server/item-request.js"
import { unwrapOr500 } from "$lib/server/unwrap.js"

export async function load(event) {
  const list = new ItemRequestList({ completed: false })

  const json = unwrapOr500(await list.toJSON())

  let admin = false

  if (event.locals.account) {
    ;({ admin } = unwrapOr500(
      await event.locals.account.select({ admin: true })
    ))
  }

  return { admin, list: json }
}
