/** Escapes each interpolation as HTML. */
export function escape(
  strings: TemplateStringsArray,
  ...interpolations: unknown[]
) {
  let output = strings[0]!

  for (let index = 1; index < strings.length; index++) {
    const interp = interpolations[index - 1]

    const interpolation =
      interp instanceof RawHtml
        ? getRawHtml(interp)
        : String(interp || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;")

    output += interpolation
    output += strings[index] || ""
  }

  return output
}

let getRawHtml: (self: RawHtml) => string

export class RawHtml {
  #html: string

  constructor(html: string) {
    this.#html = html
  }

  static {
    getRawHtml = (self) => self.#html
  }
}
