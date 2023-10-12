<script lang="ts">
  import Fa from "$lib/Fa.svelte"
  import { faUser, faUserGear } from "@fortawesome/free-solid-svg-icons"
  import type { ActionData, PageData } from "./$types"
  import { enhance } from "$app/forms"

  export let data: PageData
  export let form: ActionData
</script>

<h1 class="my-4 text-center text-lg font-bold text-z-heading transition">
  Admin Management
</h1>

<div class="mx-auto mb-8 flex gap-6 max-md:flex-col">
  <div
    class="max-w-xs rounded bg-z-body-selected px-3 py-2 text-sm [text-wrap:balance]"
  >
    <p>
      Click a user account to make them an administrator, or click an
      administrator's account to turn them into a standard account.
    </p>

    <p class="mt-2">
      To search, press Control+F on your keyboard (or Cmd+F on Mac).
    </p>
  </div>

  <div
    class="max-w-xs rounded bg-z-body-selected px-3 py-2 text-sm [text-wrap:balance]"
  >
    <p>
      To make a new admin account, ask the person who wants the account to go to <strong
        >1city.zsnout.com</strong
      >
      and click <strong>Sign Up</strong>.
    </p>

    <p class="mt-2">
      Once they're done signing up, reload this page and click their name.
    </p>
  </div>
</div>

<div class="flex flex-col gap-1">
  <div
    class="relative grid grid-cols-3 items-center gap-8 overflow-hidden rounded px-2 py-1 transition last:rounded-b-xl [&:nth-child(2)]:rounded-t-xl"
  >
    <p class="text-z transition">Name</p>

    <p class="text-z transition">Email</p>

    <p class="ml-auto text-z transition">Status</p>
  </div>

  {#each form?.accounts || data.accounts as account}
    <form class="flex" action="?/toggleStatus" method="post" use:enhance>
      <input type="hidden" name="id" value={account.id} />

      <button
        class="relative grid h-full w-full grid-cols-3 items-center gap-8 overflow-hidden rounded bg-z-body-selected px-2 py-1 text-left transition last:rounded-b-xl [&:nth-child(2)]:rounded-t-xl"
        class:opacity-30={account.id == data.id}
        type="submit"
        disabled={account.id == data.id}
        on:click={(event) => {
          if (account.id == data.id) {
            event.preventDefault()
          }

          if (account.admin) {
            if (
              !confirm(
                "Are you sure you want to remove " +
                  account.name +
                  " from the admin list?"
              )
            ) {
              event.preventDefault()
            }
          } else {
            if (
              !confirm(
                "Are you sure to want to make " + account.name + " an admin?"
              )
            ) {
              event.preventDefault()
            }
          }
        }}
      >
        <p class="text-z transition">
          {account.id == data.id ? "You" : account.name}
        </p>

        <p class="text-z transition">
          {account.id == data.id
            ? "cannot remove yourself as an admin"
            : account.email}
        </p>

        <Fa
          class="ml-auto h-4 w-4"
          icon={account.admin ? faUserGear : faUser}
          title={account.admin ? "administrator" : "standard user"}
        />
      </button>
    </form>
  {/each}
</div>
