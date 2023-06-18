<script lang="ts">
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
    if (query) {
      // TODO: Replace with fuzzy-sort
      requests = requests.filter((x) => x.name.toLowerCase().includes(query))
    }

    // Sorts alphabetically, case-insensitively by `name`
    requests
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
      .sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase()
          ? -1
          : a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : 0
      )

    if (urgencyFilter) {
      requests = requests.filter((x) => x.urgency == urgencyFilter)
    } else {
      requests.sort((a, b) => a.urgency - b.urgency)
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
