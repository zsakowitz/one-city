<script lang="ts">
  import Fa from "$lib/Fa.svelte"
  import type { IconDefinition } from "@fortawesome/free-solid-svg-icons"

  export let icon: IconDefinition
  export let title: string
  export let inactive: unknown
  export let onClick: () => void
</script>

<button
  class="rounded-sm bg-z-body-selected p-2 transition first:rounded-l-lg last:rounded-r-lg"
  class:opacity-30={inactive}
  on:click={onClick}
>
  <Fa class="ml-auto h-4 w-4" {title} {icon} />
</button>
