<script lang="ts">
  import { enhance } from "$app/forms"
  import { escapeHTML } from "$lib/escape-html"
  import Error from "../../+error.svelte"
  import Urgency from "../../requests/Urgency.svelte"

  export let data
  export let form

  const { admin, id } = data
  const request = form?.json || data.request

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

  <p class="text-sm text-z-subtitle">
    Requested on {new Date(request.creation).toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </p>

  {#if request.completed}
    <p class="mt-1 text-sm text-z-subtitle">
      Completed on {new Date(request.completed).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>
  {/if}

  <div class="mt-8 grid gap-x-6 gap-y-4 md:grid-cols-2">
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
        class="ml-auto flex max-w-md flex-col gap-4 rounded-lg bg-z-body-selected px-6 pb-6 pt-4"
      >
        <p class="border-b border-z pb-3 text-center italic">
          This box is only visible to OneCity admins.
        </p>

        <p>
          <ins>{request.requester}</ins> requested this, and can be contacted at {@html escapeHTML(
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

        <div class="grid grid-cols-2 gap-1 text-center">
          <a class="field rounded-r rounded-bl" href="/request/create?id={id}"
            >Edit</a
          >

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
            }}>Delete</button
          >

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
              >{request.completed
                ? "Mark as active"
                : "Mark as completed"}</button
            >
          </form>
        </div>
      </div>
    {/if}
  </div>
{:else}
  <Error status={404} message={"No request with an ID of " + id + " exists."} />
{/if}
