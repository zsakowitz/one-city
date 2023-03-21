import { get, writable, type Writable } from "svelte/store"

export function createStorage(
  key: string,
  defaultValue: string
): Writable<string> {
  const realKey = `z8:${key}`

  const store = writable(
    typeof localStorage != "undefined"
      ? localStorage.getItem(realKey) ?? defaultValue
      : defaultValue
  )

  if (typeof localStorage != "undefined" && typeof window != "undefined") {
    window.addEventListener("storage", (event) => {
      if (event.storageArea == localStorage && event.key == realKey) {
        store.set(event.newValue ?? defaultValue)
      }
    })
  }

  return {
    subscribe: store.subscribe,
    set(value) {
      localStorage.setItem(realKey, value)
      store.set(value)
    },
    update(updater) {
      const next = updater(get(store))
      localStorage.setItem(realKey, next)
    },
  }
}
