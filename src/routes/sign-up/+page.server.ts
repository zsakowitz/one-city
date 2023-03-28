import { Account } from "$lib/server/account"
import { getFormData } from "$lib/server/get-form"
import { unwrapOr500 } from "$lib/server/unwrap"

export const actions = {
  async default(event) {
    const { email, name } = await getFormData(event.request, [
      "email",
      "name",
    ] as const)

    unwrapOr500(await Account.create({ email, name }))

    return { ok: true }
  },
}
