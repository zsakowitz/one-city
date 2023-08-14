<script lang="ts">
  import { escapeHTML } from "$lib/escape-html"
  import Error from "../../+error.svelte"
  import Urgency from "../../requests/Urgency.svelte"

  export let data

  const { admin, id, request } = data

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
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

  <div class="mt-4 grid lg:grid-cols-2">
    <div class="flex max-w-md flex-col gap-4">
      {#each request.description.split("\n") as line}
        <p
          class="hyphens-auto text-base/7 underline-offset-2 [&_a:hover]:decoration-z-text-link [&_a]:text-z-link [&_a]:underline [&_a]:decoration-transparent [&_a]:transition"
        >
          {@html escapeHTML(line).replace(/https?:\/\/\S+/g, (x) =>
            /[.?!:;,]$/.test(x)
              ? `<a href="${x.slice(0, -1)}">${x.slice(0, -1)}</a>${x.slice(
                  -1
                )}`
              : `<a href="${x}">${x}</a>`
          )}
        </p>
      {/each}
    </div>

    {#if admin}
      <div
        class="ml-auto flex max-w-md flex-col gap-4 rounded-lg bg-z-body-selected px-6 py-4"
      >
        <p class="border-b border-z pb-3 text-center italic">
          This box is only visible to OneCity admins.
        </p>

        <p>
          Contact <ins>{request.requester}</ins> for information at {@html escapeHTML(
            request.contact
          )
            .replace(/\(\d\d\d\)\s*\d\d\d\D*\d\d\d\d|(?:\d\D*){6,}\d/g, (x) => {
              const tel = x.replace(/\D/g, "")
              return `<a class="text-z-link underline decoration-transparent hover:decoration-inherit transition" href="tel:${tel}">${x}</a>`
            })
            .replace(emailRegex, (x) => {
              if (
                x.includes("<") ||
                x.includes(">") ||
                x.includes('"') ||
                x.includes("'") ||
                x.includes("=")
              ) {
                return x
              }

              return `<a class="text-z-link underline decoration-transparent hover:decoration-inherit transition" href="mailto:${encodeURI(
                x
              )}">${x}</a>`
            })}.
        </p>

        <p>Pick up location: {request.location}.</p>
      </div>
    {/if}
  </div>
{:else}
  <Error status={404} message={"No request with an ID of " + id + " exists."} />
{/if}
