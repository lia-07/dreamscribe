import { readable } from 'svelte/store';
import { formatTimestamp } from '$lib/scripts/timestamp';

// create a svelte readable store with the current date, formatted by my
// date formatting script
export const currentDate = readable<string>(formatTimestamp(Date.now()));
