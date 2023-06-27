<script lang="ts">
  import Fa from "$lib/Fa.svelte"
  import {
    faChevronDown,
    faChevronUp,
    faWarning,
  } from "@fortawesome/free-solid-svg-icons"

  let classList = ""
  export { classList as class }

  export let urgency: 1 | 2 | 3
</script>

<Fa
  class={classList}
  title={urgency == 1
    ? "Urgent"
    : urgency == 2
    ? "Somewhat Urgent"
    : "Not Urgent"}
  icon={urgency == 1 ? faWarning : urgency == 2 ? faChevronUp : faChevronDown}
/>
