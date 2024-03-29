<script lang="ts">
  import { enhance } from "$app/forms"
  import { autoResize } from "$lib/auto-resize"
  import { escapeHTML } from "$lib/escape-html"
  import Error from "../../+error.svelte"
  import type { ActionData, PageData } from "./$types.js"

  export let data: PageData
  export let form: ActionData

  const { id, isAdmin } = data
  const request = form?.json || data.request

  let formState: "unsent" | "sending" | "sent" = "unsent"
  let tel = ""

  let contactByEmail = true
  let contactByCall = false
  let contactByText = false

  let transportBySelf = false
  let transportByHire = false
</script>

{#if request}
  <h1 class="mb-4 flex items-center gap-4">
    <span class="text-xl text-z-heading transition">
      {request.name}
    </span>
  </h1>

  <div class="grid flex-1 gap-x-6 gap-y-4 md:grid-cols-2">
    <div class="flex max-w-md flex-col">
      <p class="text-sm text-z-subtitle">
        Requested on {new Date(request.creation).toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <p class="mt-1 text-sm text-z-subtitle">
        {#if request.completed}
          Completed on {new Date(request.completed).toLocaleDateString(
            undefined,
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
        {:else}
          Active request
        {/if}
      </p>

      <p class="mt-1 text-sm text-z-subtitle">
        {request.urgency == 1
          ? "Urgent"
          : request.urgency == 3
          ? "Not urgent"
          : "Somewhat urgent"}
      </p>

      <p class="mt-1 text-sm text-z-subtitle">
        {request.size == "sm"
          ? "Small item"
          : request.size == "lg"
          ? "Large item"
          : "Medium size"}
      </p>

      <p class="relative mb-1 mt-8 text-sm text-z-subtitle">
        Item description:
      </p>

      <div class="flex w-full flex-col">
        {#each request.description.split("\n") as line}
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
        <p class="relative mb-1 mt-8 text-sm text-z-subtitle transition">
          Related link:
        </p>

        <a
          class="max-w-[calc(100vw_-_3rem)] truncate text-z-link underline decoration-transparent underline-offset-2 transition hover:decoration-inherit"
          href={data.request.url}
          target="_blank">{data.request.url}</a
        >
      {/if}
    </div>

    <div
      class="ml-auto mt-8 flex h-full w-full flex-1 flex-col md:mt-0 md:max-w-md md:pl-8"
    >
      {#if isAdmin}
        <div
          class="mb-8 flex w-full flex-col gap-4 rounded-lg bg-z-body-selected px-6 pb-6 pt-4 transition"
        >
          <p
            class="border-b border-z pb-3 text-center italic text-z transition"
          >
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

          <p class="text-z transition">
            Pick up location: {request.locationStreet}, {request.locationCity}
            {request.locationState}
            {request.locationZip}.
          </p>

          <div class="grid grid-cols-2 gap-1 text-center">
            <a
              class="field rounded-r rounded-bl"
              href="/request/create?id={id}"
            >
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
                {request.completed ? "Mark as Active" : "Mark as Completed"}
              </button>
            </form>
          </div>
        </div>
      {/if}

      <form
        class="flex w-full flex-1 flex-col gap-6 pb-8 md:py-4 md:pl-8 md:shadow-[-15px_0_10px_-10px_rgba(0,0,0,0.1)]"
        method="post"
        action="?/email"
        use:enhance={() => {
          formState = "sending"

          return ({ update }) => {
            formState = "sent"
            update()
          }
        }}
      >
        <p class="mb-6 text-center text-sm text-z-subtitle [text-wrap:balance]">
          <span class="inline xs:block lg:inline">Do you have this item?</span>

          <span class="inline xs:block lg:inline"
            >Contact the OneCity team below!</span
          >
        </p>

        <label class="label">
          <p>Your first name</p>

          <input
            class="field w-full"
            name="nameFirst"
            type="text"
            autocapitalize="words"
            autocomplete="name"
            required
          />
        </label>

        <label class="label">
          <p>Your last name</p>

          <input
            class="field w-full"
            name="nameLast"
            type="text"
            autocapitalize="words"
            autocomplete="name"
            required
          />
        </label>

        <label class="label">
          <p>Your email address</p>

          <input
            class="field w-full"
            name="email"
            type="text"
            autocomplete="email"
            required
          />
        </label>

        <label class="label">
          <p class="hidden xs:block">
            Your phone number {contactByCall
              ? "(required to call you)"
              : contactByText
              ? "(required to text you)"
              : "(optional)"}
          </p>

          <p class="block xs:hidden">
            Your phone number {contactByCall
              ? "(required to call)"
              : contactByText
              ? "(required to text)"
              : "(optional)"}
          </p>

          <input
            class="field w-full"
            name="tel"
            type="tel"
            autocomplete="tel"
            pattern={"^[\\+]*[\\(]?\\d{3}[\\)]?[\\-\\s\\.\\/0-9]{7}$"}
            bind:value={tel}
            required={contactByCall || contactByText}
          />
        </label>

        <label class="label">
          <p>Item pickup address</p>

          <input
            class="field w-full"
            name="pickup_address"
            type="text"
            autocomplete="street-address"
            required
          />
        </label>

        <label class="label">
          <p>Item pickup city</p>

          <input
            class="field w-full"
            name="pickup_city"
            type="text"
            autocomplete="address-level2"
            required
          />
        </label>

        <label class="label">
          <p>Best time to reach you</p>

          <input class="field w-full" name="best_time" type="time" required />
        </label>

        <div class="label">
          <p>Preferred mode(s) of contact</p>

          <div class="field flex select-none gap-0.5 p-0.5">
            <label
              class="flex-1 cursor-pointer rounded-l-md rounded-r-sm px-2 py-1 text-center font-mono text-sm lowercase text-z transition"
              class:bg-z-body-selected={contactByEmail}
            >
              <input
                class="sr-only"
                type="checkbox"
                name="contact_email"
                bind:checked={contactByEmail}
                required={!(contactByCall || contactByText)}
              />
              Email
            </label>

            <label
              class="flex-1 cursor-pointer rounded-sm px-2 py-1 text-center font-mono text-sm lowercase text-z transition"
              class:bg-z-body-selected={contactByCall}
            >
              <input
                class="sr-only"
                type="checkbox"
                name="contact_call"
                bind:checked={contactByCall}
              />
              Call
            </label>

            <label
              class="flex-1 cursor-pointer rounded-l-sm rounded-r-md px-2 py-1 text-center font-mono text-sm lowercase text-z transition"
              class:bg-z-body-selected={contactByText}
            >
              <input
                class="sr-only"
                type="checkbox"
                name="contact_text"
                bind:checked={contactByText}
              />
              Text
            </label>
          </div>
        </div>

        <div class="label">
          <p>Transport options (optional)</p>

          <div class="field flex select-none gap-0.5 p-0.5">
            <label
              class="flex-1 cursor-pointer rounded-l-md rounded-r-sm px-2 py-1 text-center font-mono text-sm lowercase text-z transition"
              class:bg-z-body-selected={transportBySelf}
            >
              <input
                class="sr-only"
                type="checkbox"
                name="transport_self"
                bind:checked={transportBySelf}
              />
              by myself
            </label>

            <label
              class="flex-1 cursor-pointer rounded-sm px-2 py-1 text-center font-mono text-sm lowercase text-z transition"
              class:bg-z-body-selected={transportByHire}
            >
              <input
                class="sr-only"
                type="checkbox"
                name="transport_hire"
                bind:checked={transportByHire}
              />
              by hiring
            </label>
          </div>
        </div>

        <p class="-mt-4 mb-2 text-sm text-z-subtitle">
          If you check "by myself", you will be responsible for driving and
          transporting this item to a client in need. If you check "by hiring",
          you will be responsible for paying a Lugg/<wbr />Thumbtack/<wbr
          />Taskrabbit person to transport it (around $100 for midsize/<wbr
          />large items). You may check one, none, or both.
        </p>

        <label class="label">
          <p>A picture of what <em>you</em> have</p>

          <input
            class="field w-full text-sm"
            name="images"
            type="file"
            multiple
          />
        </label>

        <label class="label flex flex-1">
          <p>Anything else you want to tell us?</p>

          <textarea
            class="field auto-resize min-h-[100%] w-full flex-1"
            name="description"
            autocomplete="off"
            required
            use:autoResize
          />
        </label>

        <button
          class={"field w-full" +
            (formState == "sent"
              ? " bg-orange-100 font-semibold text-orange-700"
              : "")}
          type="submit"
          disabled={formState != "unsent"}
          ><span class={formState == "sending" ? "opacity-30" : ""}
            >{formState == "sent"
              ? "Sent!"
              : formState == "sending"
              ? "Sending..."
              : "Send it!"}</span
          ></button
        >
      </form>
    </div>
  </div>
{:else}
  <Error status={404} message={"No request with an ID of " + id + " exists."} />
{/if}
