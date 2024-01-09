<script lang="ts">
  import Fa from "$lib/Fa.svelte"
  import { highlightFuzzySearchResult } from "$lib/highlight-fuzzy-result"
  import type { ItemRequestJSON } from "$lib/server/item-request"
  import {
    faSortAlphaDown,
    faSortAlphaUp,
    faSortAlphaUpAlt,
  } from "@fortawesome/free-solid-svg-icons"
  import fuzzy from "fuzzysort"
  import type { PageData } from "./$types"
  import RawRequest from "./RawRequest.svelte"
  import Request from "./Request.svelte"
  import SizeFilter from "./SizeFilter.svelte"
  import UrgencyFilter from "./UrgencyFilter.svelte"

  let sizeFilter: "sm" | "md" | "lg" | undefined
  let urgencyFilter: 1 | 2 | 3 | undefined
  let query = ""

  let sortingField:
    | "completed"
    | "urgency"
    | "size"
    | "creation"
    | "requester"
    | "name"
    | "uid" = "urgency"

  export let data: PageData
  const requests = data.list

  let sortingDirection: "asc" | "dsc" = "asc"

  function makeRequestsList(
    requests: ItemRequestJSON[],
    sizeFilter: "sm" | "md" | "lg" | undefined,
    urgencyFilter: 1 | 2 | 3 | undefined,
    query: string,
    sortingDirection: "asc" | "dsc",
    sortingField:
      | "completed"
      | "urgency"
      | "size"
      | "creation"
      | "requester"
      | "name"
      | "uid"
  ) {
    if (sizeFilter) {
      requests = requests.filter((x) => x.size == sizeFilter)
    }

    if (urgencyFilter) {
      requests = requests.filter((x) => x.urgency == urgencyFilter)
    } else {
      requests.sort((a, b) => a.urgency - b.urgency)
    }

    if (sortingField == "completed") {
      requests.sort((a, b) => +(a.completed == null) - +(b.completed == null))
    } else {
      requests.sort((a, b) =>
        a[sortingField] < b[sortingField]
          ? -1
          : a[sortingField] > b[sortingField]
          ? 1
          : 0
      )
    }

    if (sortingField == "size") {
      requests.reverse()
    }

    if (sortingDirection == "dsc") {
      requests.reverse()
    }

    if (query) {
      const results = fuzzy.go(query, requests, {
        keys: ["name", "requester"],
      })

      requests = results.map((result) => ({
        ...result.obj,
        nameHTML: highlightFuzzySearchResult(result[0]) ?? result.obj.nameHTML,
        requesterHTML:
          highlightFuzzySearchResult(result[1]) ?? result.obj.requesterHTML,
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

  let hidden: HTMLSelectElement

  function setHidden(node: HTMLSelectElement) {
    hidden = node
  }

  let select: HTMLSelectElement

  function setSelect(node: HTMLSelectElement) {
    select = node

    resizeSelect()
  }

  function resizeSelect(_?: any) {
    if (!hidden || !select) {
      return
    }

    hidden.children[0]!.textContent =
      select.selectedOptions[0]?.textContent || ""
    hidden.style.display = "block"
    select.style.width = hidden.clientWidth + "px"
    hidden.style.display = "none"
    select.style.display = "block"
  }
</script>

<h1 class="mb-4 text-lg font-semibold text-z-heading transition">
  <select
    class="field-focus rounded border border-transparent bg-transparent text-z underline underline-offset-2 transition focus:decoration-transparent"
    use:setHidden
  >
    <option>
      {data.completed == "any"
        ? "All Requests"
        : data.completed == "true"
        ? "Completed Requests"
        : "Active Requests"}
    </option>
  </select>

  <select
    class="field-focus hidden rounded border border-transparent bg-transparent text-z underline underline-offset-2 transition focus:decoration-transparent"
    value={data.completed == "any"
      ? "any"
      : data.completed == "true"
      ? "true"
      : "false"}
    use:setSelect
    use:resizeSelect
    on:input={() => {
      resizeSelect()

      if (!select) {
        return
      }

      const value =
        select.value == "any"
          ? "any"
          : select.value == "true"
          ? "true"
          : "false"

      const oldValue =
        data.completed == "any"
          ? "any"
          : data.completed == "true"
          ? "true"
          : "false"

      if (value != oldValue) {
        location.href =
          value == "false" ? "/requests" : "/requests?completed=" + value
      }
    }}
  >
    <option value="any">All Requests</option>
    <option value="true">Completed Requests</option>
    <option value="false">Active Requests</option>
  </select>
</h1>

<input
  class="field field-modern mb-2"
  type="search"
  placeholder="Type to search..."
  bind:value={query}
/>

<div class="mb-6 flex gap-2">
  <UrgencyFilter bind:urgency={urgencyFilter} />

  <SizeFilter bind:size={sizeFilter} />

  {#if data.admin}
    <a class="field field-modern ml-auto" href="/request/create">
      <span class="hidden xs:block">Create Request</span>
      <span class="block xs:hidden">New</span>
    </a>
  {/if}
</div>

<div class="flex flex-col gap-1">
  <RawRequest
    href={undefined}
    showSize={sizeFilter == null}
    showUrgency={urgencyFilter == null}
    isViewedByAdmin={data.admin}
  >
    <button
      class="relative flex items-center text-left text-z transition [&_b]:text-z-heading"
      on:click={makeSorter("uid")}
      slot="id"
    >
      ID

      {#if sortingField == "uid"}
        <Fa
          class="ml-2 h-4 w-4"
          icon={sortingDirection == "dsc" ? faSortAlphaUp : faSortAlphaDown}
          title="Sorting direction"
        />
      {:else}
        <div class="ml-2 h-4 w-4" />
      {/if}
    </button>

    <button
      class="relative flex items-center text-left text-z transition [&_b]:text-z-heading"
      on:click={makeSorter("name")}
      slot="name"
    >
      Item

      {#if sortingField == "name"}
        <Fa
          class="ml-2 h-4 w-4"
          icon={sortingDirection == "dsc" ? faSortAlphaUpAlt : faSortAlphaDown}
          title="Sorting direction"
        />
      {:else}
        <div class="ml-2 h-4 w-4" />
      {/if}
    </button>

    <button
      class="flex items-center whitespace-nowrap text-left text-z transition"
      on:click={makeSorter("requester")}
      slot="requester"
    >
      Requester

      {#if sortingField == "requester"}
        <Fa
          class="ml-2 h-4 w-4"
          icon={sortingDirection == "dsc" ? faSortAlphaUpAlt : faSortAlphaDown}
          title="Sorting direction"
        />
      {:else}
        <div class="ml-2 h-4 w-4" />
      {/if}
    </button>

    <button
      class="flex items-center whitespace-nowrap text-left text-z transition"
      on:click={makeSorter("creation")}
      slot="date-long"
    >
      Requested

      {#if sortingField == "creation"}
        <Fa
          class="ml-2 h-4 w-4"
          icon={sortingDirection == "dsc" ? faSortAlphaUpAlt : faSortAlphaDown}
          title="Sorting direction"
        />
      {:else}
        <div class="ml-2 h-4 w-4" />
      {/if}
    </button>

    <button
      class="flex items-center whitespace-nowrap text-left text-z transition"
      on:click={makeSorter("creation")}
      slot="date-short"
    >
      Date

      {#if sortingField == "creation"}
        <Fa
          class="ml-2 h-4 w-4"
          icon={sortingDirection == "dsc" ? faSortAlphaUpAlt : faSortAlphaDown}
          title="Sorting direction"
        />
      {:else}
        <div class="ml-2 h-4 w-4" />
      {/if}
    </button>

    <button
      class="flex items-center whitespace-nowrap text-z transition"
      on:click={makeSorter("size")}
      slot="size"
    >
      {sizeFilter == null ? "Size" : ""}

      {#if sortingField == "size" && sizeFilter == null}
        <Fa
          class="ml-2 h-4 w-4"
          icon={sortingDirection == "dsc" ? faSortAlphaUpAlt : faSortAlphaDown}
          title="Sorting direction"
        />
      {/if}
    </button>

    <button
      class="flex items-center whitespace-nowrap text-z transition"
      on:click={makeSorter("urgency")}
      slot="urgency"
    >
      {urgencyFilter == null ? "Urgency" : ""}

      {#if sortingField == "urgency" && urgencyFilter == null}
        <Fa
          class="ml-2 h-4 w-4"
          icon={sortingDirection == "dsc" ? faSortAlphaUpAlt : faSortAlphaDown}
          title="Sorting direction"
        />
      {/if}
    </button>

    <button
      class="flex items-center whitespace-nowrap text-z transition"
      on:click={makeSorter("completed")}
      slot="status"
    >
      Status

      {#if sortingField == "completed"}
        <Fa
          class="ml-2 h-4 w-4"
          icon={sortingDirection == "dsc" ? faSortAlphaUpAlt : faSortAlphaDown}
          title="Sorting direction"
        />
      {/if}
    </button>
  </RawRequest>

  {#each visibleRequests as request}
    <Request
      {request}
      showSize={sizeFilter == null}
      showUrgency={urgencyFilter == null}
      isViewedByAdmin={data.admin}
    />
  {:else}
    <p
      class="text-center [text-wrap:balance] bg-z-body-selected rounded-xl px-3 py-1"
    >
      {#if query || urgencyFilter || sizeFilter}
        No items matched. Try adjusting your search query and filters.
      {:else}
        You don't have any requests yet!
      {/if}
    </p>
  {/each}
</div>
