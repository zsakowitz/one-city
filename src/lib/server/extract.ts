import { error } from "@sveltejs/kit"

export function extractFromFormData<T extends readonly string[]>(
  data: FormData,
  keys: T
) {
  const output: any = {}

  for (const key of keys) {
    const value = data.get(key)

    if (typeof value == "string") {
      output[key] = value
    } else {
      throw error(403, "The key '" + key + "' was submitted incorrectly.")
    }
  }

  return output as Record<T[number], string>
}

export async function extract<T extends readonly string[]>(
  request: Request,
  keys: T
) {
  const data = await request.formData()

  return extractFromFormData(data, keys)
}
