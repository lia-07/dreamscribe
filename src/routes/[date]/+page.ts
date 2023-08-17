// Get the PageLoad type
import type { PageLoad } from './$types';

// Allows me to throw errors
import { error } from '@sveltejs/kit';

// Allows me to manipulate svelte stores
import { get } from 'svelte/store';

// Import the journalEntires persisted store.
import { journalEntries } from '$lib/stores/journalEntries';

// The load function (when the page is loaded, it runs this code). Params is
// the slug ([date]), which a route that has a variable (/privacy is not a slug,
// but /16%20Aug%202023 is)
export const load: PageLoad = async ({ params }) => {
  // If this code is running on the server rather than the client, throw an
  // error since we obviously can't access local storage from the server.
  // Kind of redundant since I disabled Server Side Rendering for all routes
  // but you can never be too careful.
  if (import.meta.env.SSR) {
    throw error(500, {
      message: 'The server tried to access your local storage and failed.'
    });
  }

  // Get the index, if any, of the journal entry that matches the date requested
  const journalEntriesData = get(journalEntries);
  const matchingIndex = journalEntriesData.findIndex(
    (journalEntry) => journalEntry.date === params.date
  );

  // If a journal entry that matches the requested date exists, send that to
  // +page.svelte
  if (matchingIndex !== -1) {
    return {
      journalEntry: {
        date: journalEntriesData[matchingIndex].date,
        content: journalEntriesData[matchingIndex].content,
        mood: journalEntriesData[matchingIndex].mood
      }
    };
  } else {
    // If no journal entries exist for the requested date, throw a 404 error
    throw error(404, {
      message: 'Unfortunately, the journal entry you requested could not be found.'
    });
  }
};
