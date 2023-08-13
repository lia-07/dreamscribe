import type { PageLoad } from './$types';

import { get } from 'svelte/store';
import { journalEntries } from '$lib/stores/journalEntries';

export const load: PageLoad = ({ params }) => {
  const matchingIndex = get(journalEntries).findIndex(
    (journalEntry) => journalEntry.date === params.date
  );
  if (matchingIndex != -1) {
    return {
      journalEntry: {
        content: get(journalEntries)[matchingIndex].content,
        mood: get(journalEntries)[matchingIndex].mood
      }
    };
  }
};
