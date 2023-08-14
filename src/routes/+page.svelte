<script lang="ts">
  export let data
</script>

<div>
  <h1 class="my-8 text-center text-4xl font-semibold text-z-heading">
    One City | Sharing Our Abundance
  </h1>

  <p class="my-8 text-center font-medium">
    'אַחֲרֵי־כֵ֗ן יִקָּ֤רֵא לָךְ֙ עִ֣יר הַצֶּ֔דֶק<br /><br />“After that, you
    shall be called a City of Righteousness...”<br /> – Isaiah 1:26
  </p>
</div>

{#if data && data.name}
  <p
    class="mx-auto mb-4 w-[36rem] max-w-full rounded-lg bg-z-body-selected px-8 py-4 text-center text-lg font-light"
  >
    Welcome, {data.name}!
  </p>
{/if}

<div class="mx-auto w-[32rem] max-w-full">
  <h2 class="my-4 text-left text-2xl font-semibold">What is One City?</h2>
  <p class="my-2">
    One City is a project to connect the GLIDE and Kitchen communities. In
    partnership with the <a
      class="underline"
      href="https://www.glide.org/program/walk-in-center/"
      target="_blank">GLIDE Walk-In-Center</a
    >, we are supporting GLIDE clients furnish their homes.
  </p>
  <p class="my-2">
    The walk-in center works with hundreds of bright, righteous people each week
    who are wrestling with poverty, addiction and/or mental health challenges.
    Many of these people are trying to meet their basic needs—shelter,
    furniture, clothing.
  </p>
  <p class="my-2">
    Our monthly Team Captains &amp; GLIDE staff have created a database of
    needed items. If you have any of the items and are ready to donate, email us <a
      class="underline"
      href="mailto:onecity@thekitchensf.org">here</a
    > and monthly team captain will reach out with next steps.
  </p>
  <p class="my-2">
    <em
      >One City is orchestrated by a group of loving volunteers from The Kitchen
      and Avital Raff, The Kitchen’s Community Organizer.
    </em>
  </p>
</div>

<!-- <div class="justify-center mt-6 flex gap-4">
  <a class="field" href="/log-in">Log In</a>
  <a class="field" href="/sign-up">Sign Up</a>
</div>


{#if data.name}
  <p class="text-center mt-6 text-3xl font-light">Welcome, {data.name}!</p>
{/if} -->
