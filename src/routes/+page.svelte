<script lang="ts">
  export let data
  let story = "Blah, blah, blah, here's our story its sooooooooooo loooooooog This approach is recommended for commands that are conceptually related to only a single subsystem, and is very concise. However, it doesn’t fare well with commands related to more than one subsystem: passing in other subsystem objects is unintuitive and can cause race conditions and circular dependencies, and thus should be avoided. Therefore, this approach is best suited for single-subsystem commands, and should be used only for those cases."
</script>

<div>
  <h1 class="my-8 text-center text-4xl font-semibold text-z-heading">
    One City | Sharing Our Abundance
  </h1>

  <p class="text-center my-8 font-medium">
    'אַחֲרֵי־כֵ֗ן יִקָּ֤רֵא לָךְ֙ עִ֣יר הַצֶּ֔דֶק<br /><br />“After that, you
    shall be called a City of Righteousness...”<br /> – Isaiah 1:26
  </p>
</div>

<div>
  <p class="text-left my-6 mx-60">{story}</p>
</div>
  
<div class="justify-center mt-6 flex gap-4">
  <a class="field" href="/log-in">Log In</a>
  <a class="field" href="/sign-up">Sign Up</a>
</div>


{#if data.name}
  <p class="text-center mt-6 text-3xl font-light">Welcome, {data.name}!</p>
{/if}
