<script lang="ts">
  import { enhance } from "$app/forms"
  import type { PageData } from "./$types"

  export let data: PageData
</script>

<form class="m-auto w-96 max-w-full" method="post" use:enhance>
  <label class="label mt-6 opacity-50">
    <p>Email Address</p>

    <input class="field w-full" disabled value={data.email} />
  </label>

  <label class="label mt-6">
    <p>New Password</p>

    <input class="field w-full" name="password" type="password" />
  </label>

  <button class="field mt-6 w-full" type="submit">Reset Password</button>
</form>
