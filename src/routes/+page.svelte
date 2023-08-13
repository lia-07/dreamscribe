<script lang="ts">
  // Import a module that executes code when the website is opened.
  import { onMount } from 'svelte';

  // Import the JournalEntry type
  import type { JournalEntry } from '../app';

  // Get the data from '+page.ts'
  import type { PageData } from './$types';
  export let data: PageData;

  // Imports a cool transition
  import { slide } from 'svelte/transition';

  // Import my journal entry array, which is saved in a local storage store.
  import { journalEntries } from '$lib/stores/journalEntries';

  // Import my universal store for the current date
  import { currentDate } from '$lib/stores/currentDate';

  // Import my timestamp formatter function
  import { formatTimestamp } from '$lib/scripts/timestamp';

  // Import my button component.
  import Button from '$lib/components/Button.svelte';

  // These are variables which are bound to the inputs the user uses
  // This allows me to access what the user has typed at any time.
  let textInput: string;
  let moodInput: string;

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

<main class="flex h-screen w-full gap-2">
  <form class="relative flex h-full flex-1 flex-col" on:submit|preventDefault>
    <!-- If the length of all the text typed (in characters) is over 500, show the smooth gradient -->
    {#if textInput?.length > 500}
      <div
        class=" pointer-events-none absolute inset-0 h-80 w-full bg-gradient-to-b from-base03 to-transparent"
      />
    {/if}
    <!-- Notice the 'bind:value' attribute. This is what connects the 
    'textInput' variable to the value of the textarea.-->
    <textarea
      bind:value={textInput}
      class="w-full flex-1 resize-none scroll-pb-16 overflow-y-auto scroll-smooth whitespace-pre-wrap border-none bg-transparent pb-32 pl-4 pr-8 pt-32 font-supreme text-xl leading-8 tracking-wider text-opacity-75 outline-none focus:ring-0"
      placeholder="Start typing what you dreamed..."
      id="main"
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
        }}><span slot="text">Save</span></Button
      >
    </div>
  </form>
  <aside
    class="no-scrollbar flex h-full w-80 shrink-0 flex-col overflow-y-auto pb-60 pt-20 opacity-50 transition-all duration-200 hover:opacity-90"
  >
    {#if $journalEntries.length > 0}
      <h1 class="text-cabinet mb-2 pl-2 text-2xl font-bold">
        Journal {$journalEntries.length == 1 ? 'Entry' : 'Entries'}:
      </h1>
    {/if}
    {#each $journalEntries as journalEntry}
      {@const journalEntryDate = journalEntry.date.split(' ')}
      {@const currentYear = $currentDate.split(' ')[2]}

      <div
        transition:slide
        class="group relative isolate flex h-[5.5rem] w-full gap-3 rounded-md p-2 opacity-75 transition-all hover:bg-base02 hover:opacity-100 active:scale-95"
      >
        <div
          class="flex h-16 w-16 shrink-0 flex-col items-center justify-center self-center rounded bg-base2 text-base03"
        >
          <span class="-mb-2 font-cabinet text-4xl font-bold">{journalEntryDate[0]}</span>
          <span class="font-cabinet font-bold" class:text-sm={currentYear != journalEntryDate[2]}
            >{journalEntryDate[1]}{currentYear != journalEntryDate[2]
              ? " '" + journalEntryDate[2].slice(2)
              : ''}</span
          >
        </div>
        <p class=" line-clamp-3 text-ellipsis text-base3">
          {journalEntry.content}
        </p>
      </div>
    {/each}
    <div
      class="pointer-events-none absolute bottom-0 h-60 w-80 shrink-0 bg-gradient-to-t from-base03 via-base03/75 to-transparent"
    />
  </aside>
</main>
