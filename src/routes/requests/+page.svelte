<script lang="ts">
  import { highlightFuzzySearchResult } from "$lib/highlight-fuzzy-result"
  import fuzzy from "fuzzysort"
  import Request, { type ItemRequest } from "./Request.svelte"
  import UrgencyFilter from "./UrgencyFilter.svelte"
  import { requests } from "./requests"

  let sizeFilter: "sm" | "md" | "lg" | undefined
  let urgencyFilter: 1 | 2 | 3 | undefined
  let query = ""

  let sortingField: "urgency" | "size" | "creation" | "requestor" | "name" =
    "urgency"

  let sortingDirection: "asc" | "dsc" = "asc"

  function makeRequestsList(
    requests: ItemRequest[],
    sizeFilter: "sm" | "md" | "lg" | undefined,
    urgencyFilter: 1 | 2 | 3 | undefined,
    query: string,
    sortingDirection: "asc" | "dsc",
    sortingField: "urgency" | "size" | "creation" | "requestor" | "name"
  ) {
    if (sizeFilter) {
      requests = requests.filter((x) => x.size == sizeFilter)
    }

    if (urgencyFilter) {
      requests = requests.filter((x) => x.urgency == urgencyFilter)
    } else {
      requests.sort((a, b) => a.urgency - b.urgency)
    }

    requests.sort((a, b) =>
      a[sortingField] < b[sortingField]
        ? -1
        : a[sortingField] > b[sortingField]
        ? 1
        : 0
    )

    if (sortingField == "size") {
      requests.reverse()
    }

    if (sortingDirection == "dsc") {
      requests.reverse()
    }

    if (query) {
      const results = fuzzy.go(query, requests, {
        keys: ["name", "requestor"],
      })

      requests = results.map((result) => ({
        ...result.obj,
        nameHTML: highlightFuzzySearchResult(result[0]) ?? result.obj.nameHTML,
        requestorHTML:
          highlightFuzzySearchResult(result[1]) ?? result.obj.requestorHTML,
      }))
    }

    return requests
  }

  $: visibleRequests = makeRequestsList(
    requests.slice(),
    sizeFilter,
    urgencyFilter,
    query,
    sortingDirection,
    sortingField
  )

  function makeSorter(field: typeof sortingField) {
    return () => {
      if (sortingField == field) {
        sortingDirection = sortingDirection == "asc" ? "dsc" : "asc"
      } else {
        sortingDirection = "asc"
        sortingField = field
      }
    }
  }
</script>

<h1 class="mb-4 text-lg font-semibold text-z-heading transition">
  All Requests
</h1>

<input
  class="field field-modern mb-2"
  type="search"
  placeholder="Type to search..."
  bind:value={query}
/>

<div class="mb-6 flex w-min flex-col gap-2">
  <UrgencyFilter bind:urgency={urgencyFilter} />
</div>

<div class="flex flex-col gap-1">
  {#if visibleRequests.length}
    <div
      class="relative grid grid-cols-[minmax(0,2fr),minmax(0,1fr),minmax(0,9rem),3rem,5rem] items-center gap-2 overflow-hidden rounded px-2 py-1 font-semibold transition first:rounded-t-xl last:rounded-b-xl"
    >
      <button
        class="relative text-left text-z transition [&_b]:text-z-heading"
        on:click={makeSorter("name")}
      >
        Item
      </button>

      <button
        class="text-left text-z transition"
        on:click={makeSorter("requestor")}>Requestor</button
      >

      <button
        class="text-left text-z transition"
        on:click={makeSorter("creation")}
      >
        Date Requested
      </button>

      <button
        class="text-right text-z transition"
        on:click={makeSorter("size")}
      >
        {sizeFilter == null ? "Size" : ""}
      </button>

      <button
        class="text-right text-z transition"
        on:click={makeSorter("urgency")}
      >
        {urgencyFilter == null ? "Urgency" : ""}
      </button>
    </div>
  {/if}

  {#each visibleRequests as request}
    <Request
      {request}
      showSize={sizeFilter == null}
      showUrgency={urgencyFilter == null}
    />
  {:else}
    {#if query || urgencyFilter}
      <p>No items matched. Try adjusting your search query and filters.</p>
    {:else}
      <p>You don't have any requests yet!</p>
    {/if}
  {/each}
</div>
