<script lang="ts">
  // Get the data from '+page.ts'
  import type { PageData } from './$types';
  export let data: PageData;

  import { openModal } from 'svelte-modals';
  import DeleteEntry from '$lib/modals/DeleteEntry.svelte';

  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/assets/Icon.svelte';
  import { journalEntries } from '$lib/stores/journalEntries';

  // downloads the dream journal as JSON
  function downloadJson() {
    // get the data about the current entry, and format it as a JSON string
    const jsonDataStr = JSON.stringify(
      {
        date: data.journalEntry.date,
        mood: data.journalEntry.mood,
        text: data.journalEntry.content
      },
      null,
      2
    );

    // make it JSON
    const blob = new Blob([jsonDataStr], { type: 'application/json' });

    // create a temporary url for the object
    const url = URL.createObjectURL(blob);

    // make a temporary invisible link element
    const a = document.createElement('a');

    // set the href of our temporary invisible link element to the url from
    // before
    a.href = url;

    // tells the browser that the file is meant to be downloaded instead of
    // shown, and sets the file name (it'll be like '17 Aug 2023 - dreamscribe.json')
    a.download = `${data.journalEntry.date} - dreamscribe`;

    // "click" on our temporary invisible link
    a.click();

    // clean up
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>{data.journalEntry?.date} | dreamscribe</title>
</svelte:head>
<article class="relative flex h-full flex-col">
  <div class="flex-1 overflow-y-auto px-8 pb-16 pt-32 md:pl-4 md:pr-8">
    <hgroup class=" mb-4 flex w-full flex-col gap-1 font-cabinet opacity-90">
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
    <Button
      variant="primary"
      on:buttonClick={() => openModal(DeleteEntry, { date: data.journalEntry.date })}
    >
      <span slot="icon"><Icon name="trash" /></span>
      <span slot="text">Delete</span>
    </Button>
  </div>
</article>
