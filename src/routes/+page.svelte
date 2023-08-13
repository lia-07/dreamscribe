<script lang="ts">
  // Import a module that executes code when the website is opened.
  import { onMount } from 'svelte';

  // Import the JournalEntry type
  import type { JournalEntry } from '../app';

  // Import my journal entry array, which is saved in a local storage store.
  import { journalEntries } from '$lib/stores/journalEntries';

  // Import my timestamp formatter function
  import { formatTimestamp } from '$lib/scripts/timestamp';

  // Import my button component.
  import Button from '$lib/components/Button.svelte';

  // These are variables which are bound to the inputs the user uses
  // This allows me to access what the user has typed at any time.
  let textInput: string;
  let moodInput: string;
  let colourInput: string = '#000000';

  // Takes the inputs from the user and adds them to the local storage
  // 'journalEntries' store if there is no dream journal yet for that date,
  // and if there is it updates today's date's entry
  function saveEntry() {
    // Prepare the object to append to the journalEntries local store (it is a
    // JournalEntry type)
    const entry: JournalEntry = {
      date: formatTimestamp(Date.now()),
      content: textInput,
      mood: moodInput,
      colour: colourInput
    };

    const matchingIndex = $journalEntries.findIndex(
      (entry) => entry.date === formatTimestamp(Date.now())
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
    const matchingIndex = $journalEntries.findIndex(
      (entry) => entry.date === formatTimestamp(Date.now())
    );
    if (matchingIndex != -1) {
      textInput = $journalEntries[matchingIndex].content;
      moodInput = $journalEntries[matchingIndex].mood;
      colourInput = moodInput = $journalEntries[matchingIndex].colour;
    }
  });
</script>

<div class="flex h-screen w-full">
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
        <label for="colour" class="pl-2">Colour:</label>
        <input
          bind:value={colourInput}
          type="color"
          name="colour"
          id="colour"
          class="btn-secondary h-8 rounded-md px-2 transition-all focus:scale-90 focus:opacity-80 focus:outline-none"
        />
      </div>
      <Button
        variant={textInput ? 'primary' : 'disabled'}
        on:buttonClick={() => {
          if (textInput) saveEntry();
        }}><span slot="text">Save</span></Button
      >
    </div>
  </form>
  <div
    class="flex h-full w-80 flex-col overflow-y-auto pt-16 opacity-50 transition-all duration-200 hover:opacity-90"
  >
    <h1 class="text-cabinet mb-2 pl-2 text-2xl font-bold">Previous entries:</h1>

    {#each $journalEntries as journalEntry}
      {@const currentYear = new Date().getFullYear()}
      {@const journalEntryDate = journalEntry.date.split(' ')}

      <div
        class="group isolate flex h-[5.5rem] w-full items-center gap-2 rounded-md p-2 opacity-75 transition-all hover:bg-base02 hover:opacity-100 active:scale-95"
      >
        <div
          class="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded bg-base2 text-base03"
        >
          <span class="-mb-2 font-cabinet text-4xl font-bold">{journalEntryDate[0]}</span>
          <span class="font-cabinet font-bold" class:text-sm={currentYear != +journalEntryDate[2]}
            >{journalEntryDate[1]}{currentYear != +journalEntryDate[2]
              ? " '" + journalEntryDate[2].slice(2)
              : ''}</span
          >
        </div>
        <p class=" -mt-0.5 line-clamp-3 text-ellipsis text-base3">
          {journalEntry.content}
        </p>
      </div>
    {/each}
  </div>
</div>
