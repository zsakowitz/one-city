<script lang="ts">
  import { highlightFuzzySearchResult } from "$lib/highlight-fuzzy-result"
  import fuzzy from "fuzzysort"
  import Request, { type ItemRequest } from "./Request.svelte"
  import UrgencyFilter from "./UrgencyFilter.svelte"
  import { requests } from "./requests"

  let urgencyFilter: 1 | 2 | 3 | undefined

  let query = ""

  function makeRequestsList(
    requests: ItemRequest[],
    urgencyFilter: 1 | 2 | 3 | undefined,
    query: string
  ) {
    if (urgencyFilter) {
      requests = requests.filter((x) => x.urgency == urgencyFilter)
    } else {
      requests.sort((a, b) => a.urgency - b.urgency)
    }

    if (query) {
      const results = fuzzy.go(query, requests, {
        keys: ["name", "requestor"],
      })

      console.log(results)

      requests = results.map((result) => ({
        ...result.obj,
        nameHTML: highlightFuzzySearchResult(result[0]) ?? result.obj.nameHTML,
        requestorHTML:
          highlightFuzzySearchResult(result[1]) ?? result.obj.requestorHTML,
      }))
    }

    return requests
  }

  $: visibleRequests = makeRequestsList(requests.slice(), urgencyFilter, query)
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
      class="relative grid grid-cols-[minmax(0,2fr),minmax(0,1fr),minmax(0,12rem),5.5rem] items-center gap-2 overflow-hidden rounded px-2 py-1 font-semibold transition first:rounded-t-xl last:rounded-b-xl"
    >
      <p class="relative text-z transition [&_b]:text-z-heading">Item</p>

      <p class="text-z transition">Requestor</p>

      <p class="text-z transition">Date Requested</p>

      <p class="text-right text-z transition">
        {urgencyFilter == null ? "Urgency" : ""}
      </p>
    </div>
  {/if}

  {#each visibleRequests as request}
    <Request {request} showUrgency={urgencyFilter == null} />
  {:else}
    {#if query || urgencyFilter}
      <p>No items matched. Try adjusting your search query and filters.</p>
    {:else}
      <p>You don't have any requests yet!</p>
    {/if}
  {/each}
</div>
