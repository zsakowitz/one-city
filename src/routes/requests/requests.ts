import { escapeHTML } from "$lib/escape-html"
import type { ItemRequest } from "./Request.svelte"

export const requests: readonly ItemRequest[] = (
  [
    {
      description:
        "The individual seeks a light green couch, approximately 12 feet in length, for their living space. This generic couch would ideally possess a subtle shade of green, evoking a sense of tranquility and harmony. With a generous length of 12 feet, it offers ample seating area for multiple individuals to relax comfortably or engage in social gatherings. The design and style details of the couch are unspecified, allowing for flexibility and personal preferences to be considered.\nOne good idea might be to look at this listing on Amazon, available at https://amazon.com/.",
      id: "427628dc0c994546b5675a2be25e0d6d",
      name: "Light green couch, ~12 feet long",
      requestor: "Ethan Reynolds",
      creation: new Date(2023, 2, 14),
      size: "lg",
      urgency: 1,
    },
    {
      description:
        "Having 8 sets of silverware offers numerous advantages for individuals or households. Firstly, it provides practicality and convenience, reducing the frequency of washing and ensuring that clean utensils are readily available. This is particularly beneficial for those with busy schedules or limited time for household chores. Secondly, it accommodates larger families or frequent guests, allowing everyone to enjoy meals together without worrying about shortages. Additionally, having multiple sets enables hosting of social gatherings or dinner parties with ease, creating a welcoming atmosphere and eliminating the need for disposable cutlery. Lastly, it serves as a backup in case of misplaced or damaged pieces, ensuring a consistent and cohesive dining experience.",
      id: "706da05bed504379b7f2786a25308add",
      name: "8 sets of silverware, forks/spoons/knives only",
      size: "sm",
      requestor: "Olivia Mitchell",
      creation: new Date(2023, 5, 14),
      urgency: 2,
    },
    {
      description:
        "I'm in need of a microwave for my kitchen. It would be incredibly helpful for quick and convenient meal preparation, defrosting frozen foods, and reheating leftovers. Ideally, I'm looking for a compact and reliable model with user-friendly controls and a decent capacity to meet my everyday cooking needs.",
      id: "6844565b3b13456fad497a9b156b44db",
      name: "Microwave",
      requestor: "Lucas Morgan",
      creation: new Date(2023, 5, 27),
      size: "md",
      urgency: 3,
    },
    {
      description:
        "I'm searching for three dining room chairs, preferably with straw seating. I adore the natural and rustic charm that straw brings to a space. These chairs would not only add character to my dining area but also provide a comfortable and inviting seating option for family and guests during meals and gatherings.",
      id: "2c1319db40f04ba8b84393ae8d734a64",
      name: "Three dining room chairs, straw seating preferred",
      requestor: "Ava Sullivan",
      creation: new Date(2022, 1, 5),
      size: "md",
      urgency: 2,
    },
  ] satisfies readonly Omit<ItemRequest, "nameHTML" | "requestorHTML">[]
)
  .map((item) => {
    ;(item as ItemRequest).nameHTML = escapeHTML(item.name)
    ;(item as ItemRequest).requestorHTML = escapeHTML(item.requestor)

    return item as ItemRequest
  })
  .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
  .sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase()
      ? -1
      : a.name.toLowerCase() > b.name.toLowerCase()
      ? 1
      : 0
  )
  .sort((a, b) =>
    a.requestor < b.requestor ? -1 : a.requestor > b.requestor ? 1 : 0
  )
  .sort((a, b) =>
    a.requestor.toLowerCase() < b.requestor.toLowerCase()
      ? -1
      : a.requestor.toLowerCase() > b.requestor.toLowerCase()
      ? 1
      : 0
  )
