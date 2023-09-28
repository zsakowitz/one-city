import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions = {
  default(event) {
    event.cookies.delete("1city_current_session")
    throw redirect(303, "/")
  },
} satisfies Actions
