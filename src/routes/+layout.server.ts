import type { LayoutServerLoad } from "./$types"

export async function load({
  locals: { account },
}: Parameters<LayoutServerLoad>[0]) {
  return {
    isLoggedIn: !!account,
  }
}
