import { persisted } from 'svelte-local-storage-store';
import type { JournalEntry } from '../../app';

// creates a local (persisted) Svelte store for the journalTypes that is an
// array which contains Journal Entries (as defined in my custom type)
export const journalEntries = persisted<JournalEntry[]>('journalEntries', []);
