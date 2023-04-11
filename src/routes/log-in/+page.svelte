<script>
  import { enhance } from "$app/forms"
</script>

<form class="m-auto w-96 max-w-full" method="post" use:enhance>
  <label class="label mt-6">
    <p>Email Address</p>

    <input class="field w-full" name="email" required type="email" />
  </label>

  <button class="field mt-6 w-full">Log In</button>
</form>
