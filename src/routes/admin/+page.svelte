<script lang="ts">
  import Fa from "$lib/Fa.svelte"
  import {
    faInbox,
    faUser,
    faUserGear,
  } from "@fortawesome/free-solid-svg-icons"
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
      The status field shows whether an account is an administrator and whether
      it receives emails about items.
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

<table class="w-full border-separate border-spacing-y-1">
  <thead>
    <tr>
      <td class="pl-2 text-z transition">Name</td>
      <td class="text-z transition">Email</td>
      <td class="text-z transition">Toggle Admin</td>
      <td class="text-z transition">Toggle Mail</td>
      <td class="text-z transition">Delete</td>
      <td class="ml-auto pr-2 text-right text-z transition">Status</td>
    </tr>
  </thead>

  <tbody>
    {#each form?.accounts || data.accounts as account}
      <tr class="field field-modern rounded-lg">
        <td class="rounded-l py-1 pl-2 text-z transition">
          {account.id == data.id ? "You" : account.name}
        </td>

        <td class="py-1 text-z transition">
          {account.email}
        </td>

        <td class="py-1">
          {#if account.admin}
            {#if account.id == data.id}
              <em>not allowed</em>
            {:else}
              <form action="?/set" method="post" use:enhance>
                <input type="hidden" name="id" value={account.id} />
                <input type="hidden" name="adminMail" value="false" />
                <input type="hidden" name="admin" value="false" />
                <input type="hidden" name="exists" value="true" />

                <button class="underline underline-offset-2" type="submit">
                  Remove Admin
                </button>
              </form>
            {/if}
          {:else}
            <form action="?/set" method="post" use:enhance>
              <input type="hidden" name="id" value={account.id} />
              <input type="hidden" name="adminMail" value="false" />
              <input type="hidden" name="admin" value="true" />
              <input type="hidden" name="exists" value="true" />

              <button class="underline underline-offset-2" type="submit">
                Make Admin
              </button>
            </form>
          {/if}
        </td>

        <td class="py-1">
          {#if account.admin && account.adminMail}
            <form action="?/set" method="post" use:enhance>
              <input type="hidden" name="id" value={account.id} />
              <input type="hidden" name="adminMail" value="false" />
              <input type="hidden" name="admin" value="true" />
              <input type="hidden" name="exists" value="true" />

              <button class="underline underline-offset-2" type="submit">
                Stop Receiving Mail
              </button>
            </form>
          {:else}
            <form action="?/set" method="post" use:enhance>
              <input type="hidden" name="id" value={account.id} />
              <input type="hidden" name="adminMail" value="true" />
              <input type="hidden" name="admin" value="true" />
              <input type="hidden" name="exists" value="true" />

              <button class="underline underline-offset-2" type="submit">
                Receive Mail
              </button>
            </form>
          {/if}
        </td>

        <td class="py-1">
          {#if account.id == data.id}
            <em>not allowed</em>
          {:else}
            <form action="?/set" method="post" use:enhance>
              <input type="hidden" name="id" value={account.id} />
              <input type="hidden" name="adminMail" value="false" />
              <input type="hidden" name="admin" value="false" />
              <input type="hidden" name="exists" value="false" />

              <button class="underline underline-offset-2" type="submit">
                Delete
              </button>
            </form>
          {/if}
        </td>

        <td class="ml-auto rounded-r py-1 pr-2">
          <div class="flex">
            <div class="flex-1" />

            <Fa
              class="h-4 w-4"
              icon={account.admin ? faUserGear : faUser}
              title={account.admin ? "administrator" : "standard user"}
            />

            {#if account.admin && account.adminMail}
              <Fa class="ml-3 h-4 w-4" icon={faInbox} title="receives email" />
            {:else}
              <p class="ml-3 h-4 w-4" />
            {/if}
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
