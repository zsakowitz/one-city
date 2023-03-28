import type { Result } from "$lib/result"
import { error } from "@sveltejs/kit"

export function unwrapOr500<T>(result: Result<T>): T {
  return result.unwrapOr((reason) => {
    throw error(503, reason)
  })
}
