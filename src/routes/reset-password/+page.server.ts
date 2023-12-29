import { Account } from "$lib/server/account"
import { extract } from "$lib/server/extract"
import { send } from "$lib/server/mail"
import { unwrapOr500 } from "$lib/server/unwrap"
import type { Actions } from "./$types"

export const actions = {
  async default({ request }) {
    const { email } = await extract(request, ["email"] as const)

    const account = await Account.find({ email })

    if (!account.ok) {
      return { ok: false, reason: "That account doesn't exist." } as const
    }

    const resetKey = crypto.randomUUID().replace("-", "")

    const { nameFirst, nameLast } = unwrapOr500(
      await account.value!.update(
        {
          currentResetKey: resetKey,
          resetKeyExpiration: new Date(Date.now() + 1000 * 60 * 15),
        },
        { nameFirst: true, nameLast: true }
      )
    )

    unwrapOr500(
      await send({
        to: [{ name: `${nameFirst} ${nameLast}`, address: email }],
        subject: "Password reset request",
        text: `Hi ${nameFirst}!

Sorry you lost your password. Here's a link you can use to create a new one:

https://1city.zsnout.com/reset-password/${resetKey}

It'll expire in fifteen minutes, so use it now.

– The OneCity Team`,
      })
    )

    return { ok: true } as const
  },
} satisfies Actions
