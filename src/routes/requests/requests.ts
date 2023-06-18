import type { ItemRequest } from "./Request.svelte"

export const requests: readonly ItemRequest[] = [
  {
    name: "Light green couch, ~12 feet long",
    size: "lg",
    urgency: 1,
  },
  {
    name: "8 sets of silverware, forks/spoons/knives only",
    size: "sm",
    urgency: 2,
  },
  {
    name: "Microwave",
    size: "md",
    urgency: 3,
  },
  {
    name: "Three dining room chairs, straw seating preferred",
    size: "md",
    urgency: 2,
  },
]
