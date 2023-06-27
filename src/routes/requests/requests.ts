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
        "I'm in need of a microwave for my kitchen. It would be incredibly helpful for quick and convenient meal preparation, defrosting frozen foods, and reheating leftovers. Ideally, I'm looking for a compact and reliable model with userfriendly controls and a decent capacity to meet my everyday cooking needs.",
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
    {
      name: "Dining room table with six chairs",
      description:
        "Looking for a dining room table that comes with six chairs. Preferably a modern design with a sturdy construction and a table size that can comfortably accommodate six people. The chairs should have comfortable seating and complement the overall aesthetic.",
      requestor: "Olivia Mitchell",
      size: "lg",
      urgency: 2,
      id: "d177b90edf0f42b5a283c61f483bb4cc",
      creation: new Date(2023, 2, 5),
    },
    {
      name: "Stainless steel silverware set",
      description:
        "In need of a complete stainless steel silverware set for a family of four. Seeking durable and welldesigned flatware with a polished finish. The set should include dinner forks, salad forks, knives, soup spoons, and teaspoons, providing a stylish and functional dining experience.",
      requestor: "Lucas Morgan",
      size: "sm",
      urgency: 1,
      id: "cb483392c7d9491081d704d463677c4c",
      creation: new Date(2023, 0, 18),
    },
    {
      name: "Queensized memory foam mattress",
      description:
        "Searching for a queensized memory foam mattress that offers exceptional comfort and support. The mattress should have a mediumfirm feel, superior pressure relief, and be hypoallergenic. Looking for a highquality sleep experience to promote restful nights.",
      requestor: "Ava Sullivan",
      size: "md",
      urgency: 3,
      id: "c27fed4d7e5e450992b711c1d4904349",
      creation: new Date(2023, 4, 28),
    },
    {
      name: "Kingsized bed frame with storage",
      description:
        "Interested in a kingsized bed frame that incorporates builtin storage for added functionality. Preferably a modern and sleek design with sturdy construction. The storage compartments should provide ample space to organize bedding essentials, minimizing clutter in the bedroom.",
      requestor: "Gabriel Thompson",
      size: "lg",
      urgency: 2,
      id: "1be9c0415e6f4abeb0e3db89197cf10c",
      creation: new Date(2023, 3, 18),
    },
    {
      name: "Microwave oven with convection feature",
      description:
        "In search of a microwave oven equipped with a convection feature, combining microwave cooking with the versatility of convection baking. Looking for a compact and userfriendly model that offers a range of cooking functions, including defrosting, reheating, and even baking.",
      requestor: "Isabella Patel",
      size: "sm",
      urgency: 1,
      id: "da5c9dfbaaa946c995f5e73b27cbc03d",
      creation: new Date(2023, 4, 9),
    },
    {
      name: "Laptop with long battery life",
      description:
        "Need a laptop with a longlasting battery life for work and entertainment purposes. Seeking a lightweight and portable model with powerful performance, ample storage, and a vibrant display. The laptop should be capable of handling multitasking and running demanding applications smoothly.",
      requestor: "Nathan Murphy",
      size: "sm",
      urgency: 2,
      id: "f9ec9c5200864fb9ae36e5724f89f885",
      creation: new Date(2023, 3, 19),
    },
    {
      name: "Fulllength floor mirror",
      description:
        "Looking for a fulllength floor mirror to enhance the bedroom or dressing area. Preferably a freestanding mirror with a sleek and elegant frame, providing a clear reflection from head to toe. The mirror should be of high quality and suitable for daily grooming and outfit assessments.",
      requestor: "Sophia Kim",
      size: "lg",
      urgency: 3,
      id: "a70758f89294468b9175928eba4da4b0",
      creation: new Date(2023, 2, 14),
    },
    {
      name: "Cordless vacuum cleaner with strong suction",
      description:
        "In need of a cordless vacuum cleaner that offers powerful suction for efficient and hasslefree cleaning. Seeking a lightweight and maneuverable model with a long battery life, easytoempty dustbin, and versatile attachments for cleaning different surfaces and hardtoreach areas.",
      requestor: "Benjamin Collins",
      size: "md",
      urgency: 1,
      id: "9947cc71f16443f1aa022cba3910c94a",
      creation: new Date(2022, 3, 20),
    },
    {
      name: "Smart LED TV with streaming capabilities",
      description:
        "Interested in a smart LED TV with streaming capabilities to enjoy a wide range of entertainment content. The TV should have a vibrant display, highresolution picture quality, and support popular streaming services. Additional features like voice control and multiple HDMI ports are a plus.",
      requestor: "Mia Rodriguez",
      size: "md",
      urgency: 2,
      id: "a9d4f819afc84e5c8dff9c1586dbb473",
      creation: new Date(2023, 0, 5),
    },
    {
      name: "Outdoor patio set with umbrella",
      description:
        "Seeking an outdoor patio set that includes a table, chairs, and an umbrella for shade. The set should be durable, weatherresistant, and have a stylish design that complements the outdoor decor. The umbrella should provide ample coverage and be adjustable to shield from the sun's rays.",
      requestor: "Ethan Reynolds",
      size: "lg",
      urgency: 3,
      id: "39abc0b9530845e08d2ffb9fa7c00168",
      creation: new Date(2023, 3, 24),
    },
    {
      name: "Kitchen knife set with block",
      description:
        "In need of a kitchen knife set that comes with a storage block. Seeking a highquality set with a variety of knives for different culinary tasks. The knives should have sharp blades, ergonomic handles, and be easy to maintain.",
      requestor: "Olivia Mitchell",
      size: "sm",
      urgency: 3,
      id: "6c7b1d1331c242258aa83f21a331876b",
      creation: new Date(2023, 1, 10),
    },
    {
      name: "Leather recliner chair",
      description:
        "Looking for a comfortable leather recliner chair for the living room. Preferably a classic design with plush cushioning, adjustable reclining positions, and sturdy construction. The chair should provide a cozy spot for relaxation and leisure activities.",
      requestor: "Lucas Morgan",
      size: "md",
      urgency: 2,
      id: "b888a25e2a294e17a40dea8a3e66a675",
      creation: new Date(2023, 1, 18),
    },
    {
      name: "Sleek glass coffee table",
      description:
        "Interested in a sleek glass coffee table to add a touch of elegance to the living room. Preferably with a modern design, tempered glass top, and a sturdy metal or wooden base. The table should be versatile and complement various interior styles.",
      requestor: "Ava Sullivan",
      size: "sm",
      urgency: 1,
      id: "a73601054e814ce8b9429372450a1a72",
      creation: new Date(2023, 1, 19),
    },
    {
      name: "Set of colorful ceramic mugs",
      description:
        "Seeking a set of colorful ceramic mugs to brighten up the kitchen. Looking for mugs with vibrant and eyecatching designs, comfortable handles, and a capacity suitable for enjoying hot beverages. Dishwasher and microwavesafe features are preferred.",
      requestor: "Gabriel Thompson",
      size: "sm",
      urgency: 3,
      id: "d3fc6f5e4ff64eaa8b985767ea8c9373",
      creation: new Date(2022, 9, 10),
    },
    {
      name: "Queensized platform bed with storage",
      description:
        "In need of a queensized platform bed with builtin storage drawers. Seeking a minimalist and functional design with a sturdy frame. The storage space should be spacious enough to accommodate bedding essentials and help maximize bedroom organization.",
      requestor: "Isabella Patel",
      size: "lg",
      urgency: 2,
      id: "022abb9aa8574b6aba36b3e83949c42b",
      creation: new Date(2023, 3, 18),
    },
    {
      name: "Home office desk with ergonomic chair",
      description:
        "Looking for a home office desk with an ergonomic chair to create a comfortable and productive workspace. The desk should have ample surface area, storage options, and cable management features. The chair should offer proper lumbar support and adjustable height.",
      requestor: "Nathan Murphy",
      size: "md",
      urgency: 1,
      id: "0068821103024215bc85891286dd34f5",
      creation: new Date(2023, 4, 23),
    },
    {
      name: "Indoor potted plants",
      description:
        "Interested in adding indoor potted plants to enhance the home environment. Seeking a variety of lowmaintenance plants that thrive indoors and contribute to better air quality. Greenery that complements different interior styles and lighting conditions is preferred.",
      requestor: "Sophia Kim",
      size: "sm",
      urgency: 2,
      id: "63a789b886ab47e9b61b8e872428a764",
      creation: new Date(2023, 0, 0),
    },
    {
      name: "Set of nonstick cookware",
      description:
        "In need of a set of nonstick cookware for hasslefree cooking and easy cleanup. Seeking pots and pans with durable nonstick coatings, comfortable handles, and even heat distribution. The set should include a variety of sizes to cater to different cooking needs.",
      requestor: "Benjamin Collins",
      size: "md",
      urgency: 3,
      id: "d7dd84af28804e67948da8825afdfbe5",
      creation: new Date(2023, 2, 22),
    },
    {
      name: "Smart thermostat for home",
      description:
        "Interested in a smart thermostat to enhance energy efficiency and home automation. The thermostat should be programmable, compatible with voice assistants, and offer remote control through a smartphone app. Energysaving features and intuitive controls are desired.",
      requestor: "Mia Rodriguez",
      size: "sm",
      urgency: 1,
      id: "cd06dd90959e4de3b46b00c67f87b2fd",
      creation: new Date(2023, 4, 12),
    },
    {
      name: "Soft and fluffy bath towels",
      description:
        "Searching for a set of soft and fluffy bath towels to elevate the bathing experience. Preferably made of absorbent and quickdrying materials. The towels should be generously sized, durable, and offer a luxurious feel against the skin.",
      requestor: "Ethan Reynolds",
      size: "md",
      urgency: 2,
      id: "091d10c6f66f4c27a273bd1627a5ad01",
      creation: new Date(2023, 3, 10),
    },
    {
      name: "Wallmounted shelves for display",
      description:
        "Looking for wallmounted shelves to create an attractive display space. Preferably sturdy and easy to install. The shelves should be versatile in design and suitable for showcasing decorative items, books, or personal collections.",
      requestor: "Olivia Mitchell",
      size: "sm",
      urgency: 3,
      id: "ded044e200484933a9bef4f1feb1e9b4",
      creation: new Date(2023, 3, 29),
    },
    {
      name: "Air purifier with HEPA filter",
      description:
        "In need of an air purifier with a HEPA filter to improve indoor air quality. Seeking a compact and efficient model with multiple fan speeds, a filter replacement indicator, and quiet operation. The purifier should be capable of capturing allergens, dust, and pollutants.",
      requestor: "Lucas Morgan",
      size: "md",
      urgency: 1,
      id: "6fa56ae0b3b8479a80696647afaa1e12",
      creation: new Date(2023, 0, 19),
    },
    {
      name: "Set of stackable storage containers",
      description:
        "Interested in a set of stackable storage containers to optimize pantry or kitchen organization. Seeking containers with airtight lids, different sizes for versatility, and BPAfree materials. The containers should be durable, easy to clean, and stack neatly to save space.",
      requestor: "Ava Sullivan",
      size: "sm",
      urgency: 2,
      id: "cf0eeb2945b9433bb7b196f4f434e480",
      creation: new Date(2023, 0, 11),
    },
    {
      name: "Cotton bed sheets with a high thread count",
      description:
        "Looking for cotton bed sheets with a high thread count for a luxurious and comfortable sleep experience. Preferably with a sateen or percale weave, soft texture, and breathability. The sheets should fit the mattress securely and be easy to care for.",
      requestor: "Gabriel Thompson",
      size: "md",
      urgency: 3,
      id: "490b43cc9ea34dd98314104a4f12bc47",
      creation: new Date(2023, 2, 0),
    },
    {
      name: "Home gym equipment",
      description:
        "Searching for home gym equipment to establish a fitness routine. Interested in items such as dumbbells, resistance bands, an exercise mat, and a stability ball. Compact and versatile equipment that allows for a range of exercises is preferred.",
      requestor: "Isabella Patel",
      size: "lg",
      urgency: 1,
      id: "4bc68ab6fd3944ec90c89b2831119128",
      creation: new Date(2023, 3, 12),
    },
    {
      name: "Coffee maker with builtin grinder",
      description:
        "In need of a coffee maker with a builtin grinder for a fresh and flavorful brewing experience. Seeking a programmable model with adjustable brew strength and capacity to accommodate multiple cups. The machine should be easy to clean and maintain.",
      requestor: "Nathan Murphy",
      size: "md",
      urgency: 2,
      id: "86ed5c7b9cc34ac381ecc7a2f27d165b",
      creation: new Date(2023, 3, 10),
    },
    {
      name: "Essential oil diffuser",
      description:
        "Interested in an essential oil diffuser to create a calming and aromatic ambiance at home. The diffuser should have a large water capacity, adjustable mist settings, and an automatic shutoff feature. Sleek design and quiet operation are desirable.",
      requestor: "Sophia Kim",
      size: "sm",
      urgency: 3,
      id: "5bf90ff1177049d5b9ab38e7321af104",
      creation: new Date(2023, 3, 25),
    },
    {
      name: "Robot vacuum cleaner",
      description:
        "Looking for a robot vacuum cleaner to automate the cleaning process. Preferably a model with strong suction power, smart mapping, and WiFi connectivity for remote control. The vacuum should be capable of navigating various floor types and avoiding obstacles.",
      requestor: "Benjamin Collins",
      size: "md",
      urgency: 1,
      id: "1e26226fba434528b6d42ea9e1bba597",
      creation: new Date(2023, 2, 21),
    },
    {
      name: "Set of mixing bowls",
      description:
        "In need of a set of mixing bowls for food preparation and baking. Seeking bowls in different sizes, preferably with nonslip bases and tightfitting lids. The bowls should be made of durable and foodsafe materials, allowing for easy mixing and storage.",
      requestor: "Mia Rodriguez",
      size: "sm",
      urgency: 2,
      id: "ede093d4e2184d76b7749dd785d7e5a8",
      creation: new Date(2023, 3, 22),
    },
    {
      name: "Candle set with various scents",
      description:
        "Interested in a candle set with a variety of scents to create a cozy and inviting atmosphere. Seeking candles made from natural wax, with long burn times and pleasant fragrances. The set should offer a range of scents to suit different moods and occasions.",
      requestor: "Ethan Reynolds",
      size: "sm",
      urgency: 3,
      id: "ca4436755955432089ffeb05a7e4942b",
      creation: new Date(2023, 4, 21),
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
