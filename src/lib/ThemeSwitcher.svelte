<script lang="ts">
  import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
  import Fa from "./Fa.svelte"
  import { isDark, toggleIsDark } from "./theme"
</script>

<button
  aria-checked={$isDark}
  class="group pointer-events-auto relative z-20 flex h-[1.375rem] w-10 items-center rounded-full border border-transparent bg-z-field bg-clip-padding ring-z-focus transition focus-visible:border-z-focus focus-visible:outline-none focus-visible:ring"
  on:click={toggleIsDark}
  role="switch"
>
  <div
    class="relative flex h-5 w-5 items-center justify-center rounded-full outline outline-1 outline-z transition-all icon-stroke-z group-focus-visible:outline-z-focus"
    class:left-0={!$isDark}
    class:left-[1.125rem]={$isDark}
  >
    {#if $isDark}
      <Fa class="h-3 w-3" icon={faMoon} title="Moon" />
    {:else}
      <Fa class="h-3 w-3" icon={faSun} title="Sun" />
    {/if}
  </div>
</button>
