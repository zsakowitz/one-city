<script lang="ts">
  import ThemeSwitcher from "./ThemeSwitcher.svelte"
</script>

<div
  class="pointer-events-none fixed -top-20 left-0 z-10 h-20 w-full bg-z-body print:hidden"
/>

<div
  class="pointer-events-none fixed top-0 z-10 flex h-12 w-full touch-none select-none justify-center items-center border-b px-6 py-1.5 transition print:hidden backdrop-blur-sm bg-z-body-partial border-b-z"
>
  <div class="flex h-full w-full flex-1 items-center max-w-[1024px]">
    <a
      class="pointer-events-auto mr-auto font-extralight text-2xl underline decoration-transparent decoration-1 underline-offset-2 transition hover:decoration-current text-z-nav-title z-20 relative border border-transparent focus-visible:border-z-focus ring-z-focus focus-visible:ring focus-visible:outline-none rounded-lg left-[calc(-0.5rem_-_1px)] px-2 py-0.5"
      href="/"
    >
      OneCity
    </a>

    <ThemeSwitcher />
  </div>
</div>
