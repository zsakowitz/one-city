import { Account } from "$lib/server/account"
import type { Handle } from "@sveltejs/kit"

export async function handle({ event, resolve }: Parameters<Handle>[0]) {
  const currentSession = event.cookies.get("1city_current_session")

  if (currentSession) {
    const account = await Account.find({ currentSession })

    if (account.ok) {
      event.locals.account = account.value
    }
  }

  return resolve(event)
}
