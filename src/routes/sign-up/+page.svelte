<script>
  import { enhance } from "$app/forms"

  export let form
</script>

{#if form}
  <div class="m-auto w-96 max-w-full">
    <p class="text-lg font-semibold text-z-heading">You're signed up!</p>

    <p class="mt-4">
      Check your inbox for a verification email to continue to OneCity.
    </p>
  </div>
{:else}
  <form class="m-auto w-96 max-w-full" method="post" use:enhance>
    <label class="label">
      <p>Name:</p>

      <input
        class="field w-full"
        maxlength="64"
        name="name"
        required
        type="text"
      />
    </label>

    <label class="label mt-4">
      <p>Email address:</p>

      <input class="field w-full" name="email" required type="email" />
    </label>

    <label class="label">
      <p>Click to sign up:</p>

      <button class="field w-full">Sign Up</button>
    </label>
  </form>
{/if}
