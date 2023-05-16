<script type="ts">
  import { enhance } from "$app/forms"
  import { autoResize } from "$lib/auto-resize"
  import { onMount } from "svelte"

  let field: HTMLTextAreaElement
  onMount(() => autoResize(field))
</script>

<form class="m-auto w-96 max-w-full" method="post" use:enhance>
  <label class="label mt-6">
    <p>Title</p>

    <input
      class="field w-full"
      maxlength="80"
      name="title"
      required
      type="email"
    />
  </label>

  <label class="label mt-6">
    <p>Description</p>

    <textarea
      class="field w-full"
      name="description"
      required
      bind:this={field}
    />
  </label>

  <label class="label mt-6">
    <p>Contact Information</p>

    <textarea class="field w-full" name="contact" required bind:this={field} />
  </label>

  <label class="label mt-6">
    <p>Arrival Urgency</p>

    <input name="urgency" type="radio" value="Within a year" />
    Within a year

    <input name="urgency" type="radio" value="Within 3 months" />
    Within 3 months

    <input name="urgency" type="radio" value="Within 1 month" />
    Within 1 month

    <input name="urgency" type="radio" value="Within 2 weeks" />
    Within 2 weeks
  </label>

  <button class="field mt-6 w-full">Add Item Request</button>
</form>
