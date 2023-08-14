import { Account } from "$lib/server/account"
import { getFormData } from "$lib/server/get-form"
import { verifyPassword } from "$lib/server/hash.js"
import { unwrapOr500 } from "$lib/server/unwrap.js"
import { redirect } from "@sveltejs/kit"

export const actions = {
  async default(event) {
    const { email, password } = await getFormData(event.request, [
      "email",
      "password",
    ] as const)

    const account = new Account({ email })

    try {
      var { currentSession, password: hashedPassword } = unwrapOr500(
        await account.select({ currentSession: true, password: true })
      )
    } catch {
      return {
        ok: false,
        reason: "No account with that email exists.",
      } as const
    }

    if (!(await verifyPassword(password, hashedPassword))) {
      return {
        ok: false,
        reason: "Your password is incorrect.",
      } as const
    }

    event.cookies.set("1city_current_session", currentSession, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      maxAge: 60 * 60 * 24 * 30,
    })

    throw redirect(303, "/")
  },
}
