// Get the PageLoad type
import type { PageLoad } from './$types';

// Allows me to manipulate svelte stores
import { get } from 'svelte/store';

// Import the journalEntires persisted store.
import { journalEntries } from '$lib/stores/journalEntries';

// get the current date store
import { currentDate } from '$lib/stores/currentDate';

// The load function (when the page is loaded, it runs this code)
export const load: PageLoad = () => {
  // Get the index, if any, of the journal entry that matches the current date
  const matchingIndex = get(journalEntries).findIndex(
    (journalEntry) => journalEntry.date === get(currentDate)
  );
  // If a journal entry that matches the requested date exists, send that to
  // +page.svelte
  if (matchingIndex != -1) {
    return {
      journalEntry: {
        content: get(journalEntries)[matchingIndex].content,
        mood: get(journalEntries)[matchingIndex].mood
      }
    };
  }
};
