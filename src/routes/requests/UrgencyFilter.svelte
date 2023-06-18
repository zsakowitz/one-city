<script lang="ts">
  import {
    faChevronDown,
    faChevronUp,
    faWarning,
  } from "@fortawesome/free-solid-svg-icons"
  import RadioButton from "./RadioButton.svelte"

  export let urgency: 1 | 2 | 3 | undefined
</script>

<div class="title flex gap-1" data-title="Urgency">
  <RadioButton
    inactive={urgency && urgency != 1}
    onClick={() => (urgency = urgency == 1 ? undefined : 1)}
    icon={faWarning}
    title="Urgent"
  />

  <div class="title-line" />

  <RadioButton
    inactive={urgency && urgency != 2}
    onClick={() => (urgency = urgency == 2 ? undefined : 2)}
    icon={faChevronUp}
    title="Somewhat Urgent"
  />

  <RadioButton
    inactive={urgency && urgency != 3}
    onClick={() => (urgency = urgency == 3 ? undefined : 3)}
    icon={faChevronDown}
    title="Not Urgent"
  />
</div>
