<script lang="ts">
  import { faCity, faHome } from "@fortawesome/free-solid-svg-icons"
  import Fa from "./Fa.svelte"
  import ThemeSwitcher from "./ThemeSwitcher.svelte"

  export let isAdmin: boolean
  export let isLoggedIn: boolean
</script>

<div
  class="pointer-events-none fixed -top-20 left-0 z-10 h-20 w-full bg-z-body print:hidden"
/>

<div
  class="pointer-events-none fixed top-0 z-10 flex h-12 w-full touch-none select-none items-center justify-center border-b border-b-z bg-z-body-partial px-6 py-1.5 backdrop-blur-sm transition print:hidden"
>
  <div class="relative flex h-full w-full max-w-[1024px] flex-1 items-center">
    <a
      class="pointer-events-auto z-20 -mx-2 rounded-lg border border-transparent px-2 py-0.5 text-2xl font-extralight text-z-heading underline decoration-transparent decoration-1 underline-offset-2 ring-z-focus transition hover:decoration-current focus-visible:border-z-focus focus-visible:outline-none focus-visible:ring"
      href="/"
    >
      <Fa class="block h-6 w-6 xs:hidden" icon={faHome} title="OneCity" />
      <span class="hidden xs:block">OneCity</span>
    </a>

    <div
      class="absolute left-1/2 flex h-full flex-1 -translate-x-1/2 items-center"
    >
      <a
        class="pointer-events-auto rounded-lg border border-transparent px-2 py-0.5 text-z underline decoration-transparent decoration-1 underline-offset-2 ring-z-focus transition hover:decoration-current focus-visible:border-z-focus focus-visible:outline-none focus-visible:ring"
        href="/requests"
      >
        <span class="hidden whitespace-nowrap sm:block">All Requests</span>
        <span class="block whitespace-nowrap sm:hidden">Requests</span>
      </a>

      {#if isAdmin}
        <span class="text-z opacity-50 transition">&middot;</span>

        <a
          class="pointer-events-auto rounded-lg border border-transparent px-2 py-0.5 text-z underline decoration-transparent decoration-1 underline-offset-2 ring-z-focus transition hover:decoration-current focus-visible:border-z-focus focus-visible:outline-none focus-visible:ring"
          href="/admin"
        >
          <span class="hidden whitespace-nowrap sm:block">Admin Management</span
          >
          <span class="block whitespace-nowrap sm:hidden">Admin</span>
        </a>
      {/if}

      <span class="hidden text-z opacity-50 transition sm:block">&middot;</span>

      {#if isLoggedIn}
        <form
          class="pointer-events-auto relative left-[calc(-1rem_-_1px)] ml-2 hidden rounded-lg border border-transparent px-2 py-0.5 text-z underline decoration-transparent decoration-1 underline-offset-2 ring-z-focus transition hover:decoration-current focus-visible:border-z-focus focus-visible:outline-none focus-visible:ring sm:flex"
          method="post"
          action="/log-out"
        >
          <button
            class="flex flex-1 items-center justify-center whitespace-nowrap rounded-lg border border-transparent px-2 py-0.5 text-center text-z underline decoration-transparent decoration-1 underline-offset-2 ring-z-focus transition hover:decoration-current focus-visible:border-z-focus focus-visible:outline-none focus-visible:ring"
            type="submit"
          >
            Log Out
          </button>
        </form>
      {:else}
        <a
          class="pointer-events-auto hidden rounded-lg border border-transparent px-2 py-0.5 text-z underline decoration-transparent decoration-1 underline-offset-2 ring-z-focus transition hover:decoration-current focus-visible:border-z-focus focus-visible:outline-none focus-visible:ring sm:block"
          href="/log-in"
        >
          Log In
        </a>
      {/if}
    </div>

    <ThemeSwitcher />
  </div>
</div>
