<script lang="ts">
  export let checked = false
  export let label: string
  export let value: string
  export let name: string
</script>

<label
  class="field flex cursor-pointer items-center justify-center text-center [&:has(:checked)]:bg-z-body-selected"
>
  <input {checked} class="sr-only" {name} type="radio" {value} required />

  <p>{label}</p>
</label>
