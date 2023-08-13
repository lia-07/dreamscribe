// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};

// My custom type for a Journal Entry (to follow convention, type names are not
// written in camelCase). It defines a Journal Entry as an object with a
// string for the date (as processed by my timestamp formatting function),
// a string for the content of the journal entry (as written by the user), a
// string for the mood, and a string for the hex value of the colour.
export interface JournalEntry {
  date: string;
  content: string;
  mood: string;
}
