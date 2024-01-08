<script lang="ts">
  export let href: string | undefined
  export let showSize: boolean
  export let showUrgency: boolean
</script>

<svelte:element
  this={href ? "a" : "div"}
  {href}
  class="relative flex flex-col items-center gap-x-8 gap-y-0 overflow-hidden rounded px-2 py-1 transition last:rounded-b-xl md:grid md:grid-cols-[2rem,minmax(0,1.5fr),minmax(0,1fr),minmax(0,9rem),3rem,5rem,4rem] [&:nth-child(2)]:rounded-t-xl"
  class:bg-z-body-selected={href}
  class:font-semibold={!href}
>
  <div
    class="flex w-full xs:grid xs:grid-cols-[2rem,minmax(0,1.5fr),minmax(0,1fr)] md:contents"
  >
    <p class="relative w-8 text-z transition">
      <slot name="id" />
    </p>

    <p class="relative mx-4 text-z transition xs:mx-8 md:mx-0">
      <slot name="name" />
    </p>

    <div class="flex-1 xs:hidden" />

    <p class="text-z transition">
      <slot name="requester" />
    </p>
  </div>

  <div
    class="mt-1 grid w-full grid-cols-[4rem,3rem,minmax(0,1fr),minmax(0,1fr)] gap-4 border-t border-dashed pt-1 xs:grid-cols-[8rem,3rem,minmax(0,1fr),minmax(0,1fr)] md:contents"
    class:border-t-z={!href}
    class:border-t-z-bg-body={href}
  >
    <p class="hidden text-z transition xs:block">
      <slot name="date-long" />
    </p>

    <p class="block text-z transition xs:hidden">
      <slot name="date-short" />
    </p>

    {#if showSize}
      <slot name="size" />
    {:else}
      <span />
    {/if}

    {#if showUrgency}
      <slot name="urgency" />
    {/if}

    <slot name="status" />
  </div>
</svelte:element>
