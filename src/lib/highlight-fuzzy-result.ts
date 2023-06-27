// Adapted from fuzzysort to provide safe HTML

import { escapeHTML } from "./escape-html"

export function highlightFuzzySearchResult(
  result: Fuzzysort.Result & { _indexes?: number[] & { len: number } },
  open?: string,
  close?: string
): string

export function highlightFuzzySearchResult(
  result: null,
  open?: string,
  close?: string
): undefined

export function highlightFuzzySearchResult(
  result:
    | (Fuzzysort.Result & { _indexes?: number[] & { len: number } })
    | null
    | undefined,
  open?: string,
  close?: string
): string | undefined

export function highlightFuzzySearchResult(
  result:
    | (Fuzzysort.Result & { _indexes?: number[] & { len: number } })
    | null
    | undefined,
  open = "<b>",
  close = "</b>"
) {
  if (result == null) {
    return undefined
  }

  let highlighted = ""
  let matchesIndex = 0
  let opened = false
  let target = result.target
  let targetLen = target.length

  const indexes = result
    ._indexes!.slice(0, result._indexes!.len)
    .sort((a, b) => a - b)

  for (let i = 0; i < targetLen; ++i) {
    const char = target[i]!

    if (indexes[matchesIndex] === i) {
      ++matchesIndex

      if (!opened) {
        opened = true
        highlighted += open
      }

      if (matchesIndex === indexes.length) {
        highlighted +=
          escapeHTML(char) + close + escapeHTML(target.slice(i + 1))

        break
      }
    } else if (opened) {
      opened = false
      highlighted += close
    }

    highlighted += escapeHTML(char)
  }

  return highlighted
}
