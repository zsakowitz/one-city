import { Account } from "$lib/server/account"
import { getFormData } from "$lib/server/get-form"
import { unwrapOr500 } from "$lib/server/unwrap"
import type { Actions } from "./$types"

export const actions = {
  async default(event) {
    const { email, nameFirst,nameLast, password, password2 } = await getFormData(
      event.request,
      ["email", "nameFirst","nameLast", "password", "password2"] as const
    )

    if (password != password2) {
      return { ok: false, reason: "Passwords do not match." } as const
    }

    unwrapOr500(await Account.create({ email, nameFirst,nameLast, password }))

    return { ok: true } as const
  },
} satisfies Actions
