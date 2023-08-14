import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

import { get } from 'svelte/store';
import { journalEntries } from '$lib/stores/journalEntries';

export const load: PageLoad = ({ params }) => {
  const matchingIndex = get(journalEntries).findIndex(
    (journalEntry) => journalEntry.date === params.date
  );
  if (matchingIndex != -1) {
    return {
      journalEntry: {
        date: get(journalEntries)[matchingIndex].date,
        content: get(journalEntries)[matchingIndex].content,
        mood: get(journalEntries)[matchingIndex].mood
      }
    };
  } else {
    throw error(404, {
      message: 'Unfortunately, the journal entry you requested could not be found'
    });
  }
};
