import { unwrapOr500 } from "$lib/server/unwrap.js"
import type { PageServerLoad } from "./$types"

export async function load({
  locals: { account },
}: Parameters<PageServerLoad>[0]) {
  if (account) {
    const { nameFirst, nameLast } = unwrapOr500(
      await account.select({ nameFirst: true, nameLast: true })
    )

    return { name: nameFirst + " " + nameLast }
  } else {
    return { name: undefined }
  }
}
