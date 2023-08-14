<script lang="ts">
  // Import a module that executes code when the website is opened.
  import { onMount } from 'svelte';

  // Import the JournalEntry type
  import type { JournalEntry } from '../app';

  // Get the data from '+page.ts'
  import type { PageData } from './$types';
  export let data: PageData;

  // Import a cool transition
  import { fade } from 'svelte/transition';

  // Import my journal entry array, which is saved in a local storage store.
  import { journalEntries } from '$lib/stores/journalEntries';

  // Import my universal store for the current date
  import { currentDate } from '$lib/stores/currentDate';

  // Import my button component.
  import Button from '$lib/components/Button.svelte';

  // These are variables which are bound to the inputs the user uses
  // This allows me to access what the user has typed at any time.
  let textInput: string;
  let moodInput: string;

  let showFadeOnTextArea = false;

  function showTheFade() {
    const textarea = document.getElementById('mainTextarea');
    const showOnPx = 150; // Change this value if needed

    if (!textarea) return;

    if (textarea.scrollTop > showOnPx) {
      showFadeOnTextArea = true;
    } else {
      showFadeOnTextArea = false;
    }
  }

  // Takes the inputs from the user and adds them to the local storage
  // 'journalEntries' store if there is no dream journal yet for that date,
  // and if there is it updates today's date's entry
  function saveEntry() {
    // Prepare the object to append to the journalEntries local store (it is a
    // JournalEntry type)
    const entry: JournalEntry = {
      date: $currentDate,
      content: textInput,
      mood: moodInput
    };

    const matchingIndex = $journalEntries.findIndex(
      (journalEntry) => journalEntry.date === $currentDate
    );
    if (matchingIndex == -1) {
      journalEntries.update((entries) => [entry, ...entries] as JournalEntry[]);
    } else {
      journalEntries.update((entries) => {
        entries[matchingIndex] = entry;
        return entries;
      });
    }

    console.log($journalEntries);
  }

  // When the application is loaded, this checks if there's already an entry for
  // today's date. If so, it loads it in (there can only be one entry per day)
  onMount(() => {
    if (data.journalEntry) {
      textInput = data.journalEntry.content;
      moodInput = data.journalEntry.mood;
    }
  });
</script>

<form class="relative flex h-full flex-1 flex-col" on:submit|preventDefault>
  <!-- If the length of all the text typed (in characters) is over 500, show the smooth gradient -->
  {#if showFadeOnTextArea}
    <div
      transition:fade
      class=" pointer-events-none absolute inset-0 h-80 w-full bg-gradient-to-b from-base03 to-transparent"
    />
  {/if}
  <!-- Notice the 'bind:value' attribute. This is what connects the 
    'textInput' variable to the value of the textarea.-->

  <div
    bind:innerHTML={textInput}
    on:scroll={showTheFade}
    class="w-full max-w-full flex-1 resize-none scroll-pb-16 overflow-y-auto scroll-smooth whitespace-pre-wrap border-none bg-transparent pb-32 pl-4 pr-8 pt-32 font-supreme text-xl leading-8 tracking-wider text-opacity-75 outline-none focus:ring-0"
    placeholder="Start typing what you dreamed..."
    id="mainTextarea"
    contenteditable
  />

  <div class="  flex h-20 w-full items-center justify-between px-4">
    <div class="flex items-center gap-2">
      <label for="mood">Mood:</label>
      <select
        bind:value={moodInput}
        name="mood"
        id="mood"
        class="btn-secondary h-8 rounded-md pl-3 transition-all focus:scale-90 focus:opacity-80 focus:outline-none"
      >
        <option value="" selected disabled>Select a mood</option>
        <option value="Happy">Happy</option>
        <option value="Sad">Sad</option>
        <option value="Anxious">Anxious</option>
        <option value="Scary">Scary</option>
        <option value="Nostalgic">Nostalgic</option>
        <option value="Crazy">Crazy</option>
      </select>
    </div>
    <Button
      variant={textInput ? 'primary' : 'disabled'}
      on:buttonClick={() => {
        if (textInput) saveEntry();
      }}
      ><span slot="icon"
        ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
          ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
          /></svg
        >
      </span><span slot="text">Save</span></Button
    >
  </div>
</form>
