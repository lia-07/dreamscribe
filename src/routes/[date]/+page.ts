import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

import { get } from 'svelte/store';
import { journalEntries } from '$lib/stores/journalEntries';

export const load: PageLoad = async ({ params }) => {
  if (import.meta.env.SSR) {
    throw error(500, {
      message: "The server ran into a problem and couldn't process your request."
    });
  }

  const journalEntriesData = get(journalEntries);
  const matchingIndex = journalEntriesData.findIndex(
    (journalEntry) => journalEntry.date === params.date
  );

  if (matchingIndex !== -1) {
    return {
      journalEntry: {
        date: journalEntriesData[matchingIndex].date,
        content: journalEntriesData[matchingIndex].content,
        mood: journalEntriesData[matchingIndex].mood
      }
    };
  } else {
    throw error(404, {
      message: 'Unfortunately, the journal entry you requested could not be found'
    });
  }
};
