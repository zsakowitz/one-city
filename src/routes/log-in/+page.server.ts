import { Account } from "$lib/server/account"
import { getFormData } from "$lib/server/get-form"
import { unwrapOr500 } from "$lib/server/unwrap.js"
import { redirect } from "@sveltejs/kit"

export const actions = {
  async default(event) {
    const { email } = await getFormData(event.request, ["email"] as const)

    const account = new Account({ email })

    const { currentSession } = unwrapOr500(
      await account.select({ currentSession: true })
    )

    event.cookies.set("1city_current_session", currentSession, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      maxAge: 60 * 60 * 24 * 30,
    })

    throw redirect(303, "/")
  },
}
