import { Account } from "$lib/server/account.js"
import { query } from "$lib/server/database.js"
import { extract } from "$lib/server/extract.js"
import { unwrapOr500 } from "$lib/server/unwrap.js"
import { error, type Actions } from "@sveltejs/kit"

export async function load(event: import("./$types.js").PageServerLoadEvent) {
  let id

  if (event.locals.account) {
    const { admin, id: myId } = unwrapOr500(
      await event.locals.account.select({ admin: true, id: true })
    )

    id = myId

    if (!admin) {
      throw error(403, "You don't have permission to access this page.")
    }
  } else {
    throw error(403, "You don't have permission to access this page.")
  }

  const allAccounts = unwrapOr500(
    await query((db) =>
      db.account.findMany({
        select: {
          id: true,
          admin: true,
          email: true,
          nameFirst: true,
          nameLast: true,
        },
      })
    )
  )

  return {
    accounts: allAccounts.map(({ id, admin, email, nameFirst, nameLast }) => ({
      id,
      admin,
      email,
      name: nameFirst + " " + nameLast,
    })),
    id,
  }
}

export const actions = {
  async toggleStatus(event) {
    let myId: string

    if (event.locals.account) {
      const { admin, id } = unwrapOr500(
        await event.locals.account.select({ id: true, admin: true })
      )

      myId = id

      if (!admin) {
        throw error(403, "You don't have permission to access this page.")
      }
    } else {
      throw error(403, "You don't have permission to access this page.")
    }

    const { id } = await extract(event.request, ["id"] as const)

    if (id == myId) {
      throw error(400, "You can't remove yourself as an admin.")
    }

    const account = new Account({ id })

    const { admin } = unwrapOr500(await account.select({ admin: true }))

    unwrapOr500(await account.update({ admin: !admin }))

    const allAccounts = unwrapOr500(
      await query((db) =>
        db.account.findMany({
          select: {
            id: true,
            admin: true,
            email: true,
            nameFirst: true,
            nameLast: true,
          },
        })
      )
    )

    return {
      accounts: allAccounts.map(
        ({ id, admin, email, nameFirst, nameLast }) => ({
          id,
          admin,
          email,
          name: nameFirst + " " + nameLast,
        })
      ),
    }
  },
} satisfies Actions
