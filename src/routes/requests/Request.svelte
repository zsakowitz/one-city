<script lang="ts">
  import type { ItemRequestJSON } from "$lib/server/item-request"
  import Size from "./Size.svelte"

  export let request: ItemRequestJSON
  export let showSize: boolean
  export let showUrgency: boolean
</script>

<a
  href={"/request/" + request.id}
  class="relative grid grid-cols-[2rem,minmax(0,2fr),minmax(0,1fr),minmax(0,9rem),3rem,5rem,4rem] items-center gap-8 overflow-hidden rounded bg-z-body-selected px-2 py-1 transition last:rounded-b-xl [&:nth-child(2)]:rounded-t-xl"
>
  <p class="relative text-z transition">
    {request.uid.toString().padStart(3, "0")}
  </p>

  <p class="relative text-z transition">
    {@html request.nameHTML}
  </p>

  <p class="text-z transition">
    {@html request.requesterHTML}
  </p>

  <p class="text-z transition">
    {new Date(request.creation).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}
  </p>

  {#if showSize}
    <Size class="relative ml-auto h-4 w-4" size={request.size} />
  {:else}
    <span />
  {/if}

  {#if showUrgency}
    <span
      class="text-right font-medium {request.urgency == 1
        ? 'text-red-600 dark:text-red-500'
        : request.urgency == 2
        ? 'text-orange-600 dark:text-orange-500'
        : 'text-yellow-600 dark:text-yellow-500'}"
      >{request.urgency == 1
        ? "High"
        : request.urgency == 2
        ? "Medium"
        : "Low"}</span
    >
  {/if}

  <span
    class="text-right font-medium {request.completed == null
      ? 'text-red-600 dark:text-red-500'
      : 'text-green-600 dark:text-green-500'}"
    >{request.completed == null ? "Active" : "Done"}
  </span>
</a>
