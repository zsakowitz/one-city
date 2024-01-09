import { error } from "@sveltejs/kit"

export function extractFromFormData<
  T extends readonly string[],
  U extends readonly string[] = []
>(data: FormData, keys: T, optKeys: U = [] as any) {
  const output: any = {}

  for (const key of keys) {
    const value = data.get(key)

    if (typeof value == "string") {
      output[key] = value
    } else if (value == null) {
      throw error(403, "The key '" + key + "' was not submitted.")
    } else {
      throw error(
        403,
        "The key '" + key + "' expected a string but received a file."
      )
    }
  }

  for (const key of optKeys) {
    const value = data.get(key)

    if (typeof value == "string") {
      output[key] = value
    } else if (value == null) {
      output[key] = undefined
    } else {
      throw error(
        403,
        "The key '" + key + "' expected a string but received a file."
      )
    }
  }

  return output as Record<T[number], string> &
    Record<U[number], string | undefined>
}

export async function extract<T extends readonly string[]>(
  request: Request,
  keys: T
) {
  const data = await request.formData()

  return extractFromFormData(data, keys)
}
