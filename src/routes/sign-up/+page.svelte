<script>
  import { enhance } from "$app/forms"

  export let form
</script>

{#if form && form.ok}
  <div class="m-auto w-96 max-w-full">
    <p class="text-lg font-semibold text-z-heading">You're signed up!</p>

    <p class="mt-4">
      Check your inbox for a verification email to continue to OneCity.
    </p>
  </div>
{:else}
  <form
    class="m-auto w-96 max-w-full"
    method="post"
    use:enhance={() =>
      ({ update }) =>
        update({ reset: false })}
  >
    <label class="label">
      <p>Name</p>

      <input
        class="field w-full"
        maxlength="64"
        name="name"
        required
        type="text"
      />
    </label>

    <label class="label mt-6">
      <p>Email Address</p>

      <input class="field w-full" name="email" required type="email" />
    </label>

    <label class="label mt-6">
      <p>Password</p>

      <input
        autocomplete="new-password"
        class="field w-full"
        name="password"
        required
        type="password"
      />
    </label>

    <label class="label mt-6">
      <p>Verify Password</p>

      <input
        autocomplete="new-password"
        class="field w-full"
        name="password2"
        required
        type="password"
      />
    </label>

    {#if form && !form.ok}
      <p class="mt-6 text-center">Error: {form.reason}</p>
    {/if}

    <button class="field mt-6 w-full">Sign Up</button>
  </form>
{/if}
