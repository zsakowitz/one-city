import { error } from "@sveltejs/kit"

export async function getFormData<T extends readonly string[]>(
  request: Request,
  keys: T
) {
  const data = await request.formData()

  const output: Record<T[number], string> = Object.create(null)

  for (const key of keys) {
    const value = data.get(key)

    if (value == null) {
      throw error(
        400,
        "You forgot to submit a" +
          (key.match(/^[aeiou]/) ? "n " : " ") +
          key +
          "."
      )
    }

    if (typeof value != "string") {
      throw error(400, "Expected string " + key + ", found " + value + ".")
    }

    output[key as T[number]] = value
  }

  return output
}
