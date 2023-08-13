import type { PageLoad } from './$types';
import type { JournalEntry } from '../app';

import { get } from 'svelte/store';
import { journalEntries } from '$lib/stores/journalEntries';
import { currentDate } from '$lib/stores/currentDate';

export const load: PageLoad = ({ params }) => {
  const matchingIndex = get(journalEntries).findIndex(
    (journalEntry) => journalEntry.date === get(currentDate)
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
