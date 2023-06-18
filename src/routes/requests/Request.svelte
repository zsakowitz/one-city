<script lang="ts" context="module">
  export interface ItemRequest {
    name: string
    size: "sm" | "md" | "lg"
    urgency: 1 | 2 | 3
  }
</script>

<script lang="ts">
  import Fa from "$lib/Fa.svelte"
  import {
    faChevronDown,
    faChevronUp,
    faWarning,
  } from "@fortawesome/free-solid-svg-icons"

  export let request: ItemRequest

  export let showUrgency: boolean
</script>

<div
  class="flex items-center gap-2 rounded bg-z-body-selected px-2 py-1 transition first:rounded-t-xl last:rounded-b-xl"
>
  <p class="text-z transition">{request.name}</p>

  {#if showUrgency}
    <Fa
      class="ml-auto h-4 w-4"
      title={request.urgency == 1
        ? "Urgent"
        : request.urgency == 2
        ? "Somewhat Urgent"
        : "Not Urgent"}
      icon={request.urgency == 1
        ? faWarning
        : request.urgency == 2
        ? faChevronUp
        : faChevronDown}
    />
  {/if}
</div>
