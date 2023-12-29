<script lang="ts">
  import { enhance } from "$app/forms"
  import type { ActionData } from "./$types"

  export let form: ActionData
</script>

<form
  class="m-auto w-96 max-w-full"
  method="post"
  use:enhance={() =>
    ({ update }) =>
      update({ reset: false })}
>
  <label class="label mt-6">
    <p>Email Address</p>

    <input class="field w-full" name="email" required type="email" />
  </label>

  <button class="field mt-6 w-full" type="submit">Reset Password</button>

  <p class="mt-6 text-center">
    We'll send a link to your email.<br />
    Click it to reset your password.
  </p>

  {#if form}
    {#if form.ok}
      <p class="mt-2 text-center">Check your inbox.</p>
    {:else}
      <p class="mt-2 text-center">{form.reason}</p>
    {/if}
  {/if}
</form>
