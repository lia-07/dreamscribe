<!-- The modal for confirming the user wants to delete their journal entry -->

<script lang="ts">
  // Allow the modal to be closed
  import { closeModal } from 'svelte-modals';

  // Import the base modal
  import Base from './Base.svelte';

  // Import the journal entries store
  import { journalEntries } from '$lib/stores/journalEntries';

  // Already explained what these do
  import Icon from '$lib/assets/Icon.svelte';
  import Button from '$lib/components/Button.svelte';

  // provided by the Modals package, and lets us know if the modal is open
  export let isOpen: boolean;

  // provided by [date]/+page.svelte, gives us the date of the currently opened
  // journal entry
  export let date: string;

  // deletes the current entry and sends the user home
  function deleteEntry() {
    // find the numerical index of the entry to delete
    const matchingIndex = $journalEntries.findIndex((journalEntry) => journalEntry.date === date);

    // delete that entry
    journalEntries.update((existingEntries) => {
      return existingEntries.filter((entry, i) => i !== matchingIndex);
    });
    console.log(`Deleted the journal entry for ${date}`);

    // send the user home
    window.location.href = '/';
  }
</script>

{#if isOpen}
  <Base>
    <header class=" flex items-center gap-1 px-2 pt-2 font-cabinet text-2xl font-bold opacity-90">
      <Icon name="warning" sizeInRem={1.25} /> Warning
    </header>
    <p class="px-2 pb-2">
      You are about to delete your journal entry for {date}.
      <b>This action is permanent and cannot be undone.</b>
    </p>
    <footer class=" flex w-full justify-end gap-2 border-t border-base01/50 pt-2">
      <Button variant="secondary" on:buttonClick={closeModal}
        ><span slot="icon"><Icon name="x" /></span><span slot="text">Cancel</span></Button
      >
      <Button variant="destructive" on:buttonClick={deleteEntry}
        ><span slot="icon"><Icon name="bomb" /></span><span slot="text">Delete Forever</span
        ></Button
      >
    </footer>
  </Base>
{/if}
