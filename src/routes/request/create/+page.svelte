<script lang="ts">
  import { enhance } from "$app/forms"
  import RadioInput from "$lib/RadioInput.svelte"
  import { autoResize } from "$lib/auto-resize"
  import Error from "../../+error.svelte"
  import type { ActionData, PageData } from "./$types.js"

  export let data: PageData
  export let form: ActionData

  const urgency =
    data.urgency == "HighPriority" ? 1 : data.urgency == "LowPriority" ? 3 : 2

  const size = data.size == "Large" ? "lg" : data.size == "Small" ? "sm" : "md"
</script>

{#if form && !form.ok}
  <Error message={form.reason} status={503} />
{:else}
  <form
    class="m-auto flex w-[48rem] max-w-full flex-col items-center gap-6"
    method="post"
    use:enhance
  >
    <input type="hidden" name="id" value={data?.id || ""} />

    <div
      class="grid w-96 max-w-full grid-cols-1 gap-6 md:w-full md:grid-cols-2"
    >
      <div class="flex flex-col gap-6">
        <label class="label">
          <p>Title</p>

          <input
            class="field w-full"
            maxlength="80"
            name="name"
            required
            value={data?.name || ""}
          />
        </label>

        <label class="label">
          <p>Description</p>

          <textarea
            class="auto-resize field w-full"
            name="description"
            required
            use:autoResize
            value={data?.description || ""}
          />
        </label>

        <label class="label">
          <p>Related Link (Amazon, picture, etc.)</p>

          <input
            class="field w-full"
            name="url"
            type="url"
            value={data?.url || ""}
          />
        </label>

        <label class="label">
          <p>Requester's First Name</p>

          <input
            class="field w-full"
            name="requesterFirst"
            type="text"
            required
            value={data?.requesterFirst || ""}
          />
        </label>

        <label class="label">
          <p>Requester's Last Name</p>

          <input
            class="field w-full"
            name="requesterLast"
            type="text"
            required
            value={data?.requesterLast || ""}
          />
        </label>

        <label class="label relative">
          <p>Requester's Phone Number</p>

          <input
            class="field w-full"
            name="tel"
            type="tel"
            pattern={"^[\\+]*[\\(]?\\d{3}[\\)]?[\\-\\s\\.\\/0-9]{7}$"}
            value={data?.tel || ""}
          />
        </label>

        <label class="label relative">
          <p>Requester's Email</p>

          <input
            class="field w-full"
            name="email"
            type="email"
            value={data?.email || ""}
          />
        </label>
      </div>

      <div class="flex flex-col gap-6">
        <div class="label -mt-2 grid grid-cols-3 gap-2">
          <p>Size</p>

          <RadioInput
            checked={size == "sm"}
            name="size"
            label="Small"
            value="sm"
          />

          <RadioInput
            checked={size == "md"}
            name="size"
            label="Medium"
            value="md"
          />

          <RadioInput
            checked={size == "lg"}
            name="size"
            label="Large"
            value="lg"
          />
        </div>

        <div class="label grid grid-cols-3 gap-2">
          <p>Urgency</p>

          <RadioInput
            checked={urgency == 1}
            name="urgency"
            label="High Priority"
            value="1"
          />

          <RadioInput
            checked={urgency == 2}
            name="urgency"
            label="Standard"
            value="2"
          />

          <RadioInput
            checked={urgency == 3}
            name="urgency"
            label="Low Priority"
            value="3"
          />
        </div>

        <div class="mt-8">
          <h2 class="text-center font-bold">Address of Recipient</h2>

          <label class="label relative mt-6">
            <p>Street Address and Apartment</p>

            <input
              type="text"
              class="field w-full"
              name="locationStreet"
              required
              placeholder="1234 Nonexistent St"
              value={data?.locationStreet || ""}
            />
          </label>

          <label class="label relative mt-6">
            <p>Zip Code</p>

            <input
              type="number"
              class="field w-full"
              name="locationZip"
              required
              placeholder="94123"
              value={data?.locationZip || ""}
            />
          </label>

          <label class="label relative mt-6">
            <p>City</p>

            <input
              type="text"
              class="field w-full"
              name="locationCity"
              required
              placeholder="San Francisco"
              value={data?.locationCity || ""}
            />
          </label>

          <label class="label relative mt-6">
            <p>State</p>

            <input
              type="number"
              class="field w-full"
              name="locationState"
              required
              placeholder="California"
              value={data?.locationState || ""}
            />
          </label>
        </div>
      </div>
    </div>

    <button class="field mt-8 w-96 max-w-full"
      >{data?.url ? "Save" : "Create"} Item Request</button
    >
  </form>
{/if}
