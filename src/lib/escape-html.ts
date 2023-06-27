export function escapeHTML(text: string): string {
  let output = ""

  for (const char of text) {
    output +=
      char == "<"
        ? "&lt;"
        : char == ">"
        ? "&gt;"
        : char == '"'
        ? "&quot;"
        : char == "'"
        ? "&apos;"
        : char == "&"
        ? "&amp;"
        : char
  }

  return output
}
