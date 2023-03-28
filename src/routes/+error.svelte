<script lang="ts">
  import { page } from "$app/stores"
</script>

<div class="m-auto flex max-w-full flex-col">
  <div class="flex items-center">
    <p class="border-standard mr-8 border-r py-4 pr-8 text-5xl font-extralight">
      {$page.status}
    </p>

    <span class="sr-only">|</span>

    <p class="max-w-sm whitespace-pre-wrap py-4">
      {$page.error?.message}
    </p>
  </div>

  <a
    class="field mx-auto mt-6 w-48 max-w-full whitespace-pre text-center"
    href={$page.url.href}
  >
    Reload
  </a>
</div>
