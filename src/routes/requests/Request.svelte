<script lang="ts">
  import { dateToString } from "$lib/date-to-string"
  import type { ItemRequestJSON } from "$lib/server/item-request"
  import Size from "./Size.svelte"
  import Urgency from "./Urgency.svelte"

  export let request: ItemRequestJSON
  export let showSize: boolean
  export let showUrgency: boolean
</script>

<a
  href={"/request/" + request.id}
  class="relative grid grid-cols-[minmax(0,2fr),minmax(0,1fr),minmax(0,9rem),3rem,5rem] items-center gap-2 overflow-hidden rounded bg-z-body-selected px-2 py-1 transition last:rounded-b-xl [&:nth-child(2)]:rounded-t-xl"
>
  <p class="relative text-z transition [&_b]:text-z-heading">
    {@html request.nameHTML}
  </p>

  <p class="text-z transition [&_b]:text-z-heading">
    {@html request.requesterHTML}
  </p>

  <p class="text-z transition">
    {dateToString(new Date(request.creation))}
  </p>

  {#if showSize}
    <Size class="relative ml-auto h-4 w-4" size={request.size} />
  {/if}

  {#if showUrgency}
    <Urgency class="relative ml-auto h-4 w-4" urgency={request.urgency} />
  {/if}
</a>
