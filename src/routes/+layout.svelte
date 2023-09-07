<script lang="ts">
  import { browser } from "$app/environment"
  import Navigation from "$lib/Navigation.svelte"
  import { isDark } from "$lib/theme"
  import "../app.postcss"

  $: {
    if (browser) {
      requestAnimationFrame(() => {
        document.documentElement.classList.toggle("dark", $isDark)
      })
    }
  }
</script>

<Navigation />

<div
  class="mx-6 mb-8 mt-16 flex flex-1 flex-col text-z transition print:mx-0 print:my-0"
>
  <div
    class="mx-auto flex w-[64rem] max-w-full flex-1 flex-col text-z transition"
  >
    <slot />
  </div>
</div>
