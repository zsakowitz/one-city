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

  <label class="label mt-6">
    <p>Password</p>

    <input class="field w-full" name="password" required type="password" />
  </label>

  <button class="field mt-6 w-full">Log In</button>

  <a
    class="mt-6 block text-center text-z-link underline decoration-transparent underline-offset-2 hover:decoration-current focus-visible:decoration-current focus-visible:outline-none"
    href="/reset-password">Forgot password?</a
  >

  {#if form && !form.ok}
    <p class="mt-6 text-center">{form.reason}</p>
  {/if}
</form>
