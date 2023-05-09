<script lang="ts">
  export let data
</script>

<div>
  <h1 class="my-8 text-center text-4xl font-semibold text-z-heading">
    One City | Sharing Our Abundance
  </h1>

  <p class="text-center">
    'אַחֲרֵי־כֵ֗ן יִקָּ֤רֵא לָךְ֙ עִ֣יר הַצֶּ֔דֶק<br /><br />“After that, you
    shall be called a City of Righteousness...”<br /> – Isaiah 1:26
  </p>
  <div class="justify-center mt-6 flex gap-4">
    <a class="field" href="/log-in">Log In</a>
    <a class="field" href="/sign-up">Sign Up</a>
  </div>
</div>

{#if data.name}
  <hr />

  <p class="text-center">Welcome, {data.name}!</p>
{/if}
