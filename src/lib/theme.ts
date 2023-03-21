import { browser } from "$app/environment"
import { derived, get, writable } from "svelte/store"
import { createStorage } from "./storage"

export const isDeviceDark = writable(false)

if (browser) {
  const query = matchMedia("(prefers-color-scheme: dark)")

  if (query.matches) {
    isDeviceDark.set(true)
  }

  query.addEventListener("change", () => {
    isDeviceDark.set(query.matches)
  })
}

export const theme = createStorage("theme", "auto")

export const isDark = derived(
  [isDeviceDark, theme],
  ([$isDeviceDark, $theme]) => {
    return $isDeviceDark ? $theme != "light" : $theme == "dark"
  }
)

export function toggleIsDark() {
  theme.set(
    get(isDeviceDark)
      ? get(theme) == "light"
        ? "auto"
        : "light"
      : get(theme) == "dark"
      ? "auto"
      : "dark"
  )
}
