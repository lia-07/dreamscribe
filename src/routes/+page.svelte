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

  // Import my icon file
  import Icon from '$lib/assets/Icon.svelte';

  // Import my button component.
  import Button from '$lib/components/Button.svelte';

  // These are variables which are bound to the inputs the user uses
  // This allows me to access what the user has typed at any time.
  let textInput: string;
  let moodInput: string;

  // The below code that shows the fade on the textarea to make it look more
  // smooth. I did plan on adding one on the bottom side as well but it caused
  // unexpected issue.
  let showFadeOnTextArea = false;

  function showTheFade() {
    // select the textarea
    const textarea = document.getElementById('mainTextarea');

    // define the number of pixels the user has to scroll for the fade to be
    // shown
    const showOnPx = 20;

    // if the textarea doesn't exist, return nothing from the function
    if (!textarea) return;

    // if the user has scrolled on the textarea more than the showOnPx variable
    // we declared before, show the fade
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

    // find, if any, the index of the journalEntries persisted store that
    // the current date.
    const matchingIndex = $journalEntries.findIndex(
      (journalEntry) => journalEntry.date === $currentDate
    );

    // if a journal entry for today's date already exists, update it with the
    // new values. Otherwise, make a new one.
    if (matchingIndex == -1) {
      journalEntries.update((entries) => [entry, ...entries] as JournalEntry[]);
      console.log(`Saved a new journal entry for ${entry.date}`);
    } else {
      journalEntries.update((entries) => {
        entries[matchingIndex] = entry;
        console.log(`Updated the journal entry for ${entry.date}`);

        return entries;
      });
    }
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

<!-- <svelte:head> tags allows us to insert data into the <head> tag of the html
     that may change on a page to page basis, like the title -->
<svelte:head>
  <!-- Sets the title for the home page -->
  <title>dreamscribe</title>
</svelte:head>

<form class="relative flex h-screen flex-1 flex-col" on:submit|preventDefault>
  <!-- This is the fade thing I talked about above the declaration of the 
  'showFadeOnTextArea' variable and 'showTheFade' function-->
  {#if showFadeOnTextArea}
    <div
      transition:fade
      class="pointer-events-none absolute left-0 top-0 z-30 h-60 w-full bg-gradient-to-b from-base03 to-transparent"
    />
  {/if}
  <!-- Notice the 'bind:value' attribute. This is what connects the 
    'textInput' variable to the value of the textarea.-->
  <textarea
    bind:value={textInput}
    on:scroll={showTheFade}
    class="h-full w-full max-w-full resize-none scroll-pb-16 overflow-y-auto scroll-smooth whitespace-pre-wrap border-none bg-transparent px-8 pb-32 pt-32 font-supreme text-xl leading-8 tracking-wider text-opacity-75 outline-none placeholder:text-base1 focus:ring-0 md:pl-4 md:pr-8"
    placeholder="Start typing what you dreamed..."
    id="mainTextarea"
  />

  <!-- The bottom row -->
  <div class=" flex w-full items-center justify-between border-t border-base01/50 px-4 pb-4 pt-2">
    <div class="flex items-center gap-2">
      <!-- The mood selector. the select element is bound to the 'moodInput'
      variable -->
      <label for="mood">Mood:</label>
      <select
        bind:value={moodInput}
        name="mood"
        id="mood"
        class="btn-secondary h-8 rounded-md pl-3 transition-all focus:scale-90 focus:opacity-80 focus:outline-none"
      >
        <!-- Placeholder value -->
        <option value="" selected disabled>Select a mood</option>

        <!-- Actual options -->
        <option value="Happy">Happy</option>
        <option value="Sad">Sad</option>
        <option value="Anxious">Anxious</option>
        <option value="Scary">Scary</option>
        <option value="Nostalgic">Nostalgic</option>
        <option value="Crazy">Crazy</option>
      </select>
    </div>
    <!-- This button is disabled if there is nothing in the textInput variable,
    which is bound to the textArea. If there is something in it, what is in the 
    textarea will be saved as a new journal entry UNLESS there is already a 
    journal entry for that date, in which case it will update it -->
    <Button
      variant={textInput ? 'primary' : 'disabled'}
      on:buttonClick={() => {
        if (textInput) saveEntry();
      }}><span slot="icon"><Icon name="floppy" /></span><span slot="text">Save</span></Button
    >
  </div>
</form>
