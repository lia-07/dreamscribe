<script lang="ts">
  // Get the data from '+page.ts'
  import type { PageData } from './$types';
  export let data: PageData;

  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>{data.journalEntry?.date} | dreamscribe</title>
</svelte:head>
<article class="relative h-screen flex-1 overflow-y-auto">
  <div class="pb-16 pl-4 pr-8 pt-32">
    <hgroup class="relative mb-4 flex w-full flex-col gap-2 font-cabinet opacity-80">
      <h1 class=" text-4xl font-bold">
        {data.journalEntry?.date}
      </h1>
      {#if data.journalEntry?.mood != ''}
        <h2 class=" text-lg">
          Mood: <b class="text-xl font-extrabold">{data.journalEntry?.mood}</b>
        </h2>
      {/if}
      <div class="absolute right-0 top-0">
        <Button variant="secondary">
          <span slot="icon" />
          <span slot="text">Download</span>
        </Button>
      </div>
    </hgroup>
    <p class="whitespace-pre-wrap text-xl leading-8 tracking-wide">
      {data.journalEntry?.content}
    </p>
  </div>
</article>
