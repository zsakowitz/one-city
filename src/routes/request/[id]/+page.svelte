<script lang="ts">
  import { escapeHTML } from "$lib/escape-html"
  import Error from "../../+error.svelte"
  import Urgency from "../../requests/Urgency.svelte"

  export let data

  const { id, request } = data
</script>

{#if request}
  <h1 class="mb-4 flex items-center gap-4">
    <span class="text-xl text-z-heading transition">
      {request.name}
    </span>

    <div
      class="title ml-auto flex items-center justify-center text-base font-normal text-z transition after:whitespace-nowrap"
      data-title={request.urgency == 1
        ? "Urgent"
        : request.urgency == 2
        ? "Somewhat Urgent"
        : "Not Urgent"}
    >
      <div class="title-line" />

      <Urgency class="h-4 w-4" urgency={request.urgency} />
    </div>
  </h1>

  <p class="mb-4 text-sm text-z-subtitle">
    Requested on {request.creation.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </p>

  {#each request.description.split("\n") as line}
    <p
      class="mt-4 max-w-md hyphens-auto text-base/7 underline-offset-2 [&_a:hover]:decoration-z-text-link [&_a]:text-z-link [&_a]:underline [&_a]:decoration-transparent [&_a]:transition"
    >
      {@html escapeHTML(line).replace(/https?:\/\/\S+/g, (x) =>
        /[.?!:;,]$/.test(x)
          ? `<a href="${x.slice(0, -1)}">${x.slice(0, -1)}</a>${x.slice(-1)}`
          : `<a href="${x}">${x}</a>`
      )}
    </p>
  {/each}
{:else}
  <Error status={404} message={"No request with an ID of " + id + " exists."} />
{/if}
