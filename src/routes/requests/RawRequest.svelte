<script lang="ts">
  export let href: string | undefined
  export let showSize: boolean
  export let showUrgency: boolean
  export let isViewedByAdmin: boolean
</script>

<svelte:element
  this={href ? "a" : "div"}
  {href}
  class="relative flex grid-cols-[7rem,2rem,minmax(0,1fr),4rem,6rem,5rem] flex-col items-center gap-x-8 gap-y-0 overflow-hidden rounded px-2 py-1 transition last:rounded-b-xl md:grid [&:nth-child(2)]:rounded-t-xl"
  class:bg-z-body-selected={href}
  class:font-semibold={!href}
  class:lg:grid-cols-[7rem,2rem,minmax(0,1.5fr),minmax(0,1fr),4rem,6rem,5rem]={isViewedByAdmin}
>
  <div
    class="grid w-full grid-cols-[4rem,4rem,minmax(0,1fr)] gap-4 xs:grid-cols-[7rem,4rem,minmax(0,1fr)] md:contents"
  >
    <p class="hidden text-z transition xs:block">
      <slot name="date-long" />
    </p>

    <p class="block text-z transition xs:hidden">
      <slot name="date-short" />
    </p>

    <p class="relative w-8 text-z transition">
      <slot name="id" />
    </p>

    <p class="relative text-z transition">
      <slot name="name" />
    </p>

    {#if isViewedByAdmin}
      <p class="hidden text-z transition lg:block">
        <slot name="requester" />
      </p>
    {/if}
  </div>

  <div
    class="mt-1 grid w-full grid-cols-[4rem,4rem,minmax(0,1fr)] gap-4 border-t border-dashed pt-1 xs:grid-cols-[7rem,4rem,minmax(0,1fr)] md:contents"
    class:border-t-z={!href}
    class:border-t-z-bg-body={href}
  >
    {#if showSize}
      <slot name="size" />
    {:else}
      <span />
    {/if}

    {#if showUrgency}
      <slot name="urgency" />
    {:else}
      <span />
    {/if}

    <slot name="status" />
  </div>
</svelte:element>
