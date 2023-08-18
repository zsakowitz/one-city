import { ItemRequest } from "$lib/server/item-request.js"
import { unwrapOr500 } from "$lib/server/unwrap.js"
import { error } from "@sveltejs/kit"

export async function load({ locals, params: { id } }) {
  let admin = false

  if (
    locals.account &&
    unwrapOr500(await locals.account.select({ admin: true })).admin
  ) {
    admin = true
  }

  const json = unwrapOr500(await new ItemRequest({ id }).toJSON())

  return {
    admin,
    id,
    request: admin
      ? json
      : { ...json, requester: "", contact: "", location: "" },
  }
}

export const actions = {
  async complete({ locals, params: { id } }) {
    if (!locals.account) {
      throw error(403, "You need to be logged in to access this page.")
    }

    if (!unwrapOr500(await locals.account.select({ admin: true })).admin) {
      throw error(403, "You don't have permission to access this page.")
    }

    const request = new ItemRequest({ id })

    unwrapOr500(await request.update({ completed: new Date() }))

    return {
      admin: true,
      id,
      json: unwrapOr500(await request.toJSON()),
    }
  },
  async uncomplete({ locals, params: { id } }) {
    if (!locals.account) {
      throw error(403, "You need to be logged in to access this page.")
    }

    if (!unwrapOr500(await locals.account.select({ admin: true })).admin) {
      throw error(403, "You don't have permission to access this page.")
    }

    const request = new ItemRequest({ id })

    unwrapOr500(await request.update({ completed: null }))

    return {
      admin: true,
      id,
      json: unwrapOr500(await request.toJSON()),
    }
  },
}
