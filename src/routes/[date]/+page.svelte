<script lang="ts">
  // Get the data from '+page.ts'
  import type { PageData } from './$types';
  export let data: PageData;

  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/assets/Icon.svelte';

  let jsonData = {
    date: data.journalEntry.date,
    mood: data.journalEntry.mood,
    text: data.journalEntry.content
  };

  function downloadJson() {
    const jsonDataStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonDataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Specify the desired filename here
    a.download = `${data.journalEntry.date} - dreamscribe`;

    // Trigger the download
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>{data.journalEntry?.date} | dreamscribe</title>
</svelte:head>
<article class="relative flex h-full flex-col">
  <div class="flex-1 overflow-y-auto pb-16 pl-4 pr-8 pt-32">
    <hgroup class="relative mb-4 flex w-full flex-col gap-2 font-cabinet opacity-80">
      <h1 class=" text-4xl font-bold">
        {data.journalEntry?.date}
      </h1>
      {#if data.journalEntry?.mood != ''}
        <h2 class=" text-lg">
          Mood: <b class="text-xl font-extrabold">{data.journalEntry?.mood}</b>
        </h2>
      {/if}
    </hgroup>
    <p class="whitespace-pre-wrap text-xl leading-8 tracking-wide">
      {data.journalEntry?.content}
    </p>
  </div>
  <div class="flex items-center justify-end gap-2 border-t border-base01/50 px-4 pb-4 pt-2">
    <Button variant="secondary" on:buttonClick={downloadJson}>
      <span slot="icon"><Icon name="download" /></span>
      <span slot="text">Download</span>
    </Button>
    <Button variant="primary">
      <span slot="icon"><Icon name="trash" /></span>
      <span slot="text">Delete</span>
    </Button>
  </div>
</article>
