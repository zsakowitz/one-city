import { Account } from "$lib/server/account"
import { unwrapOr500 } from "$lib/server/unwrap.js"
import { redirect } from "@sveltejs/kit"
import type { RequestEvent } from "./$types"

export async function GET({ cookies, params: { code } }: RequestEvent) {
  const account = unwrapOr500(await Account.verify(code))

  const { currentSession } = unwrapOr500(
    await account.select({ currentSession: true })
  )

  cookies.set("1city_current_session", currentSession, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  })

  throw redirect(303, "/")
}
