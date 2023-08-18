<script lang="ts">
  import ThemeSwitcher from "./ThemeSwitcher.svelte"
</script>

<div
  class="pointer-events-none fixed -top-20 left-0 z-10 h-20 w-full bg-z-body print:hidden"
/>

<div
  class="pointer-events-none fixed top-0 z-10 flex h-12 w-full touch-none select-none items-center justify-center border-b border-b-z bg-z-body-partial px-6 py-1.5 backdrop-blur-sm transition print:hidden"
>
  <div class="flex h-full w-full max-w-[1024px] flex-1 items-center">
    <a
      class="pointer-events-auto relative left-[calc(-0.5rem_-_1px)] z-20 rounded-lg border border-transparent px-2 py-0.5 text-2xl font-extralight text-z-heading underline decoration-transparent decoration-1 underline-offset-2 ring-z-focus transition hover:decoration-current focus-visible:border-z-focus focus-visible:outline-none focus-visible:ring"
      href="/"
    >
      OneCity
    </a>

    <a
      class="pointer-events-auto relative left-[calc(-0.5rem_-_1px)] ml-auto rounded-lg border border-transparent px-2 py-0.5 text-z underline decoration-transparent decoration-1 underline-offset-2 ring-z-focus transition hover:decoration-current focus-visible:border-z-focus focus-visible:outline-none focus-visible:ring"
      href="/requests">All Requests</a
    >

    <span
      class="relative left-[calc(-0.5rem_-_1px)] text-z opacity-50 transition"
      >&middot;</span
    >

    <a
      class="pointer-events-auto relative left-[calc(-0.5rem_-_1px)] mr-auto rounded-lg border border-transparent px-2 py-0.5 text-z underline decoration-transparent decoration-1 underline-offset-2 ring-z-focus transition hover:decoration-current focus-visible:border-z-focus focus-visible:outline-none focus-visible:ring"
      href="/log-in">Log In</a
    >

    <ThemeSwitcher />
  </div>
</div>
