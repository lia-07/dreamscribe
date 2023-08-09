<script lang="ts">
  import { onMount } from 'svelte';

  import type { JournalEntry } from '../app';

  import { journalEntries } from '$lib/stores/journalEntries';

  import { formatTimestamp } from '$lib/scripts/timestamp';

  import Button from '$lib/components/Button.svelte';

  let textInput: string;
  let moodInput: string;
  let colourInput: string = '#000000';
  function saveEntry() {
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
      journalEntries.update((entries) => [...entries, entry] as JournalEntry[]);
    } else {
      // !!! CURRENTLY BROKEN, WORKING ON A FIX !!!
      journalEntries[matchingIndex].set();
    }

    console.log($journalEntries);
  }

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
  <form class="relative flex h-full flex-1 flex-col">
    <div
      class=" pointer-events-none absolute inset-0 h-80 w-full bg-gradient-to-b from-base03 to-transparent"
    />
    <textarea
      class="w-full flex-1 resize-none scroll-pb-16 overflow-y-auto scroll-smooth whitespace-pre-wrap border-none bg-transparent pb-32 pl-4 pr-8 pt-32 font-supreme text-xl leading-8 tracking-wider text-opacity-75 outline-none focus:ring-0"
      placeholder="Start typing what you dreamed..."
      id="main"
      bind:value={input}
    />
    <div class="  flex h-20 w-full items-center justify-between px-4">
      <div class="flex items-center gap-2">
        <label for="mood">Mood:</label>
        <select
          bind:value={moodInput}
          name="mood"
          id="mood"
          class="btn-secondary fo h-8 rounded-md pl-3 transition-all focus:scale-90 focus:opacity-80 focus:outline-none"
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
      <Button variant="primary"><span slot="text">Save</span></Button>
    </div>
  </form>
  <div class="h-full w-80 bg-purple-300" />
</div>
