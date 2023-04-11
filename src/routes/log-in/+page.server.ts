import { Account } from "$lib/server/account"
import { getFormData } from "$lib/server/get-form"

export const actions = {
  async default(event) {
    const { email } = await getFormData(event.request, ["email"] as const)

    const account = new Account({ email })

    return { ok: true }
  },
}
