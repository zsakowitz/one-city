import { Account } from "$lib/server/account"
import { extract } from "$lib/server/extract"
import { hashPassword } from "$lib/server/hash"
import { send } from "$lib/server/mail"
import { unwrapOr500 } from "$lib/server/unwrap"
import { redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"

export const load = (async ({ params: { code } }) => {
  const account = unwrapOr500(
    (await Account.find({ currentResetKey: code })).withError(
      "That account doesn't exist."
    )
  )

  const { email, resetKeyExpiration } = unwrapOr500(
    await account.select({ email: true, resetKeyExpiration: true })
  )

  if (new Date() > resetKeyExpiration) {
    throw new Error("That reset link expired.")
  }

  return { email }
}) satisfies PageServerLoad

export const actions = {
  async default({ cookies, params: { code }, request }) {
    const { password } = await extract(request, ["password"] as const)

    const account = unwrapOr500(
      (await Account.find({ currentResetKey: code })).withError(
        "That account doesn't exist."
      )
    )

    const { currentSession, email, nameFirst, nameLast, resetKeyExpiration } =
      unwrapOr500(
        await account.select({
          currentSession: true,
          email: true,
          nameFirst: true,
          nameLast: true,
          resetKeyExpiration: true,
        })
      )

    if (new Date() > resetKeyExpiration) {
      throw new Error("That reset link expired.")
    }

    unwrapOr500(
      await account.update({
        password: await hashPassword(password),
        currentResetKey: crypto.randomUUID(),
      })
    )

    cookies.set("1city_current_session", currentSession, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      maxAge: 60 * 60 * 24 * 30,
    })

    unwrapOr500(
      await send({
        subject: "Password reset successfully",
        to: [{ name: `${nameFirst} ${nameLast}`, address: email }],
        text: `Hi ${nameFirst}!

Someone (probably you) just reset your password.

If you did that, then don't worry, everything's fine.But if you didn't do that,
then someone else might have access to your email. If that's true, you may want
to change your email password to stop others from getting into your email.

– The OneCity Team`,
      })
    )

    throw redirect(303, "/")
  },
} satisfies Actions
