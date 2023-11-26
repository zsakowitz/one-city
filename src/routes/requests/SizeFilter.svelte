<script lang="ts">
  import { faL, faM, faS } from "@fortawesome/free-solid-svg-icons"
  import RadioButton from "./RadioButton.svelte"

  export let size: "sm" | "md" | "lg" | undefined
</script>

<div class="title flex gap-0.5" data-title="Size">
  <RadioButton
    inactive={size && size != "sm"}
    onClick={() => (size = size == "sm" ? undefined : "sm")}
    icon={faS}
    title="Small"
  />

  <div class="title-line" />

  <RadioButton
    inactive={size && size != "md"}
    onClick={() => (size = size == "md" ? undefined : "md")}
    icon={faM}
    title="Medium"
  />

  <RadioButton
    inactive={size && size != "lg"}
    onClick={() => (size = size == "lg" ? undefined : "lg")}
    icon={faL}
    title="Large"
  />
</div>
