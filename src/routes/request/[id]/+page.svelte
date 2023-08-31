<script lang="ts">
  import { enhance } from "$app/forms"
  import { escapeHTML } from "$lib/escape-html"
  import { onMount } from "svelte"
  import Error from "../../+error.svelte"
  import Urgency from "../../requests/Urgency.svelte"
  import type { ActionData, PageData } from "./$types.js"
  import "./x-frame-bypass.js"
  import { register } from "./x-frame-bypass.js"

  export let data: PageData
  export let form: ActionData

  const { admin, id } = data
  const request = form?.json || data.request

  onMount(register)
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

  <p class="text-sm text-z-subtitle">
    Requested on {new Date(request.creation).toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </p>

  <p class="mt-1 text-sm text-z-subtitle">
    {#if request.completed}
      Completed on {new Date(request.completed).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    {:else}
      Active request
    {/if}
  </p>

  <div class="mt-8 grid gap-x-6 gap-y-4 md:grid-cols-2">
    <div class="flex max-w-md flex-col">
      <p class="relative mb-1 text-sm text-z-subtitle">Item description:</p>

      <div class="flex w-full flex-col">
        {#each (request.description + "\nworld").split("\n") as line}
          <p
            class="ml-1 hyphens-auto border-l border-l-z pl-3 pt-2 text-base/7 underline-offset-2 first:pt-1 last:pb-1 [&_a:hover]:decoration-z-text-link [&_a]:text-z-link [&_a]:underline [&_a]:decoration-transparent [&_a]:transition"
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

      {#if data.request.url}
        <p class="relative mb-1 mt-8 text-sm text-z-subtitle">Related link:</p>

        <a
          class="relative h-96 w-full select-none overflow-clip rounded-lg"
          href={data.request.url}
        >
          <iframe
            on:scroll={(event) => {
              event.preventDefault()
            }}
            class="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50"
            is="x-frame-bypass"
            src={data.request.url}
            tabindex="-1"
            title="Related link"
          />

          <div
            class="field absolute bottom-2 left-2 flex w-[calc(100%_-_1rem)] flex-col rounded bg-z-field px-2 py-1 text-z transition"
          >
            <p class="truncate">
              {data.request.url}
            </p>
          </div>
        </a>
      {/if}
    </div>

    {#if admin}
      <div
        class="ml-auto flex max-w-md flex-col gap-4 rounded-lg bg-z-body-selected px-6 pb-6 pt-4 transition"
      >
        <p class="border-b border-z pb-3 text-center italic text-z transition">
          This box is only visible to OneCity admins.
        </p>

        <p class="text-z transition">
          <ins>{request.requester}</ins> requested this{#if request.email && request.tel},
            and can be contacted at <a
              class="text-z-link underline decoration-transparent transition hover:decoration-inherit"
              href="mailto:{encodeURI(request.email)}">{request.email}</a
            >
            or
            <a
              class="text-z-link underline decoration-transparent transition hover:decoration-inherit"
              href="tel:{request.tel.replace(/[^\d]/g, '')}">{request.tel}</a
            >{:else if request.email}, and can be contacted at <a
              class="text-z-link underline decoration-transparent transition hover:decoration-inherit"
              href="mailto:{encodeURI(request.email)}">{request.email}</a
            >{:else if request.tel}and can be contacted at <a
              class="text-z-link underline decoration-transparent transition hover:decoration-inherit"
              href="tel:{request.tel.replace(/[^\d]/g, '')}">{request.tel}</a
            >{/if}.
        </p>

        <p class="text-z transition">Pick up location: {request.location}.</p>

        <div class="grid grid-cols-2 gap-1 text-center">
          <a class="field rounded-r rounded-bl" href="/request/create?id={id}">
            Edit
          </a>

          <button
            class="field rounded-l rounded-br"
            on:click={() => {
              const didDelete = confirm(
                "Are you absolutely sure you want to delete " +
                  request.name +
                  "?"
              )

              if (didDelete) {
                location.href = `/request/${id}/delete`
              }
            }}
          >
            Delete
          </button>

          <form
            class="col-span-2"
            method="POST"
            use:enhance={() => () => location.reload()}
            action="?/{request.completed ? 'uncomplete' : 'complete'}"
          >
            <button
              class="field block w-full rounded-t"
              on:click={({ currentTarget }) => {
                currentTarget.textContent =
                  "Marking" + currentTarget.textContent?.slice(4) + "..."

                setTimeout(() => (currentTarget.disabled = true))
              }}
            >
              {request.completed ? "Mark as active" : "Mark as completed"}
            </button>
          </form>
        </div>
      </div>
    {/if}
  </div>
{:else}
  <Error status={404} message={"No request with an ID of " + id + " exists."} />
{/if}
