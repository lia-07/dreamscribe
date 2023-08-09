import { persisted } from 'svelte-local-storage-store';
import type { JournalEntry } from '../../app';

export const journalEntries = persisted<JournalEntry[]>('journalEntries', []);
