<script lang="ts">
  import type { IconDefinition } from "@fortawesome/free-solid-svg-icons"

  let classList = ""
  export { classList as class }

  export let icon: IconDefinition

  export let title: string
</script>

<svg
  class={`overflow-visible transition ${classList || ""}`}
  fill="var(--icon-stroke)"
  role="img"
  viewBox={`0 0 ${icon.icon[0]} ${icon.icon[1]}`}
  xmlns="http://www.w3.org/2000/svg"
>
  <title>{title}</title>
  <path d={"" + icon.icon[4]} />
</svg>
