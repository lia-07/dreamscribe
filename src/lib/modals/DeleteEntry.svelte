<script lang="ts">
  import { closeModal } from 'svelte-modals';
  import Base from './Base.svelte';

  import { journalEntries } from '$lib/stores/journalEntries';

  import Icon from '$lib/assets/Icon.svelte';
  import Button from '$lib/components/Button.svelte';

  // provided by <Modals />
  export let isOpen: Boolean;
  export let date: string;

  // deletes the current entry and sends the user home
  function deleteEntry() {
    // find the numerical index of the entry to delete
    const matchingIndex = $journalEntries.findIndex((journalEntry) => journalEntry.date === date);

    // delete that entry
    journalEntries.update((existingEntries) => {
      return existingEntries.filter((entry, i) => i !== matchingIndex);
    });

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
