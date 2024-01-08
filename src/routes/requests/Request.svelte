<script lang="ts">
  import type { ItemRequestJSON } from "$lib/server/item-request"
  import RawRequest from "./RawRequest.svelte"
  import Size from "./Size.svelte"

  export let request: ItemRequestJSON
  export let showSize: boolean
  export let showUrgency: boolean
</script>

<RawRequest href={"/request/" + request.id} {showSize} {showUrgency}>
  <svelte:fragment slot="id">
    {request.uid.toString().padStart(3, "0")}
  </svelte:fragment>

  <svelte:fragment slot="name">
    {@html request.nameHTML}
  </svelte:fragment>

  <svelte:fragment slot="requester">
    {@html request.requesterHTML}
  </svelte:fragment>

  <svelte:fragment slot="date-long">
    {new Date(request.creation).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}
  </svelte:fragment>

  <svelte:fragment slot="date-short">
    {new Date(request.creation).toLocaleDateString(undefined, {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    })}
  </svelte:fragment>

  <svelte:fragment slot="size">
    <Size class="relative my-auto ml-auto h-4 w-4" size={request.size} />
  </svelte:fragment>

  <svelte:fragment slot="urgency">
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
  </svelte:fragment>

  <svelte:fragment slot="status">
    <span
      class="text-right font-medium {request.completed == null
        ? 'text-red-600 dark:text-red-500'
        : 'text-green-600 dark:text-green-500'}"
      >{request.completed == null ? "Active" : "Done"}
    </span>
  </svelte:fragment>
</RawRequest>
