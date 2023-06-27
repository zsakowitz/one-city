<script lang="ts">
  import Fa from "$lib/Fa.svelte"
  import { faL, faM, faS } from "@fortawesome/free-solid-svg-icons"

  let classList = ""
  export { classList as class }

  export let size: "sm" | "md" | "lg"
</script>

<Fa
  class={classList}
  title={size == "sm" ? "Small" : size == "md" ? "Medium" : "Large"}
  icon={size == "sm" ? faS : size == "md" ? faM : faL}
/>
