<script lang="ts">
  import { enhance } from "$app/forms"
  import RadioInput from "$lib/RadioInput.svelte"
  import { autoResize } from "$lib/auto-resize"
  import Error from "../../+error.svelte"

  export let form
</script>

{#if form && !form.ok}
  <Error message={form.reason} status={503} />
{:else}
  <form
    class="m-auto flex w-[48rem] max-w-full flex-col items-center gap-6"
    method="post"
    use:enhance
  >
    <div
      class="grid w-96 max-w-full grid-cols-1 gap-6 md:w-full md:grid-cols-2"
    >
      <div class="flex flex-col gap-6">
        <label class="label">
          <p>Title</p>

          <input class="field w-full" maxlength="80" name="name" required />
        </label>

        <label class="label">
          <p>Description</p>

          <textarea
            class="auto-resize field w-full"
            name="description"
            required
            use:autoResize
          />
        </label>

        <div class="label grid grid-cols-3 gap-2">
          <p>Urgency</p>

          <RadioInput name="urgency" label="High Priority" value="1" />

          <RadioInput checked name="urgency" label="Standard" value="2" />

          <RadioInput name="urgency" label="Low Priority" value="3" />
        </div>

        <div class="label grid grid-cols-3 gap-2">
          <p>Size</p>

          <RadioInput name="size" label="Small" value="sm" />

          <RadioInput checked name="size" label="Medium" value="md" />

          <RadioInput name="size" label="Large" value="lg" />
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <label class="label">
          <p>Requester's Name</p>

          <textarea
            class="auto-resize field w-full"
            name="requester"
            required
            use:autoResize
          />
        </label>

        <label class="label relative -top-1">
          <p>Requester's Contact Info</p>

          <textarea
            class="auto-resize field w-full"
            name="contact"
            required
            use:autoResize
          />
        </label>

        <label class="label relative -top-2">
          <p>Location</p>

          <textarea
            class="auto-resize field w-full"
            name="location"
            required
            use:autoResize
          />
        </label>
      </div>
    </div>

    <button class="field w-96 max-w-full">Add Item Request</button>

    {#if form && form.ok}
      <p class="w-96 max-w-full text-center">Created “{form.name}.”</p>
    {/if}
  </form>
{/if}
