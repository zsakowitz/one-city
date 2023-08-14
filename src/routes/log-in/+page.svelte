<script>
  import { enhance } from "$app/forms"

  export let form
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

  {#if form && !form.ok}
    <p class="mt-6 text-center">{form.reason}</p>
  {/if}
</form>
