import { ItemRequestList } from "$lib/server/item-request.js"
import { unwrapOr500 } from "$lib/server/unwrap.js"

export async function load() {
  const list = new ItemRequestList({ completed: false })

  const json = unwrapOr500(await list.toJSON())

  return { list: json }
}
