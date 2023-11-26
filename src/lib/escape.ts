/** Escapes each interpolation as HTML. */
export function escape(
  strings: TemplateStringsArray,
  ...interpolations: unknown[]
) {
  let output = strings[0]!

  for (let index = 1; index < strings.length; index++) {
    output += String(interpolations[index - 1] || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")

    output += strings[index] || ""
  }

  return output
}
